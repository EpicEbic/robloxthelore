export interface WhatsNewEntry {
  id: string;
  date: string;
  title: string;
  description: string;
  link?: string;
  changes?: string[];
  isNew?: boolean; // For highlighting recent entries
}