import Image from "next/image";

import { WHATSAPP_COMERCIAL } from "@/data/contactoData";
import { waMeUrl } from "@/lib/utils";

/**
 * Boton flotante de WhatsApp, fijo en la esquina inferior derecha de todas las
 * paginas. Abre el chat de la linea comercial con el mismo mensaje que el boton
 * "Contactanos" de la portada.
 *
 * Es un `<a>` y no un `<button>` a proposito. El boton de la portada usa
 * `onClick` con `openWhatsApp`, que necesita `window` y por eso obliga a que
 * todo el componente sea cliente. Aqui no hay nada que ejecutar: el href ya
 * lleva el numero y el mensaje, y `target="_blank"` abre la pestana. Es el
 * mismo resultado con cero JavaScript.
 *
 * El texto del mensaje es copia character por character del de la portada
 * (`tittle.tsx`). Si algun dia cambia uno, hay que cambiar el otro.
 */
export default function BotonWhatsapp() {
  return (
    <a
      href={waMeUrl(
        WHATSAPP_COMERCIAL,
        "Buen día, estoy interesado en cotizar una batería para mi carro.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-emerald-950/25 ring-1 ring-black/5 transition-colors duration-200 hover:bg-[#1FBA59] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 motion-safe:hover:scale-105"
    >
      {/*
        `public/whatsapp.svg` es negro (#0F0F0F), no blanco. Se ve bien sobre el
        boton gris claro de la portada, pero negro sobre verde no se reconoce
        como WhatsApp. `invert(1)` lo pasa a blanco sin necesidad de tener un
        segundo archivo, y funciona porque el svg es negro puro sobre fondo
        transparente: al invertir, el relleno queda blanco y la transparencia
        sigue intacta.
      */}
      <Image
        src="/whatsapp.svg"
        alt=""
        width={28}
        height={28}
        aria-hidden="true"
        className="[filter:invert(1)]"
      />
    </a>
  );
}
