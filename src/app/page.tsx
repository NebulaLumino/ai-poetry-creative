"use client";
import { useState } from "react";

export default function PoetryPage() {
  const [theme, setTheme] = useState("");
  const [style, setStyle] = useState("Free verse");
  const [mood, setMood] = useState("Contemplative");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme, style, mood }),
    });
    const data = await res.json();
    setOutput(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-950 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-300 mb-2">AI Poetry Creative</h1>
        <p className="text-slate-400 mb-8">Generate original, evocative poetry in any style</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Theme</label>
              <input value={theme} onChange={e => setTheme(e.target.value)} placeholder="e.g., The passage of time, ocean storms..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500">
                {["Free verse","Sonnet","Haiku","Ode","Ballad","Villanelle","Limerick","Blank verse"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Mood</label>
              <select value={mood} onChange={e => setMood(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500">
                {["Contemplative","Joyful","Melancholic","Mysterious","Defiant","Nostalgic","Awed","Wistful"].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-amber-800 text-white font-semibold py-3 rounded-xl transition-colors">
              {loading ? "Composing..." : "Write Poem"}
            </button>
          </div>
          <div className="bg-slate-900/60 border border-amber-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-amber-300 mb-4">Your Poem</h2>
            {output ? (
              <div className="text-slate-200 text-sm whitespace-pre-wrap font-serif leading-loose max-h-[600px] overflow-y-auto">{output}</div>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64 italic">Your poem will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
