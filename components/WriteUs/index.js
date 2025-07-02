"use client";
import { useState } from "react";
import Input from "../Input";
import Section from "../Section/Section";
import Button from "../Button/Button";
import { sendMail } from "@/lib/handleApiActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./styles.module.scss";

export default function WriteUs({ t, locale }) {
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
          "info@parknaftalan.az",
          "Yeni Mesaj Formu",
          emailBody
        );

        if (res.status === 200) {
          toast.success(t?.Success || "Məlumat uğurla göndərildi!");

          setFormData({
            fullName: "",
            email: "",
            phone: "",
            message: "",
          });
          setErrors({});
        } else {
          toast.error(
            t?.Error || "Uğursuz cəhd! Zəhmət olmasa yenidən cəhd edin."
          );
        }
      } catch (error) {
        console.error("Mesaj göndərmə xətası:", error);
        toast.error(
          t?.BackError || "Xəta baş verdi. Zəhmət olmasa daha sonra cəhd edin."
        );
      }
    } else {
      toast.error(
        t?.FillInput || "Xahiş edirik, bütün sahələri düzgün doldurun."
      );
    }
  };

  return (
    <Section
      name={t?.writeUs || "Bizimlə əlaqə saxlayın"}
      oneLine={false}
      t={t}
      locale={locale}
      className={styles.writeUs}
    >
      <div className={styles.writeUsContainer}>
        <div className={styles.formColumn}>
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <Input
              type="text"
              name="fullName"
              label={t?.fullName || "Ad Soyad"}
              value={formData.fullName}
              onChange={handleChange}
              hasError={errors.fullName}
              placeholder={t?.fullNamePlaceholder || "Adınız və Soyadınız"}
            />
            <div className={styles.twoColumnInputs}>
              <Input
                type="email"
                name="email"
                label={t?.email || "Email"}
                value={formData.email}
                onChange={handleChange}
                hasError={errors.email}
                placeholder="email@example.com"
                autoComplete="email"
              />
              <Input
                type="tel"
                name="phone"
                label={t?.phone || "Əlaqə nömrəsi"}
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
              <label htmlFor="message">{t?.message || "Mesajınız"}</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder={
                  t?.messagePlaceholder || "Mesajınızı buraya yazın..."
                }
              />
            </div>

            <Button type="submit" className={styles.submitBtn}>
              {t?.Submit || "Göndər"}
            </Button>
          </form>
        </div>
        <div className={styles.mapColumn}>
          <div className={styles.mapContainer}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14412.613858272412!2d49.7876062989235!3d40.41848290601152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030879f861dcafd%3A0x698cf8c88c5e0179!2sBak%C4%B1%20Beyn%C9%99lxalq%20Avtova%C4%9Fzal%20Kompleksi!5e1!3m2!1sen!2saz!4v1751391969769!5m2!1sen!2saz"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Park Naftalan Location"
              width={600}
              height={400}
            ></iframe>
          </div>
        </div>
      </div>
    </Section>
  );
}
