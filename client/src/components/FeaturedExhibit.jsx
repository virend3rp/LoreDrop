// src/components/FeaturedExhibitBadge.jsx
import React from "react";

const FeaturedExhibitBadge = ({ artifact }) => {
  if (!artifact) return null;

  return (
    <div className="inline-flex flex-col items-center p-4 border-4 border-black rounded-lg bg-white shadow-lg max-w-[200px]">
      {/* Small Image */}
      <img
        src={artifact.image_url}
        alt={artifact.title}
        className="w-24 h-24 object-cover border-2 border-black rounded-full mb-3"
      />

      {/* Label */}
      <span className="font-heading text-sm uppercase tracking-wide bg-yellow-300 border-2 border-black px-2 py-1 mb-2">
        ⭐ Exhibit of the Week
      </span>

      {/* Artifact Title */}
      <h3 className="font-heading comic-outline text-lg text-center leading-snug">
        {artifact.title}
      </h3>
    </div>
  );
};

export default FeaturedExhibitBadge;
