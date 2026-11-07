import Link from "next/link";

import { EMPRESA } from "@/data/contactoData";

/**
 * Marco comun de las paginas legales. Los estilos del texto van aca, con
 * selectores de hijo, para que cada pagina se escriba como HTML plano
 * (h2, p, ul) sin repetir clases en cada parrafo.
 */
export default function PaginaLegal({
  titulo,
  actualizada,
  children,
}: {
  titulo: string;
  /** Fecha visible de la ultima version del texto, ej. "26 de octubre de 2026". */
  actualizada: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-28 pb-16 text-zinc-800">
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900">{titulo}</h1>
      <p className="mt-3 text-sm text-zinc-500">
        {EMPRESA.razonSocial} · NIT {EMPRESA.nit} · Última actualización:{" "}
        {actualizada}
      </p>

      <div className="mt-10 space-y-4 leading-7 [&_a]:text-red-700 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:scroll-mt-28 [&_li]:ml-5 [&_li]:pl-1 [&_ol>li]:list-decimal [&_ul>li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>

      <p className="mt-12 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        Ver también:{" "}
        <Link href="/terminos-y-condiciones" className="underline underline-offset-4">
          Términos y condiciones
        </Link>
        {" · "}
        <Link href="/politica-de-datos" className="underline underline-offset-4">
          Tratamiento de datos personales
        </Link>
        {" · "}
        <Link href="/garantias-y-devoluciones" className="underline underline-offset-4">
          Garantías, retracto y PQR
        </Link>
      </p>
    </main>
  );
}
