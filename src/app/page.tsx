import Image from "next/image";
import Header from "@/components/pages/header"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Badge } from "@/components/ui/badge"
import { Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black items-center justify-between">
      <Header />
      
    </main>
  );
}
