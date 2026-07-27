"use client";

import { useEffect, useRef, useState } from "react";

type CardItem = {
  name: string;
  logo: string;
};

type InfiniteMovingCardsProps = {
  items: CardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
};

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "fast",
  className,
}: InfiniteMovingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);

  function getSpeed() {
    if (speed === "fast") return "20s";
    if (speed === "normal") return "40s";
    return "80s";
  }

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const scrollerItem = item.cloneNode(true) as HTMLLIElement;
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(scrollerItem);
        }
      });

      setStart(true);
    }
  }, []);

  const animDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 gap-4 py-4",
          start && "animate-scroll"
        )}
        style={{
          animationDuration: getSpeed(),
          animationDirection: animDirection,
        }}
      >
        {items.map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            className="flex w-[160px] shrink-0 items-center justify-center rounded-xl border border-white/[0.15] bg-black/5 px-6 py-4"
          >
            <div className="w-full h-12 flex items-center justify-center">
              <span className="text-lg font-bold text-muted-foreground/40 select-none">
                {item.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
