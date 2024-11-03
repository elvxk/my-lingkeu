import { buttonVariants } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { IoHome } from "react-icons/io5";

export default function Page() {
  return (
    <div className="container mx-auto ">
      <main className="m-4 flex flex-col justify-center min-h-[90vh] gap-2 items-center">
        <SignIn redirectUrl="/dashboard" />
        <Link
          href={"/"}
          className={`flex gap-2 items-center justify-center font-cera font-bold hover:underline mt-2`}
        >
          <IoHome /> Back to Home
        </Link>
      </main>
    </div>
  );
}
