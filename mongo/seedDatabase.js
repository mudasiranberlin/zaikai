// Fills the database with the default data (used on first start and by POST /api/reset)
import { Product, DeliveryOption, CartItem, Order } from './models/index.js';
import { defaultProducts } from './defaultData/defaultProducts.js';
import { defaultDeliveryOptions } from './defaultData/defaultDeliveryOptions.js';
import { defaultCart } from './defaultData/defaultCart.js';
import { defaultOrders } from './defaultData/defaultOrders.js';

export async function seedDatabase() {
  await Product.deleteMany();
  await DeliveryOption.deleteMany();
  await CartItem.deleteMany();
  await Order.deleteMany();

  // insertMany with ordered:true keeps the same order as the arrays
  await Product.insertMany(defaultProducts);
  await DeliveryOption.insertMany(defaultDeliveryOptions);
  await CartItem.insertMany(defaultCart);
  await Order.insertMany(defaultOrders);
}
