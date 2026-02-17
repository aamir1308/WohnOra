import { create } from 'zustand';
import produce from 'immer';

const useCartStore = create(
  (set) => ({
    items: [],
    addItem(product) {
      set(produce((state) => {
        if (!state.items.some(i => i.id === product.id)) {
          state.items.push({ ...product, qty: 1 });
        } else {
          const index = state.items.findIndex(i => i.id === product.id);
          state.items[index].qty += product.qty;
        }
      }));
    },
    removeItem(id) {
      set((state) => ({
        items: state.items.filter(item => item.id !== id),
      }));
    },
    updateQty(id, qty) {
      set(produce((state) => {
        const index = state.items.findIndex(i => i.id === id);
        if (index !== -1) {
          state.items[index].qty = qty;
        }
      }));
    },
    clearCart() {
      set({ items: [] });
    },
    total() {
      return state.items.reduce((acc, item) => acc + item.qty * item.price, 0);
    },
  }),
);

export default useCartStore;