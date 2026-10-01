import { NextRequest, NextResponse } from "next/server";
import { getCarsFromStorage, saveCarToStorage, deleteCarFromStorage } from "@/lib/mongodb";

export async function GET() {
  try {
    const cars = await getCarsFromStorage();
    return NextResponse.json({ success: true, data: cars });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to retrieve vehicles" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const carData = await req.json();
    if (!carData.make || !carData.model) {
      return NextResponse.json({ success: false, error: "Make and model are required" }, { status: 400 });
    }

    const savedCar = await saveCarToStorage(carData);
    return NextResponse.json({ success: true, data: savedCar });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save vehicle" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Vehicle id is required" }, { status: 400 });
    }

    await deleteCarFromStorage(id);
    return NextResponse.json({ success: true, message: "Vehicle deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete vehicle" }, { status: 500 });
  }
}
