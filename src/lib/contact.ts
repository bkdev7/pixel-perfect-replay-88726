import { messages, type ContactType, type Product } from "@/data";

/** Returns a wa.me link, or null when the number is not configured/invalid. */
export function whatsappLink(number: string, message: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (digits.length < 10) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Price label: "Sob consulta" when hidden or not defined. */
export function priceLabel(product: Pick<Product, "price" | "showPrice">): string {
  if (!product.showPrice || product.price === null) return "Sob consulta";
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    product.price,
  );
}

/** Builds the pre-filled WhatsApp message from the contact section choices. */
export function buildContactMessage(
  type: ContactType,
  opts: { productName?: string | undefined; quantity?: number | undefined } = {},
): string {
  const { productName, quantity } = opts;
  const qty = quantity && quantity > 0 ? ` Quantidade aproximada: ${quantity} unidade(s).` : "";
  const product = productName ? ` Produto: ${productName}.` : "";

  switch (type) {
    case "produto":
      return productName ? messages.product(productName) + qty : messages.general;
    case "quantidade":
      return `Olá! Conheci a NFC FUTURE pelo site e gostaria de fazer um pedido em quantidade.${product}${qty}`;
    case "revenda":
      return `Olá! Tenho interesse em revender produtos NFC FUTURE e gostaria de conhecer as condições.${product}${qty}`;
    case "personalizado":
      return messages.custom;
    case "parceria":
      return "Olá! Conheci a NFC FUTURE pelo site e gostaria de conversar sobre uma parceria comercial.";
    case "duvidas":
    default:
      return "Olá! Conheci a NFC FUTURE pelo site e tenho uma dúvida.";
  }
}
