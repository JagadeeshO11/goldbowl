import { initialOrders, branches, products } from '../data/mockData'

const STORAGE_KEY = 'goldbowl-prototype-state'

const defaultState = {
  orders: initialOrders,
  branches,
  products,
  notifications: [
    { id: 'n1', role: 'customer', title: 'Welcome to Golden Food Bowl', message: 'Your next delicious order is only a few taps away.' },
  ],
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : structuredClone(defaultState)
  } catch {
    return structuredClone(defaultState)
  }
}

let state = loadState()
const listeners = new Set()

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  listeners.forEach((listener) => listener(state))
}

export const orderStatuses = [
  'CONFIRMED',
  'PREPARING',
  'READY_FOR_PICKUP',
  'ASSIGNED',
  'PICKED_UP',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
]

export function getState() {
  return state
}

export function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function createOrder(order) {
  const id = `BWL${Math.floor(10000 + Math.random() * 90000)}`
  const newOrder = {
    id,
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
    ...order,
  }
  state = { ...state, orders: [newOrder, ...state.orders] }
  addNotification('admin', 'New order received', `${id} has been placed.`)
  addNotification('support', 'New order to monitor', `${id} needs monitoring.`)
  persist()
  return newOrder
}

export function updateOrderStatus(orderId, status) {
  state = {
    ...state,
    orders: state.orders.map((order) => order.id === orderId ? { ...order, status } : order),
  }
  addNotification('customer', 'Order updated', `${orderId} is now ${status.replaceAll('_', ' ').toLowerCase()}.`)
  persist()
}

export function assignDelivery(orderId, driver) {
  state = {
    ...state,
    orders: state.orders.map((order) => order.id === orderId ? { ...order, driver, status: 'ASSIGNED' } : order),
  }
  addNotification('delivery', 'New delivery assigned', `Order ${orderId} is ready for pickup.`)
  persist()
}

export function addNotification(role, title, message) {
  state = {
    ...state,
    notifications: [{ id: crypto.randomUUID(), role, title, message, createdAt: new Date().toISOString() }, ...state.notifications],
  }
}

export function duplicateBranch(sourceId, newBranch) {
  const source = state.branches.find((branch) => branch.id === Number(sourceId))
  const id = Math.max(...state.branches.map((branch) => Number(branch.id)), 0) + 1
  const branch = { id, ...newBranch, menuCopiedFrom: source?.name }
  state = { ...state, branches: [...state.branches, branch] }
  addNotification('admin', 'Branch duplicated', `${branch.name} copied the menu from ${source?.name ?? 'the selected branch'}.`)
  persist()
  return branch
}

export function resetPrototypeState() {
  state = structuredClone(defaultState)
  persist()
}
