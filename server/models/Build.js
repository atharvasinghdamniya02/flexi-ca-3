import mongoose from 'mongoose';
const componentSchema = new mongoose.Schema({ category: String, name: String, price: { type: Number, min: 0 } }, { _id: false });
const buildSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  useCase: { type: String, enum: ['Gaming', 'Creator', 'Workstation', 'Everyday'], default: 'Gaming' },
  components: { type: [componentSchema], default: [] },
  total: { type: Number, default: 0, min: 0 },
  notes: { type: String, maxlength: 1000, default: '' }
}, { timestamps: true });
export default mongoose.model('Build', buildSchema);
