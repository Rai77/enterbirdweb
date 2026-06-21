"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(reduce ? to : 0);
  const rounded = useTransform(mv, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.21, 0.47, 0.32, 0.98],
    });
    return controls.stop;
  }, [inView, mv, to, duration, reduce]);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const unsub = rounded.on("change", (v) => {
      node.textContent = v;
    });
    node.textContent = `${prefix}${(reduce ? to : 0).toFixed(decimals)}${suffix}`;
    return unsub;
  }, [rounded, prefix, suffix, decimals, reduce, to]);

  return <span ref={ref} className={className} />;
}
