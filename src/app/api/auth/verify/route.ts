import TokenService from "@/classes/TokenService";
import AuthService from "@/classes/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email }: { email: string } = await req.json();
    console.log(email)

    const response = await AuthService.validateUser(email);

    if (response) return NextResponse.json({ success: true, data: response });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    }
  }
}
