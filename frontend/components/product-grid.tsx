"use client";

import { useState } from "react";
import { products, Product } from "@/lib/products";
import { CategoryFilter } from "./category-filter";
import { ProductCard } from "./product-card";
import { ProductModal } from "./product-modal";

export function ProductGrid() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="colecoes" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-2 font-medium">
            Nossa Coleção
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Peças Exclusivas
          </h2>
        </div>

        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            Nenhum produto encontrado nesta categoria.
          </p>
        )}
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
