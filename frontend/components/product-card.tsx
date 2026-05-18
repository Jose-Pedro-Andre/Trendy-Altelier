"use client";

import Image from "next/image";
import { Eye, MessageCircle } from "lucide-react";
import { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {product.badge}
          </Badge>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-foreground text-background py-2 rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            Ver Detalhes
          </button>
          <a
            href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no produto: ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-primary font-medium tracking-wider uppercase mb-1">
          {product.category}
        </p>
        <h3 className="font-serif text-lg font-semibold text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-primary font-bold text-lg">
          {formattedPrice}
        </p>
      </div>
    </div>
  );
}
