"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { toast } from "react-toastify";
import styles from "@/styles/global.module.scss";
import Input from "@/components/Input";
import { loginAdmin } from "@/lib/handleApiActions";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = true;
    if (!formData.password.trim()) newErrors.password = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { token } = await loginAdmin(
          formData.username,
          formData.password
        );

        toast.success("Login successful");
        router.push("/naftalanPark/dashboard");
      } catch (err) {
        toast.error("Uğursuz cəhd");
      }
    } else {
      toast.error("Müvafiq xanaları doldurun");
    }
  };

  return (
    <div className={styles.form}>
      <div>
        <img src="./header.png" alt="Park Naftalan Sanatoriyası" />
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="Admin"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          hasError={errors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="Şifrə"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          hasError={errors.password}
        />
        <Input type="submit" value="Login" className={styles.submitBtn} />
      </form>
    </div>
  );
}
