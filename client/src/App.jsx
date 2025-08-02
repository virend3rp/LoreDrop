// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MuseumHeader from './components/MuseumHeader';
import { Toaster } from 'react-hot-toast'; // 1. Import Toaster
import HomePage from './pages/HomePage';
import ExhibitsPage from './pages/ExhibitsPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import AboutPage from './pages/Aboutpage';
import SubmitPage from './pages/SubmitPage';
import AdminPage from './pages/AdminPage'; // 1. Import the new page

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <MuseumHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exhibits" element={<ExhibitsPage />} />
          <Route path="/exhibits/:id" element={<ArtworkDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/admin" element={<AdminPage />} /> {/* 2. Add the new route */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;