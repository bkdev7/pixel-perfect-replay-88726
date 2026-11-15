import { cn } from "@/lib/utils";

/**
 * Marca provisória em texto. Substitua pelo logotipo oficial (logo NF cromado)
 * assim que o arquivo for enviado — não redesenhar a identidade oficial.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="bg-chrome grid size-8 place-items-center rounded-lg font-display text-[0.8rem] font-bold tracking-tight text-primary-foreground shadow-[var(--shadow-chrome)]"
      >
        NF
      </span>
      <span className="font-display text-[0.95rem] font-semibold tracking-[0.14em] text-foreground">
        NFC <span className="text-chrome">FUTURE</span>
      </span>
    </span>
  );
}
