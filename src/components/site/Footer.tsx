import { Instagram, Mail } from "lucide-react";

import { site } from "@/data";
import { navLinks } from "./Header";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">{site.slogan}</p>
        </div>

        <nav aria-label="Links rápidos">
          <p className="eyebrow mb-4">Navegação</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm md:grid-cols-1">
            {navLinks.slice(1).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4">Contato</p>
          <ul className="grid gap-2.5 text-sm">
            <li>
              <a
                href="#contato"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                WhatsApp dos fundadores
              </a>
            </li>
            {site.instagram.url && (
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram className="size-4" /> {site.instagram.handle || "Instagram"}
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" /> {site.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="hairline" />
      <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}. Todos os direitos reservados.
        </p>
        <p className="font-mono tracking-wide">{site.slogan}</p>
      </div>
    </footer>
  );
}
