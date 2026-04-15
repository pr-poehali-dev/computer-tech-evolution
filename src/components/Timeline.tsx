import { useState, useRef, useEffect } from "react";
import { computers, Computer } from "@/data/computers";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function Timeline({ selectedId, onSelect }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const minYear = 1940;
  const maxYear = 2024;
  const totalYears = maxYear - minYear;

  const getPosition = (year: number) => ((year - minYear) / totalYears) * 100;

  const eraRanges = [
    { label: "Пионеры", start: 1940, end: 1954, color: "rgba(251,146,60,0.15)" },
    { label: "Мейнфреймы", start: 1954, end: 1965, color: "rgba(59,130,246,0.15)" },
    { label: "Мини-ЭВМ", start: 1965, end: 1974, color: "rgba(34,197,94,0.15)" },
    { label: "Персональные", start: 1974, end: 1986, color: "rgba(168,85,247,0.15)" },
    { label: "Мультимедиа", start: 1986, end: 2000, color: "rgba(99,102,241,0.15)" },
    { label: "Мобильная", start: 2000, end: 2015, color: "rgba(236,72,153,0.15)" },
    { label: "Современность", start: 2015, end: 2024, color: "rgba(0,212,255,0.15)" },
  ];

  const decades = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  return (
    <div className="w-full">
      <div className="relative h-40 select-none" ref={containerRef}>
        {/* Era backgrounds */}
        {eraRanges.map((era) => (
          <div
            key={era.label}
            className="absolute top-0 h-24 rounded-sm"
            style={{
              left: `${getPosition(era.start)}%`,
              width: `${getPosition(era.end) - getPosition(era.start)}%`,
              background: era.color,
            }}
          >
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-white/30 mono whitespace-nowrap hidden lg:block">
              {era.label}
            </span>
          </div>
        ))}

        {/* Timeline line */}
        <div className="absolute top-[44px] left-0 right-0 h-0.5 timeline-line" />

        {/* Decade markers */}
        {decades.map((year) => (
          <div
            key={year}
            className="absolute top-0 flex flex-col items-center"
            style={{ left: `${getPosition(year)}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-px h-12 bg-white/10 mt-8" />
            <span className="mono text-[10px] text-white/25 mt-1">{year}</span>
          </div>
        ))}

        {/* Computer dots */}
        {computers.map((computer) => {
          const isSelected = selectedId === computer.id;
          const isHovered = hoveredId === computer.id;
          const isActive = isSelected || isHovered;

          return (
            <div
              key={computer.id}
              className="absolute top-7 cursor-pointer group"
              style={{ left: `${getPosition(computer.year)}%`, transform: 'translateX(-50%)' }}
              onClick={() => onSelect(computer.id)}
              onMouseEnter={() => setHoveredId(computer.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Glow ring */}
              {isActive && (
                <div className="absolute -inset-3 rounded-full bg-neon-cyan/10 animate-pulse-glow" />
              )}

              {/* Dot */}
              <div
                className={`relative w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs
                  ${isActive
                    ? 'border-neon-cyan bg-neon-cyan/20 scale-125'
                    : 'border-white/30 bg-background hover:border-neon-cyan/60'
                  }`}
              >
                <span className="text-[8px] leading-none">{computer.emoji}</span>
              </div>

              {/* Tooltip */}
              <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-200 z-20
                ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                <div className="bg-background/95 border border-neon-cyan/30 rounded-lg px-3 py-2 whitespace-nowrap backdrop-blur-sm shadow-xl">
                  <div className="font-oswald text-sm text-foreground">{computer.name}</div>
                  <div className="mono text-[10px] text-neon-cyan/70">{computer.year}</div>
                </div>
                <div className="w-px h-3 bg-neon-cyan/40 mx-auto" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Year range labels */}
      <div className="flex justify-between mono text-[11px] text-white/20 -mt-2 px-1">
        <span>{minYear}</span>
        <span>{maxYear}</span>
      </div>
    </div>
  );
}
