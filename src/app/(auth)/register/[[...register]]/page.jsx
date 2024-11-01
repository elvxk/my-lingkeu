import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container flex mx-auto justify-center items-center w-full min-h-screen">
      <SignUp />
    </div>
  );
}
