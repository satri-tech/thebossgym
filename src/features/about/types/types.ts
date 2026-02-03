export interface About {
  id: number;
  tag: string;
  heading: string;
  highlight: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string | null;
  updatedAt: string;
}

export interface UpdateAboutInput {
  tag?: string;
  heading?: string;
  highlight?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string | null;
}
