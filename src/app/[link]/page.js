import { buttonVariants } from "@/components/ui/button";
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
  if (!data) return <h1>No Data</h1>;

  return (
    <div>
      <h1 className="font-cera text-2xl">{data.title}</h1>
      <h1>{data.desc}</h1>
      {data.list.map((list, i) => {
        return (
          <div key={i}>
            <Link
              href={list.link}
              target="_blank"
              className={`${buttonVariants()}`}
            >
              {list.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default PageLink;
