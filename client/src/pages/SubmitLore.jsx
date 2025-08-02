import React from 'react';

export default function SubmitLore() {
  return (
    <main className="px-6 py-12 max-w-2xl mx-auto">
      <h2 className="text-3xl font-pixel text-plum mb-6">📮 Submit New Lore</h2>
      <form className="space-y-4 text-sm font-mono">
        <input placeholder="Title" className="w-full px-4 py-2 border border-border" />
        <input placeholder="Year" className="w-full px-4 py-2 border border-border" />
        <input placeholder="Tags (comma separated)" className="w-full px-4 py-2 border border-border" />
        <input placeholder="Source Link (optional)" className="w-full px-4 py-2 border border-border" />
        <textarea placeholder="Full story..." rows="6" className="w-full px-4 py-2 border border-border" />
        
        {/* Fake Drag & Drop */}
        <div className="border-2 border-dashed border-border py-10 text-center text-xs text-pink-600">
          Drag & drop image/GIF here (mock)
        </div>

        <button type="submit" className="bg-plum text-white px-4 py-2 font-pixel">Submit</button>
      </form>
    </main>
  );
}
