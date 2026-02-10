'use client';

import { useState, useEffect } from 'react';
import { ContactInfo } from '../types';

export const useContactInfo = () => {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await fetch('/api/contact-info');
                if (response.ok) {
                    const result = await response.json();
                    setContactInfo(result.data);
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContactInfo();
    }, []);

    return { contactInfo, isLoading };
};
