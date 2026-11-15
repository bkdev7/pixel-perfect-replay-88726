import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#produtos", label: "Produtos" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#solucoes", label: "Soluções" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#atacado", label: "Atacado e revenda" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-colors duration-300",
          scrolled || open
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-site flex h-full items-center justify-between gap-4">
          <a href="#inicio" aria-label="NFC FUTURE — início" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navLinks.slice(1).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="chrome" size="sm" className="hidden h-9 px-4 sm:inline-flex">
              <a href="#contato">Solicitar orçamento</a>
            </Button>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-border text-foreground xl:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-[var(--header-h)] z-50 bg-background backdrop-blur-xl transition-all duration-300 xl:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Menu móvel" className="container-site flex h-full flex-col pb-8 pt-6">
          <ul className="flex flex-col">
            {navLinks.map((l, i) => (
              <li
                key={l.href}
                className={cn(
                  "border-b border-border transition-all duration-500",
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                )}
                style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 font-display text-xl font-medium text-foreground"
                >
                  {l.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="chrome" size="xl" className="mt-auto w-full">
            <a href="#contato" onClick={() => setOpen(false)}>
              Solicitar orçamento
            </a>
          </Button>
        </nav>
      </div>
    </>
  );
}
