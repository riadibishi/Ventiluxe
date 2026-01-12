"use client";
import { useEffect, useState } from 'react';

export default function Counter({ end, label }: { end: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 sekonda
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="text-center group">
      <h3 className="text-6xl font-black text-white mb-2 group-hover:text-orange-500 transition-colors">
        {count}+
      </h3>
      <p className="text-orange-200 text-sm font-bold uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}