"use client";
import { useEffect, useState, useRef } from "react";

interface StatCounterProps {
  target: number;
  suffix?: string;
}

export function StatCounter({ target, suffix = "" }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const step = Math.max(1, Math.floor(target / 40));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setCount(current);
          }, 25);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl font-extrabold gradient-text tabular-nums" data-testid="stat-counter">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
