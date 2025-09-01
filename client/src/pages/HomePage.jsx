// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import FeaturedExhibitBadge from '../components/FeaturedExhibit'; // ✅ import the new badge
import NewsletterSignup from '../components/NewsletterSignup';

const HomePage = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/artifacts`);
        const data = await res.json();
        setArtifacts(data);
      } catch (err) {
        console.error('Failed to fetch artifacts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtifacts();
  }, []);

  const exhibitOfTheWeek = artifacts.find((a) => a.is_featured);

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 text-center">
      {exhibitOfTheWeek && (
        <div className="mb-8 flex justify-center">
          <FeaturedExhibitBadge artifact={exhibitOfTheWeek} />
        </div>
      )}

      {/* Curator Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="font-heading text-3xl">From the Curator</h2>
        <p className="mt-4 text-lg/relaxed">
          Welcome to the Meme-seum of Modern Art{" "}
          <span className="text-red-600">LoreDrop</span>, a distinguished collection dedicated
          to the preservation and analysis of digital folklore. Our institution endeavors to
          chronicle the ephemeral, celebrate the absurd, and contextualize the chaos of internet
          culture for future generations.
        </p>
      </div>

      <NewsletterSignup />
    </div>
  );
};

export default HomePage;
