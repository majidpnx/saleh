// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  location: {
    lat: Number,
    lng: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  done: {
    type: Boolean,
    default: false
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);