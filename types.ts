export interface InkVariant {
  name: string;
  hex: string;
}

export interface InkProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  showPrice?: boolean;
  tags: string[];
  variants: InkVariant[];
  compatibility: string[];
  specs?: {
    viscosity: number;
    saturation: number;
    sheen: string;
  };
}

export interface GeneratedInk {
  name: string;
  hex: string;
  description: string;
  composition: {
    viscosity: number; // 0-100
    saturation: number; // 0-100
    sheen: string;
  };
}

export interface QuoteItem {
  productId: string;
  productName: string;
  variant: InkVariant;
  details?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SubmittedQuote {
  id: string;
  name: string;
  email: string;
  phone?: string;
  items: QuoteItem[];
  message: string;
  date: string;
  status: 'Pending' | 'Processed' | 'Archived';
}