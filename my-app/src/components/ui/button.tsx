import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const CLASS_BY_VARIANT: Record<ButtonVariant, string> = {
  primary:
    "rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700",
  secondary:
    "rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100",
  danger:
    "rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${CLASS_BY_VARIANT[variant]} ${className ?? ""}`.trim()}
    />
  );
}
