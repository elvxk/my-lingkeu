import BtnLogout from "@/components/auth/Logout";
import BtnManageUser from "@/components/auth/ManageUser";
import BtnAdd from "@/components/dashboard/BtnAdd";
import BtnDelete from "@/components/dashboard/BtnDelete";
import BtnEdit from "@/components/dashboard/BtnEdit";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import removePrefix from "@/utils/removePrefix";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { IoRocket, IoHome, IoSettings, IoLogOut } from "react-icons/io5";

const Dashboard = async () => {
  const user = await currentUser();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/list`, {
    method: "POST",
    body: JSON.stringify({ id: user.id }),
  });

  const { data } = await response.json();

  return (
    <div className="container mx-auto">
      <main className="flex flex-col gap-4 justify-center items-center min-h-[90vh] m-5">
        <div data-aos="flip-up">
          <Image
            draggable={false}
            className="dark:invert hover:scale-105 transition-all"
            src="/lingkeu.svg"
            alt="My Lingkeu logo"
            width={150}
            height={150}
            priority
          />
        </div>
        <p
          data-aos="fade-down"
          className="font-cera font-bold text-xl text-center -mt-4"
        >
          My Lingkeu
        </p>

        <div
          className="flex items-center justify-center w-full my-2"
          data-aos="flip-up"
        >
          <div className="flex-grow h-[2px] bg-black"></div>
          <span className="px-2 font-cera font-bold text-xs">My Profile</span>
          <div className="flex-grow h-[2px] bg-black"></div>
        </div>
        <div className="flex gap-4 self-start mx-4">
          <Image
            data-aos="flip-down"
            src={user.imageUrl}
            width={60}
            height={60}
            alt={user.username}
            draggable={false}
            className="border-2 border-black rounded-full object-cover"
          />
          <div
            className="flex flex-col justify-center items-start"
            data-aos="fade-left"
          >
            <h1 className="text-2xl font-cera font-bold">{user.username}</h1>
            <h1 className="font-cera font-bold">
              {user.firstName && user.firstName}{" "}
              {user.lastName && user.lastName}
            </h1>
          </div>
        </div>
        <div
          className="flex items-center justify-center w-full"
          data-aos="flip-up"
        >
          <div className="flex-grow h-[2px] bg-black"></div>
          <span className="px-2 font-cera font-bold text-xs">My List</span>
          <div className="flex-grow h-[2px] bg-black"></div>
        </div>
        <BtnAdd userId={user.id} />
        {!data && (
          <p className="-mb-2 mt-4" data-aos="zoom-in">
            You don't have any list
          </p>
        )}
        {data && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full">
            {data.map((d, i) => {
              return (
                <Card
                  key={i}
                  className="m-4 bg-white dark:bg-secondaryBlack"
                  data-aos="zoom-in"
                >
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white font-cera font-bold">
                      {d.title}
                    </CardTitle>
                    <CardDescription className="font-cera text-black dark:text-white">
                      <span className="flex-grow h-[2px] bg-black dark:bg-white w-full flex justify-center items-center my-1" />
                      {d.desc}
                      <span className="flex-grow h-[2px] bg-black dark:bg-white w-full flex justify-center items-center my-1" />
                      there are {d.list.length} links
                      <span className="flex-grow h-[2px] bg-black dark:bg-white w-full flex justify-center items-center my-1" />
                      {removePrefix(process.env.NEXT_PUBLIC_BASE_URL)}/{d.link}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="-mt-2 grid sm:grid-cols-3 justify-center gap-2 items-center">
                    <Link
                      href={`/${d.link}`}
                      target="_blank"
                      className={`w-full flex items-center justify-center gap-1 ${buttonVariants({ variant: "neutral", size: "sm" })}`}
                    >
                      <IoRocket /> Open
                    </Link>
                    <BtnEdit data={d} />
                    <BtnDelete data={d} />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
        <div
          className="flex items-center justify-center w-full my-2"
          data-aos="flip-up"
        >
          <div className="flex-grow h-[2px] bg-black"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2" data-aos="zoom-in">
          <Link
            href={"/"}
            className={`${buttonVariants()} flex gap-1 justify-center items-center`}
          >
            <IoHome />
            Home
          </Link>
          <BtnManageUser
            classes={`${buttonVariants()} flex gap-1 justify-center items-center`}
          >
            <IoSettings /> Edit Profile
          </BtnManageUser>
          <BtnLogout
            classes={`${buttonVariants()} flex gap-1 justify-center items-center`}
          >
            <IoLogOut /> Logout
          </BtnLogout>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
