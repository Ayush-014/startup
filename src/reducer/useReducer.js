const storage = {
    get: (key) => {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch {
            { console.log('Error occured at reducer while getting value')}
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));

        } catch {
            { console.log('Error occured at reducer while setting value')}
            return null;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch {
            { console.log('Error occured at reducer while removed value')}
            return null;
        }
    }
}

const key = "favourite";
export const toggleFavourite = 'toggle';
const clear = 'clear'

export function loadFav() {
    const data = storage.get(key);
    return Array.isArray(data) ? new Set(data) : new Set();
}

export function saveFav(set) {
    storage.set(key, [...set]);
}

export function FavReducer(state, action) {
    switch (action.type) {
        case toggleFavourite: {
            const next = new Set(state);
            next.has(action.id) ? next.delete(action.id) : next.add(action.id);
            saveFav(next);
            return next;
        }
        case clear: {
            storage.remove(key);
            return new Set();
        }
        default: 
        return state;
    }
}