"use client";

import { Button } from "../ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
import { openWhatsApp } from "@/lib/utils";
import {
  BatteryCharging,
  UserStar,
  Recycle,
  CreditCard,
  Zap,
  Crown,
} from "lucide-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  ItemGroup,
} from "@/components/ui/item";

export default function Tittle() {
  return (
    <div id="inicio" className="flex flex-col bg-[#D9C5C5]">
      {/* Titulo */}
      <div className="flex flex-col ml-4 mt-4">
        <h1 className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-black sm:text-4xl md:text-5xl">
          <span className="text-[#7A0000]">Baterías</span> para carro a{" "}
          <span className="text-[#7A0000]">domicilio</span> en{" "}
          <span className="text-[#7A0000]">Bogotá</span>
        </h1>
        <h2 className="mt-3 max-w-3xl text-pretty text-base font-medium leading-relaxed text-[#2D2D2D] sm:text-lg md:text-xl">
          ¡Servicio rápido y confiable para tu vehículo, envío e instalación!
        </h2>
      </div>

      {/* Lista items*/}
      <div className="flex flex-col md:flex-row">
        <div className="flex mt-4 flex-col gap-6 rounded-lg bg-[#FF0D0D] md:w-2/3 p-6 text-white mr-4 md:mr-0 justify-center items-center">
          <h3 className="text-balance text-2xl font-bold">
            Cotiza con nosotros ahora mismo
          </h3>
          <ItemGroup className="flex flex-wrap gap-2">
            <Item variant="default">
              <ItemMedia variant="icon" className="">
                <BatteryCharging className="size-10" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-2xl font-semibold">
                  Baterías
                </ItemTitle>
                <ItemDescription className="text-base text-white/90">
                  Baterías para todo tipo de vehículos.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="default">
              <ItemMedia variant="icon">
                <UserStar className="size-10" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-2xl font-semibold">Somos</ItemTitle>
                <ItemDescription className="text-base text-white/90">
                  Distribuidores autorizados de las mejores marcas.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="default">
              <ItemMedia variant="icon">
                <Recycle className="size-10" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-2xl font-semibold">
                  Chatarra
                </ItemTitle>
                <ItemDescription className="text-base text-white/90">
                  Recibimos tu batería usada por parte de pago.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="default">
              <ItemMedia variant="icon">
                <CreditCard className="size-10" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-2xl font-semibold">
                  Métodos de pago
                </ItemTitle>
                <ItemDescription className="text-base text-white/90">
                  Addi, sistecredito, transferencia, débito, crédito, efectivo.
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="default">
              <ItemMedia variant="icon">
                <Zap className="size-10" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-2xl font-semibold">
                  Alternador
                </ItemTitle>
                <ItemDescription className="text-sm text-white/90">
                  Revisión gratuita de tu sistema eléctrico
                </ItemDescription>
              </ItemContent>
            </Item>
            <Item variant="default">
              <ItemMedia variant="icon">
                <Crown className="size-10" />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="text-2xl font-semibold">
                  ¿Por qué elegirnos?
                </ItemTitle>
                <ItemDescription className="text-base text-white/90">
                  Somos tu mejor opción para baterías de carro a domicilio en
                  Bogotá.
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>

          <div className="flex justify-center content-center">
            <Button
              variant={"secondary"}
              className="min-w-1/2 text-black"
              size={"lg"}
              onClick={() =>
                openWhatsApp(
                  "573027015752",
                  "Buen día, estoy interesado en cotizar una batería para mi carro.",
                )
              }
            >
              <Image
                src="/whatsapp.svg"
                alt=""
                width={18}
                height={18}
                aria-hidden="true"
              />
              Contáctanos
            </Button>
          </div>
        </div>
        <div className="relative flex mt-4 bg-white rounded-lg w-full aspect-[3/2]">
          <Image
            src={"/cupra.png"}
            alt="foto1"
            fill
            className="object-cover quality-100 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
