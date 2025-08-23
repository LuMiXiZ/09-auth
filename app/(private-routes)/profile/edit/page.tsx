"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuth } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { patchMe } from "@/lib/api/clientApi";
import { User } from "@/types/user";

export default function EditProfile() {
  const { user } = useAuth();
  const router = useRouter();
  const { setUser } = useAuth();
  const handleSubmit = async (formData: FormData) => {
    const id = Object.fromEntries(formData) as User;
    console.log("id", id);
    const res = await patchMe(id);
    console.log("res", res);
    if (res) {
      setUser(res);
      router.push("/profile");
    }
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || "/default-avatar.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form action={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              defaultValue={user?.username}
              id="username"
              name="username"
              type="text"
              required
              className={css.input}
            />
          </div>

          <p>{user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              onClick={() => router.back()}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
