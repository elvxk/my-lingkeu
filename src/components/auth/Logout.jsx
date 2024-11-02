"use client";

import { useClerk } from "@clerk/nextjs";

const BtnLogout = ({ children, classes }) => {
  const { signOut } = useClerk();

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button className={classes} onClick={() => signOut({ redirectUrl: "/" })}>
      {children}
    </button>
  );
};
export default BtnLogout;
