// src/pages/ArtworkDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

    const endpoint = `${API_BASE_URL}/api/artifacts/${artifact.id}/${type === 'up' ? 'upvote' : 'downvote'}`;
    try {
      setVoteLoading(true);
      const res = await fetch(endpoint, { method: 'POST' });
      const data = await res.json();

      if (type === 'up') {
        setUpvotes(data.upvotes);
      } else {
        setDownvotes(data.downvotes);
      }
    } catch (err) {
      console.error('Voting error:', err);
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
        <h1 className="font-[var(--font-family-serif)] text-3xl text-red-500">Error: {error}</h1>
        <Link to="/exhibits" className="text-[var(--color-antique-gold)] mt-4 inline-block">
          &larr; Return to The Collection
        </Link>
      </div>
    );
  }

  if (!artifact) return null;

  return (
    <div className="container mx-auto p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Left: Image */}
        <div className="w-full">
          <img
            src={artifact.image_url}
            alt={artifact.title}
            className="w-full h-auto object-contain border border-black/10"
          />
        </div>

        {/* Right: Details */}
        <div>
          <div className="flex items-start gap-4">
            <h1 className="font-[var(--font-family-serif)] text-4xl md:text-5xl flex-1">
              {artifact.title}
            </h1>
            <div className="flex flex-col items-center text-xl font-bold select-none mt-1">
              <button
                onClick={() => handleVote('up')}
                disabled={voteLoading}
                className="text-green-600 hover:scale-110 transition"
              >
                ▲
              </button>
              <span className="text-black text-sm">{upvotes - downvotes}</span>
              <button
                onClick={() => handleVote('down')}
                disabled={voteLoading}
                className="text-red-600 hover:scale-110 transition"
              >
                ▼
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-4 text-lg opacity-70">
            <p><strong>Artist:</strong> {artifact.artist}</p>
            <p><strong>Date:</strong> {artifact.origin_date}</p>
            <p><strong>Medium:</strong> {artifact.medium}</p>
          </div>

          <div className="w-1/4 border-b border-black/20 my-8"></div>

          {/* Curator's Notes */}
          <h2 className="font-[var(--font-family-serif)] text-2xl">Curator's Notes</h2>
          <div className="mt-4 space-y-4 text-lg/relaxed">
            <h3 className="font-bold">I. Origin</h3>
            <p>{artifact.notes_origin}</p>
            <h3 className="font-bold mt-4">II. Cultural Impact</h3>
            <p>{artifact.notes_impact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
