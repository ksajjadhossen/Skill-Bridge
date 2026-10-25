"use client";

import { useState } from "react";
import { Sparkles, Loader2, Trash2 } from "lucide-react";

export default function AiEventFormAssistant({
  onApplyData,
}: {
  onApplyData: (data: {
    title: string;
    description: string;
    category: string;
    location: string;
    capacity: number;
  }) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAiGenerate = async () => {
    if (!prompt) return;
    setLoading(true);

    // Mocked AI Response simulating smart generation based on prompt
    setTimeout(() => {
      onApplyData({
        title: `Community Initiative: ${prompt}`,
        description: `This is an AI-generated comprehensive plan for "${prompt}". Volunteers will coordinate logistics, participant engagement, and on-site support to ensure massive success.`,
        category: "Environment",
        location: "Central City Park, Dhaka",
        capacity: 25,
      });
      setLoading(false);
      setPrompt("");
    }, 1000);
  };

  return (
    <div className="bg-linear-to-r from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 p-5 rounded-2xl border border-teal-100 dark:border-teal-900 mb-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2 text-teal-700 dark:text-teal-300 font-semibold text-sm">
        <Sparkles className="w-4 h-4" />
        <span>AI Event Assistant Prompt Box</span>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        Type a short idea (e.g., &quot;A free medical camp in Uttara&quot;) and
        let AI fill out the form for you!
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="What kind of event do you want to create?"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-100"
        />
        <button
          type="button"
          onClick={handleAiGenerate}
          disabled={loading || !prompt}
          className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm rounded-xl flex items-center gap-2 transition disabled:opacity-50 cursor-pointer shrink-0"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Generate
        </button>
      </div>
    </div>
  );
}
