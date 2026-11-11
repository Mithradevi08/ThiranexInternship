import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
      image: { type: String }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery'
  },
  orderStatus: {
    type: String,
    enum: ['Placed', 'Processing', 'Delivered'],
    default: 'Placed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', orderSchema);
