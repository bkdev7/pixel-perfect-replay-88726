import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { founders, messages, type Founder } from "@/data";
import { whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-4 fill-current", className)}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.3l5.7-1.5a11.33 11.33 0 0 0 5.77 1.47c6.26 0 11.36-5.1 11.36-11.36 0-3.04-1.18-5.89-3.32-8.04" />
    </svg>
  );
}

/** WhatsApp button for one founder. Disabled while the number isn't configured. */
export function FounderButton({
  founder,
  message,
  className,
}: {
  founder: Founder;
  message: string;
  className?: string;
}) {
  const href = whatsappLink(founder.whatsapp, message);
  if (!href) {
    return (
      <Button
        variant="line"
        size="touch"
        disabled
        className={cn("w-full min-w-0", className)}
        title="Número de WhatsApp ainda não configurado"
      >
        <WhatsAppIcon />
        <span className="truncate">{founder.firstName} · em configuração</span>
      </Button>
    );
  }
  return (
    <Button asChild variant="chrome" size="touch" className={cn("w-full", className)}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        WhatsApp {founder.firstName}
      </a>
    </Button>
  );
}

type ContactRequest = { title: string; description?: string; message: string };

const ContactContext = createContext<{ openContact: (r: ContactRequest) => void } | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used inside <ContactProvider>");
  return ctx;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<ContactRequest | null>(null);
  const [open, setOpen] = useState(false);

  const openContact = useCallback((r: ContactRequest) => {
    setRequest(r);
    setOpen(true);
  }, []);

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="card-surface max-w-[calc(100%-2rem)] rounded-2xl border-border p-5 sm:max-w-md sm:p-6">
          <DialogHeader className="text-left">
            <p className="eyebrow">Atendimento direto</p>
            <DialogTitle className="font-display text-xl">{request?.title}</DialogTitle>
            <DialogDescription>
              {request?.description ??
                "Escolha com qual fundador você quer conversar pelo WhatsApp."}
            </DialogDescription>
          </DialogHeader>
          {request && (
            <>
              <blockquote className="min-w-0 break-words rounded-xl border border-border bg-background/60 p-4 text-sm leading-relaxed text-muted-foreground">
                “{request.message}”
              </blockquote>
              <div className="grid gap-3">
                {founders.map((f) => (
                  <div key={f.id} className="flex min-w-0 items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-secondary font-display text-sm font-semibold">
                      {f.initials}
                    </span>
                    <FounderButton founder={f} message={request.message} />
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ContactContext.Provider>
  );
}

/** One discreet floating shortcut, shown after the hero. */
export function FloatingContact() {
  const { openContact } = useContact();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Falar com a NFC FUTURE pelo WhatsApp"
      onClick={() => openContact({ title: "Fale com a NFC FUTURE", message: messages.general })}
      className={cn(
        "bg-chrome fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full text-primary-foreground shadow-[var(--shadow-chrome)] transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <MessageCircle className="size-5" />
    </button>
  );
}
