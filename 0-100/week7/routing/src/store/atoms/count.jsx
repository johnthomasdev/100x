import { atom, selector } from 'recoil'

// Ensure each atom has a different key
export const countAtom = atom({
    key: "countAtom",
    default:0
});

export const evenSelector = selector({
    key: "evenSelector",
    get: ({get}) => {
        const count = get(countAtom);
        // Depends on countAtom value
        return count % 2; 
    }
})