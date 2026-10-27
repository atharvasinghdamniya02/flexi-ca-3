import 'dotenv/config';
import express from 'express'; import cors from 'cors'; import helmet from 'helmet'; import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js'; import buildRoutes from './routes/builds.js'; import reviewRoutes from './routes/reviews.js';
const app = express();
app.use(helmet()); app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); app.use(express.json({ limit: '1mb' }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100, standardHeaders: true, legacyHeaders: false }), authRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'FORGEPC API', database: process.env.MONGODB_URI ? 'configured' : 'not-configured' }));
app.use('/api/builds', buildRoutes); app.use('/api/reviews', reviewRoutes);
app.use((_req, res) => res.status(404).json({ message: 'API route not found.' }));
app.use((err, _req, res, _next) => { console.error(err.message); if (err.name === 'ValidationError') return res.status(400).json({ message: err.message }); res.status(500).json({ message: 'Unexpected server error. Check server configuration and logs.' }); });
const port = Number(process.env.PORT) || 5000;
try { await connectDB(); app.listen(port, () => console.log(`FORGEPC API listening on http://localhost:${port}`)); }
catch (e) { console.error(`Startup blocked: ${e.message}`); process.exit(1); }
