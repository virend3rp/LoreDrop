// src/pages/ArtworkDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteLoading, setVoteLoading] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const fetchArtifact = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/artifacts/${id}`);
      if (!response.ok) throw new Error(`Artifact with ID ${id} not found.`);
      const data = await response.json();
      setArtifact(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (type) => {
    if (!artifact) return;

    const endpoint = `${API_BASE_URL}/api/artifacts/${artifact.id}/${
      type === "up" ? "upvote" : "downvote"
    }`;
    try {
      setVoteLoading(true);
      const res = await fetch(endpoint, { method: "POST" });
      const data = await res.json();

      if (type === "up") {
        setUpvotes(data.upvotes);
      } else {
        setDownvotes(data.downvotes);
      }
    } catch (err) {
      console.error("Voting error:", err);
    } finally {
      setVoteLoading(false);
    }
  };

  useEffect(() => {
    fetchArtifact();
  }, [id]);

  useEffect(() => {
    if (artifact) {
      setUpvotes(artifact.upvotes || 0);
      setDownvotes(artifact.downvotes || 0);
    }
  }, [artifact]);

  if (loading) return <div className="text-center p-10">Loading Artifact...</div>;

  if (error) {
    return (
      <div className="text-center p-10">
        <h1 className="font-heading text-3xl text-red-500">Error: {error}</h1>
        <Link
          to="/exhibits"
          className="mt-4 inline-block border-2 border-black px-4 py-2 bg-yellow-300 font-heading"
        >
          ← Return to The Collection
        </Link>
      </div>
    );
  }

  if (!artifact) return null;

  return (
    <div className="container mx-auto p-6 md:p-8">
      {/* Full Comic Trading Card */}
      <div className="border-8 border-black rounded-xl bg-white shadow-[10px_10px_0px_#000] overflow-hidden max-w-5xl mx-auto">
        {/* Image */}
        <div className="w-full border-b-8 border-black">
          <img
            src={artifact.image_url}
            alt={artifact.title}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title + Votes */}
          <div className="flex items-start justify-between gap-4">
            <h1 className="comic-outline font-heading text-4xl md:text-5xl flex-1">
              {artifact.title}
            </h1>
            <div className="flex flex-col items-center text-xl font-bold select-none">
              <button
                onClick={() => handleVote("up")}
                disabled={voteLoading}
                className="text-green-600 hover:scale-110 transition"
              >
                ▲
              </button>
              <span className="text-black text-sm">
                {upvotes - downvotes}
              </span>
              <button
                onClick={() => handleVote("down")}
                disabled={voteLoading}
                className="text-red-600 hover:scale-110 transition"
              >
                ▼
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-6 text-lg opacity-80 space-y-2">
            <p>
              <strong>Artist:</strong> {artifact.artist}
            </p>
            <p>
              <strong>Date:</strong> {artifact.origin_date}
            </p>
            <p>
              <strong>Medium:</strong> {artifact.medium}
            </p>
          </div>

          <div className="w-1/3 border-b-4 border-black my-8"></div>

          {/* Curator's Notes */}
          <h2 className="font-heading text-2xl mb-4">Curator's Notes</h2>
          <div className="space-y-6">
            {artifact.notes_origin && (
              <p className="speech-bubble">{artifact.notes_origin}</p>
            )}
            {artifact.notes_impact && (
              <p className="speech-bubble">{artifact.notes_impact}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
