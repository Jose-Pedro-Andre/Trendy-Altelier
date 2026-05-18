"use client";

import Image from "next/image";
import { X, MessageCircle, Ruler } from "lucide-react";
import { Product } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                {product.badge}
              </Badge>
            )}
          </div>
          
          <div className="p-6 flex flex-col">
            <DialogHeader>
              <p className="text-xs text-primary font-medium tracking-wider uppercase mb-1">
                {product.category}
              </p>
              <DialogTitle className="font-serif text-2xl font-bold text-foreground">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            
            <p className="text-primary font-bold text-2xl mt-4">
              {formattedPrice}
            </p>
            
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              {product.description}
            </p>
            
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Ruler size={16} />
                Tamanhos Disponíveis
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-auto pt-6 space-y-3">
              <a
                href={`https://wa.me/5511999999999?text=Olá! Gostaria de encomendar: ${product.name} - ${formattedPrice}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Encomendar via WhatsApp
              </a>
              <p className="text-xs text-center text-muted-foreground">
                * Preço a partir de. Valor final depende das medidas e personalizações.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
