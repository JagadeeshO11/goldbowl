import { initialOrders, branches, products, categories } from '../data/mockData'

const STORAGE_KEY = 'goldbowl-prototype-state'
const defaultState = { orders: initialOrders, branches, products, categories, notifications: [{ id: 'n1', role: 'customer', title: 'Welcome to Golden Food Bowl', message: 'Your next delicious order is only a few taps away.' }], issues: [] }
function clone(value) { return JSON.parse(JSON.stringify(value)) }
function loadState() { try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : clone(defaultState) } catch { return clone(defaultState) } }
let state = loadState()
const listeners = new Set()
function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); listeners.forEach((listener) => listener(state)) }
export const orderStatuses = ['CONFIRMED','PREPARING','READY_FOR_PICKUP','ASSIGNED','PICKED_UP','OUT_FOR_DELIVERY','DELIVERED']
export function getState() { return state }
export function subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) }
export function createOrder(order) { const id = `BWL${Math.floor(10000 + Math.random() * 90000)}`; const newOrder = { id, status: 'CONFIRMED', createdAt: new Date().toISOString(), ...order }; state = { ...state, orders: [newOrder, ...state.orders] }; addNotification('admin','New order received',`${id} has been placed.`); addNotification('support','New order to monitor',`${id} needs monitoring.`); persist(); return newOrder }
export function updateOrderStatus(orderId, status) { state = { ...state, orders: state.orders.map((order) => order.id === orderId ? { ...order, status } : order) }; addNotification('customer','Order updated',`${orderId} is now ${status.replaceAll('_',' ').toLowerCase()}.`); persist() }
export function assignDelivery(orderId, driver) { state = { ...state, orders: state.orders.map((order) => order.id === orderId ? { ...order, driver, status: 'ASSIGNED' } : order) }; addNotification('delivery','New delivery assigned',`Order ${orderId} is ready for pickup.`); persist() }
export function addNotification(role, title, message) { state = { ...state, notifications: [{ id: crypto.randomUUID(), role, title, message, createdAt: new Date().toISOString() }, ...state.notifications] } }
export function duplicateBranch(sourceId, newBranch) { const source = state.branches.find((branch) => branch.id === Number(sourceId)); const id = Math.max(...state.branches.map((branch) => Number(branch.id)), 0) + 1; const branch = { id, ...newBranch, menuCopiedFrom: source?.name }; state = { ...state, branches: [...state.branches, branch] }; addNotification('admin','Branch duplicated',`${branch.name} copied the menu from ${source?.name ?? 'the selected branch'}.`); persist(); return branch }
export function addProduct(product) { const id = Math.max(...state.products.map((item) => Number(item.id)), 0) + 1; const item = { id, rating: 4.5, available: true, ingredients: [], ...product }; state = { ...state, products: [...state.products, item] }; addNotification('support','Product added',`${item.name} was added to the menu.`); persist(); return item }
export function updateProduct(productId, changes) { state = { ...state, products: state.products.map((item) => Number(item.id) === Number(productId) ? { ...item, ...changes } : item) }; persist() }
export function toggleProductAvailability(productId) { const item = state.products.find((product) => Number(product.id) === Number(productId)); if (item) updateProduct(productId, { available: !item.available }) }
export function addCategory(category) { const id = category.id || category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'); state = { ...state, categories: [...state.categories, { ...category, id }] }; persist() }
export function addIssue(issue) { state = { ...state, issues: [{ id: crypto.randomUUID(), status: 'OPEN', createdAt: new Date().toISOString(), ...issue }, ...state.issues] }; persist() }
export function updateIssue(issueId, status) { state = { ...state, issues: state.issues.map((issue) => issue.id === issueId ? { ...issue, status } : issue) }; persist() }
export function resetPrototypeState() { state = clone(defaultState); persist() }
