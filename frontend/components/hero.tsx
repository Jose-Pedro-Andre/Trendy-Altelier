"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/products/vestido-noiva.jpg')",
          filter: "brightness(0.3)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="text-primary text-sm tracking-[0.3em] uppercase mb-4 font-medium">
          Elegância Sob Medida
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
          Peças Exclusivas<br />
          <span className="text-primary">Para Momentos Únicos</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 text-pretty">
          Criamos roupas sob medida com os melhores tecidos e acabamentos impecáveis. 
          Cada peça é única, feita especialmente para você.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#colecoes"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 group"
          >
            Ver Coleções
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border text-foreground px-8 py-3 rounded-md font-medium hover:bg-secondary transition-colors flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Agendar Consulta
          </a>
        </div>
      </div>
    </section>
  );
}
