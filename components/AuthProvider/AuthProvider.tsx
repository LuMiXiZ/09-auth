"use client";

import { checkSession, getMe } from "../../lib/api/clientApi";
import { useAuth } from "../../lib/store/authStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

type Props = {
  children: React.ReactNode;
  isPrivate?: boolean;
};

export default function AuthProvider({ children, isPrivate }: Props) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const router = useRouter();
  const setUser = useAuth((state) => state.setUser);
  const clearIsAuthenticated = useAuth((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkSession();
        const user = await getMe();
        if (user) setUser(user);
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
        clearIsAuthenticated();
        console.log(error);
        if (isPrivate) {
          router.push("/sign-in");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser, clearIsAuthenticated]);

  if (loading) return <Loading />;

  if (isPrivate && !isAuth) {
    return null;
  }

  return <>{children}</>;
}

//   const setUser = useAuth((state) => state.setUser);
//   const clearIsAuthenticated = useAuth((state) => state.clearIsAuthenticated);

//   useEffect(() => {
//     const fetchUser = async () => {
//       // Перевіряємо сесію
//       try {
//         await checkSession();
//         const user = await getMe();
//         if (user) setUser(user);
//       } catch (error) {
//         clearIsAuthenticated();
//         console.log(error);
//       }

//       // Якщо сесія валідна — отримуємо користувача

//       // Якщо сесія невалідна — чистимо стан
//     };
//     fetchUser();
//   }, [setUser, clearIsAuthenticated]);

//   return children;
// };

// export default AuthProvider;
