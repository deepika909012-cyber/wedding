import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, email, service, package: pkg, message } = body;

    if (!name || !phone || !service || !pkg) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        service,
        package: pkg,
        message,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Booking saved successfully",
      data: booking,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: bookings,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
}
