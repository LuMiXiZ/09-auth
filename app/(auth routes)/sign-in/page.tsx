"use client";

import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { LoginRequest, login, ApiError } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuth((state) => state.setUser);

  const handleLogin = async (formData: FormData) => {
    try {
      const id = Object.fromEntries(formData) as LoginRequest;
      const response = await login(id);
      if (response) {
        setUser(response);
        router.push("/profile");
      }
    } catch (error) {
      setError((error as ApiError).response?.data.response.message ?? "");
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleLogin} className={css.form}>
        <h1 className={css.formTitle}>Login</h1>

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
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
