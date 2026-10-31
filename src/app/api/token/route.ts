import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET(): Promise<NextResponse> {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const secret: string | undefined = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "JWT secret is missing" },
      { status: 500 },
    );
  }

  const token: string = jwt.sign(
    { name: session.user.name, email: session.user.email },
    secret,
    { expiresIn: "1h" },
  );

  return NextResponse.json({ token });
}
