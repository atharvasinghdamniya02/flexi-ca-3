import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req, res, next) {
  try {
    const token = (req.headers.authorization || '').startsWith('Bearer ') ? req.headers.authorization.slice(7) : '';
    if (!token) return res.status(401).json({ message: 'Please sign in to continue.' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('name email');
    if (!user) return res.status(401).json({ message: 'Account no longer exists.' });
    req.user = user; next();
  } catch { return res.status(401).json({ message: 'Your session is invalid or expired. Please sign in again.' }); }
}
