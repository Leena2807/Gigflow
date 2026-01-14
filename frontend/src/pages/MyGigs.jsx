import { useEffect, useState } from "react";
import api from "../api/api";

export default function MyGigs({ userId, onSelectGig }) {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api
      .get("/api/gigs/mine")
      .then(res => {
        // only gigs created by this user
        const mine = res.data.filter(g => g.ownerId === userId);
        setGigs(mine);
      })
      .catch(console.error);
  }, [userId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900">My Gigs</h1>
        <p className="text-sm text-slate-500">
          Gigs you have posted and their current status
        </p>
      </div>

      {/* Empty State */}
      {gigs.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-slate-500">
          You haven’t posted any gigs yet.
        </div>
      )}

      {/* Gig Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gigs.map(gig => (
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

              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  gig.status === "assigned"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {gig.status}
              </span>
            </div>

            <p className="text-sm text-slate-600 line-clamp-3">
              {gig.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-indigo-600">
                ₹{gig.budget}
              </span>

              <span className="text-sm text-indigo-600 font-medium">
                View →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}