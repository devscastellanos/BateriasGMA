import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-8 bg-[linear-gradient(180deg,#2D0505_0%,#2D0505_40%,#000000_100%)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-red-700">
            Grupo Mscelanéa Automotríz
          </h2>

          <p className="max-w-sm text-sm leading-7 text-zinc-300">
            Especialistas en partes eléctricas y baterías para vehículos con más
            de 15 años de experiencia en el mercado.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white/90">Explora</h2>
          <p className="text-[#78716C]">Baterías</p>
          <p className="text-[#78716C]">Repuestos eléctricos</p>
          <p className="text-[#78716C]">Página principal</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white/90">Visitanos</h2>

          <div className="flex items-start gap-2 text-[#78716C]">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="break-words leading-6">
              Calle 1 #18-64, Bogotá, Eduardo Santos
            </span>
          </div>

          <div className="flex items-start gap-2 text-[#78716C]">
            <Phone className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="break-words leading-6">
              Teléfono: 311 841 8032
            </span>
          </div>

          <p className="text-[#78716C]">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
          <p className="text-[#78716C]">Sábado: 8:00 AM - 5:00 PM</p>
          <p className="text-[#78716C]">Domingo: 9:00 AM - 2:00 PM</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white/90">Sede Restrepo</h2>

          <div className="flex items-start gap-2 text-[#78716C]">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="break-words leading-6">
              Av. Caracas #18-64, Restrepo
            </span>
          </div>

          <div className="flex items-start gap-2 text-[#78716C]">
            <Phone className="mt-0.5 h-5 w-5 shrink-0" />
            <span className="break-words leading-6">
              Teléfono: 313 800 4214
            </span>
          </div>

          <p className="text-[#78716C]">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
          <p className="text-[#78716C]">Sábado: 8:00 AM - 5:00 PM</p>
        </section>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="mx-auto max-w-7xl text-sm text-zinc-400">
          <p>
            &copy; 2026 Grupo Miscelanéa Automotríz S.A.S. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
