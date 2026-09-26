import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sedes } from "@/data/contactoData";
import { waMeUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Visítanos en nuestras dos sedes en Bogotá: Eduardo Santos y Restrepo. Teléfonos, horarios y WhatsApp para cotizar tu batería.",
};

export default function ContactoPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-28 pb-16">
      <header className="mb-10 space-y-3">
        <h1 className="text-4xl font-bold text-gray-900">Contacto</h1>
        <p className="max-w-2xl text-lg leading-7 text-gray-600">
          Atendemos en dos sedes en Bogotá. Si ya sabes qué batería buscas,
          escríbenos por WhatsApp y te cotizamos de una.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {sedes.map((sede) => (
          <Card key={sede.nombre} className="pt-0">
            <CardHeader>
              <CardTitle className="text-2xl">{sede.nombre}</CardTitle>
              <CardDescription>
                Ponte en contacto con esta sede
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
                <span className="leading-6">{sede.direccion}</span>
              </div>

              <div className="flex items-start gap-3 text-gray-700">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
                <a
                  href={`tel:${sede.tel}`}
                  className="text-lg font-semibold leading-6 underline-offset-4 hover:underline"
                >
                  {sede.telefono}
                </a>
              </div>

              <div className="flex items-start gap-3 text-gray-700">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
                <ul className="space-y-1 leading-6">
                  {sede.horarios.map((horario) => (
                    <li key={horario}>{horario}</li>
                  ))}
                </ul>
              </div>

              <Button asChild className="w-full">
                <a
                  href={waMeUrl(
                    sede.whatsapp,
                    `Hola, quiero cotizar una batería en la ${sede.nombre}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Escribir por WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
