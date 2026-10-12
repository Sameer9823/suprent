import { cn } from "@/lib/utils";

export function Container({
  className,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "header" | "footer" | "nav" }) {
  return <Tag className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)} {...props} />;
}
