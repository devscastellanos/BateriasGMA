import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Header() {
  return (
    <header className="flex w-full bg-white/80 blur-[2px]backdrop-blur-md dark:bg-gray-900">
    <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-center gap-4 px-4 py-2 sm:px-6 md:flex-row md:justify-between md:items-center lg:px-8">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="md:mr-2"
      />
      <div className="md:w-auto">
        <div className="hidden gap-2 md:flex md:w-auto md:flex-row md:items-center md:gap-1">
          <Button variant={"link"} className="md:w-auto">Inicio</Button>
          <Button variant={"link"} className="md:w-auto">Servicios</Button>
          <Button variant={"link"} className="md:w-auto">Nosotros</Button>
          <Button variant={"link"} className="md:w-auto">Contacto</Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"} aria-label="Abrir menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4 pb-4">
                <SheetClose asChild>
                  <Button variant={"ghost"} className="justify-start">Inicio</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant={"ghost"} className="justify-start">Servicios</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant={"ghost"} className="justify-start">Nosotros</Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant={"ghost"} className="justify-start">Contacto</Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
        <Button size={"icon"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
        </Button>
      </div>
    </div>
    </header>
  );
}