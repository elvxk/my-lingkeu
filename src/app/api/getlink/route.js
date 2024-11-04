import { NextResponse } from "next/server";
import { addCorsHeaders } from "@/lib/cors";
import prisma from "@/lib/prisma";

export async function POST(req) {
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
  if (!request.link) {
    const response = NextResponse.json(
      {
        code: 400,
        status: "error",
        message: "Link is required in the request body.",
      },
      { status: 400 },
    );
    addCorsHeaders(response);
    return response;
  }

  // Mencoba mengambil data berdasarkan ID
  const list = await prisma.Link.findFirst({
    where: {
      link: request.link,
    },
  });

  // Memeriksa apakah data ditemukan
  if (!list || list.length === 0) {
    const response = NextResponse.json(
      {
        code: 404,
        status: "error",
        message: "No list found for the provided ID.",
      },
      { status: 404 },
    );
    addCorsHeaders(response);
    return response;
  }

  // Menyiapkan respons
  const response = NextResponse.json(
    {
      code: 200,
      status: "success",
      message: "success get " + list.length + " list",
      data: list,
    },
    { status: 200 },
  );

  addCorsHeaders(response);
  return response;
}
