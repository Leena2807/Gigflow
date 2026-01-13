import { useEffect, useState } from "react";
import api from "../api/api";

export default function GigFeed({ onSelectGig }) {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchGigs = async (query = "") => {
    try {
      const url = query
        ? `/api/gigs?search=${encodeURIComponent(query)}`
        : "/api/gigs";

      const res = await api.get(url);
      setGigs(res.data);
    } catch (err) {
      console.error(err);
    }
  };



  // search-triggered fetch
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchGigs(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Open Gigs</h1>
          <p className="text-sm text-slate-500">
            Browse available freelance opportunities
          </p>
        </div>

        <input
          type="text"
          placeholder="Search gigs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 border border-slate-300 rounded-lg px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Empty state */}
      {gigs.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-500">
          No gigs found.
        </div>
      )}

      {/* Gig cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            onClick={() => onSelectGig(gig)}
            className="bg-white border border-slate-200 rounded-2xl p-5 cursor-pointer
                       hover:shadow-md hover:border-indigo-200 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-semibold text-slate-900">
                {gig.title}
              </h2>
              <span className="text-indigo-600 font-bold">
                ₹{gig.budget}
              </span>
            </div>

            <p className="text-sm text-slate-600 line-clamp-3">
              {gig.description}
            </p>

            <div className="mt-4 text-sm text-indigo-600 font-medium">
              View Details →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}