export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  video?: string; // Optional video URL
  gallery?: string[]; // Optional additional images
  description: string;
  tags: string[];
  tools: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
