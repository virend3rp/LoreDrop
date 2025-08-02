// src/pages/SubmitPage.jsx
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import FormInput from '../components/FormInput';

const SubmitPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    date: '',
    medium: '',
    image_url: '',
    notes_origin: '',
    notes_impact: '',
  });

  const [imageValid, setImageValid] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === 'image_url') {
      validateImage(value);
    }
  };

  const validateImage = (url) => {
    if (!url) {
      setImageValid(true);
      return;
    }

    const img = new Image();
    img.onload = () => setImageValid(true);
    img.onerror = () => setImageValid(false);
    img.src = url;
  };

  const isValidImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading('Validating image...');

    const isValid = await isValidImageUrl(formData.image_url);
    if (!isValid) {
      toast.dismiss();
      toast.error('❌ Invalid image URL. Please check the link.');
      return;
    }

    toast.dismiss();
    toast.loading('Submitting...');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/artifacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Form submission failed');

      await response.json();
      toast.dismiss();
      toast.success('Proposal submitted successfully! ✅');

      setFormData({
        title: '',
        artist: '',
        date: '',
        medium: '',
        image_url: '',
        notes_origin: '',
        notes_impact: '',
      });
      setImageValid(true);
    } catch (err) {
      console.error(err);
      toast.dismiss();
      toast.error('Error submitting proposal ❌');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[var(--font-family-serif)] text-4xl md:text-5xl">
          Propose an Acquisition
        </h1>
        <p className="mt-4 text-lg text-black/60">
          Provide the following documentation for our curators to review.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 p-4 mb-8 rounded-md shadow-sm">
          <h2 className="text-lg font-semibold mb-1">📝 Submission Guidelines</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>
              Make sure the <strong>Image URL</strong> is a direct link (ends in .jpg, .png, etc.).
            </li>
            <li>
              Keep <strong>title</strong> and <strong>artist</strong> accurate, even if approximate.
            </li>
            <li>
              Use <strong>Origin Story</strong> to describe how this artifact came to be or where it first appeared online.
            </li>
            <li>
              Use <strong>Cultural Impact</strong> to explain why it matters — who used it, how it spread, what it symbolizes.
            </li>
            <li>
              No copyrighted or offensive material unless it's clearly for historical/critical documentation.
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <FormInput
            label="Artifact Title"
            id="title"
            type="text"
            placeholder='"Distracted Boyfriend"'
            value={formData.title}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Artist / Creator"
              id="artist"
              type="text"
              placeholder="Antonio Guillem"
              value={formData.artist}
              onChange={handleChange}
            />
            <FormInput
              label="Approximate Date"
              id="date"
              type="text"
              placeholder="c. 2015"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <FormInput
            label="Medium"
            id="medium"
            type="text"
            placeholder="Digital Stock Photograph"
            value={formData.medium}
            onChange={handleChange}
          />

          <FormInput
            label="Image URL"
            id="image_url"
            type="text"
            placeholder="https://..."
            value={formData.image_url}
            onChange={handleChange}
          />

          {!imageValid && (
            <p className="text-red-600 text-sm">
              ⚠️ Image could not be loaded. Please double-check the URL.
            </p>
          )}

          {formData.image_url && imageValid && (
            <img
              src={formData.image_url}
              alt="Preview"
              className="mt-4 w-full max-h-64 object-contain border border-black/10"
            />
          )}

          <div>
            <label htmlFor="notes_origin" className="block text-sm font-bold mb-2">
              Origin Story
            </label>
            <textarea
              id="notes_origin"
              rows="4"
              placeholder="Describe the artifact's origin..."
              value={formData.notes_origin}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-black/20 focus:border-[var(--color-antique-gold)] focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="notes_impact" className="block text-sm font-bold mb-2">
              Cultural Impact
            </label>
            <textarea
              id="notes_impact"
              rows="4"
              placeholder="Describe its cultural impact..."
              value={formData.notes_impact}
              onChange={handleChange}
              className="w-full p-3 bg-white border border-black/20 focus:border-[var(--color-antique-gold)] focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[var(--color-charcoal)] text-white font-bold hover:bg-[var(--color-antique-gold)] hover:text-[var(--color-charcoal)] transition-colors"
          >
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitPage;
