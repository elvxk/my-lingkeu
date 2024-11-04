"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoConstruct, IoTrashBin } from "react-icons/io5";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Impor useRouter
import removePrefix from "@/utils/removePrefix";

const BtnEdit = ({ data }) => {
  const router = useRouter(); // Ambil instance router

  const [fields, setFields] = useState(data.list);
  const [isOpen, setIsOpen] = useState(false);

  // Effect untuk mengupdate fields saat dialog dibuka
  useEffect(() => {
    if (isOpen) {
      setFields(data.list); // Reset fields saat dialog dibuka
    }
  }, [isOpen, data.list]);

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [name]: value }; // Perbarui field yang sesuai
    setFields(updatedFields);
  };

  // Fungsi untuk menambahkan field baru
  const addField = () => {
    setFields([...fields, { name: "", link: "" }]);
  };

  // Fungsi untuk menghapus field
  const removeField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman secara default

    // Mengumpulkan data untuk dikirim ke API
    const payload = {
      id: data.id,
      title: document.getElementById("title").value,
      desc: document.getElementById("desc").value,
      list: fields,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/update`,
        {
          method: "PUT", // Menggunakan metode PUT untuk pembaruan
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Mengubah payload menjadi JSON
        },
      );

      if (response.ok) {
        // Jika respons dari server sukses, reload halaman
        // window.location.reload();
        router.refresh();
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Failed to update:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="neutral"
          size="sm"
          className="w-full flex items-center justify-center gap-1"
        >
          <IoConstruct /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Edit Link for{" "}
            <span className="font-medium bg-main">
              [{removePrefix(process.env.NEXT_PUBLIC_BASE_URL)}/{data.link}]
            </span>
          </DialogTitle>
          <DialogDescription>
            Make changes to your link here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid items-center gap-1">
            <Label htmlFor="title" className="self-start">
              Title
            </Label>
            <Input
              required
              id="title"
              defaultValue={data.title}
              className="col-span-3"
            />
          </div>

          <div className="grid items-center gap-1 mb-4">
            <Label htmlFor="desc" className="self-start">
              Description
            </Label>
            <Textarea
              id="desc"
              defaultValue={data.desc}
              className="col-span-3"
            />
          </div>
          {fields.map((field, index) => {
            return (
              <div key={index} className="flex gap-2 w-full">
                <div className="grid items-center w-full gap-1">
                  <Label htmlFor={`name ${index}`} className="self-start">
                    Name
                  </Label>
                  <Input
                    required
                    id={`name-${index}`}
                    name="name" // Pastikan nama input terdefinisi
                    value={field.name} // Gunakan value dari state
                    className="col-span-3"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
                <div className="grid items-center w-full gap-1">
                  <Label htmlFor={`name ${index}`} className="self-start">
                    Link
                  </Label>
                  <Input
                    required
                    id={`link-${index}`}
                    name="link" // Pastikan nama input terdefinisi
                    value={field.link} // Gunakan value dari state
                    className="col-span-3"
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
                <Button
                  onClick={() => removeField(index)}
                  variant="neutralass"
                  size="sm"
                  className="self-end mb-1 text-red-600 text-lg hover:scale-110 transition-all"
                >
                  <IoTrashBin />
                </Button>
              </div>
            );
          })}
          <div className="">
            <Button onClick={addField} variant="neutral" className="">
              Add Field +
            </Button>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default BtnEdit;
