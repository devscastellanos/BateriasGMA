import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { HashLink } from "./hash-link";
import { EMPRESA, URL_SIC, sedes } from "@/data/contactoData";

// Enlaces legales de la franja inferior. La Ley 1480 (art. 50) pide que el
// enlace a la SIC y la informacion de compra esten visibles en todo el sitio.
const LEGALES = [
  { href: "/terminos-y-condiciones", texto: "Términos y condiciones" },
  { href: "/politica-de-datos", texto: "Datos personales" },
  { href: "/garantias-y-devoluciones#garantia", texto: "Garantías y retracto" },
  { href: "/garantias-y-devoluciones#pqr", texto: "PQR" },
];

// Un solo lugar para el estilo de los enlaces, para que no se diferencien entre sí.
const enlace =
  "rounded-sm text-[#78716C] transition-colors hover:text-white " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function Footer() {
  return (
    <footer className="mt-8 bg-[linear-gradient(180deg,#2D0505_0%,#2D0505_40%,#000000_100%)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-red-700">
            {EMPRESA.razonSocial}
          </h2>

          <p className="max-w-sm text-sm leading-7 text-zinc-300">
            Especialistas en partes eléctricas y baterías para vehículos con más
            de 15 años de experiencia en el mercado.
          </p>

          <p className="text-sm text-zinc-300">NIT {EMPRESA.nit}</p>
          <div className="flex items-start gap-2 text-[#78716C]">
            <Mail className="mt-0.5 h-5 w-5 shrink-0" />
            <a
              href={`mailto:${EMPRESA.correo}`}
              className="break-all leading-6 transition-colors hover:text-white"
            >
              {EMPRESA.correo}
            </a>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white/90">Explora</h2>
          <ul className="space-y-3">
            <li>
              <HashLink href="/#baterias" className={enlace}>
                Baterías
              </HashLink>
            </li>
            <li>
              <Link href="/baterias" className={enlace}>
                Catálogo completo
              </Link>
            </li>
            <li>
              <a
                href="https://www.grupomiscelanea.com.co"
                className={enlace}
              >
                Repuestos eléctricos
              </a>
            </li>
            <li>
              <Link href="/" className={enlace}>
                Página principal
              </Link>
            </li>
          </ul>
        </section>

        {sedes.map((sede) => (
          <section key={sede.id} className="space-y-4">
            <h2 className="text-2xl font-bold text-white/90">{sede.nombre}</h2>

            <div className="flex items-start gap-2 text-[#78716C]">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
              <span className="break-words leading-6">{sede.direccion}</span>
            </div>

            <div className="flex items-start gap-2 text-[#78716C]">
              <Phone className="mt-0.5 h-5 w-5 shrink-0" />
              <a
                href={`tel:${sede.tel}`}
                className="break-words leading-6 transition-colors hover:text-white"
              >
                {sede.telefono}
              </a>
            </div>

            {sede.horarios.map((horario) => (
              <p key={horario} className="text-[#78716C]">
                {horario}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; 2026 {EMPRESA.razonSocial} · NIT {EMPRESA.nit}. Todos los
            derechos reservados.
          </p>
          <nav aria-label="Información legal" className="flex flex-wrap gap-x-4 gap-y-2">
            {LEGALES.map((l) => (
              <Link key={l.href} href={l.href} className={enlace}>
                {l.texto}
              </Link>
            ))}
            <a
              href={URL_SIC}
              target="_blank"
              rel="noopener noreferrer"
              className={enlace}
            >
              Superintendencia de Industria y Comercio
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
