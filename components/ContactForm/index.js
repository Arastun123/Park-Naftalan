"use client";
import { useState } from "react";
import Input from "../Input";
import Button from "../Button/Button";
import { sendMail } from "@/lib/handleApiActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles.module.scss";
export default function ContactForm({ t, locale }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;
    if (!formData.message.trim()) newErrors.message = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const emailBody = `
        Yeni mesaj:
        - Ad Soyad: ${formData.fullName}
        - Email: ${formData.email}
        - Əlaqə nömrəsi: ${formData.phone}
        - Mesaj: ${formData.message}
      `;
      try {
        const res = await sendMail(
          `send?to=parknaftalanaz2024@gmail.com&subject=Yeni Mesaj Formu&message=${emailBody}`,
          emailBody
        );

        if (res.status === 200) {
          toast.success(t?.Success);

          setFormData({
            fullName: "",
            email: "",
            phone: "",
            message: "",
          });
          setErrors({});
        } else {
          toast.error(t?.Error);
        }
      } catch (error) {
        console.error("Mesaj göndərmə xətası:", error);
        toast.error(t?.BackError);
      }
    } else {
      toast.error(t?.FillInput);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <Input
        type="text"
        name="fullName"
        label={t?.FullName}
        value={formData.fullName}
        onChange={handleChange}
        hasError={errors.fullName}
        placeholder={t?.FullNamePlaceholder}
      />
      <div className={styles.twoColumnInputs}>
        <Input
          type="email"
          name="email"
          label={t?.Email}
          value={formData.email}
          onChange={handleChange}
          hasError={errors.email}
          placeholder="email@example.com"
          autoComplete="email"
        />
        <Input
          type="tel"
          name="phone"
          label={t?.Phone}
          value={formData.phone}
          onChange={handleChange}
          hasError={errors.phone}
          placeholder="+994 XX XXX XX XX"
        />
      </div>
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
          onChange={handleChange}
          placeholder={t?.MessagePlaceholder}
        />
      </div>

      <Button type="submit" className={styles.submitBtn}>
        {t?.Submit}
      </Button>
    </form>
  );
}
