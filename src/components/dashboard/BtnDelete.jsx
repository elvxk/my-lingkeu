"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation"; // Impor useRouter
import { IoTrashBin } from "react-icons/io5";
import { Button } from "../ui/button";
import removePrefix from "@/utils/removePrefix";

const BtnDelete = ({ data }) => {
  const router = useRouter(); // Ambil instance router

  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ id: data.id }),
      },
    );

    if (response.ok) {
      // window.location.reload();
      router.refresh(); // Refresh halaman setelah penghapusan
    } else {
      // Handle error
      console.error("Failed to delete the link.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="neutral" size="sm" className="text-red-500">
          <IoTrashBin /> Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="-mb-2">
            <div className="flex flex-col mb-2">
              <IoTrashBin className="text-4xl self-center bg-red-500 rounded-full p-2 text-white sm:self-start mb-2" />
              {data.title}
              <br />
              <span className="text-xs font-light">
                {removePrefix(process.env.NEXT_PUBLIC_BASE_URL)}/{data.link}
              </span>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="text-red-600">
              Are you absolutely sure? This action cannot be undone. This will
              permanently delete your link and remove your link data from our
              servers.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BtnDelete;
