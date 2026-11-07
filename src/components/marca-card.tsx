import { getCloudinaryCardUrl } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MarcaCardProps = {
  slug: string;
  logo: string | null;
  name: string;
  description: string;
};

export function MarcaCard({ slug, logo, name, description }: MarcaCardProps) {
  const href = `/baterias/${slug}`;

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute  z-30 aspect-video bg-black/35" />
      <Link href={href}>
        {/* Sin logo se escribe el nombre. Antes caia al logo de MAC, que
            mostraba la marca equivocada en "Otras marcas". */}
        {logo ? (
          <Image
            src={getCloudinaryCardUrl(logo)}
            alt={name}
            width={500}
            height={280}
            className="relative z-20 aspect-video w-full object-scale-down"
          />
        ) : (
          <div className="relative z-20 flex aspect-video w-full items-center justify-center bg-zinc-100 text-3xl font-black tracking-tight text-zinc-800">
            {name}
          </div>
        )}
      </Link>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link href={href}>Ver más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
