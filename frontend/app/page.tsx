import Image from "next/image";
import { Header } from "./components";
export default function Home() {
  return (
    <header className= "mx-auto flex flex-row items-center justify-between  gap-90 p-4">
      <div>
        <a href="/auth/login">Daniel.Trendy</a>
      </div>

      <div className="flex flex-row items-center space-x-4">
        <ul className="flex flex-row items-center space-x-4">
          <li><a href="#">Coleções</a></li>
          <li><a href="#">Atelier</a></li>
          <li><a href="#">Processos</a></li>
          <li><a href="#">Whatsapp</a></li>
        </ul>
      </div>
      <div>
        <a href="#">Entrar</a>
      </div>
    </header>
  )
}
