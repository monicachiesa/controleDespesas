export function toQueryString(filterModel: object) {
    if (!filterModel || typeof filterModel !== 'object') return '';

    const queryString = Object.entries(filterModel)
        .filter(([_, value]) => value !== undefined && value !== null && value !== '') // Remove valores nulos, undefined e strings vazias
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) // Codifica os valores para URL
        .join('&');

    return queryString ? `?${queryString}` : '';
}

import { useState, useEffect } from "react";

export function useDebounce(value, delay = 3000) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

