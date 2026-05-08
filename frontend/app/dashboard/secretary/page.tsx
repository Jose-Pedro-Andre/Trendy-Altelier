'use client';

import { useState } from 'react';

export default function SecretaryPage() {
  const [stats, setStats] = useState({
    totalAppointments: 45,
    todayAppointments: 8,
    pendingTasks: 12,
    totalClients: 156,
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard da Secretária</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Visitas Totais</p>
          <p className="text-3xl font-bold text-blue-500">{stats.totalAppointments}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Visitas Hoje</p>
          <p className="text-3xl font-bold text-green-500">{stats.todayAppointments}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Tarefas Pendentes</p>
          <p className="text-3xl font-bold text-orange-500">{stats.pendingTasks}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Total de Clientes</p>
          <p className="text-3xl font-bold text-purple-500">{stats.totalClients}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Próximas Visitas</h2>
          {/* TODO: List upcoming appointments */}
          <p className="text-gray-500">Nenhuma visita listada</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Tarefas Pendentes</h2>
          {/* TODO: List pending tasks */}
          <p className="text-gray-500">Nenhuma tarefa listada</p>
        </div>
      </div>
    </div>
  );
}
