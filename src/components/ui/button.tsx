import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light" | "glass";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors duration-200 select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-white hover:bg-forest-dark",
  secondary: "bg-charcoal text-white hover:bg-ink",
  outline: "border border-ink/20 bg-white text-ink hover:border-forest hover:bg-sage/40",
  ghost: "text-forest hover:bg-sage/60",
  light: "bg-white text-forest hover:bg-sage",
  glass: "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base",
};

export function buttonStyles({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string }) {
  return cn(base, variants[variant], sizes[size], className);
}

const Arrow = () => (
  <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
);

interface Common {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: Common & Omit<React.ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant,
  size,
  arrow,
  loading,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: Common & { loading?: boolean } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Loader2 aria-hidden className="size-4 animate-spin" />}
      {children}
      {arrow && !loading && <Arrow />}
    </button>
  );
}
