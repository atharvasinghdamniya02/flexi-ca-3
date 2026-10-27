import Review from '../models/Review.js';
export async function listReviews(req, res, next) { try { res.json({ reviews: await Review.find().populate('user', 'name').sort({ createdAt: -1 }).limit(100) }); } catch (e) { next(e); } }
export async function createReview(req, res, next) {
  try {
    const { product, category, rating, title, body } = req.body;
    if (![product, category, title, body].every(v => String(v || '').trim())) return res.status(400).json({ message: 'Complete all review fields.' });
    const review = await Review.create({ user: req.user._id, product, category, rating: Number(rating), title, body });
    await review.populate('user', 'name'); res.status(201).json({ review });
  } catch (e) { next(e); }
}
