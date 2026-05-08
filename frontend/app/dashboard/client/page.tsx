'use client';

import { useState } from 'react';

export default function ClientPage() {
  const [clients, setClients] = useState([
    { id: 1, name: 'Ana Costa', email: 'ana@example.com', phone: '219876543' },
    { id: 2, name: 'Carlos Oliveira', email: 'carlos@example.com', phone: '211234567' },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Adicionar Cliente
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Telefone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{client.name}</td>
                <td className="px-6 py-3">{client.email}</td>
                <td className="px-6 py-3">{client.phone}</td>
                <td className="px-6 py-3 space-x-2">
                  <button className="text-blue-500 hover:underline">Editar</button>
                  <button className="text-red-500 hover:underline">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
