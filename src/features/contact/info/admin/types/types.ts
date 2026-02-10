export interface ContactInfo {
  id: number;
  phone: string;
  phoneLabel: string;
  address: string;
  addressLabel: string;
  email: string;
  emailLabel: string;
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  updatedAt: Date;
}

export interface UpdateContactInfoInput {
  phone?: string;
  phoneLabel?: string;
  address?: string;
  addressLabel?: string;
  email?: string;
  emailLabel?: string;
  instagram?: string | null;
  facebook?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  youtube?: string | null;
}
