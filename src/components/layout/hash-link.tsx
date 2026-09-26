"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type HashLinkProps = {
  /** Ruta con ancla, por ejemplo "/#baterias". */
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Enlace a una sección que puede estar en otra página.
 *
 * En la misma página baja con scroll suave. Desde otra página navega primero
 * y baja recién cuando cambia la ruta, que es el momento en que la sección ya
 * está en el DOM. Por eso no se delega en el salto de ancla de Next.js: ese
 * depende de que el elemento esté montado, y con el footer en todas las
 * páginas este enlace se pulsa desde rutas donde la sección aún no existe.
 */
export function HashLink({ href, children, className }: HashLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const separador = href.indexOf("#");
  const hash = separador === -1 ? "" : href.slice(separador + 1);
  const ruta = separador === -1 ? href : href.slice(0, separador);

  // "" y "/" son la misma ruta.
  const actual = pathname === "" ? "/" : pathname;
  const objetivo = ruta === "" ? "/" : ruta;
  const yaEstoy = actual === objetivo;

  // Sección pendiente de bajar. Va en un ref y no en estado a propósito: el
  // efecto solo necesita leerla, y guardarla en estado obligaría a una
  // segunda pasada de render que React marca como efecto en cascada.
  const pendiente = useRef<string | null>(null);

  useEffect(() => {
    if (!pendiente.current || actual !== objetivo) return;
    const hash = pendiente.current;
    pendiente.current = null;
    // Un frame de margen: el contenido de la ruta nueva puede entrar un
    // tick después del cambio de ruta, y si se busca el elemento de
    // inmediato se pierde la sección.
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [actual, objetivo]);

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        if (yaEstoy) {
          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
          return;
        }
        pendiente.current = hash;
        router.push(objetivo);
      }}
    >
      {children}
    </Link>
  );
}
