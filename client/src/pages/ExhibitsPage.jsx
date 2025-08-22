// src/pages/ExhibitsPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { ExhibitCardRetro, ExhibitGrid } from "../components/ExhibitCardRetro";
import SiteBackground from "@/components/SiteBackground";

const ExhibitsPage = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Map API rows -> card-friendly objects
  const normalized = useMemo(() => {
    return artifacts.map(a => ({
      id: a.id,
      title: a.title,
      image: a.image_url,
      year: a.origin_date,          // string in your schema
      platform: a.medium || a.artist, // no platform column; show medium/artist to add context
      tags: [],                     // you don't have tags yet (can derive later)
      votes: (a.upvotes ?? 0) - (a.downvotes ?? 0),
      snippet: a.notes_origin || a.notes_impact || "",
      slug: String(a.id),           // detail route by id for now
      raw: a,
    }));
  }, [artifacts]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/artifacts`);
        if (!res.ok) throw new Error("Data could not be fetched.");
        const data = await res.json();
        setArtifacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArtifacts();
  }, [API_BASE_URL]);

  // --- Voting handlers (optimistic) ---
  const updateRow = (id, patch) =>
    setArtifacts(prev => prev.map(r => (r.id === id ? { ...r, ...patch } : r)));

  const upvote = async (id) => {
    // optimistic UI: bump upvotes right away
    const row = artifacts.find(a => a.id === id);
    updateRow(id, { upvotes: (row?.upvotes ?? 0) + 1 });
    try {
      const res = await fetch(`${API_BASE_URL}/api/artifacts/${id}/upvote`, { method: "POST" });
      if (!res.ok) throw new Error("Upvote failed");
      const { upvotes } = await res.json();
      updateRow(id, { upvotes });
    } catch {
      // rollback if failed
      updateRow(id, { upvotes: (row?.upvotes ?? 0) });
    }
  };

  const downvote = async (id) => {
    const row = artifacts.find(a => a.id === id);
    updateRow(id, { downvotes: (row?.downvotes ?? 0) + 1 });
    try {
      const res = await fetch(`${API_BASE_URL}/api/artifacts/${id}/downvote`, { method: "POST" });
      if (!res.ok) throw new Error("Downvote failed");
      const { downvotes } = await res.json();
      updateRow(id, { downvotes });
    } catch {
      updateRow(id, { downvotes: (row?.downvotes ?? 0) });
    }
  };

  if (loading) return <div className="text-center p-10">Loading Collection...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <SiteBackground>
    <div className="container mx-auto p-6 md:p-8">
      <h1 className="font-[var(--font-family-serif)] text-4xl md:text-5xl border-b border-black/10 pb-4 mb-8">
        The Collection
      </h1>

      <ExhibitGrid>
        {normalized.map(a => (
          <ExhibitCardRetro
            key={a.id}
            artifact={a}
            onUpvote={upvote}
            onDownvote={downvote}
            hrefBuilder={(art) => `/lore/${art.slug}`} // route by id for now
          />
        ))}
      </ExhibitGrid>
    </div>
    </SiteBackground>
  );
};

export default ExhibitsPage;
