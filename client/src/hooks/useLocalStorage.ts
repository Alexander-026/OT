import {useState} from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    console.log('worked')
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== "undefined" && value !== null) {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
            if(value === null) {
                window.localStorage.removeItem(key)
            }
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}