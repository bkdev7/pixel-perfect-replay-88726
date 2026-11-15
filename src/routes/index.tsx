import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { ContactProvider, FloatingContact } from "@/components/site/ContactDialog";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Products } from "@/components/site/Products";
import { About, Contact, HowItWorks, Solutions, Wholesale } from "@/components/site/Sections";

const title = "NFC FUTURE | Tecnologia NFC e Soluções Inteligentes";
const description =
  "Conheça a NFC FUTURE. Placas NFC, QR Code, soluções digitais e produtos personalizados para empresas e revendedores.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
  }),
  component: Index,
});

/** Fades sections in as they enter the viewport. */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useReveal();
  return (
    <ContactProvider>
      <a
        href="#produtos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main>
        <Hero />
        <Products />
        <HowItWorks />
        <Solutions />
        <About />
        <Wholesale />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </ContactProvider>
  );
}
