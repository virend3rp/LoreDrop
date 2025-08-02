// src/components/NewsletterSignup.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    toast.error('Please enter a valid email address.');
    return;
  }

  setLoading(true);
  toast.loading('Subscribing...');

try {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

    const data = await response.json();
    toast.dismiss();

    if (!response.ok) {
      // Backend might send a message like "Email already subscribed"
      toast.error(data.message || 'Subscription failed. Try again.');
    } else {
      setEmail('');
      toast.success(data.message || 'You’re on the list! ✅');
    }
  } catch (err) {
    console.error(err);
    toast.dismiss();
    toast.error('Server error. Try again later.');
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="bg-black/[.03] mt-16 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-[var(--font-family-serif)] text-3xl">
          LoreDrop Weekly
        </h2>
        <p className="max-w-xl mx-auto mt-2 text-black/60">
          Subscribe for weekly insights on cultural trends and rising memes directly to your inbox.
        </p>

        <form
          className="mt-6 flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-grow p-3 bg-white border border-black/20 focus:border-[var(--color-antique-gold)] focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 font-bold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-[var(--color-charcoal)] text-white hover:bg-[var(--color-antique-gold)] hover:text-[var(--color-charcoal)]'
            }`}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignup;
