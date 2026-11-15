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

  it("ships with no invented founder numbers", () => {
    for (const f of founders) expect(f.whatsapp).toBe("");
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
