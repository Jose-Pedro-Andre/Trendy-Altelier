'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function AppointmentDetailPage() {
  const params = useParams();
  const id = params.id;
  const [formData, setFormData] = useState({
    clientName: 'Ana Costa',
    clientEmail: 'ana@example.com',
    service: 'Corte de Cabelo',
    employee: 'João Silva',
    date: '2026-04-20',
    time: '10:00',
    duration: '30',
    notes: '',
    status: 'confirmada',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Detalhes da Visita</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6">
          {/* Cliente Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Informações do Cliente</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Nome do Cliente</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Appointment Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Detalhes da Visita</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Serviço</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Corte de Cabelo</option>
                  <option>Tratamento Facial</option>
                  <option>Manicure</option>
                  <option>Pedicure</option>
                  <option>Coloração de Cabelo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Funcionário</label>
                <select
                  name="employee"
                  value={formData.employee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>João Silva</option>
                  <option>Maria Santos</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Data</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Hora</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Duração (minutos)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>pendente</option>
                  <option>confirmada</option>
                  <option>concluída</option>
                  <option>cancelada</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <label className="block text-sm font-semibold mb-2">Notas</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Adicione notas ou observações..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Salvar Alterações
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 ml-auto"
            >
              Cancelar Visita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
