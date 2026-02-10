export interface ContactInfo {
    id: number;
    phone: string;
    phoneLabel: string;
    address: string;
    addressLabel: string;
    email: string;
    emailLabel: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
}

export interface FormData {
    name: string;
    email: string;
    phone: string;
    interestedIn: string;
    message: string;
}

export interface MessageCategory {
    id: string;
    name: string;
}

export interface FAQItem {
    id?: string;
    question: string;
    answer: string;
}
