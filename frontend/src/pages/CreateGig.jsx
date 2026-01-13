import { useState } from "react";
import api from "../api/api";

export default function CreateGig({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const submitGig = async () => {
    await api.post("/api/gigs", {
      title,
      description,
      budget: Number(budget),
    });

    // clear form
    setTitle("");
    setDescription("");
    setBudget("");

    // tell parent to go back / refresh
    onCreated();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">
            Create a New Gig
          </h2>
          <p className="text-sm text-slate-500">
            Fill in the details below to post your gig.
          </p>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600">
            Gig Title
          </label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Frontend UI Enhancement"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600">
            Description
          </label>
          <textarea
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe the work in detail..."
            rows={5}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        {/* Budget */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-600">
            Budget
          </label>
          <input
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter amount"
            type="number"
             min={0}
              step={1}
            value={budget}
            onChange={e => setBudget(e.target.value)}
          />
        </div>

        {/* Action */}
        <button
          onClick={submitGig}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md"
        >
          Post Gig
        </button>
      </div>
    </div>
  );
}