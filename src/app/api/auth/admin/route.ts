import AuthService from "@/classes/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { completeName, email, password } = await req.json();

    if (!completeName) throw new Error("Complete Name is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const response = await AuthService.createUserAdmin(
      completeName,
      email,
      password
    ).catch((error) => {
      throw new Error(error.message);
    });
    console.log(response);

    if (response) return NextResponse.json({ success: true, data: response });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
