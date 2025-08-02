import React, { useState, useEffect } from 'react';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001') + '/api';

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState(localStorage.getItem('adminKey') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('artifacts');
  const [artifacts, setArtifacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToggleApproval = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    const endpoint = newStatus ? 'approve' : 'unapprove';
    try {
      const response = await fetch(`${API_BASE}/admin/artifacts/${id}/${endpoint}`, {
        method: 'PATCH',
        headers: { Authorization: adminKey },
      });
      if (!response.ok) throw new Error(`Failed to ${endpoint}.`);
      setArtifacts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, approved: newStatus } : a))
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSetExhibit = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/admin/artifacts/${id}/set-exhibit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: adminKey,
        },
      });
  
      if (!response.ok) throw new Error('Failed to set exhibit.');
  
      alert('Exhibit of the week updated.');
      
      // Optional: re-fetch artifact list to reflect change
      fetchArtifacts?.();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this artifact permanently?')) return;
    try {
      const response = await fetch(`${API_BASE}/admin/artifacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: adminKey },
      });
      if (!response.ok) throw new Error('Failed to delete.');
      setArtifacts((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchAdminArtifacts = async (key) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/admin/artifacts`, {
        headers: { Authorization: key },
      });
      if (!response.ok) throw new Error('Failed to fetch artifacts');
      const data = await response.json();
      setArtifacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async (key) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/admin/subscribers`, {
        headers: { Authorization: key },
      });
      if (!response.ok) throw new Error('Failed to fetch subscribers');
      const data = await response.json();
      setSubscribers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = (key) => {
    setIsAuthenticated(true);
    localStorage.setItem('adminKey', key);
    fetchAdminArtifacts(key);
    fetchSubscribers(key);
  };

  const handleKeySubmit = (e) => {
    e.preventDefault();
    fetchAdminData(adminKey);
  };

  useEffect(() => {
    if (adminKey) fetchAdminData(adminKey);
    else setLoading(false);
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-8 max-w-md">
        <h1 className="font-[var(--font-family-serif)] text-3xl mb-4">Admin Access</h1>
        <form onSubmit={handleKeySubmit}>
          <label htmlFor="adminKey" className="font-bold">Enter Admin Key:</label>
          <input
            type="password"
            id="adminKey"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full p-2 mt-2 border border-black/20"
          />
          <button type="submit" className="mt-4 px-6 py-2 bg-[var(--color-charcoal)] text-white font-bold">Login</button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-8">
      <h1 className="font-[var(--font-family-serif)] text-4xl md:text-5xl border-b border-black/10 pb-4 mb-8">
        Admin Dashboard
      </h1>

      <div className="flex space-x-6 mb-8">
        <button
          className={`font-bold border-b-2 ${activeTab === 'artifacts' ? 'border-black' : 'border-transparent text-black/40'}`}
          onClick={() => setActiveTab('artifacts')}
        >
          Artifacts
        </button>
        <button
          className={`font-bold border-b-2 ${activeTab === 'subscribers' ? 'border-black' : 'border-transparent text-black/40'}`}
          onClick={() => setActiveTab('subscribers')}
        >
          Subscribers
        </button>
      </div>

      {activeTab === 'artifacts' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/20">
                <th className="p-2">ID</th>
                <th className="p-2">Title</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artifacts.map((artifact) => (
                <tr key={artifact.id} className="border-b border-black/10">
                  <td className="p-2">{artifact.id}</td>
                  <td className="p-2">{artifact.title}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs font-bold ${artifact.approved ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                      {artifact.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td className="p-2 space-x-4">
                    <button onClick={() => handleToggleApproval(artifact.id, artifact.approved)} className={`text-sm font-bold ${artifact.approved ? 'text-orange-600' : 'text-green-600'}`}>
                      {artifact.approved ? 'Un-approve' : 'Approve'}
                    </button>
                    <button onClick={() => handleSetExhibit(artifact.id)} className="text-sm text-blue-600 font-bold">Set Exhibit</button>
                    <button onClick={() => handleDelete(artifact.id)} className="text-sm text-red-600 font-bold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'subscribers' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                const headers = ['ID', 'Email', 'Subscribed', 'Subscribed At'];
                const rows = subscribers.map((sub) => [
                  sub.id,
                  sub.email,
                  sub.is_subscribed ? 'Yes' : 'No',
                  new Date(sub.subscribed_at).toISOString()
                ]);
                const csvContent = [headers, ...rows]
                  .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
                  .join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'subscribers.csv');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="px-4 py-2 bg-[var(--color-charcoal)] text-white text-sm font-bold hover:bg-[var(--color-antique-gold)] hover:text-[var(--color-charcoal)] transition-colors"
            >
              Export as CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-black/20">
                  <th className="p-2">ID</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Subscribed</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-black/10">
                    <td className="p-2">{sub.id}</td>
                    <td className="p-2">{sub.email}</td>
                    <td className="p-2">{sub.is_subscribed ? '✅' : '❌'}</td>
                    <td className="p-2">{new Date(sub.subscribed_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
