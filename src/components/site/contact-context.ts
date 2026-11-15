import { createContext, useContext } from "react";

export type ContactRequest = { title: string; description?: string; message: string };

/** Kept in its own module so editing the dialog UI never recreates the context. */
export const ContactContext = createContext<{ openContact: (r: ContactRequest) => void } | null>(
  null,
);

const fallback = {
  // Without a provider (e.g. mid hot-reload), send the visitor to the contact section.
  openContact: () => {
    if (typeof document !== "undefined") {
      document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
    }
  },
};

export function useContact() {
  return useContext(ContactContext) ?? fallback;
}
