const applianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  features: { type: [String], required: true },
  starRating: { type: Number, min: 1, max: 5, required: true },
  warrantyMonth: { type: Number, required: true },
  warrantyYear: { type: Number, required: true },
  guaranteeMonth: { type: Number, required: true },
  guaranteeYear: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
