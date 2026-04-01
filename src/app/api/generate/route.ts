import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, baseURL: "https://api.deepseek.com/v1" });

export async function POST(req: NextRequest) {
  try {
    const { theme, style, mood } = await req.json();
    const prompt = `Write an original, creative poem:\nTheme: ${theme || "Nature and change"}\nStyle: ${style || "Free verse"}\nMood: ${mood || "Contemplative"}\n\nCreate a vivid, emotionally resonant poem with strong imagery, rhythm, and meaning.`;
    const completion = await client.chat.completions.create({ model: "deepseek-chat", messages: [{ role: "user", content: prompt }], max_tokens: 1000, temperature: 0.9 });
    return NextResponse.json({ result: completion.choices[0]?.message?.content || "No output." });
  } catch (e) { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
