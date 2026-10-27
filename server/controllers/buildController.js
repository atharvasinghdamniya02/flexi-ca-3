import Build from '../models/Build.js';
const owned = (id, user) => ({ _id: id, user: user._id });
export async function listBuilds(req, res, next) { try { res.json({ builds: await Build.find({ user: req.user._id }).sort({ updatedAt: -1 }) }); } catch (e) { next(e); } }
export async function createBuild(req, res, next) {
  try {
    const { name, useCase, components = [], notes = '' } = req.body;
    if (!String(name || '').trim()) return res.status(400).json({ message: 'Build name is required.' });
    if (!Array.isArray(components)) return res.status(400).json({ message: 'Components must be an array.' });
    const safeComponents = components.map(c => ({ category: String(c.category || '').slice(0, 50), name: String(c.name || '').slice(0, 120), price: Math.max(0, Number(c.price) || 0) }));
    const build = await Build.create({ user: req.user._id, name, useCase, components: safeComponents, total: safeComponents.reduce((s, c) => s + c.price, 0), notes });
    res.status(201).json({ build });
  } catch (e) { next(e); }
}
export async function getBuild(req, res, next) { try { const build = await Build.findOne(owned(req.params.id, req.user)); if (!build) return res.status(404).json({ message: 'Build not found.' }); res.json({ build }); } catch (e) { next(e); } }
export async function updateBuild(req, res, next) {
  try {
    const patch = {};
    for (const key of ['name', 'useCase', 'notes']) if (req.body[key] !== undefined) patch[key] = req.body[key];
    if (req.body.components !== undefined) {
      if (!Array.isArray(req.body.components)) return res.status(400).json({ message: 'Components must be an array.' });
      patch.components = req.body.components.map(c => ({ category: String(c.category || '').slice(0, 50), name: String(c.name || '').slice(0, 120), price: Math.max(0, Number(c.price) || 0) }));
      patch.total = patch.components.reduce((s, c) => s + c.price, 0);
    }
    const build = await Build.findOneAndUpdate(owned(req.params.id, req.user), patch, { new: true, runValidators: true });
    if (!build) return res.status(404).json({ message: 'Build not found.' }); res.json({ build });
  } catch (e) { next(e); }
}
export async function deleteBuild(req, res, next) { try { const b = await Build.findOneAndDelete(owned(req.params.id, req.user)); if (!b) return res.status(404).json({ message: 'Build not found.' }); res.json({ message: 'Build deleted.' }); } catch (e) { next(e); } }
