'use client';

import { useParams } from 'next/navigation';

export default function ClientDetailPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Detalhes do Cliente</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Nome</label>
            <input
              type="text"
              defaultValue="Ana Costa"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              defaultValue="ana@example.com"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Telefone</label>
            <input
              type="tel"
              defaultValue="219876543"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Morada</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Salvar
          </button>
          <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
