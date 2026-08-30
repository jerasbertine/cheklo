import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  const response = await fetch(`${process.env.BACKEND_URL}/api/subscriptions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status});
}

export async function POST(request: Request) {
  const token = (await cookies()).get("token")?.value;
  const body = await request.json();

  const response = await fetch(`${process.env.BACKEND_URL}/api/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}