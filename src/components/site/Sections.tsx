import { useState } from "react";
import {
  ArrowRight,
  BatteryWarning,
  Boxes,
  Briefcase,
  GraduationCap,
  Handshake,
  Instagram,
  Link2,
  Mail,
  Package,
  Smartphone,
  Sparkles,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  contactTypes,
  founders,
  messages,
  products,
  site,
  solutions,
  solutionStatusLabel,
  type ContactType,
  type SolutionStatus,
} from "@/data";
import { buildContactMessage } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { FounderButton } from "./ContactDialog";
import { useContact } from "./contact-context";

function SectionHead({
  eyebrow,
  title,
  text,
  center,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("reveal max-w-2xl", center && "mx-auto text-center")}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

/* ---------------- Como funciona ---------------- */

const steps = [
  {
    n: "01",
    title: "Aproxime",
    text: "O cliente aproxima um celular compatível da placa NFC ou utiliza o QR Code.",
    icon: Smartphone,
  },
  {
    n: "02",
    title: "Acesse",
    text: "O dispositivo abre ou oferece acesso ao conteúdo configurado.",
    icon: Link2,
  },
  {
    n: "03",
    title: "Conecte",
    text: "O visitante acessa o serviço digital do estabelecimento.",
    icon: Sparkles,
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section relative border-y border-border bg-surface">
      <div className="container-site">
        <SectionHead
          eyebrow="Como funciona"
          title={
            <>
              Tecnologia simples. <span className="text-chrome">Possibilidades inteligentes.</span>
            </>
          }
          center
        />
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal card-surface relative p-6 sm:p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="relative grid size-12 place-items-center rounded-full border border-border bg-background">
                  {i === 0 && (
                    <span aria-hidden className="absolute inset-0">
                      <span className="nfc-wave" />
                    </span>
                  )}
                  <s.icon className="size-5 text-silver" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-sm text-muted-foreground">{s.n}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="reveal mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-xl border border-border bg-background/50 p-4 text-sm leading-relaxed text-muted-foreground">
          <BatteryWarning className="mt-0.5 size-4 shrink-0 text-silver" />A placa funciona sem
          bateria própria e não precisa estar conectada à internet. O celular normalmente precisa de
          internet para abrir o conteúdo online.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Soluções ---------------- */

const statusStyle: Record<SolutionStatus, string> = {
  disponivel: "bg-primary text-primary-foreground border-transparent",
  avaliacao: "border-silver/40 text-foreground",
  planejamento: "border-border text-muted-foreground",
};

export function Solutions() {
  const { openContact } = useContact();
  return (
    <section id="solucoes" className="section">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Soluções personalizadas"
            title="NFC para as necessidades do seu negócio."
            text="Além do catálogo, avaliamos aplicações específicas da tecnologia para clientes e empresas."
          />
          <div className="reveal flex flex-wrap gap-2 text-xs">
            {(Object.keys(solutionStatusLabel) as SolutionStatus[]).map((s) => (
              <span key={s} className={cn("rounded-full border px-3 py-1", statusStyle[s])}>
                {solutionStatusLabel[s]}
              </span>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <li
              key={s.title}
              className="reveal card-surface card-interactive flex items-center justify-between gap-3 px-5 py-4"
              style={{ transitionDelay: `${(i % 3) * 60}ms` }}
            >
              <span className="font-medium">{s.title}</span>
              <span
                className={cn(
                  "shrink-0 rounded-full border px-2.5 py-0.5 text-[0.7rem]",
                  statusStyle[s.status],
                )}
              >
                {solutionStatusLabel[s.status]}
              </span>
            </li>
          ))}
        </ul>

        <div className="reveal mt-10">
          <Button
            variant="chrome"
            size="xl"
            onClick={() =>
              openContact({ title: "Projeto personalizado", message: messages.custom })
            }
          >
            Solicitar projeto personalizado <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Sobre + Fundadores ---------------- */

const values = ["Inovação", "Transparência", "Qualidade", "Compromisso", "Evolução contínua"];

export function About() {
  return (
    <section id="sobre" className="section border-t border-border">
      <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead
            eyebrow="Sobre a NFC FUTURE"
            title={
              <>
                Tecnologia acessível, <span className="text-chrome">prática</span> e presente.
              </>
            }
          />
          <div className="reveal mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              A NFC FUTURE nasceu da iniciativa de dois empreendedores com uma visão em comum:
              tornar a tecnologia mais acessível, prática e presente no dia a dia dos negócios.
            </p>
            <p>
              Trabalhamos com soluções de conexão inteligente, buscando unir inovação,
              personalização e novas oportunidades para nossos clientes.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="reveal card-surface p-6">
            <p className="eyebrow">Missão</p>
            <p className="mt-3 leading-relaxed">
              Conectar pessoas e negócios por meio de soluções tecnológicas simples, eficientes e
              acessíveis.
            </p>
          </div>
          <div className="reveal card-surface p-6">
            <p className="eyebrow">Visão</p>
            <p className="mt-3 leading-relaxed">
              Expandir nossa atuação em tecnologia, produtos inteligentes, distribuição e soluções
              digitais, construindo uma marca reconhecida pela qualidade e inovação.
            </p>
          </div>
          <div className="reveal card-surface p-6">
            <p className="eyebrow">Valores</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {values.map((v) => (
                <li key={v} className="rounded-full border border-border px-3 py-1 text-sm">
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container-site mt-20">
        <SectionHead eyebrow="Fundadores" title="Quem está por trás da NFC FUTURE." />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {founders.map((f) => (
            <li key={f.id} className="reveal card-surface flex flex-col gap-6 p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="chrome-ring grid size-16 place-items-center rounded-2xl bg-background">
                  <span className="text-chrome font-display text-xl font-bold">{f.initials}</span>
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{f.name}</h3>
                  <p className="text-sm text-muted-foreground">{f.role}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.bio}</p>
              <FounderButton founder={f} message={messages.general} className="mt-auto" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Atacado ---------------- */

const wholesaleItems = [
  { label: "Compras em quantidade", icon: Boxes },
  { label: "Kits para revenda", icon: Package },
  { label: "Produtos personalizados", icon: Sparkles },
  { label: "Encomendas comerciais", icon: Store },
  { label: "Parcerias de distribuição", icon: Handshake },
  { label: "Projetos para empresas", icon: Briefcase },
];

export function Wholesale() {
  const { openContact } = useContact();
  return (
    <section
      id="atacado"
      className="section relative overflow-hidden border-y border-border bg-surface"
    >
      <div aria-hidden className="glow-silver absolute -right-40 top-0 h-[30rem] w-[40rem]" />
      <div className="container-site relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <SectionHead
            eyebrow="Atacado, revenda e parcerias"
            title={
              <>
                Cresça com a <span className="text-chrome">NFC FUTURE.</span>
              </>
            }
            text="Quer ampliar suas oportunidades com produtos NFC? Entre em contato para conhecer nossas condições comerciais, encomendas e possibilidades de parceria."
          />
          <div className="reveal mt-8">
            <Button
              variant="chrome"
              size="xl"
              onClick={() =>
                openContact({ title: "Condições de atacado", message: messages.wholesale })
              }
            >
              Consultar condições de atacado <ArrowRight />
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <ul className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
            {wholesaleItems.map((w) => (
              <li
                key={w.label}
                className="reveal flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm"
              >
                <w.icon className="size-4 shrink-0 text-silver" strokeWidth={1.6} />
                {w.label}
              </li>
            ))}
          </ul>
          <div className="reveal flex items-start gap-4 rounded-xl border border-dashed border-border p-5">
            <GraduationCap className="mt-0.5 size-5 shrink-0 text-silver" strokeWidth={1.6} />
            <div>
              <p className="flex flex-wrap items-center gap-2 font-medium">
                Treinamentos e orientação comercial
                <span className="rounded-full border border-border px-2 py-0.5 text-[0.7rem] text-muted-foreground">
                  Em planejamento
                </span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Consulte possibilidades futuras com os fundadores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contato ---------------- */

const needsProduct: ContactType[] = ["produto", "quantidade", "revenda"];
const needsQuantity: ContactType[] = ["produto", "quantidade", "revenda"];

const fieldClass =
  "h-12 w-full rounded-xl border border-input bg-background px-4 text-base text-foreground outline-none transition-colors focus:border-silver/60";

export function Contact() {
  const [type, setType] = useState<ContactType>("produto");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [quantity, setQuantity] = useState("");

  const product = products.find((p) => p.id === productId);
  const message = buildContactMessage(type, {
    productName: needsProduct.includes(type) ? product?.name : undefined,
    quantity: needsQuantity.includes(type) ? Number(quantity) || undefined : undefined,
  });

  return (
    <section id="contato" className="section">
      <div className="container-site">
        <SectionHead
          eyebrow="Contato e orçamentos"
          title="Fale direto com os fundadores."
          text="Monte sua mensagem e escolha com quem quer conversar. Nada é enviado ou armazenado — o WhatsApp abre com o texto pronto."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <form
            className="reveal card-surface grid content-start gap-5 p-6 sm:p-7"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Montar mensagem de WhatsApp"
          >
            <div className="grid gap-2">
              <label htmlFor="contact-type" className="text-sm font-medium">
                Tipo de atendimento
              </label>
              <select
                id="contact-type"
                className={fieldClass}
                value={type}
                onChange={(e) => setType(e.target.value as ContactType)}
              >
                {contactTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {needsProduct.includes(type) && (
              <div className="grid gap-2">
                <label htmlFor="contact-product" className="text-sm font-medium">
                  Produto
                </label>
                <select
                  id="contact-product"
                  className={fieldClass}
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {needsQuantity.includes(type) && (
              <div className="grid gap-2">
                <label htmlFor="contact-qty" className="text-sm font-medium">
                  Quantidade aproximada <span className="text-muted-foreground">(opcional)</span>
                </label>
                <input
                  id="contact-qty"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  placeholder="Ex.: 10"
                  className={fieldClass}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            )}

            <div className="grid gap-2">
              <p className="text-sm font-medium">Mensagem</p>
              <p
                aria-live="polite"
                className="rounded-xl border border-border bg-background/60 p-4 text-sm leading-relaxed text-muted-foreground"
              >
                “{message}”
              </p>
            </div>
          </form>

          <div className="grid content-start gap-4">
            {founders.map((f) => (
              <div key={f.id} className="reveal card-surface flex flex-col gap-5 p-6 sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="chrome-ring grid size-14 place-items-center rounded-2xl bg-background">
                    <span className="text-chrome font-display text-lg font-bold">{f.initials}</span>
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">Fale com {f.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {f.role} · pedidos, orçamentos e parcerias
                    </p>
                  </div>
                </div>
                <FounderButton founder={f} message={message} />
              </div>
            ))}

            {(site.instagram.url || site.email) && (
              <div className="reveal flex flex-wrap gap-3">
                {site.instagram.url && (
                  <Button asChild variant="line" size="touch">
                    <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                      <Instagram /> {site.instagram.handle || "Instagram"}
                    </a>
                  </Button>
                )}
                {site.email && (
                  <Button asChild variant="line" size="touch">
                    <a href={`mailto:${site.email}`}>
                      <Mail /> {site.email}
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
