import { useState } from 'react';
import type { ColorOption } from '../lib/colors';

interface ColorHoverProps {
  color: ColorOption;
  children: React.ReactNode;
}

export default function ColorHover({ color, children }: ColorHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {isHovered && (
        <div className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 pointer-events-none">
          <div className="bg-white rounded-xl shadow-2xl p-4 border-2 border-amber-200 animate-fadeIn">
            <div className="w-40 h-40 mb-2 flex items-center justify-center overflow-hidden rounded-lg bg-amber-50">
              <img
                src={color.image}
                alt={`${color.label} Wollknauel`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="text-center">
              <p className="font-semibold text-amber-900">{color.label}</p>
              <p className="text-xs text-amber-700">Nr. {color.colorCode}</p>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white border-r-2 border-b-2 border-amber-200 rotate-45"></div>
          </div>
        </div>
      )}
    </div>
  );
}
