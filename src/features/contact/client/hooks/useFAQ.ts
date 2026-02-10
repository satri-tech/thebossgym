'use client';

import { useState, useEffect } from 'react';
import { FAQItem } from '../types';
import { FAQ_ITEMS } from '../constants/faq';

export const useFAQ = () => {
    const [faqs, setFaqs] = useState<FAQItem[]>(FAQ_ITEMS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await fetch('/api/faq');
                if (response.ok) {
                    const result = await response.json();
                    // Handle both direct array and wrapped response
                    const faqData = Array.isArray(result) ? result : result.data || result.faqs || FAQ_ITEMS;
                    setFaqs(faqData);
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
                // Fallback to default FAQs
                setFaqs(FAQ_ITEMS);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFAQs();
    }, []);

    return { faqs, isLoading };
};
