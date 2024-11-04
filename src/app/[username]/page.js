import BtnLogout from "@/components/auth/Logout";
import { currentUser } from "@clerk/nextjs/server";

const PageLink = async ({ params }) => {
  const user = await currentUser();
  return (
    <div>
      {user ? <h1>{user.username}</h1> : <h1>belum login</h1>}
      <BtnLogout />
    </div>
  );
};
export default PageLink;
