import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-alpine/70 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-fg text-asphalt hover:bg-paper shadow-[0_1px_0_rgba(255,255,255,0.12)]",
        alpine: "bg-alpine text-asphalt hover:bg-alpine/90",
        ghost:
          "bg-transparent text-fg border border-border hover:bg-elevated",
      },
      size: {
        md: "h-11 px-5 text-sm rounded-[var(--radius-sm)]",
        lg: "h-12 px-6 text-base rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: Props) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
