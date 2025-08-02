// src/pages/HomePage.jsx
import React from 'react';
import FeaturedExhibit from '../components/FeaturedExhibit';
import NewsletterSignup from '../components/NewsletterSignup'; // 1. Import the new component
import { artifacts } from '../data/artifacts.js';

const HomePage = () => {
  const featuredArtifact = artifacts[0]; 

  return (
    <div>
      <FeaturedExhibit artifact={featuredArtifact} />
      
      {/* Curator Section */}
      <div className="container mx-auto p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[var(--font-family-serif)] text-3xl">From the Curator</h2>
          <p className="mt-4 text-lg/relaxed">
            Welcome to the Meme-seum of Modern Art <span className='text-red-600'>LoreDrop</span>, a distinguished collection dedicated to the preservation and analysis of digital folklore. Our institution endeavors to chronicle the ephemeral, celebrate the absurd, and contextualize the chaos of internet culture for future generations.
          </p>
        </div>
      </div>

      {/* 2. Add the Newsletter component at the end */}
      <NewsletterSignup /> 
    </div>
  );
};

export default HomePage;