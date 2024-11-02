import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Typing from "@/utils/Typing";
import { IoLogIn, IoCreate, IoRocket, IoLogOut } from "react-icons/io5";
import { auth, currentUser } from "@clerk/nextjs/server";
import BtnLogout from "@/components/auth/Logout";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  return (
    <div className="container mx-auto">
      <main className="m-4 flex flex-col justify-center min-h-[90vh] gap-2 items-center">
        <div data-aos="flip-up">
          <Image
            draggable={false}
            className="dark:invert hover:scale-105 transition-all"
            src="/lingkeu.svg"
            alt="My Lingkeu logo"
            width={150}
            height={25}
            priority
          />
        </div>
        {userId && (
          <p
            data-aos="fade-down"
            className="-mb-2 font-cera font-bold text-2xl text-center"
          >
            Hi, {user.username}
          </p>
        )}
        <p
          data-aos="fade-down"
          className="font-cera font-bold text-xl text-center"
        >
          Welcome to My Lingkeu
        </p>
        <p data-aos="fade-down" className="text-center -mt-2">
          Buat list link mu sendiri disini{" "}
          <span className="bg-main px-2">
            <Typing
              words={["Mudah", "Cepat", "Simple"]}
              cursor
              cursorStyle={"/"}
            />
          </span>
        </p>
        <div
          data-aos="flip-up"
          className="flex gap-4 items-center mt-2 justify-center"
        >
          {userId ? (
            <>
              <Link
                className={`flex gap-2 items-center justify-center ${buttonVariants()}`}
                href={"/dashboard"}
              >
                <IoRocket className="text-lg" /> Dashboard
              </Link>
              <BtnLogout
                classes={`flex gap-2 items-center justify-center ${buttonVariants({ variant: "neutral" })}`}
              >
                <IoLogOut className="text-lg" /> Logout
              </BtnLogout>
            </>
          ) : (
            <>
              <Link
                className={`flex gap-2 items-center justify-center ${buttonVariants()}`}
                href={"/login"}
              >
                <IoLogIn className="text-lg" /> Login
              </Link>
              <Link
                className={`flex gap-2 items-center justify-center ${buttonVariants({ variant: "neutral" })}`}
                href={"/register"}
              >
                <IoCreate className="text-lg" /> Register
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
