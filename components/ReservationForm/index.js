"use client";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getAznToUsdRate, getDatas, sendMail } from "@/lib/handleApiActions";
import Input from "../Input";
import Calendar from "../Calendar/Calendar";
import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.scss";
import SelectBox from "../SelecBox";
import CustomMultiSelect from "../CustomMultiSelect";

export default function ReservationForm({
  t,
  locale,
  currentRoom,
  initialDate,
}) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    date: initialDate || "",
    member: 1,
    message: "",
    dayCount: 1,
    childCount: [],
    roomCount: 1,
  });

  const [selectedRoom, setSelectedRoom] = useState(currentRoom || "");
  const [guest, setGuest] = useState(0);
  const [maxGuestCount, setMaxGuestCount] = useState(1);
  const [errors, setErrors] = useState({});
  const [rooms, setRooms] = useState([]);
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState(0.5877);
  const [initialDateRange, setInitialDateRange] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);

  const getCampaignNames = () => ({
    "5-percent": t?.FivePercent || "5%",
    "free-transfer": t?.FreeTransfer || "Free Transfer",
  });

  // Fetch rooms and currency
  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getDatas("Room");
      setRooms(Array.isArray(data) ? data : []);
    };
    fetchRooms();

    const fetchCurrency = async () => {
      try {
        const cur = await getAznToUsdRate();
        if (cur && !isNaN(cur)) setCurrency(cur);
      } catch {
        console.warn("Using fallback currency rate");
      }
    };
    fetchCurrency();
  }, []);

  // Read campaign from sessionStorage
  useEffect(() => {
    try {
      const c = sessionStorage.getItem("campaign");
      if (c) {
        setCampaign(c);
        // Set campaign info based on selection
        const campaignNames = getCampaignNames();
        setCampaignInfo(campaignNames[c] || null);

        // Auto-fill message with campaign text
        if (campaignNames[c]) {
          setFormData((prev) => ({
            ...prev,
            message: t?.CampaignAutoMessageTemplate
              ? t.CampaignAutoMessageTemplate.replace(
                  "{campaign}",
                  campaignNames[c]
                )
              : `I would like to take advantage of the selected campaign: ${campaignNames[c]}.`,
          }));
        }
      }
    } catch {}
  }, []);

  const handleCampaignChange = (e) => {
    const value = e.target.value || "";
    setCampaign(value || null);
    const names = getCampaignNames();
    const label = value ? names[value] : null;
    setCampaignInfo(label);
    try {
      if (value) sessionStorage.setItem("campaign", value);
      else sessionStorage.removeItem("campaign");
    } catch {}

    if (label) {
      setFormData((prev) => ({
        ...prev,
        message: t?.CampaignAutoMessageTemplate
          ? t.CampaignAutoMessageTemplate.replace("{campaign}", label)
          : `I would like to take advantage of the selected campaign: ${label}.`,
      }));
    }
  };

  // Set default room and member
  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      const firstRoom = rooms[0];
      setSelectedRoom(firstRoom.category);
      setFormData((prev) => ({
        ...prev,
        member: firstRoom.minMember || 1,
      }));
      setMaxGuestCount(firstRoom.member || 1);
    }
  }, [rooms, selectedRoom]);

  // Set default room when no room is provided
  useEffect(() => {
    if (rooms.length > 0 && !currentRoom) {
      const firstRoom = rooms[0];
      setSelectedRoom(firstRoom.category);
    }
  }, [rooms, currentRoom]);

  // Handle initial date from URL parameters
  useEffect(() => {
    if (initialDate && initialDate !== formData.date) {
      setFormData((prev) => ({
        ...prev,
        date: initialDate,
      }));

      // Parse the date string to extract start and end dates
      if (initialDate.includes(" - ")) {
        const [startDateStr, endDateStr] = initialDate.split(" - ");
        const startDate = parseDateString(startDateStr);
        const endDate = parseDateString(endDateStr);

        if (startDate && endDate) {
          // Set initial date range for calendar
          setInitialDateRange([startDate, endDate]);

          // Calculate day count
          const dayCount = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
          );
          setFormData((prev) => ({
            ...prev,
            dayCount: dayCount > 0 ? dayCount : 1,
          }));
        }
      }
    }
  }, [initialDate]);

  // Helper function to parse date string in DD.MM.YYYY format
  const parseDateString = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split(".");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  // Update price when form changes
  useEffect(() => {
    if (!rooms.length || !selectedRoom) return;
    const selected = rooms.find((item) => item.category === selectedRoom);

    const maxOcc = selected?.member || 1;
    // Multiply max occupancy by roomCount
    const multipliedMax = maxOcc * Number(formData.roomCount || 1);
    setMaxGuestCount(multipliedMax);

    const occupancyPrice = selected?.pricesByOccupancy?.find(
      (p) => p.occupancy === Number(formData.member)
    )?.price;
    const roomBasePrice =
      occupancyPrice !== undefined
        ? occupancyPrice
        : Number(selected?.price || 0);

    const selectedChildren =
      selected?.children?.filter((child) =>
        formData.childCount.includes(String(child.id))
      ) || [];
    const childPriceTotal = selectedChildren.reduce(
      (acc, child) => acc + Number(child.price || 0),
      0
    );

    const extraGuestPrice = guest ? 70 : 0;

    const dailyTotal = roomBasePrice + childPriceTotal + extraGuestPrice;
    const dayCount = Number(formData.dayCount || 1);
    const roomCount = Number(formData.roomCount || 1);

    setPrice(dailyTotal * dayCount * roomCount);
  }, [rooms, selectedRoom, formData, guest]);

  // Room and child options
  const roomOptions = rooms
    .map((item) => ({ value: item.category, label: item.category }))
    .sort((a, b) => a.label.localeCompare(b.label, "az"));

  const childOptions = useMemo(() => {
    const selected = rooms.find((room) => room.category === selectedRoom);
    if (!selected?.children) return [];

    return selected.children.map((child) => {
      let label = child.ageRange;
      switch (locale) {
        case "en":
          label = label.replace(/uşaq/g, "child").replace(/yaş/g, "years");
          break;
        case "ru":
          label = label.replace(/uşaq/g, "pебенок").replace(/yaş/g, "лет");
          break;
      }
      const treatmentText = {
        az: " (Müalicə ilə)",
        en: " (With Treatment)",
        ru: " (С лечением)",
      };
      if (child.hasTreatment) label += treatmentText[locale];
      return { value: String(child.id), label };
    });
  }, [rooms, selectedRoom, locale]);

  // Room select handler
  const handleRoomSelect = (e) => {
    const selectedCategory = e.target.value;
    setSelectedRoom(selectedCategory);

    const selected = rooms.find((room) => room.category === selectedCategory);
    const minMember = selected?.minMember || 1;

    setFormData((prev) => ({
      ...prev,
      member: minMember,
      childCount: [],
    }));
    setGuest(0);
    setMaxGuestCount(selected?.member || 1);
  };

  // Member change handler
  const handleMemberChange = (e) => {
    let val = e.target.value;
    if (!/^\d*$/.test(val)) return;
    if (val === "") {
      setFormData((prev) => ({ ...prev, member: "" }));
      return;
    }

    val = parseInt(val, 10);

    const selected = rooms.find((r) => r.category === selectedRoom);
    const perRoomMax = selected?.member || maxGuestCount || 1;
    const roomMax = (selected?.member || 1) * Number(formData.roomCount || 1);
    const roomMin = selected?.minMember || 1;

    const totalOther = guest + formData.childCount.length;

    if (val + totalOther > roomMax) val = roomMax - totalOther;
    if (val < roomMin) val = roomMin;

    setFormData((prev) => ({ ...prev, member: val }));
  };

  // Extra guest handler
  const handleGuestChange = (e) => {
    const checked = e.target.checked ? 1 : 0;
    const selected = rooms.find((r) => r.category === selectedRoom);
    const roomMax = (selected?.member || 1) * Number(formData.roomCount || 1);

    const totalPeople = formData.member + checked + formData.childCount.length;
    if (totalPeople <= roomMax) setGuest(checked);
    else toast.error(`${t?.MaxGuest || "Maksimum qonaq sayı"}: ${roomMax}`);
  };

  // Child select handler
  const handleChildChange = (selected) => {
    const selectedRoomData = rooms.find((r) => r.category === selectedRoom);
    const roomMax =
      (selectedRoomData?.member || 1) * Number(formData.roomCount || 1);

    const totalPeople = formData.member + guest + selected.length;
    if (totalPeople <= roomMax)
      setFormData((prev) => ({ ...prev, childCount: selected }));
    else toast.error(`${t?.MaxGuest || "Maksimum qonaq sayı"}: ${roomMax}`);
  };

  // Date change handler
  const handleDateChange = ({ startDate, endDate }) => {
    const formattedStartDate =
      startDate instanceof Date ? startDate.toLocaleDateString("az-AZ") : "";
    const formattedEndDate =
      endDate instanceof Date ? endDate.toLocaleDateString("az-AZ") : "";

    let dayCount = 1;
    if (startDate && endDate) {
      dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      if (dayCount < 1) dayCount = 1;
    }

    setFormData((prev) => ({
      ...prev,
      date: `${formattedStartDate} - ${formattedEndDate}`,
      dayCount,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = true;
    if (!formData.surname?.trim()) newErrors.surname = true;
    if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = true;
    if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = true;
    if (!formData.date?.trim()) newErrors.date = true;
    if (formData.roomCount < 1) newErrors.roomCount = true;
    if (!selectedRoom?.trim()) newErrors.selectedRoom = true;

    // Enforce campaign rules
    const totalGuests = formData.member + guest + formData.childCount.length;
    if (campaign === "free-transfer") {
      // auto-apply transfer (implicitly via campaign) and min 4 guests
      if (totalGuests < 4) {
        newErrors.member = true;
        toast.error("Pulsuz transfer üçün minimum 4 nəfər");
      }
    }
    // 7-day minimum stay for both campaigns
    if (campaign && formData.dayCount < 7) {
      newErrors.date = true;
      toast.error("Minimum qalma müddəti 7 gündür");
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(t?.FillInput || "Please fill all required fields.");
      return;
    }

    const selectedChildren = childOptions.filter((opt) =>
      formData.childCount.includes(opt.value)
    );
    const selectedChildrenLabels = selectedChildren.map((opt) => opt.label);
    const selectedRoomData = rooms.find((r) => r.category === selectedRoom);
    const totalPeople = formData.member + guest + formData.childCount.length;

    const finalData = {
      ...formData,
      selectedRoom: `${
        selectedRoomData?.category || selectedRoom
      } (${totalPeople} nəfər)`,
      guest: totalPeople,
      price,
      language: locale,
      dayCount: `${formData.dayCount} ${t?.Night} / ${formData.dayCount + 1} ${
        t?.Day
      }`,
      childCount: selectedChildrenLabels.join(", "),
      campaign: campaign || undefined,
      campaignInfo: campaignInfo || undefined,
    };

    try {
      const res = await sendMail("send-reservation-confirmation", finalData);
      if (res?.status === 200) {
        toast.success(t?.Success);
        setFormData({
          name: "",
          surname: "",
          email: "",
          phoneNumber: "",
          date: "",
          message: "",
          dayCount: 1,
          member: 1,
          childCount: [],
          roomCount: 1,
        });
        setSelectedRoom(currentRoom || rooms[0]?.category || "");
        setGuest(0);
        setErrors({});
        setPrice(0);
      } else toast.error(t?.Error || "Error sending email.");
    } catch (err) {
      console.error(err);
      toast.error(t?.BackError || "Something went wrong.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formSection}>
        <Calendar
          t={t}
          locale={locale}
          handleDateChange={handleDateChange}
          initialRange={initialDateRange}
        />

        {campaignInfo && (
          <div className={styles.campaignInfo}>
            <h3>
              {t?.SelectedCampaign}: {campaignInfo}
            </h3>
            {campaign === "free-transfer" && <p>• {t?.AutoTransferApplied}</p>}
            {campaign === "5-percent" && <p>• {t?.DiscountApplied}</p>}
            <p>• {t?.MinStay7}</p>
            {campaign === "free-transfer" && <p>• {t?.MinGuests4}</p>}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.reservationForm}>
          <div className={styles.formGroup}>
            <SelectBox
              optionData={[
                { value: "", label: t?.Campaign || "Campaign" },
                { value: "5-percent", label: getCampaignNames()["5-percent"] },
                {
                  value: "free-transfer",
                  label: getCampaignNames()["free-transfer"],
                },
              ]}
              name="campaign"
              value={campaign || ""}
              onChange={handleCampaignChange}
              label={t?.Campaign}
            />
            <SelectBox
              optionData={roomOptions}
              name="selectedRoom"
              value={selectedRoom}
              onChange={handleRoomSelect}
              hasError={errors.selectedRoom}
              label={t?.ChooseRoom}
            />
            <Input
              type="number"
              name="roomCount"
              label={t?.RoomCount}
              value={formData.roomCount}
              onChange={(e) =>
                setFormData({ ...formData, roomCount: Number(e.target.value) })
              }
              hasError={errors.roomCount}
              min="1"
            />

            <div className={styles.group}>
              <Input
                type="number"
                name="member"
                label={t?.Guest}
                value={formData.member}
                onChange={handleMemberChange}
                hasError={errors.member}
                min={
                  rooms.find((r) => r.category === selectedRoom)?.minMember || 1
                }
                max={maxGuestCount}
              />
              <label>
                <Input
                  type="checkbox"
                  name="guest"
                  checked={guest}
                  onChange={handleGuestChange}
                />
                <span>{t?.addGuest}</span>
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            <CustomMultiSelect
              label={t?.ChildCount}
              options={childOptions}
              name="childCount"
              selectedValues={formData.childCount}
              onChange={handleChildChange}
              hasError={errors.childCount}
            />
            <Input
              type="text"
              name="name"
              label={t?.Name}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              hasError={errors.name}
              placeholder={t?.Name}
            />
            <Input
              type="text"
              name="surname"
              label={t?.Surname}
              value={formData.surname}
              onChange={(e) =>
                setFormData({ ...formData, surname: e.target.value })
              }
              hasError={errors.surname}
              placeholder={t?.Surname}
            />
          </div>

          <div className={styles.formGroup}>
            <Input
              type="email"
              name="email"
              label={t?.Email}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              hasError={errors.email}
              placeholder={t?.Email}
            />
            <Input
              type="tel"
              name="phoneNumber"
              label={t?.Phone}
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              hasError={errors.phoneNumber}
              placeholder={t?.Phone}
            />

            <div
              className={`${styles.textareaWrapper} ${
                errors.message ? styles.error : ""
              }`}
            >
              <label htmlFor="message">{t?.Message}</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder={t?.MessagePlaceholder}
              />
              {campaign && (
                <small
                  style={{
                    color: "#666",
                    fontSize: "12px",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  {t?.CampaignAutoMessageNote ||
                    "Campaign information has been automatically added"}
                </small>
              )}
            </div>

            <div className={styles.priceSubmitWrapper}>
              {selectedRoom && (
                <p className={styles.priceInfo}>
                  {formData.roomCount} {selectedRoom} × {formData.member}
                  {guest ? `+${guest}` : ""} {t?.Guest},{" "}
                  {formData.childCount.length !== 0 &&
                    `${formData.childCount.length} ${t?.Child} ×`}{" "}
                  {formData.dayCount} {t?.Night} — {t?.PriceIs}{" "}
                  <span className={styles.totalPrice}>
                    {price} ₼ / {(Number(price) * currency).toFixed(0)} $
                  </span>
                </p>
              )}
              <Input
                type="submit"
                value={t?.Reserv}
                className={styles.submitBtn}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
