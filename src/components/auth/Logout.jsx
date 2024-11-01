"use client";

import { useClerk } from "@clerk/nextjs";

const BtnLogout = () => {
  const { signOut } = useClerk();

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button onClick={() => signOut({ redirectUrl: "/" })}>Sign out</button>
  );
};
export default BtnLogout;
