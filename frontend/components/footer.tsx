import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Daniel Trendy. Todos os direitos reservados.
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram size={18} />
            <span className="text-sm">@Daniel Trendy</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
