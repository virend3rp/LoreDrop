require('dotenv').config(); 
const express = require('express');
const cors =require('cors');
const { Pool } = require('pg');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000 
});
app.use(limiter);

app.use(cors({
  origin: ['https://lore-drop.vercel.app'], // your deployed frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

const PORT = process.env.PORT || 5001;
const checkAdminKey = (req, res, next) => {
  const adminKey = req.headers['authorization'];
  if (adminKey && adminKey === process.env.ADMIN_SECRET_KEY) {
    next(); // Key is valid, proceed to the route
  } else {
    res.status(403).send('Forbidden: Invalid Admin Key');
  }
};
// --- ADMIN ROUTES ---
app.get('/api/admin/artifacts', checkAdminKey, async (req, res) => {
  try {
    console.log('Admin request for all artifacts');
    const result = await pool.query('SELECT * FROM artifacts ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
app.get('/api/admin/subscribers', checkAdminKey, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM subscribers ORDER BY subscribed_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching subscribers:', err.message);
    res.status(500).send('Server error');
  }
});

app.patch('/api/admin/artifacts/:id/approve', checkAdminKey, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Admin request to approve artifact ID: ${id}`);
    const result = await pool.query(
      'UPDATE artifacts SET approved = TRUE WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Artifact not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/api/admin/artifacts/:id', checkAdminKey, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Admin request to delete artifact ID: ${id}`);
    const result = await pool.query(
      'DELETE FROM artifacts WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Artifact not found');
    }
    res.status(200).json({ message: 'Artifact deleted successfully', artifact: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.patch('/api/admin/artifacts/:id/unapprove', checkAdminKey, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Admin request to un-approve artifact ID: ${id}`);
    const result = await pool.query(
      'UPDATE artifacts SET approved = FALSE WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Artifact not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}); 

app.get('/', (req, res) => {
  res.send('<h1>Meme-seum API is running with PostgreSQL!</h1>');
});

app.get('/api/artifacts', async (req, res) => {
  try {
    console.log('Fetching all *approved* artifacts from the database...');
    const result = await pool.query('SELECT * FROM artifacts WHERE approved = TRUE ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.get('/api/artifacts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send('Invalid artifact ID');
    }
    console.log(`Fetching approved artifact with ID: ${id}`);
    const result = await pool.query('SELECT * FROM artifacts WHERE id = $1 AND approved = TRUE', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Artifact not found or is pending approval');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/artifacts', async (req, res) => {
  try {
    const { title, artist, date, medium, image_url, notes_origin, notes_impact } = req.body;
    console.log('Received new artifact proposal:', title);
    const newArtifact = await pool.query(
      'INSERT INTO artifacts (title, artist, origin_date, medium, image_url, notes_origin, notes_impact) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, artist, date, medium, image_url, notes_origin, notes_impact]
    );
    res.status(201).json(newArtifact.rows[0]); // Send back the newly created artifact
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/artifacts/:id/upvote', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE artifacts SET upvotes = upvotes + 1 WHERE id = $1 RETURNING upvotes',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Artifact not found');
    }
    res.json({ upvotes: result.rows[0].upvotes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/artifacts/:id/downvote', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE artifacts SET downvotes = downvotes + 1 WHERE id = $1 RETURNING downvotes',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Artifact not found');
    }
    res.json({ downvotes: result.rows[0].downvotes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO subscribers (email, is_subscribed)
       VALUES ($1, true)
       ON CONFLICT (email) DO UPDATE SET
         is_subscribed = true,
         subscribed_at = CURRENT_TIMESTAMP,
         unsubscribed_at = NULL
       RETURNING *`,
      [email]
    );

    res.status(200).json({ message: 'Subscribed successfully', data: result.rows[0] });
  } catch (err) {
    console.error('Error subscribing:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/newsletter/subscribers', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, email, is_subscribed, subscribed_at, unsubscribed_at FROM subscribers ORDER BY subscribed_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch subscribers:', err);
    res.status(500).json({ message: 'Failed to fetch subscribers' });
  }
});


app.patch('/api/newsletter/unsubscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const result = await pool.query(
      `UPDATE subscribers
       SET is_subscribed = FALSE,
           unsubscribed_at = CURRENT_TIMESTAMP
       WHERE email = $1
       RETURNING *;`,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.status(200).json({ message: 'Unsubscribed successfully', data: result.rows[0] });
  } catch (err) {
    console.error('Error unsubscribing:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
