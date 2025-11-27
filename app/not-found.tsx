import { Container } from "@/components/craft";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Hero featuredURL="/404.webp" />
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
          <p className="mb-8">
            Désolé, la page que vous recherchez n&apos;existe pas.
          </p>
          <Button asChild className="not-prose mt-6">
            <Link href="/">Retour à l&apos;accueil</Link>
          </Button>
        </div>
      </Container>
    </>

  );
}
