import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  description,
  action,
  className,
  as: Tag = "h2",
  inverted = false,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
  inverted?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        <Tag className={cn("text-3xl sm:text-4xl", inverted && "text-white")}>{title}</Tag>
        {description && (
          <p className={cn("mt-3 text-base sm:text-lg", inverted ? "text-white/80" : "text-body")}>{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
