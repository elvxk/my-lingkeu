"use client";

import { useClerk } from "@clerk/nextjs";

const BtnManageUser = ({ children, classes }) => {
  const { openUserProfile } = useClerk();

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <button className={classes} onClick={() => openUserProfile()}>
      {children}
    </button>
  );
};
export default BtnManageUser;
