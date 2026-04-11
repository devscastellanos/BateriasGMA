
'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const brands = [
  { name: "Peugeot", src: "/cars/peugeot.svg" },
  { name: "Nissan", src: "/cars/nissan.png" },
  { name: "Mitsubishi", src: "/cars/mitsubishi.svg" },
  { name: "Mercedes", src: "/cars/mercedes.png" },
  { name: "Mazda", src: "/cars/mazda.svg" },
  { name: "KIA", src: "/cars/kia.png" },
  { name: "Renault", src: "/cars/renault.svg" },
    { name: "Toyota", src: "/cars/toyota.svg" },
  { name: "Hyundai", src: "/cars/hyundai.svg" },
];

export default function BrandCarousel() {
  const containerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // Clonar los elementos para crear efecto infinito
    const clonedItems = inner.innerHTML;
    inner.innerHTML += clonedItems;

    const totalWidth = inner.offsetWidth / 2; // Mitad porque clonamos

    // Animación continua de izquierda a derecha
    gsap.to(inner, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1, // Infinito
      onRepeat: () => {
        gsap.set(inner, { x: 0 });
      },
    });

    // Hover pause
    container.addEventListener("mouseenter", () => {
      gsap.to(inner, { paused: true });
    });

    container.addEventListener("mouseleave", () => {
      gsap.to(inner, { paused: false });
    });

    return () => {
      container.removeEventListener("mouseenter", () => {});
      container.removeEventListener("mouseleave", () => {});
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden bg-white py-12">
      <div ref={innerRef} className="flex gap-12 will-change-transform">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex-shrink-0 flex items-center justify-center h-24 w-32"
          >
            <Image
              src={brand.src}
              alt={brand.name}
              width={100}
              height={80}
              className="h-full w-auto object-contain transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}