import { NextRequest, NextResponse } from 'next/server';

interface BookingRequest {
  name: string;
  phone: string;
  email: string;
  service: string;
  package: string;
  message: string;
}

interface Booking extends BookingRequest {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage for demo (replace with database)
const bookings: Booking[] = [];

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    // Validate required fields
    const { name, phone, email, service, packageType: pkg, message } = body;

    if (!name || !phone || !email || !service || !body.package || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { message: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Create booking object
    const booking: Booking = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      service,
      package: body.package,
      message,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // TODO: Save to database using Prisma
    // const booking = await prisma.booking.create({
    //   data: {
    //     name,
    //     phone,
    //     email,
    //     service,
    //     package: packageValue,
    //     message,
    //     status: 'pending',
    //   },
    // });

    // For demo purposes, store in memory
    bookings.push(booking);

    console.log('Booking created:', booking);

    return NextResponse.json(
      {
        message: 'Booking submitted successfully',
        booking: {
          id: booking.id,
          name: booking.name,
          email: booking.email,
          service: booking.service,
          package: booking.package,
          status: booking.status,
          createdAt: booking.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { message: 'Failed to process booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // TODO: Fetch from database using Prisma
    // const bookings = await prisma.booking.findMany({
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });

    return NextResponse.json(
      {
        message: 'Bookings retrieved successfully',
        bookings: bookings,
        total: bookings.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
