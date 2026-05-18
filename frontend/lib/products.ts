export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  badge?: string;
}

export const categories = [
  "Todos",
  "Vestidos",
  "Ternos",
  "Camisas",
  "Calças",
  "Saias",
  "Blazers",
  "Casacos",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Vestido de Gala Bordeaux",
    price: 2890,
    image: "/products/vestido-gala.jpg",
    category: "Vestidos",
    description: "Vestido longo de gala em seda com corte elegante e caimento perfeito. Ideal para eventos sofisticados e ocasiões especiais.",
    sizes: ["PP", "P", "M", "G", "GG"],
    badge: "Exclusivo",
  },
  {
    id: "2",
    name: "Terno Slim Azul Marinho",
    price: 3450,
    image: "/products/terno-slim.jpg",
    category: "Ternos",
    description: "Terno slim fit em lã italiana premium. Corte moderno e sofisticado para o homem contemporâneo.",
    sizes: ["44", "46", "48", "50", "52", "54"],
    badge: "Best Seller",
  },
  {
    id: "3",
    name: "Camisa Social Premium",
    price: 590,
    image: "/products/camisa-social.jpg",
    category: "Camisas",
    description: "Camisa social em algodão egípcio 200 fios. Colarinho italiano e punhos duplos para abotoaduras.",
    sizes: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: "4",
    name: "Vestido Midi Esmeralda",
    price: 1890,
    image: "/products/vestido-midi.jpg",
    category: "Vestidos",
    description: "Vestido midi em crepe de seda com decote elegante. Perfeito para coquetéis e eventos corporativos.",
    sizes: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: "5",
    name: "Calça Alfaiataria Grafite",
    price: 890,
    image: "/products/calca-alfaiataria.jpg",
    category: "Calças",
    description: "Calça de alfaiataria em lã fria com caimento impecável. Corte clássico com pregas frontais.",
    sizes: ["38", "40", "42", "44", "46", "48"],
  },
  {
    id: "6",
    name: "Blazer Feminino Bege",
    price: 1490,
    image: "/products/blazer-feminino.jpg",
    category: "Blazers",
    description: "Blazer estruturado em tecido premium. Design contemporâneo com acabamento impecável.",
    sizes: ["PP", "P", "M", "G", "GG"],
    badge: "Novo",
  },
  {
    id: "7",
    name: "Terno 3 Peças Executivo",
    price: 4290,
    image: "/products/terno-3-pecas.jpg",
    category: "Ternos",
    description: "Conjunto executivo completo com terno, colete e calça. Lã super 150s com forro de seda.",
    sizes: ["44", "46", "48", "50", "52", "54"],
    badge: "Premium",
  },
  {
    id: "8",
    name: "Saia Lápis Clássica",
    price: 690,
    image: "/products/saia-lapis.jpg",
    category: "Saias",
    description: "Saia lápis em tecido stretch com forro. Corte elegante que valoriza a silhueta feminina.",
    sizes: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: "9",
    name: "Sobretudo Camel",
    price: 2890,
    image: "/products/sobretudo.jpg",
    category: "Casacos",
    description: "Sobretudo longo em lã e cashmere. Peça atemporal para os dias mais frios.",
    sizes: ["PP", "P", "M", "G", "GG"],
    badge: "Luxo",
  },
  {
    id: "10",
    name: "Camisa Linho Natural",
    price: 490,
    image: "/products/camisa-linho.jpg",
    category: "Camisas",
    description: "Camisa em linho puro com corte relaxado. Ideal para ocasiões casuais e verão.",
    sizes: ["PP", "P", "M", "G", "GG"],
  },
  {
    id: "11",
    name: "Vestido de Noiva Clássico",
    price: 8990,
    image: "/products/vestido-noiva.jpg",
    category: "Vestidos",
    description: "Vestido de noiva em renda francesa com bordados feitos à mão. Uma peça única para o dia mais especial.",
    sizes: ["PP", "P", "M", "G", "GG"],
    badge: "Alta Costura",
  },
  {
    id: "12",
    name: "Blazer Masculino Marinho",
    price: 1690,
    image: "/products/blazer-masculino.jpg",
    category: "Blazers",
    description: "Blazer em tecido italiano com botões de osso natural. Versátil para trabalho e eventos.",
    sizes: ["44", "46", "48", "50", "52", "54"],
  },
];
