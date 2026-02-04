export interface ServiceFeature {
  id: string;
  feature: string;
  order: number;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  order: number;
  features: ServiceFeature[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceInput {
  icon: string;
  title: string;
  description: string;
  image: string;
  order?: number;
  features?: Array<{
    feature: string;
    order: number;
  }>;
}

export interface UpdateServiceInput {
  icon?: string;
  title?: string;
  description?: string;
  image?: string;
  order?: number;
}
