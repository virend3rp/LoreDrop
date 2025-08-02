// src/pages/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[var(--font-family-serif)] text-4xl md:text-5xl ">
          Our Mission
        </h1>
        <div className="w-1/3 border-b border-black/20 my-6"></div>
        <div className="space-y-6 text-lg/relaxed">
          <p>
            The Meme-seum of Modern Art <span className='text-red-600'>Lorepage</span> was established in 2025 as a premier institution dedicated to the study and preservation of internet culture. In an age of ephemeral media and fleeting digital trends, our collection serves as a vital archive of the folklore of our time.
          </p>
          <p>
            Our curators work tirelessly to identify, acquire, and analyze culturally significant digital artifacts. From the earliest image macros of the late 20th century to the complex, algorithm-driven humor of today, each piece is treated with the academic rigor it deserves.
          </p>
          <p>
            We believe that memes, in all their absurdity, are a powerful lens through which to view our collective history, politics, and social dynamics. This museum is for the digital archaeologists, the cultural anthropologists, and everyone who has ever said, "You have to see this."
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;