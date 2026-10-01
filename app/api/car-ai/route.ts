import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { action, car, query } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    if (action === "insights") {
      const prompt = `Provide a concise 3-bullet point executive summary and rental advice for a ${car.year} ${car.make} ${car.model} (${car.fuel_type}, ${car.city_mpg} MPG city, ${car.drive} drive). Highlight best use cases, driving comfort, and value for money. Keep it clear, engaging, and professional.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      return NextResponse.json({ result: response.text });
    }

    if (action === "search_recommendations") {
      const prompt = `You are an AI car concierge for a rental application. The user asks: "${query}".
Given this query, recommend the best car features and pick 2 top car categories or makes to look for. Respond in a friendly, helpful 2-sentence summary.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      return NextResponse.json({ result: response.text });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to call Gemini API" },
      { status: 500 }
    );
  }
}
