"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Cek Local Storage untuk status dark mode
    const storedMode = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;

    // Mengatur mode berdasarkan Local Storage atau preferensi pengguna
    const initialMode = storedMode ? JSON.parse(storedMode) : prefersDark;
    setIsDarkMode(initialMode);
    document.documentElement.classList.toggle("dark", initialMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Menyimpan status baru ke Local Storage
    localStorage.setItem("darkMode", JSON.stringify(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      // className="fixed top-4 right-4 p-2 bg-gray-200 rounded dark:bg-gray-700"
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
export default ThemeSwitch;
