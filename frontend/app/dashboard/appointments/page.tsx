'use client';

import { useState } from 'react';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      clientName: 'Ana Costa', 
      service: 'Corte de Cabelo', 
      employee: 'João Silva',
      date: '2026-04-20',
      time: '10:00',
      status: 'confirmada'
    },
    { 
      id: 2, 
      clientName: 'Carlos Oliveira', 
      service: 'Tratamento Facial', 
      employee: 'Maria Santos',
      date: '2026-04-20',
      time: '14:30',
      status: 'pendente'
    },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Marcar/Gerir Visitas</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Marcar Nova Visita
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Cliente</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Serviço</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Funcionário</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Data</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Hora</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{apt.clientName}</td>
                <td className="px-6 py-3">{apt.service}</td>
                <td className="px-6 py-3">{apt.employee}</td>
                <td className="px-6 py-3">{apt.date}</td>
                <td className="px-6 py-3">{apt.time}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    apt.status === 'confirmada' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {apt.status}
                  </span>
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button className="text-blue-500 hover:underline">Editar</button>
                  <button className="text-red-500 hover:underline">Cancelar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
