'use client';

import { useState } from 'react';

export default function CEOPage() {
  const [metrics, setMetrics] = useState({
    revenue: 15250.50,
    clients: 156,
    employees: 12,
    appointmentCompletion: 89.5,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard do CEO</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <p className="text-blue-100 text-sm mb-2">Receita (Este Mês)</p>
          <p className="text-3xl font-bold">€{metrics.revenue.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
          <p className="text-green-100 text-sm mb-2">Total de Clientes</p>
          <p className="text-3xl font-bold">{metrics.clients}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <p className="text-purple-100 text-sm mb-2">Funcionários</p>
          <p className="text-3xl font-bold">{metrics.employees}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
          <p className="text-orange-100 text-sm mb-2">Taxa de Conclusão</p>
          <p className="text-3xl font-bold">{metrics.appointmentCompletion}%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Relatórios</h2>
          {/* TODO: Add reports section */}
          <p className="text-gray-500">Nenhum relatório disponível</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Análises</h2>
          {/* TODO: Add analytics section */}
          <p className="text-gray-500">Nenhuma análise disponível</p>
        </div>
      </div>
    </div>
  );
}
