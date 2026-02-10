import { FAQItem } from '../types';

export const FAQ_ITEMS: FAQItem[] = [
    {
        question: "What are your operating hours?",
        answer: "We're open Sunday to Friday from 6:00 AM to 9:00 PM, and weekends from 7:00 AM to 8:00 PM."
    },
    {
        question: "Do you offer personal training?",
        answer: "Yes, we have certified personal trainers available for one-on-one sessions."
    },
    {
        question: "What membership plans do you offer?",
        answer: "We offer monthly, quarterly, and annual membership plans with various benefits."
    },
    {
        question: "Is there a trial period available?",
        answer: "Yes, we offer a 2-day free trial for new members to experience our facilities."
    }
];

export const MAP_CONFIG = {
    latitude: 28.2086342,
    longitude: 83.9858103,
    zoom: 15,
};

export const DEFAULT_CONTACT_INFO = {
    phone: '(977) 123-4567',
    phoneLabel: 'Get in touch with our team for immediate assistance.',
    address: 'Prithivi Chwok, Pokhara, Nepal',
    addressLabel: 'Come visit our state-of-the-art facility in Pokhara.',
    email: 'info@gym.com',
    emailLabel: 'Send us an email and we\'ll respond within 24 hours.',
};
