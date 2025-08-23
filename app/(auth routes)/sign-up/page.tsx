"use client";

import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { RegisterRequest, register, ApiError } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuth((state) => state.setUser);

  const handleRegister = async (formData: FormData) => {
    try {
      const id = Object.fromEntries(formData) as RegisterRequest;
      const response = await register(id);
      if (response) {
        setUser(response);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
      setError((error as ApiError).response?.data.response.message ?? "");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleRegister} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
