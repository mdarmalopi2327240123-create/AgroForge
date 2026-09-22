import { useRef } from 'react';
import { CATEGORIES } from '../data/products';

interface CategoryChipsProps {
  selected: string;
  onSelect: (cat: string) => void;
}

const categoryIcons: Record<string, string> = {
  'All Categories': '🌾',
  'Tractors & Machinery': '🚜',
  'Harvesting Equipment': '🌽',
  'Irrigation Systems': '💧',
  'Hand Tools': '🔧',
  'Livestock Equipment': '🐄',
  'Seed & Planting': '🌱',
  'Storage Solutions': '🏗️',
  'Crop Protection': '🌿',
  'Soil Testing': '🔬',
  'Technology & GPS': '📡',
};

export default function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 snap-x"
        style={{ scrollPadding: '0 16px' }}
      >
        {CATEGORIES.map(cat => {
          const isActive = selected === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              snap-align="start"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 shrink-0 border ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card text-foreground border-border hover:border-primary/40 hover:bg-primary/5'
              }`}
            >
              <span className="text-base leading-none">{categoryIcons[cat] || '📦'}</span>
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
      {/* Fade edges */}
      <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}
