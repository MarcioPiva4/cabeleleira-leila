"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    Cookies.remove("token");
    Cookies.remove("session");
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <button
      className="bg-orange-400 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-500 transition-all"
      onClick={handleLogout}>
      Sair
    </button>
  );
};
