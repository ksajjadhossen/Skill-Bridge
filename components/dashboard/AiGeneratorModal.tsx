"use client";

import { useState } from "react";
import { Sparkles, X, Loader2 } from "lucide-react";

interface AiGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (data: {
    description: string;
    skills: string;
    promo: string;
  }) => void;
}

export default function AiGeneratorModal({
  isOpen,
  onClose,
  onApply,
}: AiGeneratorModalProps) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    description: string;
    skills: string;
    promo: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);

    // Simulated/Mocked Smart AI Response
    setTimeout(() => {
      setResult({
        description: `Join us for "${prompt}"! This initiative aims to drive community engagement, positive environmental impact, and teamwork. Volunteers will actively participate in logistics, on-site execution, and outreach activities.`,
        skills: "Teamwork, Leadership, First Aid, Logistics Support",
        promo:
          "🌱 Make a difference today! Join our upcoming community event and give back to society.",
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 dark:border-gray-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            AI Event Assistant
          </h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Brief Event Idea
            </label>
            <input
              type="text"
              placeholder="e.g. Tree plantation drive near Dhanmondi Lake"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Generate Details
          </button>

          {result && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl space-y-3 border border-blue-100 dark:border-blue-800">
              <div>
                <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                  Generated Description:
                </p>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                  {result.description}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-800 dark:text-blue-300">
                  Suggested Skills:
                </p>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                  {result.skills}
                </p>
              </div>
              <button
                onClick={() => {
                  onApply(result);
                  onClose();
                }}
                className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-medium text-xs rounded-lg transition"
              >
                Apply Generated Content
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
