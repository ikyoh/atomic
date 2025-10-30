"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton({ className }: { className?: any }) {
  const router = useRouter();

  return (
    <Button variant="icon" size="icon" className={className} onClick={() => router.back()}>
      <Image
        src="/icons/arrow.svg"
        alt="Back"
        width={42}
        height={22}
        className="scale-30"
      />
    </Button>
  );
}
