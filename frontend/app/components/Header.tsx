'use client';

import { useState } from 'react';

export default function Header({ userRole }: { userRole: string }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Trendy Atelier</h1>
        <p className="text-sm text-gray-600">Bem-vindo, {userRole}</p>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center space-x-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          <span>Perfil</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Meu Perfil</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100">Configurações</a>
            <hr className="my-2" />
            <a href="/login" className="block px-4 py-2 hover:bg-gray-100 text-red-500">Sair</a>
          </div>
        )}
      </div>
    </header>
  );
}
