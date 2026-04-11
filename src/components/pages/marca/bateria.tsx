import { getCloudinaryCardUrl } from "@/lib/cloudinary"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type BateriaProps = {
  logo: string | null
  name: string
  description: string
}

export function Bateria({ logo, name, description }: BateriaProps) {
  return (
    
      <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute  z-30 aspect-video bg-black/35" />
      <img
        src={getCloudinaryCardUrl(logo ?? "baterias/MAC")}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-scale-down"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
         {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter>
    </Card>
    
  )
}
