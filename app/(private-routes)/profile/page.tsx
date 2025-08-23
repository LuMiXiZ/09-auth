import type { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile - NoteHub",
  description: "User profile page with account details",
  keywords: ["profile", "user", "account", "NoteHub"],
  openGraph: {
    title: "Profile - NoteHub",
    description: "View and edit your NoteHub profile",
    url: "https://09-auth-gray-six.vercel.app/profile",
    siteName: "NoteHub",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Profile - NoteHub",
    description: "View and edit your NoteHub profile",
  },
};

export default async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
