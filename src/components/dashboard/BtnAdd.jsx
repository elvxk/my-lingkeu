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
import { IoAddCircle, IoTrashBin } from "react-icons/io5";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Impor useRouter
import removePrefix from "@/utils/removePrefix";
import Link from "next/link";

const BtnAdd = ({ userId }) => {
  const router = useRouter(); // Ambil instance router

  const [fields, setFields] = useState([{ name: "", link: "" }]);
  const [isOpen, setIsOpen] = useState(false);
  const [linkError, setLinkError] = useState(""); // State untuk menyimpan pesan error
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // Validasi apakah input hanya berisi huruf kecil dan angka
    if (/^[a-z0-9]*$/.test(value)) {
      setInputValue(value);
      setLinkError(""); // Hapus pesan error jika input sesuai
    } else {
      setLinkError(
        "Hanya diperbolehkan huruf kecil dan angka tanpa spasi atau simbol.",
      );
    }
  };

  // Fungsi untuk menangani perubahan input
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [name]: value }; // Perbarui field yang sesuai
    setFields(updatedFields);
  };

  const handleInputLinkChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...fields];

    // Cek apakah karakter yang dimasukkan adalah backspace
    if (event.key === "Backspace" || event.key === "Delete") {
      // Jika backspace atau delete ditekan, izinkan penghapusan
      updatedFields[index] = { ...updatedFields[index], [name]: value };
    } else {
      // Hanya izinkan huruf kecil dan angka, tanpa spasi
      const sanitizedValue = value.replace(/[^a-z0-9]/g, "");
      updatedFields[index] = {
        ...updatedFields[index],
        [name]: sanitizedValue,
      };
    }
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
      userId: userId,
      link: document.getElementById("link").value,
      title: document.getElementById("title").value,
      desc: document.getElementById("desc").value,
      list: fields,
    };

    // Reset error link sebelum memeriksa
    setLinkError("");

    // Langkah 1: Cek apakah link sudah ada di database
    try {
      const checkResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/check`, // Endpoint untuk memeriksa link
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ link: document.getElementById("link").value }), // Kirim link untuk diperiksa
        },
      );

      const checkResult = await checkResponse.json();

      if (checkResult.exist) {
        // Jika link sudah ada
        setLinkError("URL Link already exists"); // Set pesan error
        return; // Hentikan eksekusi lebih lanjut
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
      return; // Hentikan eksekusi jika terjadi kesalahan
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      router.refresh();
      setIsOpen(false);
      resetForm(); // Reset semua state
    }
  };

  // Fungsi untuk mereset state
  const resetForm = () => {
    setFields([{ name: "", link: "" }]);
    setLinkError("");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          resetForm(); // Reset semua state saat dialog ditutup
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="flex w-[98%] justify-center items-center gap-2"
          data-aos="zoom-in"
        >
          <IoAddCircle /> Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80vw] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
          <DialogDescription>
            Make new link to your site here. Open{" "}
            <Link
              target="_blank"
              className="underline text-main"
              href={"https://i.ibb.co.com/G3G8XHt/panduan.webp"}
            >
              this
            </Link>{" "}
            for help, or you can open the{" "}
            <Link
              target="_blank"
              className="underline text-main"
              href={
                "https://github.com/elvxk/my-lingkeu/?tab=readme-ov-file#readme"
              }
            >
              the documentation
            </Link>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid items-center gap-1">
            <Label htmlFor="link" className="self-start">
              Url Link
            </Label>
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                {removePrefix(process.env.NEXT_PUBLIC_BASE_URL)}/
              </span>
              <Input
                required
                id="link"
                placeholder="your_link"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            {linkError && (
              <span className="text-red-500 text-sm">{linkError}</span>
            )}
          </div>

          <div className="grid items-center gap-1">
            <Label htmlFor="title" className="self-start">
              Title
            </Label>
            <Input
              required
              id="title"
              placeholder="Title"
              className="col-span-3"
            />
          </div>

          <div className="grid items-center gap-1 mb-4">
            <Label htmlFor="desc" className="self-start">
              Description
            </Label>
            <Textarea
              id="desc"
              placeholder="Description"
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
                    placeholder="Instagram"
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
                    placeholder="https://example.com"
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
            <Button type="submit" disabled={Boolean(linkError)}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default BtnAdd;
