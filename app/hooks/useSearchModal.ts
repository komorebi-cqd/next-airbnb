import { create } from "zustand";

interface SearchModalStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;

}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true })
}))

export default useSearchModal;