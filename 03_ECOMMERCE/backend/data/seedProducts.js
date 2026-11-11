import Product from '../models/Product.js';

export const initialProducts = [
  {
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium over-ear wireless Bluetooth headphones with active noise cancellation and 30-hour battery life.",
    price: 3499,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    stock: 25,
    rating: 4.8
  },
  {
    name: "Mechanical Gaming Keyboard RGB",
    description: "Compact tenkeyless mechanical keyboard featuring tactile brown switches and customizable per-key RGB backlighting.",
    price: 2899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    stock: 18,
    rating: 4.7
  },
  {
    name: "Ultra-Slim Smartwatch Pro",
    description: "Fitness and health tracker with AMOLED touch display, heart rate monitor, SpO2 sensor, and 12 sports modes.",
    price: 2499,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    stock: 30,
    rating: 4.6
  },
  {
    name: "Ergonomic Wireless Mouse",
    description: "Precision wireless optical mouse with dual Bluetooth & 2.4GHz USB receiver, silent clicks, and rechargeable battery.",
    price: 1199,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    stock: 45,
    rating: 4.5
  },
  {
    name: "USB-C Multiport Hub Adapter 7-in-1",
    description: "Aluminum USB-C hub with 4K HDMI, 100W Power Delivery, SD/TF card reader, and 3x USB 3.0 ports.",
    price: 1499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    stock: 22,
    rating: 4.4
  },
  {
    name: "Portable Bluetooth Speaker Waterproof",
    description: "Rugged IPX7 waterproof outdoor Bluetooth speaker with powerful 360-degree deep bass and 15-hour playback.",
    price: 1899,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    stock: 35,
    rating: 4.6
  }
];

export const seedDatabaseIfEmpty = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(initialProducts);
      console.log('✅ [Ecommerce Backend] Sample products automatically seeded into MongoDB Atlas');
    }
  } catch (err) {
    console.error('Error seeding products:', err.message);
  }
};
