import { NextRequest, NextResponse } from "next/server";
import { getBookingsFromStorage, saveBookingToStorage, updateBookingStatusInStorage } from "@/lib/mongodb";

export async function GET() {
  try {
    const bookings = await getBookingsFromStorage();
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to retrieve bookings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const bookingData = await req.json();
    const newBooking = {
      ...bookingData,
      id: bookingData.id || `BK-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: bookingData.status || "Confirmed",
    };

    const saved = await saveBookingToStorage(newBooking);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save booking" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Booking ID and status are required" }, { status: 400 });
    }

    await updateBookingStatusInStorage(id, status);
    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update status" }, { status: 500 });
  }
}
