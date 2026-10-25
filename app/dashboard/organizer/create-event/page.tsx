"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Calendar,
  MapPin,
  Tag,
  Users,
  FileText,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import AiEventFormAssistant from "@/components/dashboard/AiEventFormAssistant";
import { createEventAction } from "@/app/actions/eventActions";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Environment");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState(20);
  const [date, setDate] = useState("");

  const handleAiApply = (data: {
    title: string;
    description: string;
    category: string;
    location: string;
    capacity: number;
  }) => {
    setTitle(data.title);
    setDescription(data.description);
    setCategory(data.category);
    setLocation(data.location);
    setCapacity(data.capacity);
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setCategory("Environment");
    setLocation("");
    setCapacity(20);
    setDate("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createEventAction({
      title,
      description,
      category,
      location,
      maxCapacity: capacity,
      date,
    });

    setLoading(false);

    if (res.success) {
      router.push("/dashboard/organizer");
    } else {
      alert("Failed to create event. Please check inputs.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400 mb-6 transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Create New Event
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            Publish community opportunities manually or use AI to generate
            details.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:hover:bg-red-950/50 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Form
        </button>
      </div>

      <AiEventFormAssistant onApplyData={handleAiApply} />

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Event Title
          </label>
          <input
            type="text"
            required
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-100"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-100 cursor-pointer"
            >
              <option value="Environment">Environment</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Social Welfare">Social Welfare</option>
              <option value="Tech & Skills">Tech & Skills</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Event Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              required
              placeholder="Event location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Volunteer Capacity
            </label>
            <input
              type="number"
              min={1}
              required
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description & Requirements
          </label>
          <textarea
            rows={4}
            required
            placeholder="Describe the event details and what volunteers will do..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-semibold rounded-2xl shadow-lg shadow-teal-500/20 transition cursor-pointer disabled:opacity-50"
        >
          {loading ? "Publishing Event..." : "Publish Event"}
        </button>
      </form>
    </div>
  );
}
