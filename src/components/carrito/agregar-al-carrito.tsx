"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCarrito } from "@/lib/carrito";
import { cn } from "@/lib/utils";

export function AgregarAlCarrito({
  id,
  titulo,
  disponible,
  className,
}: {
  id: string;
  titulo: string;
  disponible: boolean;
  className?: string;
}) {
  const { agregar } = useCarrito();
  const router = useRouter();

  if (!disponible) {
    return (
      <Button disabled className={className}>
        No disponible
      </Button>
    );
  }

  return (
    <Button
      className={cn("bg-green-600 hover:bg-green-700", className)}
      onClick={() => {
        agregar(id);
        toast.success("Agregada al carrito", {
          description: titulo,
          action: { label: "Ver carrito", onClick: () => router.push("/carrito") },
        });
      }}
    >
      Agregar al carrito
    </Button>
  );
}
