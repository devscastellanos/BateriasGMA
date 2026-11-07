import type { Metadata } from "next";

import PaginaLegal from "@/components/legal/pagina-legal";
import { EMPRESA, URL_SIC, WHATSAPP_COMERCIAL, sedes } from "@/data/contactoData";

export const metadata: Metadata = {
  title: "Tratamiento de datos personales | Baterías GMA",
  description: `Política de tratamiento de datos personales de ${EMPRESA.razonSocial} (Ley 1581 de 2012).`,
  alternates: { canonical: "/politica-de-datos" },
};

const celular = WHATSAPP_COMERCIAL.replace(/^57(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");

// Las finalidades son solo las necesarias para vender. Usar los datos para
// publicidad necesita una autorizacion separada y expresa: no se agrega aca
// sin que el negocio lo decida y sin una casilla propia en el carrito.
export default function Page() {
  const principal = sedes[0];

  return (
    <PaginaLegal
      titulo="Política de tratamiento de datos personales"
      actualizada="26 de octubre de 2026"
    >
      <p>
        Esta política cumple la Ley 1581 de 2012 y el Decreto 1377 de 2013
        (compilado en el Decreto 1074 de 2015). Explica qué datos personales
        recogemos, para qué, y cómo puedes ejercer tus derechos sobre ellos.
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li>Razón social: {EMPRESA.razonSocial}</li>
        <li>NIT: {EMPRESA.nit}</li>
        <li>Dirección: {principal.direccion}</li>
        <li>
          Correo: <a href={`mailto:${EMPRESA.correo}`}>{EMPRESA.correo}</a>
        </li>
        <li>Teléfono y WhatsApp: {celular}</li>
      </ul>

      <h2>2. Qué datos recogemos</h2>
      <p>Cuando haces un pedido desde el carrito nos das:</p>
      <ul>
        <li>Nombre.</li>
        <li>Tipo y número de documento, y correo, para la factura electrónica.</li>
        <li>Dirección y barrio, si pides domicilio.</li>
        <li>Tu vehículo, si decides indicarlo.</li>
        <li>
          Tu número de celular, que conocemos porque el pedido llega por
          WhatsApp.
        </li>
        <li>Los productos del pedido y las notas que escribas.</li>
      </ul>
      <p>
        No recogemos datos sensibles ni datos de menores de edad. El sitio no
        guarda los datos del formulario en ningún servidor: se escriben en el
        mensaje de WhatsApp que tú decides enviar. Lo único que el sitio guarda,
        y solo en tu navegador, es la lista de productos del carrito.
      </p>

      <h2>3. Para qué los usamos</h2>
      <ul>
        <li>Confirmar y gestionar tu pedido.</li>
        <li>Coordinar la entrega o el recojo en sede.</li>
        <li>Emitir y enviarte la factura electrónica.</li>
        <li>Atender garantías, devoluciones, peticiones, quejas y reclamos.</li>
        <li>Cumplir obligaciones legales, contables y tributarias.</li>
      </ul>
      <p>
        No usamos tus datos para enviarte publicidad, y no los vendemos ni los
        cedemos a terceros.
      </p>

      <h2>4. Con quién se comparten</h2>
      <p>
        Solo con quien es necesario para atender tu pedido: WhatsApp (Meta),
        por donde llega el pedido; el proveedor autorizado de facturación
        electrónica; y la DIAN u otras autoridades cuando la ley lo exija.
      </p>

      <h2>5. Tus derechos</h2>
      <p>Según el artículo 8 de la Ley 1581 de 2012, puedes:</p>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos.</li>
        <li>Pedir prueba de la autorización que nos diste.</li>
        <li>Saber qué uso le hemos dado a tus datos.</li>
        <li>
          Revocar la autorización o pedir que suprimamos tus datos, salvo
          cuando la ley nos obligue a conservarlos (por ejemplo, las facturas).
        </li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio (
          <a href={URL_SIC} target="_blank" rel="noopener noreferrer">
            www.sic.gov.co
          </a>
          ).
        </li>
        <li>Acceder a tus datos de forma gratuita.</li>
      </ul>

      <h2>6. Cómo ejercerlos</h2>
      <p>
        Escríbenos a <a href={`mailto:${EMPRESA.correo}`}>{EMPRESA.correo}</a>{" "}
        indicando tu nombre, tu documento, qué solicitas y un medio para
        responderte.
      </p>
      <ul>
        <li>
          <strong>Consultas</strong> (saber qué datos tenemos y cómo los
          usamos): respondemos en máximo 10 días hábiles, prorrogables 5 días
          hábiles más avisándote el motivo.
        </li>
        <li>
          <strong>Reclamos</strong> (corregir, actualizar, suprimir o revocar):
          respondemos en máximo 15 días hábiles, prorrogables 8 días hábiles
          más avisándote el motivo.
        </li>
      </ul>

      <h2>7. Autorización</h2>
      <p>
        Antes de enviar un pedido, el carrito te pide marcar una casilla para
        autorizar el tratamiento de tus datos según esta política. Sin esa
        autorización no se puede enviar el pedido.
      </p>

      <h2>8. Conservación y vigencia</h2>
      <p>
        Conservamos tus datos mientras sean necesarios para las finalidades de
        esta política y durante el tiempo que exijan las normas contables y
        tributarias. Esta política rige desde la fecha de actualización
        indicada arriba. Si cambia, publicaremos la nueva versión en esta
        misma página.
      </p>
    </PaginaLegal>
  );
}
