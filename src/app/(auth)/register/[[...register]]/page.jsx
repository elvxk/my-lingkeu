import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container mx-auto ">
      <main className="m-4 flex flex-col justify-center min-h-[90vh] gap-2 items-center">
        <SignUp />
      </main>
    </div>
  );
}
