export type ChangeCategory = "new" | "changes" | "fixes" | "removals" | "others";

export interface CategorizedChange {
  text: string;
  category: ChangeCategory;
}

export interface WhatsNewEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  link?: string;
  changes?: CategorizedChange[];
  isNew?: boolean; // For highlighting recent entries
}

export interface QandAEntry {
  id: string;
  question: string;
  answer: string[];
}