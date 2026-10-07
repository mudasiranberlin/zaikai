export { Product } from './Product.js';
export { DeliveryOption } from './DeliveryOption.js';
export { CartItem } from './CartItem.js';
export { Order } from './Order.js';

// Add this to every query so Mongo's internal fields are not returned
export const HIDE = '-_id -__v';
