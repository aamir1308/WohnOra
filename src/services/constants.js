export const BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  properties: '/properties',
  auth: '/auth',
  user: '/user',
  messages: '/messages',
  appointments: '/appointments',
};

export const PROPERTY_TYPES = {
  apartment: 'Wohnung',
  house: 'Haus',
  studio: 'Studio',
  penthouse: 'Penthouse',
  duplex: 'Maisonette',
};

export const CATEGORY_TYPES = {
  rent: 'Miete',
  buy: 'Kauf',
};

export const ENERGY_CLASSES = ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];