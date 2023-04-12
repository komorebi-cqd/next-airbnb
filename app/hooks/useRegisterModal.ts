import { create } from "zustand";

interface RegisterModalStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;

}


const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: false })
}))

export default useRegisterModal;