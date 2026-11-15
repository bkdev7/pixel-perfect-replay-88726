import { ArrowRight, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { messages, site } from "@/data";
import { useContact } from "./contact-context";

/**
 * Hero. Quando o banner oficial for enviado, ele substitui a ilustração da placa
 * (bloco "NFC plate illustration") sem alterar a marca.
 */
export function Hero() {
  const { openContact } = useContact();

  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden pt-[calc(var(--header-h)+2.5rem)] pb-8 md:pt-[calc(var(--header-h)+4rem)] md:pb-10"
    >
      <div aria-hidden className="grid-pattern absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="glow-silver absolute -top-40 left-1/2 -z-10 h-[38rem] w-[60rem] -translate-x-1/2"
      />

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div className="reveal max-w-xl">
          <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-silver" />
            NFC · QR Code · Produtos inteligentes
          </p>
          <h1 className="text-[2.35rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">
            O futuro começa com uma <span className="text-chrome">conexão.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Soluções inteligentes em NFC e QR Code para conectar negócios, pessoas e oportunidades.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="chrome" size="xl" className="shine">
              <a href="#produtos">
                Conheça nossos produtos <ArrowRight />
              </a>
            </Button>
            <Button
              variant="line"
              size="xl"
              onClick={() =>
                openContact({ title: "Fale com a NFC FUTURE", message: messages.general })
              }
            >
              Fale com a NFC FUTURE
            </Button>
          </div>
          <p className="mt-8 font-mono text-xs tracking-wide text-muted-foreground">
            {site.slogan}
          </p>
        </div>

        {/* NFC plate illustration */}
        <div className="reveal relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem]">
          <div aria-hidden className="absolute inset-[12%]">
            <span className="nfc-wave" />
            <span className="nfc-wave" style={{ animationDelay: "1.05s" }} />
            <span className="nfc-wave" style={{ animationDelay: "2.1s" }} />
          </div>
          <div className="float-soft absolute inset-[22%] chrome-ring rounded-[2rem] card-surface flex flex-col items-center justify-center gap-3 p-6">
            <span className="text-chrome font-display text-6xl font-bold tracking-tighter sm:text-7xl">
              NF
            </span>
            <span className="hairline w-2/3" />
            <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
              <QrCode className="size-3.5" /> Aproxime aqui
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
