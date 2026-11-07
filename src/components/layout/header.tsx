"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCarrito } from "@/lib/carrito";
import { HashLink } from "./hash-link";

// Buscador del header: solo lleva a `/baterias?q=…`, donde se arma el resultado
// en servidor. Es un formulario GET, asi que funciona tambien sin JavaScript.
function Buscador({ onBuscar }: { onBuscar?: () => void }) {
  return (
    <Form action="/baterias" onSubmit={onBuscar} className="relative w-full" role="search">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-zinc-500"
      />
      <Input
        type="search"
        name="q"
        placeholder="Buscar referencia…"
        aria-label="Buscar batería por referencia"
        className="pl-8"
      />
    </Form>
  );
}

// Los enlaces del header van sueltos, sin envolver en <Button asChild>.
// Con `asChild` el botón se convierte en un Slot de Radix que se fusiona
// con el hijo: con un <Link> normal funciona, pero con un componente que trae
// su propio onClick —como HashLink— no hay garantía de cuál gana. Sin la
// envoltura, el header y el footer usan el mismo componente y se comportan
// igual por construcción, no por suerte.
const navDesktop =
  "inline-flex h-8 items-center rounded-lg px-2.5 text-xl font-medium " +
  "text-[#947A73] underline-offset-4 transition-colors hover:text-primary hover:underline " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 " +
  "whitespace-nowrap select-none cursor-pointer md:w-auto";

const navMovil =
  "flex w-full items-center justify-start rounded-lg px-4 py-2 text-base " +
  "text-[#947A73] transition-colors hover:bg-muted hover:text-foreground " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 cursor-pointer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  // El header no se desmonta al navegar: sin controlar el estado, el menu
  // movil quedaria abierto encima de los resultados de la busqueda.
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { unidades } = useCarrito();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <header
      className={`fixed w-full top-0 flex bg-white/80 blur-[2px]backdrop-blur-md dark:bg-gray-900 shadow-lg box-border z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center gap-4 px-4 py-2 sm:px-6 md:flex-row md:justify-between md:items-center lg:px-8">
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={200}
          loading="eager"
          className="h-auto md:mr-2"
        />
        <div className="md:w-auto">
          <div className="hidden gap-2 md:flex md:w-auto md:flex-row md:items-center md:gap-1">
            <Link href="/" className={navDesktop}>
              Inicio
            </Link>
            <HashLink href="/#baterias" className={navDesktop}>
              Baterías
            </HashLink>
            <Link href="/baterias" className={navDesktop}>
              Catálogo
            </Link>
            <Link href="/contacto" className={navDesktop}>
              Contacto
            </Link>
          </div>
          <div className="md:hidden">
            <Sheet open={menuAbierto} onOpenChange={setMenuAbierto}>
              <SheetTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  aria-label="Abrir menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="top">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 px-4 pb-4">
                  <Buscador onBuscar={() => setMenuAbierto(false)} />
                  <SheetClose asChild>
                    <Link href="/" className={navMovil}>
                      Inicio
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <HashLink href="/#baterias" className={navMovil}>
                      Baterías
                    </HashLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/baterias" className={navMovil}>
                      Catálogo
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/contacto" className={navMovil}>
                      Contacto
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
          <div className="hidden w-56 md:block">
            <Buscador />
          </div>
          <Button size={"icon"} asChild className="relative">
            <Link
              href="/carrito"
              aria-label={unidades > 0 ? `Carrito, ${unidades} productos` : "Carrito"}
            >
            {unidades > 0 ? (
              <span className="absolute -top-1.5 -right-1.5 flex min-w-5 items-center justify-center rounded-full bg-red-700 px-1 text-xs font-semibold text-white">
                {unidades}
              </span>
            ) : null}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
