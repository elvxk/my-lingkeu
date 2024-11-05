"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import ThemeSwitch from "./ThemeSwitch";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="flex flex-col items-center justify-center gap-1 p-4">
      <div className="hover:rotate-12 hover:scale-110 transition-all">
        <ThemeSwitch />
      </div>
      <p className="text-center font-cera font-bold text-sm">
        Made with Love &copy; {year}{" "}
        <Link href={"https://sandri.my.id"} target="_blank">
          elvxk
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
