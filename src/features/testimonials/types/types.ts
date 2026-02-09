export interface Testimonial {
  id: string;
  name: string;
  position: string;
  image?: string | null;
  comment: string;
  createdAt: string;
}

export interface CreateTestimonialInput {
  name: string;
  position: string;
  image?: string | null;
  comment: string;
}

export interface UpdateTestimonialInput {
  name?: string;
  position?: string;
  image?: string | null;
  comment?: string;
}
