'use client';

import { useState, useEffect } from 'react';
import { MessageCategory } from '../types';

export const useMessageCategories = () => {
    const [categories, setCategories] = useState<MessageCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/admin/message-categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return { categories, isLoading };
};
