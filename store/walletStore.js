import {create} from 'zustand';

const useWalletStore = create((set) => ({
  address: null,
  setAddress: (address) => set({ address }),
  resetAddress: () => set({ address: null }),
}));

export default useWalletStore;
