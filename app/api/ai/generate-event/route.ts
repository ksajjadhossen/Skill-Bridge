import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let promptText = "Community Initiative";
  try {
    const body = await req.json();
    promptText = body.prompt || "Community Initiative";

    const apiKey = process.env.GEMINI_API_KEY;

    // স্মার্ট ফলব্যাক জেনারেটর
    const generateFallback = (userPrompt: string) => {
      const lower = userPrompt.toLowerCase();
      let category = "Environment";
      if (
        lower.includes("tech") ||
        lower.includes("code") ||
        lower.includes("workshop")
      )
        category = "Tech & Skills";
      else if (
        lower.includes("health") ||
        lower.includes("blood") ||
        lower.includes("medical")
      )
        category = "Health";
      else if (
        lower.includes("teach") ||
        lower.includes("school") ||
        lower.includes("kids")
      )
        category = "Education";
      else if (
        lower.includes("social") ||
        lower.includes("charity") ||
        lower.includes("help")
      )
        category = "Social Welfare";

      return {
        title:
          userPrompt.length > 50 ? userPrompt.slice(0, 47) + "..." : userPrompt,
        category: category,
        location: "Central City Park, Dhaka",
        capacity: 30,
        description: `Join us for this impactful community event: "${userPrompt}". Volunteers will coordinate logistics, participant engagement, and on-site support to ensure massive success and positive community impact.`,
      };
    };

    if (!apiKey) {
      return NextResponse.json(generateFallback(promptText));
    }

    const systemInstruction = `You are an expert community event planner AI. Based on the user prompt: "${promptText}", generate a realistic event structure.
Respond ONLY with raw valid JSON, no markdown formatting, no code blocks, no backticks, no extra text.

JSON Format:
{
  "title": "A creative and engaging event title",
  "category": "Environment" | "Tech & Skills" | "Health" | "Education" | "Social Welfare",
  "location": "A realistic location in Dhaka",
  "capacity": 30,
  "description": "Write a detailed 3-4 sentence comprehensive description explaining the purpose, volunteer responsibilities, and impact of the event."
}`;

    // জেমিনির যেকোনো ফ্রি এপিআই কি এর জন্য জেনেরিক জেনারেটিভ মডেল এন্ডপয়েন্ট
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: systemInstruction }] }],
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      console.warn("API Error, falling back:", data?.error?.message);
      return NextResponse.json(generateFallback(promptText));
    }

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return NextResponse.json(generateFallback(promptText));
    }

    const cleanedJsonText = rawText
      .trim()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedData = JSON.parse(cleanedJsonText);
    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error("Critical Error, falling back:", error?.message);
    return NextResponse.json({
      title: promptText,
      category: "Environment",
      location: "Central City Park, Dhaka",
      capacity: 30,
      description: `Join us for this community event: "${promptText}". Volunteers will coordinate logistics and on-site support to ensure success.`,
    });
  }
}
