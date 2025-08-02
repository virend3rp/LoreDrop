// src/pages/ExhibitsPage.jsx
import React, { useState, useEffect } from 'react';
import ArtworkCard from '../components/ArtworkCard';

const ExhibitsPage = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/artifacts');
        if (!response.ok) throw new Error('Data could not be fetched.');
        const data = await response.json();
        setArtifacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtifacts();
  }, []);

  if (loading) return <div className="text-center p-10">Loading Collection...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6 md:p-8">
      <h1 className="font-[var(--font-family-serif)] text-4xl md:text-5xl border-b border-black/10 pb-4 mb-8">
        The Collection
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artifacts.map((artifact) => (
          <ArtworkCard
            key={artifact.id}
            artifact={{
              ...artifact,
              image: artifact.image_url, // normalize key
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ExhibitsPage;
