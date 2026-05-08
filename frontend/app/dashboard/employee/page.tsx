'use client';

import { useState } from 'react';

export default function EmployeePage() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'Cabeleireiro' },
    { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'Esteticista' },
  ]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Funcionários</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Adicionar Funcionário
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nome</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Posição</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{employee.name}</td>
                <td className="px-6 py-3">{employee.email}</td>
                <td className="px-6 py-3">{employee.role}</td>
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
