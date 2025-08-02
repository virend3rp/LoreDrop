// src/components/ArtworkCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ArtworkCard = ({ artifact }) => {
  return (
    <Link to={`/exhibits/${artifact.id}`} className="block group border border-black/10 p-4 transition hover:shadow-lg hover:border-[var(--color-antique-gold)]">
      <div className="w-full aspect-square overflow-hidden mb-4">
        <img 
          src={artifact.image} 
          alt={artifact.title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title + Votes Inline */}
      <div className="flex items-start gap-3">
        {/* Reddit-style Vote Block */}
        <div className="flex flex-col items-center text-sm font-bold select-none">
          <span className="text-green-600 text-lg leading-none">▲</span>
          <span className="text-black text-xs">{artifact.upvotes - artifact.downvotes}</span>
          <span className="text-red-600 text-lg leading-none">▼</span>
        </div>

        <div>
          <h3 className="font-[var(--font-family-serif)] text-xl truncate">{artifact.title}</h3>
          <p className="text-sm opacity-60">{artifact.date}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;
