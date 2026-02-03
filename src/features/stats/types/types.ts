export interface Stat {
  id: string;
  label: string;
  value: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateStatInput {
  label: string;
  value: string;
}

export interface UpdateStatInput {
  label?: string;
  value?: string;
  order?: number;
}
