/**
 * ============================================================
 *  NFC FUTURE — CONFIGURAÇÃO CENTRAL DO SITE
 * ============================================================
 *  Edite aqui: contatos, Instagram, e-mail, produtos, preços,
 *  disponibilidade, imagens e mensagens de WhatsApp.
 *  Nada comercial deve ficar espalhado pelos componentes.
 * ============================================================
 */

export const site = {
  name: "NFC FUTURE",
  slogan: "Conectando você ao que importa.",
  /** Instagram oficial — preencha o @ e a URL. Vazio = não aparece no site. */
  instagram: { handle: "", url: "" },
  /** E-mail comercial — vazio = não aparece no site. */
  email: "",
};

/* ------------------------------------------------------------ */
/*  FUNDADORES                                                   */
/*  whatsapp: apenas números, com DDI + DDD. Ex.: "5511999998888" */
/*  Enquanto estiver vazio, o botão aparece como "em configuração". */
/* ------------------------------------------------------------ */

export type Founder = {
  id: "vitor" | "joao";
  name: string;
  firstName: string;
  role: string;
  bio: string;
  initials: string;
  whatsapp: string;
};

export const founders: Founder[] = [
  {
    id: "vitor",
    name: "Vitor Hugo",
    firstName: "Vitor",
    role: "Co-Founder",
    bio: "Atuação em tecnologia, desenvolvimento digital e projetos.",
    initials: "VH",
    whatsapp: "5511914364180",
  },
  {
    id: "joao",
    name: "João Pedro",
    firstName: "João",
    role: "Co-Founder",
    bio: "Atuação comercial, operações e relacionamento com fornecedores.",
    initials: "JP",
    whatsapp: "5511945572901",
  },
];

/* ------------------------------------------------------------ */
/*  PRODUTOS                                                     */
/* ------------------------------------------------------------ */

export type ProductCategory = "avaliacoes" | "contato" | "pagamentos" | "multifuncionais";

export const categories: { id: "todos" | ProductCategory; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "avaliacoes", label: "Avaliações" },
  { id: "contato", label: "Contato" },
  { id: "pagamentos", label: "Pagamentos" },
  { id: "multifuncionais", label: "Multifuncionais" },
];

export type Availability = "disponivel" | "sob-encomenda" | "em-breve";

export const availabilityLabel: Record<Availability, string> = {
  disponivel: "Disponível",
  "sob-encomenda": "Sob encomenda",
  "em-breve": "Em breve",
};

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  /** Descrição curta mostrada no card */
  short: string;
  /** Texto completo mostrado em "Ver detalhes" */
  description: string;
  features: string[];
  /** Observação importante (aparece nos detalhes) */
  note?: string;
  /** Preço em reais. null = "Sob consulta" */
  price: number | null;
  /** false = esconde o preço e mostra "Sob consulta" */
  showPrice: boolean;
  availability: Availability;
  /**
   * Foto real do produto em public/assets (ou URL). Vazio = placeholder neutro.
   * As fotos são exibidas inteiras, sem corte. Não usar imagens de IA como foto de produto.
   */
  image: string;
};

export const products: Product[] = [
  {
    id: "nfc-google",
    name: "NFC Google",
    category: "avaliacoes",
    short: "Facilita o acesso à página de avaliações do seu estabelecimento no Google.",
    description:
      "Placa inteligente que leva o cliente, por aproximação ou QR Code, direto à página de avaliações do seu negócio no Google.",
    features: [
      "NFC por aproximação",
      "QR Code quando disponível",
      "Personalização",
      "Configuração de destino",
      "Para diferentes estabelecimentos",
    ],
    note: "A placa facilita o acesso à página de avaliações. Não garante quantidade de avaliações nem posicionamento.",
    price: null,
    showPrice: true,
    availability: "sob-encomenda",
    image: "/assets/nfcgoogle.jpeg",
  },
  {
    id: "nfc-whatsapp",
    name: "NFC WhatsApp",
    category: "contato",
    short: "Leva seu cliente direto ao WhatsApp da empresa ou do profissional.",
    description:
      "Placa que facilita o contato com empresas e profissionais, abrindo a conversa no WhatsApp com apenas uma aproximação.",
    features: [
      "Acesso ao contato do WhatsApp",
      "Mensagem pré-definida opcional",
      "Personalização comercial",
      "Ideal para balcões e estabelecimentos",
    ],
    price: null,
    showPrice: true,
    availability: "sob-encomenda",
    image: "/assets/nfczap.jpeg",
  },
  {
    id: "nfc-pix",
    name: "NFC Pix",
    category: "pagamentos",
    short: "Facilita o acesso à sua solução de cobrança ou pagamento.",
    description:
      "Placa que direciona o cliente para o link ou serviço de pagamento configurado pelo estabelecimento.",
    features: [
      "Acesso rápido ao link de pagamento",
      "QR Code quando disponível",
      "Personalização",
      "Configuração de destino",
    ],
    note: "O funcionamento depende do link ou serviço de pagamento configurado. Uma etiqueta NFC comum não executa o Pix por aproximação bancária.",
    price: null,
    showPrice: true,
    availability: "sob-encomenda",
    image: "/assets/nfcpix.jpeg",
  },
  {
    id: "nfc-multifuncional",
    name: "NFC Multifuncional",
    category: "multifuncionais",
    short: "Reúne vários destinos em uma página digital personalizada.",
    description:
      "Uma única placa para Google, WhatsApp, Instagram, localização, cardápio, agendamento e outros links do seu negócio.",
    features: [
      "Google, WhatsApp e Instagram",
      "Localização e cardápio",
      "Agendamento",
      "Página digital personalizada",
    ],
    note: "Funções múltiplas podem exigir uma página intermediária com os links reunidos.",
    price: null,
    showPrice: true,
    availability: "sob-encomenda",
    image: "/assets/nfcmulti.jpeg",
  },
];

/* ------------------------------------------------------------ */
/*  SOLUÇÕES PERSONALIZADAS                                      */
/* ------------------------------------------------------------ */

export type SolutionStatus = "disponivel" | "avaliacao" | "planejamento";

export const solutionStatusLabel: Record<SolutionStatus, string> = {
  disponivel: "Disponível",
  avaliacao: "Sob avaliação técnica",
  planejamento: "Em planejamento",
};

export const solutions: { title: string; status: SolutionStatus }[] = [
  { title: "Cardápios digitais", status: "disponivel" },
  { title: "Perfis de Instagram", status: "disponivel" },
  { title: "Páginas de estabelecimentos", status: "disponivel" },
  { title: "Links de pagamento", status: "disponivel" },
  { title: "Acesso a redes Wi-Fi", status: "avaliacao" },
  { title: "Cartões de visita digitais", status: "avaliacao" },
  { title: "Agendamentos", status: "avaliacao" },
  { title: "Catálogos digitais", status: "avaliacao" },
  { title: "Identificação de animais", status: "planejamento" },
  { title: "Sistemas de fidelidade", status: "planejamento" },
  { title: "Projetos personalizados", status: "avaliacao" },
];

/* ------------------------------------------------------------ */
/*  MENSAGENS DE WHATSAPP                                        */
/* ------------------------------------------------------------ */

export type ContactType =
  | "produto"
  | "quantidade"
  | "revenda"
  | "personalizado"
  | "parceria"
  | "duvidas";

export const contactTypes: { id: ContactType; label: string }[] = [
  { id: "produto", label: "Produto individual" },
  { id: "quantidade", label: "Pedido em quantidade" },
  { id: "revenda", label: "Revenda" },
  { id: "personalizado", label: "Projeto personalizado" },
  { id: "parceria", label: "Parceria comercial" },
  { id: "duvidas", label: "Dúvidas gerais" },
];

export const messages = {
  product: (productName: string) =>
    `Olá! Encontrei a ${productName} no site da NFC FUTURE e gostaria de solicitar um orçamento.`,
  custom:
    "Olá! Conheci a NFC FUTURE pelo site e gostaria de conversar sobre uma solução NFC personalizada.",
  wholesale:
    "Olá! Tenho interesse em comprar produtos NFC FUTURE em quantidade e gostaria de conhecer as condições de atacado.",
  general: "Olá! Conheci a NFC FUTURE pelo site e gostaria de mais informações.",
};
