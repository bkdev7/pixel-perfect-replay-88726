import { describe, expect, it } from "vitest";
import { buildContactMessage, priceLabel, whatsappLink } from "@/lib/contact";
import { founders, products } from "@/data";

describe("WhatsApp links", () => {
  it("returns no link while a founder number is not configured", () => {
    expect(whatsappLink("", "Olá")).toBeNull();
  });

  it("builds a wa.me link with only digits and the encoded message", () => {
    expect(whatsappLink("+55 (11) 99999-8888", "Olá! NFC Google")).toBe(
      "https://wa.me/5511999998888?text=Ol%C3%A1!%20NFC%20Google",
    );
  });

  it("uses Vitor's configured number in international format", () => {
    const vitor = founders.find((f) => f.id === "vitor");
    expect(vitor?.whatsapp).toBe("5511914364180");
    expect(whatsappLink(vitor?.whatsapp ?? "", "Olá")).toMatch(
      /^https:\/\/wa\.me\/5511914364180\?text=/,
    );
  });

  it("uses João's configured number in international format", () => {
    const joao = founders.find((f) => f.id === "joao");
    expect(joao?.whatsapp).toBe("5511945572901");
    expect(whatsappLink(joao?.whatsapp ?? "", "Olá")).toMatch(
      /^https:\/\/wa\.me\/5511945572901\?text=/,
    );
  });
});

describe("Prices", () => {
  it("shows 'Sob consulta' when the price is not defined", () => {
    expect(priceLabel({ price: null, showPrice: true })).toBe("Sob consulta");
  });

  it("shows 'Sob consulta' when the price is hidden", () => {
    expect(priceLabel({ price: 49.9, showPrice: false })).toBe("Sob consulta");
  });

  it("formats a configured price in reais", () => {
    expect(priceLabel({ price: 49.9, showPrice: true }).replace(/\s/g, " ")).toBe("R$ 49,90");
  });

  it("ships with no invented prices", () => {
    for (const p of products) expect(p.price).toBeNull();
  });
});

describe("Messages", () => {
  it("includes the product name in a product quote", () => {
    expect(buildContactMessage("produto", { productName: "NFC Google" })).toBe(
      "Olá! Encontrei a NFC Google no site da NFC FUTURE e gostaria de solicitar um orçamento.",
    );
  });
});
