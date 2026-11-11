import Order from '../models/Order.js';

// @desc Create a new order (Checkout)
// @route POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentMethod } = req.body;

    if (!customer || !customer.name || !customer.email || !customer.address || !customer.phone) {
      return res.status(400).json({ success: false, message: 'Please provide all delivery and contact details' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart cannot be empty' });
    }

    const order = await Order.create({
      customer,
      items,
      totalAmount,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      orderStatus: 'Placed'
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all orders
// @route GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single order by ID
// @route GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
