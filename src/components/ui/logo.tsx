import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/** Official SUPGS logo image from /public/logo.jpeg. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="SUPGS home" className={cn("inline-flex items-center", className)}>
      <Image src="/logo.jpeg" alt="SUPGS logo" width={80} height={80} priority className="object-contain" />
    </Link>
  );
}
