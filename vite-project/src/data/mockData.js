export const categories = [
  { id: 'bowls', name: 'Signature Bowls', icon: '🍲' },
  { id: 'rice', name: 'Rice Meals', icon: '🍚' },
  { id: 'wraps', name: 'Wraps', icon: '🌯' },
  { id: 'salads', name: 'Fresh & Healthy', icon: '🥗' },
  { id: 'sides', name: 'Sides', icon: '🍟' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
]

export const branches = [
  { id: 1, name: 'Bowl Koramangala', area: 'Koramangala', distance: '1.8 km', open: true },
  { id: 2, name: 'Bowl BTM', area: 'BTM Layout', distance: '3.2 km', open: true },
  { id: 3, name: 'Bowl HSR', area: 'HSR Layout', distance: '4.6 km', open: true },
]

const foodImages = {
  chickenBowl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
  paneerBowl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  chickenRice: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=85',
  veggieWrap: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85',
  salad: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85',
  fries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85',
  lemonade: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85',
}

export const products = [
  { id: 1, name: 'Golden Chicken Bowl', category: 'bowls', price: 249, calories: 620, portion: '450g', rating: 4.8, image: foodImages.chickenBowl, description: 'Tender chicken, fragrant rice, fresh vegetables and our signature golden sauce.', ingredients: ['Chicken', 'Basmati rice', 'Vegetables', 'Golden sauce', 'Herbs'], available: true },
  { id: 2, name: 'Paneer Power Bowl', category: 'bowls', price: 229, calories: 560, portion: '420g', rating: 4.7, image: foodImages.paneerBowl, description: 'Grilled paneer with seasoned rice, greens and a creamy house dressing.', ingredients: ['Paneer', 'Rice', 'Lettuce', 'Corn', 'House dressing'], available: true },
  { id: 3, name: 'Chicken Rice Feast', category: 'rice', price: 279, calories: 710, portion: '500g', rating: 4.9, image: foodImages.chickenRice, description: 'A hearty rice meal with juicy chicken and aromatic spices.', ingredients: ['Chicken', 'Rice', 'Onion', 'Spices', 'Coriander'], available: true },
  { id: 4, name: 'Veggie Crunch Wrap', category: 'wraps', price: 179, calories: 430, portion: '280g', rating: 4.6, image: foodImages.veggieWrap, description: 'Crisp vegetables, seasoned filling and golden sauce wrapped fresh.', ingredients: ['Tortilla', 'Lettuce', 'Corn', 'Beans', 'Sauce'], available: true },
  { id: 5, name: 'Green Garden Salad', category: 'salads', price: 199, calories: 290, portion: '300g', rating: 4.5, image: foodImages.salad, description: 'Fresh greens, crunchy vegetables and a light citrus dressing.', ingredients: ['Lettuce', 'Cucumber', 'Tomato', 'Corn', 'Citrus dressing'], available: true },
  { id: 6, name: 'Golden Fries', category: 'sides', price: 119, calories: 360, portion: '180g', rating: 4.6, image: foodImages.fries, description: 'Crispy golden fries seasoned with our signature spice mix.', ingredients: ['Potato', 'Oil', 'Golden seasoning'], available: true },
  { id: 7, name: 'Classic Lemon Cooler', category: 'drinks', price: 89, calories: 110, portion: '350ml', rating: 4.7, image: foodImages.lemonade, description: 'Refreshing lemon cooler served chilled.', ingredients: ['Lemon', 'Water', 'Mint', 'Sugar'], available: true },
]

export const initialOrders = [
  { id: 'BWL10245', items: [{ productId: 1, quantity: 2 }], total: 538, status: 'OUT_FOR_DELIVERY', type: 'Delivery', branch: 'Bowl Koramangala', customer: 'Priya Sharma', driver: 'Rahul Kumar', eta: 18 },
  { id: 'BWL10244', items: [{ productId: 3, quantity: 1 }, { productId: 6, quantity: 1 }], total: 398, status: 'PREPARING', type: 'Pickup', branch: 'Bowl BTM', customer: 'Arjun Rao', driver: null, eta: 22 },
  { id: 'BWL10243', items: [{ productId: 2, quantity: 1 }], total: 229, status: 'CONFIRMED', type: 'Delivery', branch: 'Bowl HSR', customer: 'Meera Nair', driver: 'Vikram Singh', eta: 35 },
]

export const dashboardStats = { sales: 84250, orders: 126, delivering: 18, branches: 12, customers: 3840, deliveryStaff: 34 }
