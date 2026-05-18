"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-wide text-foreground">
                Daniel Trendy
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest">
                Ateliê de Custura
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#colecoes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Coleções
            </Link>
            <Link href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como Funciona
            </Link>
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre as roupas sob medida."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Fale Conosco
            </a>
          </nav>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link href="#colecoes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Coleções
            </Link>
            <Link href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como Funciona
            </Link>
            <a
              href="https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre as roupas sob medida."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors text-center"
            >
              Fale Conosco
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
