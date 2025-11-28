export interface NavItem {
  label: string;
  href: string;
}

export interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  rarity: 'Common' | 'Rare' | 'Legendary' | 'Celestial';
}

export interface SectionProps {
  id?: string;
  className?: string;
}