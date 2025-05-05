
// Mock data for Barrio Market development

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Vendor {
  id: string;
  name: string;
  description: string;
  profileImage: string;
  coverImage?: string;
  location: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  categories: string[];
}

export interface Product {
  id: string;
  vendorId: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  categoryId: string;
  available: boolean;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Frutas y Verduras",
    icon: "apple",
    description: "Frutas y verduras frescas de temporada"
  },
  {
    id: "2",
    name: "Artesanías",
    icon: "paintbrush",
    description: "Productos hechos a mano por artesanos locales"
  },
  {
    id: "3",
    name: "Comida Preparada",
    icon: "utensils",
    description: "Platos frescos y deliciosos listos para llevar"
  },
  {
    id: "4",
    name: "Ropa",
    icon: "shirt",
    description: "Prendas de vestir y accesorios"
  },
  {
    id: "5",
    name: "Especias",
    icon: "leaf",
    description: "Hierbas y especias para cocina"
  },
  {
    id: "6",
    name: "Flores",
    icon: "flower",
    description: "Flores y plantas decorativas"
  }
];

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Frutas del Campo",
    description: "Vendemos las mejores frutas de la región, cultivadas de manera orgánica y sostenible.",
    profileImage: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    location: "Mercado Central, Puesto 42",
    rating: 4.8,
    reviewCount: 124,
    isVerified: true,
    categories: ["1"]
  },
  {
    id: "2",
    name: "Artesanías María",
    description: "Productos artesanales hechos a mano con materiales locales y técnicas tradicionales.",
    profileImage: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    location: "Plaza Mayor, Local 15",
    rating: 4.6,
    reviewCount: 89,
    isVerified: true,
    categories: ["2"]
  },
  {
    id: "3",
    name: "Sabores Colombianos",
    description: "Deliciosa comida típica colombiana preparada con recetas tradicionales.",
    profileImage: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    location: "Calle 23 #45-12",
    rating: 4.9,
    reviewCount: 256,
    isVerified: true,
    categories: ["3"]
  },
  {
    id: "4",
    name: "Tejidos Andinos",
    description: "Ropa hecha con técnicas ancestrales y materiales de la más alta calidad.",
    profileImage: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    location: "Mercado Artesanal, Local 8",
    rating: 4.7,
    reviewCount: 73,
    isVerified: false,
    categories: ["4"]
  },
  {
    id: "5",
    name: "Especias del Mundo",
    description: "Especias exóticas importadas y locales para darle sabor a tus platos.",
    profileImage: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    location: "Pasaje Comercial El Prado, Local 22",
    rating: 4.5,
    reviewCount: 102,
    isVerified: false,
    categories: ["5"]
  }
];

export const products: Product[] = [
  {
    id: "1",
    vendorId: "1",
    name: "Mangos Dulces",
    description: "Mangos frescos y dulces de temporada",
    price: 5000,
    currency: "COP",
    image: "/placeholder.svg",
    categoryId: "1",
    available: true
  },
  {
    id: "2",
    vendorId: "1",
    name: "Aguacates Hass",
    description: "Aguacates cremosos y deliciosos",
    price: 8000,
    currency: "COP",
    image: "/placeholder.svg",
    categoryId: "1",
    available: true
  },
  {
    id: "3",
    vendorId: "2",
    name: "Mochila Wayuu",
    description: "Mochila tradicional hecha a mano por artesanos wayuu",
    price: 120000,
    currency: "COP",
    image: "/placeholder.svg",
    categoryId: "2",
    available: true
  },
  {
    id: "4",
    vendorId: "2",
    name: "Pulseras Tejidas",
    description: "Set de pulseras hechas a mano con hilos de colores",
    price: 15000,
    currency: "COP",
    image: "/placeholder.svg",
    categoryId: "2",
    available: true
  },
  {
    id: "5",
    vendorId: "3",
    name: "Bandeja Paisa",
    description: "Plato típico colombiano con frijoles, arroz, carne, chicharrón y más",
    price: 25000,
    currency: "COP",
    image: "/placeholder.svg",
    categoryId: "3",
    available: true
  },
  {
    id: "6",
    vendorId: "3",
    name: "Arepas con Queso",
    description: "Arepas recién hechas rellenas de queso derretido",
    price: 5000,
    currency: "COP",
    image: "/placeholder.svg",
    categoryId: "3",
    available: true
  },
  {
    id: "7",
    vendorId: "4",
    name: "Poncho Tradicional",
    description: "Poncho tejido con lana de oveja de los Andes",
    price: 85000,
    currency: "COP",
    image: "/placeholder.svg",
    categoryId: "4",
    available: true
  },
  {
    id: "8",
    vendorId: "5",
    name: "Mix de Especias",
    description: "Mezcla especial de especias para carnes y guisos",
    price: 12000,
    currency: "COP",
    image: "/placeholder.svg",
    categoryId: "5",
    available: true
  }
];

export const formatCurrency = (amount: number, currency: string): string => {
  if (currency === "COP") {
    return new Intl.NumberFormat('es-CO', { 
      style: 'currency', 
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: currency 
  }).format(amount);
};
