"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Button from "@/components/Button/Button";
import global from "@/styles/global.module.scss";
import admin from "@/styles/admin.module.scss";
import { getDatas, updateDataNoId } from "@/lib/handleApiActions";

import table from "@/styles/table.module.scss";
import { toast } from "react-toastify";

export default function createContact() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [values, setValues] = useState({
    number: [""],
    mail: "",
    adress: "",
    instagramLink: "",
    facebookLink: "",
    tiktokLink: "",
    youtubeLink: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getDatas("Contact");
    if (data) {
      setValues({
        number: Array.isArray(data.number) ? data.number : [""],
        mail: data.mail || "",
        adress: data.adress || "",
        instagramLink: data.instagramLink || "",
        facebookLink: data.facebookLink || "",
        tiktokLink: data.tiktokLink || "",
        youtubeLink: data.youtubeLink || "",
        whatsappNumber: data.whatsappNumber || "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (index, value) => {
    const newNumbers = [...values.number];
    newNumbers[index] = value;
    setValues((prev) => ({ ...prev, number: newNumbers }));
  };

  const addPhoneNumber = () => {
    setValues((prev) => ({ ...prev, number: [...prev.number, ""] }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...values,
      number:
        typeof values.number === "string"
          ? values.number.split(",").map((num) => num.trim())
          : values.number,
    };

    const res = await updateDataNoId("Contact", payload);

    if (!res) {
      toast.error("Xəta baş verdi: Server cavab vermədi");
      return;
    }

    if (res.status === 204) {
      toast.success("Proses uğurla başa çatdı");
      router.back();
    } else {
      toast.error("Xəta baş verdi: " + res.status);
    }
  };

  return (
    <div className={global.container}>
      <form className={admin.form}>
        <>
          <label>Telefon Nömrələri</label>
          {values.number.map((num, i) => (
            <input
              key={i}
              type="text"
              value={num}
              onChange={(e) => handleNumberChange(i, e.target.value)}
              placeholder={`Nömrə ${i + 1}`}
            />
          ))}
          <Button
            onClick={addPhoneNumber}
            className={`${table.actionBtn} ${table.create}`}
          >
            Yeni nömrə əlavə et
          </Button>{" "}
          <br /> <br />
          <label>Mail</label>
          <input
            type="email"
            name="mail"
            value={values.mail}
            onChange={handleInputChange}
          />
          <label>Ünvan</label>
          <input
            type="text"
            name="adress"
            value={values.adress}
            onChange={handleInputChange}
          />
          <label>Instagram Link</label>
          <input
            type="url"
            name="instagramLink"
            value={values.instagramLink}
            onChange={handleInputChange}
          />
          <label>Facebook Link</label>
          <input
            type="url"
            name="facebookLink"
            value={values.facebookLink}
            onChange={handleInputChange}
          />
          <label>TikTok Link</label>
          <input
            type="url"
            name="tiktokLink"
            value={values.tiktokLink}
            onChange={handleInputChange}
          />
          <label>YouTube Link</label>
          <input
            type="url"
            name="youtubeLink"
            value={values.youtubeLink}
            onChange={handleInputChange}
          />
          <label>WhatsApp Nömrə</label>
          <input
            type="text"
            name="whatsappNumber"
            value={values.whatsappNumber}
            onChange={handleInputChange}
          />
        </>
      </form>

      <Button
        className={`${admin.actionBtn} ${admin.create}`}
        onClick={handleSubmit}
      >
        Təsdiq et
      </Button>
    </div>
  );
}
