import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { HashLink } from "./hash-link";
import { sedes } from "@/data/contactoData";

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
            Grupo Miscelánea Automotriz S.A.S.
          </h2>

          <p className="max-w-sm text-sm leading-7 text-zinc-300">
            Especialistas en partes eléctricas y baterías para vehículos con más
            de 15 años de experiencia en el mercado.
          </p>
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
        <div className="mx-auto max-w-7xl text-sm text-zinc-400">
          <p>
            &copy; 2026 Grupo Miscelánea Automotriz S.A.S. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
