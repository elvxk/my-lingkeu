import { NextResponse } from "next/server";
import { addCorsHeaders } from "@/lib/cors";
import prisma from "@/lib/prisma";

const validateProjectData = (data) => {
  const errors = [];

  if (!data.title) {
    errors.push({ field: "title", message: "Title is required." });
  }
  if (!data.userId) {
    errors.push({ field: "userId", message: "User ID is required." });
  }
  if (!data.link) {
    errors.push({ field: "link", message: "Link is required." });
  }
  if (!data.list) {
    errors.push({ field: "list", message: "List is required." });
  }

  return errors;
};

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

  // Memeriksa apakah ID dan link ada dalam body
  const validationErrors = validateProjectData(request);

  if (validationErrors.length > 0) {
    const response = NextResponse.json(
      {
        code: 400,
        status: "error",
        message: "Some fields required in the request body.",
        errors: validationErrors,
      },
      { status: 400 },
    );
    addCorsHeaders(response);
    return response;
  }

  // Mencoba membuat data baru
  try {
    const newLink = await prisma.Link.create({
      data: {
        link: request.link,
        userId: request.userId,
        title: request.title,
        desc: request.desc || null,
        list: request.list,
      },
    });

    // Menyiapkan respons sukses
    const response = NextResponse.json(
      {
        code: 201,
        status: "success",
        message: "Link created successfully.",
        data: newLink,
      },
      { status: 201 },
    );

    addCorsHeaders(response);
    return response;
  } catch (error) {
    if (error.code === "P2002") {
      // Kode kesalahan Prisma untuk duplikat
      const response = NextResponse.json(
        {
          code: 400,
          status: "error",
          message: "Link must be unique. The provided link already exists.",
        },
        { status: 400 },
      );
      addCorsHeaders(response);
      return response;
    }

    console.error("Error creating link:", error);
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
