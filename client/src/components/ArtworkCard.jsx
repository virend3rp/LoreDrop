// src/components/ArtworkCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ArtworkCard = ({ artifact }) => {
  return (
    <Link
      to={`/exhibits/${artifact.id}`}
      className="
        group 
        border-4 border-black rounded-lg overflow-hidden bg-white 
        transform transition-transform hover:-translate-y-2 hover:shadow-[6px_6px_0px_#000]
        flex flex-col
      "
    >
      {/* Image */}
      <div className="w-full aspect-square overflow-hidden border-b-4 border-black">
        <img
          src={artifact.image}
          alt={artifact.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Title + Date */}
        <div>
          <h3 className="comic-outline font-heading text-xl mb-1 truncate">
            {artifact.title}
          </h3>
          <p className="curator-script text-sm opacity-80">{artifact.date}</p>
        </div>

        {/* Votes */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xl font-heading">
          <div className="flex flex-col items-center select-none">
            <span className="text-green-600 text-lg leading-none">▲</span>
            <span className="text-black text-sm">
              {(artifact.upvotes || 0) - (artifact.downvotes || 0)}
            </span>
            <span className="text-red-600 text-lg leading-none">▼</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArtworkCard;
