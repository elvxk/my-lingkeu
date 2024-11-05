import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const PageLink = async ({ params }) => {
  const { link } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getlink`,
    {
      method: "POST",
      body: JSON.stringify({ link: link }),
    },
  );
  const { data } = await response.json();

  return (
    <div className="container mx-auto my-5">
      <div className="flex flex-col justify-center items-center min-h-[80vh] mx-5">
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
        {!data ? (
          <div className="mt-2 mb-4" data-aos="fade-down">
            <h1 className="font-cera text-2xl md:text-3xl font-bold text-center">
              404 Not Found
            </h1>
          </div>
        ) : (
          <>
            <div className="mt-2 mb-4" data-aos="fade-down">
              <h1 className="font-cera text-2xl md:text-3xl font-bold text-center">
                {data.title}
              </h1>
              <h1 className="text-center text-sm md:text-lg font-cera font-bold">
                {data.desc}
              </h1>
            </div>
            {data.list.map((list, i) => {
              return (
                <div
                  key={i}
                  className="w-full my-2 md:my-3 flex justify-center"
                  data-aos="zoom-in"
                >
                  <Link
                    href={list.link}
                    target="_blank"
                    className="w-full max-w-screen-md"
                  >
                    <Button className="w-full whitespace-normal h-auto py-2 font-cera font-light text-lg md:text-xl">
                      {list.name}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </>
        )}
        <Link
          data-aos="fade-up"
          href={"/dashboard"}
          className="mt-6 text-center font-cera hover:underline text-secondaryBlack dark:text-slate-300"
        >
          click here to create your own lingkeu
        </Link>
      </div>{" "}
    </div>
  );
};
export default PageLink;
