import { useState } from "react";
import { Check, Info, Nfc } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { availabilityLabel, categories, messages, products, type Product } from "@/data";
import { priceLabel } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { useContact } from "./ContactDialog";

const categoryLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));

function ProductImage({ product, className }: { product: Product; className?: string }) {
  const [failed, setFailed] = useState(false);
  const show = product.image && !failed;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-background",
        className,
      )}
    >
      {show ? (
        <img
          src={product.image}
          alt={`Foto da placa ${product.name}`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
          <div aria-hidden className="grid-pattern absolute inset-0" />
          <Nfc className="relative size-8 text-silver" strokeWidth={1.4} />
          <span className="relative font-mono text-[0.65rem] uppercase tracking-[0.2em]">
            Foto oficial em breve
          </span>
        </div>
      )}
    </div>
  );
}

function PriceRow({ product }: { product: Product }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">Preço</p>
        <p className="font-display text-lg font-semibold">{priceLabel(product)}</p>
      </div>
      <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
        {availabilityLabel[product.availability]}
      </span>
    </div>
  );
}

export function Products() {
  const [filter, setFilter] = useState<(typeof categories)[number]["id"]>("todos");
  const [detail, setDetail] = useState<Product | null>(null);
  const { openContact } = useContact();

  const visible = filter === "todos" ? products : products.filter((p) => p.category === filter);

  const requestQuote = (p: Product) => {
    setDetail(null);
    openContact({ title: `Orçamento · ${p.name}`, message: messages.product(p.name) });
  };

  return (
    <section id="produtos" className="section">
      <div className="container-site">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">Catálogo</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Nossos produtos</h2>
            <p className="mt-3 text-muted-foreground">
              Placas inteligentes personalizadas e configuradas para o seu negócio.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrar produtos"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
          >
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
                className={cn(
                  "h-10 shrink-0 rounded-full border px-4 text-sm transition-colors",
                  filter === c.id
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-silver/40 hover:text-foreground",
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((p) => (
            <li key={p.id} className="card-surface card-interactive flex min-w-0 flex-col p-4">
              <ProductImage product={p} className="aspect-[4/3]" />
              <div className="flex flex-1 flex-col px-1 pt-5">
                <p className="eyebrow">{categoryLabel[p.category]}</p>
                <h3 className="mt-2 text-xl font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                <ul className="mt-4 space-y-1.5">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-silver" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <div className="hairline mb-4" />
                  <PriceRow product={p} />
                  <div className="mt-4 grid grid-cols-1 gap-2 min-[360px]:grid-cols-[1fr_auto]">
                    <Button variant="chrome" size="touch" onClick={() => requestQuote(p)}>
                      Solicitar orçamento
                    </Button>
                    <Button
                      variant="line"
                      size="touch"
                      onClick={() => setDetail(p)}
                      aria-label={`Ver detalhes de ${p.name}`}
                    >
                      Detalhes
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="card-surface max-h-[90dvh] max-w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border-border p-5 sm:max-w-lg sm:p-6">
          {detail && (
            <>
              <ProductImage product={detail} className="aspect-[16/9]" />
              <DialogHeader className="text-left">
                <p className="eyebrow">{categoryLabel[detail.category]}</p>
                <DialogTitle className="font-display text-2xl">{detail.name}</DialogTitle>
                <DialogDescription className="leading-relaxed">
                  {detail.description}
                </DialogDescription>
              </DialogHeader>
              <ul className="grid gap-2 sm:grid-cols-2">
                {detail.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-silver" />
                    {f}
                  </li>
                ))}
              </ul>
              {detail.note && (
                <p className="flex gap-2 rounded-xl border border-border bg-background/60 p-3 text-xs leading-relaxed text-muted-foreground">
                  <Info className="mt-0.5 size-4 shrink-0" />
                  {detail.note}
                </p>
              )}
              <PriceRow product={detail} />
              <Button variant="chrome" size="xl" onClick={() => requestQuote(detail)}>
                Solicitar orçamento
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
