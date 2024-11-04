import { NextResponse } from "next/server";
import { addCorsHeaders } from "@/lib/cors";
import prisma from "@/lib/prisma";

export async function DELETE(req) {
  // Mengambil dan memeriksa body request
  let request;
  try {
    request = await req.json();
  } catch (error) {
    const response = NextResponse.json(
      {
        code: 400,
        status: "error",
        message: "Request body is missing or invalid.",
      },
      { status: 400 },
    );
    addCorsHeaders(response);
    return response;
  }

  // Memeriksa apakah ID ada dalam body
  if (!request.id) {
    const response = NextResponse.json(
      {
        code: 400,
        status: "error",
        message: "ID is required in the request body.",
      },
      { status: 400 },
    );
    addCorsHeaders(response);
    return response;
  }

  // Mencoba menghapus data berdasarkan ID
  try {
    await prisma.link.delete({
      where: {
        id: request.id,
      },
    });

    // Menyiapkan respons sukses
    const response = NextResponse.json(
      {
        code: 200,
        status: "success",
        message: "Link deleted successfully.",
      },
      { status: 200 },
    );

    addCorsHeaders(response);
    return response;
  } catch (error) {
    // Menangani kesalahan jika data tidak ditemukan
    if (error.code === "P2025") {
      // Kode kesalahan Prisma untuk entitas tidak ditemukan
      const response = NextResponse.json(
        {
          code: 404,
          status: "error",
          message: "No link found for the provided ID.",
        },
        { status: 404 },
      );
      addCorsHeaders(response);
      return response;
    }

    console.error("Error deleting link:", error);
    const response = NextResponse.json(
      {
        code: 500,
        status: "error",
        message: "Internal Server Error",
      },
      { status: 500 },
    );
    addCorsHeaders(response);
    return response;
  }
}
