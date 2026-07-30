import { getCloudinaryCardUrl } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BateriaProps = {
  logo: string | null;
  name: string;
  description: string;
};

export function Bateria({ logo, name, description }: BateriaProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/baterias/${name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute  z-30 aspect-video bg-black/35" />
      <Image
        src={getCloudinaryCardUrl(logo ?? "baterias/MAC")}
        alt="Event cover"
        width={500}
        height={280}
        className="relative z-20 aspect-video w-full object-scale-down cursor-pointer"
        onClick={handleClick}
      />
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full" onClick={handleClick}>
          Ver más
        </Button>
      </CardFooter>
    </Card>
  );
}
