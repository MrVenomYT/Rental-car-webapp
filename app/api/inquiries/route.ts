import { NextRequest, NextResponse } from "next/server";
import { getInquiriesFromStorage, saveInquiryToStorage } from "@/lib/mongodb";

export async function GET() {
  try {
    const inquiries = await getInquiriesFromStorage();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to retrieve inquiries" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const inquiryData = await req.json();
    const newInquiry = {
      ...inquiryData,
      id: inquiryData.id || `INQ-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: "New",
    };

    const saved = await saveInquiryToStorage(newInquiry);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to save inquiry" }, { status: 500 });
  }
}
