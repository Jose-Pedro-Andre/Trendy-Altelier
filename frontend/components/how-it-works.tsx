import { Calendar, Ruler, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Agende sua Consulta",
    description:
      "Entre em contacto pelo WhatsApp para agendar uma consulta personalizada no nosso atelier.",
  },
  {
    icon: Ruler,
    title: "Tiramos suas Medidas",
    description:
      "Nossa equipa especializada irá tirar todas as medidas necessárias para um caimento perfeito.",
  },
  {
    icon: Sparkles,
    title: "Receba sua Peça",
    description:
      "Em poucas semanas, sua peça exclusiva estará pronta, feita com os melhores materiais.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-2 font-medium">
            Processo
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Como Funciona
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
