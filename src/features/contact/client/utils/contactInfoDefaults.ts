import { ContactInfo } from '../types';
import { DEFAULT_CONTACT_INFO } from '../constants/faq';

export const getPhoneDisplay = (contactInfo: ContactInfo | null): string => {
    return contactInfo?.phone || DEFAULT_CONTACT_INFO.phone;
};

export const getPhoneLabelDisplay = (contactInfo: ContactInfo | null): string => {
    return contactInfo?.phoneLabel || DEFAULT_CONTACT_INFO.phoneLabel;
};

export const getAddressDisplay = (contactInfo: ContactInfo | null): string => {
    return contactInfo?.address || DEFAULT_CONTACT_INFO.address;
};

export const getAddressLabelDisplay = (contactInfo: ContactInfo | null): string => {
    return contactInfo?.addressLabel || DEFAULT_CONTACT_INFO.addressLabel;
};

export const getEmailDisplay = (contactInfo: ContactInfo | null): string => {
    return contactInfo?.email || DEFAULT_CONTACT_INFO.email;
};

export const getEmailLabelDisplay = (contactInfo: ContactInfo | null): string => {
    return contactInfo?.emailLabel || DEFAULT_CONTACT_INFO.emailLabel;
};
