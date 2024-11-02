"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="p-4">
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
