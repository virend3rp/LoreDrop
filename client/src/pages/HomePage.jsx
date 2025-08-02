// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import FeaturedExhibit from '../components/FeaturedExhibit';
import NewsletterSignup from '../components/NewsletterSignup';

const HomePage = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArtifacts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/artifacts`);
      const data = await res.json();
      setArtifacts(data);
    } catch (err) {
      console.error('Failed to fetch artifacts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, []);

  const exhibitOfTheWeek = artifacts.find((a) => a.isExhibit);

  return (
    <div>
      {exhibitOfTheWeek && <FeaturedExhibit artifact={exhibitOfTheWeek} />}
      
      {/* Curator Section */}
      <div className="container mx-auto p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[var(--font-family-serif)] text-3xl">From the Curator</h2>
          <p className="mt-4 text-lg/relaxed">
            Welcome to the Meme-seum of Modern Art <span className='text-red-600'>LoreDrop</span>, a distinguished collection dedicated to the preservation and analysis of digital folklore. Our institution endeavors to chronicle the ephemeral, celebrate the absurd, and contextualize the chaos of internet culture for future generations.
          </p>
        </div>
      </div>

      <NewsletterSignup />
    </div>
  );
};

export default HomePage;
