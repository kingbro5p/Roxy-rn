import { NextResponse } from "next/server";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_INSTRUCTION = {
  role: "user",
  parts: [
    {
      text: "You are Roxy, a warm, sharp, and concise AI companion. You explain things clearly, use plain language, and avoid unnecessary filler. When helpful, use short paragraphs, bullet points, or code blocks.",
    },
  ],
};

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not configured on the server. Add it in your Vercel project's Environment Variables (or .env.local for local dev), then redeploy.",
        },
        { status: 500 }
      );
    }

    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 }
      );
    }

    // Convert our simple {role, text} history into Gemini's `contents` format.
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          role: "system",
          parts: SYSTEM_INSTRUCTION.parts,
        },
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const message =
        data?.error?.message || "Gemini API request failed. Check your API key and model name.";
      return NextResponse.json({ error: message }, { status: res.status });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") ||
      "";

    if (!text) {
      const blockReason = data?.promptFeedback?.blockReason;
      return NextResponse.json(
        {
          error: blockReason
            ? `Roxy couldn't respond to that (reason: ${blockReason}). Try rephrasing.`
            : "Roxy didn't return a response. Please try again.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ text });
  } catch (err) {
    console.error("Roxy chat error:", err);
    return NextResponse.json(
      { error: "Something went wrong talking to Roxy. Please try again." },
      { status: 500 }
    );
  }
}
