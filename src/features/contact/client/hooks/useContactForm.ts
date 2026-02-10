'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { FormData, MessageCategory } from '../types';

export const useContactForm = (categories: MessageCategory[]) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        interestedIn: categories[0]?.id || '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.message || !formData.interestedIn) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    categoryId: formData.interestedIn,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                interestedIn: categories[0]?.id || '',
                message: '',
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to send message';
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
};
