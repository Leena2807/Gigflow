import { useEffect, useState } from "react";
import api from "../api/api";

export default function GigDetail({ gig, onBack }) {
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState(gig.budget);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    api
      .get(`/api/bids/${gig._id}`)
      .then(res => setBids(res.data))
      .catch(console.error);
  }, [gig]);

  const submitBid = async () => {
    await api.post("/api/bids", {
      gigId: gig._id,
      message,
      price
    });
    alert("Bid submitted");
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Back */}
      <button
        onClick={onBack}
        className="text-sm font-medium text-indigo-600 hover:underline"
      >
        ← Back to Gigs
      </button>

      {/* Gig Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">
          {gig.title}
        </h1>

        <p className="text-slate-600 leading-relaxed">
          {gig.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-slate-500">Budget</span>
          <span className="text-2xl font-bold text-emerald-600">
            ₹{gig.budget}
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT: Bids */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4">
              Bids ({bids.length})
            </h3>

            <div className="space-y-4">
              {bids.map(b => (
                <div
                  key={b._id}
                  className="border rounded-xl p-4 space-y-2"
                >
                  <p className="text-slate-700 text-sm italic">
                    “{b.message}”
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-600">
                      ₹{b.price}
                    </span>
                    <span className="text-xs text-slate-500">
                      Status: {b.status}
                    </span>
                  </div>

                  {gig.status === "open" && b.status === "pending" && (
                    <button
                      onClick={async () => {
                        await api.patch(`/api/bids/${b._id}/hire`);
                        alert("Freelancer hired");
                        onBack();
                      }}
                      className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Hire
                    </button>
                  )}
                </div>
              ))}

              {bids.length === 0 && (
                <p className="text-sm text-slate-500">
                  No bids yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Submit Bid */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4">
              Submit a Bid
            </h3>

            <div className="space-y-3">
              <input
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Bid amount"
                type="number"
                             min={0}
              step={1}
                value={price}
                onChange={e => setPrice(e.target.value)}
              />

              <textarea
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Why should you be hired?"
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />

              <button
                onClick={submitBid}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
              >
                Submit Bid
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}