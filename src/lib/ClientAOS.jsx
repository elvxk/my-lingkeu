"use client"; // Pastikan komponen ini adalah client component

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ClientAOS({ children }) {
  useEffect(() => {
    AOS.init();
  }, []); // Kosongkan dependensi agar hanya dijalankan sekali

  return <>{children}</>;
}
