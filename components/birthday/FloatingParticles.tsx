"use client";
const dots = Array.from({ length: 20 }, (_, i) => ({ left: `${(i * 37) % 100}%`, delay: `${(i % 7) * -.9}s`, size: 3 + (i % 4) * 2 }));
export function FloatingParticles() { return <div className="particles" aria-hidden="true">{dots.map((d,i) => <i key={i} style={{ left: d.left, animationDelay: d.delay, width:d.size, height:d.size }} />)}</div>; }
