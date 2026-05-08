<<<<<<< HEAD
"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import { ApiUser, Order, OrderStatus, Role } from "@/lib/types";

const orderStatuses: OrderStatus[] = [
  "PENDING",
  "IN_PRODUCTION",
  "AWAITING_FITTING",
  "FINISHED",
  "DELAYED",
  "DELIVERED",
];

const staffRoles: Exclude<Role, "CUSTOMER">[] = [
  "CEO",
  "SECRETARY",
  "PRODUCTION_MANAGER",
];

=======
import Image from "next/image";
import { Header } from "./components";
>>>>>>> ae75bd5a8c1665c5c2155f14cae847d9cf601a32
export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [staffForm, setStaffForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    phoneParents: "",
    role: "PRODUCTION_MANAGER" as Exclude<Role, "CUSTOMER">,
    jobTitle: "",
  });

  const [customerForm, setCustomerForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    phoneParents: "",
    address: "",
  });

  const [orderForm, setOrderForm] = useState({
    customerId: "",
    assignedToId: "",
    deadline: "",
    status: "PENDING" as OrderStatus,
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

  const [orderAction, setOrderAction] = useState({
    orderId: "",
    status: "IN_PRODUCTION" as OrderStatus,
    assignedToId: "",
    itemDescription: "",
    itemQuantity: 1,
    itemUnitPrice: 0,
  });

  const loadData = async (activeToken: string | null) => {
    setIsLoading(true);
    try {
      const [usersResponse, ordersResponse] = await Promise.all([
        api.listUsers(activeToken),
        api.listOrders(activeToken),
      ]);
      setUsers(usersResponse);
      setOrders(ordersResponse);
    } catch (error) {
      const text = error instanceof Error ? error.message : "Erro ao carregar dados";
      setMessage(text);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("trendy_token");
    if (storedToken) {
      setToken(storedToken);
      void loadData(storedToken);
    }
  }, []);

  const customers = useMemo(
    () => users.filter((user) => user.customerProfile),
    [users],
  );

  const employees = useMemo(
    () => users.filter((user) => user.employeeProfile),
    [users],
  );

  const customerNameById = useMemo(() => {
    const map = new Map<string, string>();
    customers.forEach((user) => {
      if (user.customerProfile) {
        map.set(user.customerProfile.id, user.fullName);
      }
    });
    return map;
  }, [customers]);

  const employeeNameById = useMemo(() => {
    const map = new Map<string, string>();
    employees.forEach((user) => {
      if (user.employeeProfile) {
        map.set(user.employeeProfile.id, user.fullName);
      }
    });
    return map;
  }, [employees]);

  const kpis = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const previousMonthDate = new Date(currentYear, currentMonth - 1, 1);

    const createdCurrent = customers.filter((user) => {
      const createdAt = new Date(user.createdAt);
      return (
        createdAt.getMonth() === currentMonth &&
        createdAt.getFullYear() === currentYear
      );
    }).length;

    const createdPrevious = customers.filter((user) => {
      const createdAt = new Date(user.createdAt);
      return (
        createdAt.getMonth() === previousMonthDate.getMonth() &&
        createdAt.getFullYear() === previousMonthDate.getFullYear()
      );
    }).length;

    const pendingCount = orders.filter((order) =>
      ["PENDING", "IN_PRODUCTION", "AWAITING_FITTING"].includes(order.status),
    ).length;
    const finishedCount = orders.filter((order) =>
      ["FINISHED", "DELIVERED"].includes(order.status),
    ).length;
    const delayedCount = orders.filter((order) => order.status === "DELAYED").length;

    const deliveredOrders = orders.filter((order) => order.status === "DELIVERED");
    const onTimeCount = deliveredOrders.filter(
      (order) => new Date(order.updatedAt) <= new Date(order.deadline),
    ).length;
    const onTimePercent = deliveredOrders.length
      ? Math.round((onTimeCount / deliveredOrders.length) * 100)
      : 0;

    const byCustomer = new Map<string, Order[]>();
    orders.forEach((order) => {
      const current = byCustomer.get(order.customerId) ?? [];
      current.push(order);
      byCustomer.set(order.customerId, current);
    });

    let newOrders = 0;
    let recurringOrders = 0;
    byCustomer.forEach((customerOrders) => {
      const sorted = [...customerOrders].sort(
        (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt),
      );
      sorted.forEach((_, index) => {
        if (index === 0) {
          newOrders += 1;
        } else {
          recurringOrders += 1;
        }
      });
    });

    const growth = createdPrevious
      ? Math.round(((createdCurrent - createdPrevious) / createdPrevious) * 100)
      : createdCurrent > 0
        ? 100
        : 0;

    return {
      totalClientes: customers.length,
      novosClientesAtual: createdCurrent,
      variacaoClientes: growth,
      totalPedidos: orders.length,
      pedidosPendentes: pendingCount,
      pedidosFinalizados: finishedCount,
      alertasAtraso: delayedCount,
      entreguesNoPrazoPercentual: onTimePercent,
      novosPedidos: newOrders,
      recorrentesPedidos: recurringOrders,
    };
  }, [customers, orders]);

  const maxBarra = Math.max(1, kpis.novosPedidos, kpis.recorrentesPedidos);
  const gaugeDegrees = Math.round((kpis.entreguesNoPrazoPercentual / 100) * 180);

  const wip = orders
    .filter((order) =>
      ["PENDING", "IN_PRODUCTION", "AWAITING_FITTING"].includes(order.status),
    )
    .slice(0, 10)
    .map((order) => ({
      id: order.id,
      cliente:
        order.customer?.user.fullName ??
        customerNameById.get(order.customerId) ??
        order.customerId,
      servico: order.items[0]?.description ?? "Sem descrição",
      responsavel:
        order.assignedTo?.user.fullName ??
        (order.assignedToId ? employeeNameById.get(order.assignedToId) : undefined) ??
        "Não atribuído",
      status: order.status,
    }));

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.login(identifier, password);
      setToken(response.accessToken);
      localStorage.setItem("trendy_token", response.accessToken);
      setMessage(`Login efetuado: ${response.user.fullName}`);
      await loadData(response.accessToken);
    } catch (error) {
      const text = error instanceof Error ? error.message : "Erro no login";
      setMessage(text);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("trendy_token");
    setMessage("Sessão encerrada");
  };

  const handleCreateStaff = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api.registerStaff(
        {
          ...staffForm,
          phoneParents: staffForm.phoneParents || undefined,
        },
        token,
      );
      setMessage("Staff registado com sucesso");
      await loadData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao registar staff");
    }
  };

  const handleCreateCustomer = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api.registerCustomer(
        {
          ...customerForm,
          email: customerForm.email || undefined,
          phoneParents: customerForm.phoneParents || undefined,
          address: customerForm.address || undefined,
        },
        token,
      );
      setMessage("Cliente registado com sucesso");
      await loadData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao registar cliente");
    }
  };

  const handleCreateOrder = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api.createOrder(
        {
          customerId: orderForm.customerId,
          assignedToId: orderForm.assignedToId || undefined,
          deadline: new Date(orderForm.deadline).toISOString(),
          status: orderForm.status,
          items: [
            {
              description: orderForm.description,
              quantity: Number(orderForm.quantity),
              unitPrice: Number(orderForm.unitPrice),
            },
          ],
        },
        token,
      );
      setMessage("Pedido criado com sucesso");
      await loadData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao criar pedido");
    }
  };

  const handleStatusUpdate = async () => {
    if (!orderAction.orderId) return;
    try {
      await api.updateOrderStatus(orderAction.orderId, orderAction.status, token);
      setMessage("Status atualizado");
      await loadData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao atualizar status");
    }
  };

  const handleAssignOrder = async () => {
    if (!orderAction.orderId) return;
    try {
      await api.assignOrder(orderAction.orderId, orderAction.assignedToId, token);
      setMessage("Atribuição atualizada");
      await loadData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao atribuir pedido");
    }
  };

  const handleAddItem = async () => {
    if (!orderAction.orderId) return;
    try {
      await api.addOrderItem(
        orderAction.orderId,
        {
          description: orderAction.itemDescription,
          quantity: Number(orderAction.itemQuantity),
          unitPrice: Number(orderAction.itemUnitPrice),
        },
        token,
      );
      setMessage("Item adicionado ao pedido");
      await loadData(token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Erro ao adicionar item");
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 lg:px-10">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-5">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-400">Trendy Atelier</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50 lg:text-3xl">
            Dashboard Integrado ao Backend
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-md border border-slate-700 px-3 py-1 text-slate-300">
              API: {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8001"}
            </span>
            <button
              onClick={() => void loadData(token)}
              className="rounded-md bg-slate-700 px-3 py-1 text-white hover:bg-slate-600"
            >
              Atualizar dados
            </button>
            {token ? (
              <button
                onClick={handleLogout}
                className="rounded-md bg-rose-700 px-3 py-1 text-white hover:bg-rose-600"
              >
                Logout
              </button>
            ) : null}
            {isLoading ? <span className="text-amber-300">Carregando...</span> : null}
          </div>
          {message ? <p className="mt-2 text-sm text-amber-200">{message}</p> : null}
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <form onSubmit={handleLogin} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="mb-3 text-lg font-semibold">Login</h2>
            <input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="username ou email"
              className="mb-2 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
            />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              className="mb-3 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2"
            />
            <button className="rounded bg-amber-500 px-3 py-2 font-medium text-slate-900 hover:bg-amber-400">
              Entrar
            </button>
          </form>

          <form onSubmit={handleCreateStaff} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="mb-3 text-lg font-semibold">Registrar Staff</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <input placeholder="username" value={staffForm.username} onChange={(event) => setStaffForm((prev) => ({ ...prev, username: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="email" value={staffForm.email} onChange={(event) => setStaffForm((prev) => ({ ...prev, email: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input type="password" placeholder="password" value={staffForm.password} onChange={(event) => setStaffForm((prev) => ({ ...prev, password: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="nome completo" value={staffForm.fullName} onChange={(event) => setStaffForm((prev) => ({ ...prev, fullName: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="telefone" value={staffForm.phoneNumber} onChange={(event) => setStaffForm((prev) => ({ ...prev, phoneNumber: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="telefone encarregado" value={staffForm.phoneParents} onChange={(event) => setStaffForm((prev) => ({ ...prev, phoneParents: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="cargo" value={staffForm.jobTitle} onChange={(event) => setStaffForm((prev) => ({ ...prev, jobTitle: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <select value={staffForm.role} onChange={(event) => setStaffForm((prev) => ({ ...prev, role: event.target.value as Exclude<Role, 'CUSTOMER'> }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2">
                {staffRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <button className="mt-3 rounded bg-slate-700 px-3 py-2 hover:bg-slate-600">Salvar staff</button>
          </form>

          <form onSubmit={handleCreateCustomer} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="mb-3 text-lg font-semibold">Registrar Cliente</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <input placeholder="username" value={customerForm.username} onChange={(event) => setCustomerForm((prev) => ({ ...prev, username: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="email (opcional)" value={customerForm.email} onChange={(event) => setCustomerForm((prev) => ({ ...prev, email: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input type="password" placeholder="password" value={customerForm.password} onChange={(event) => setCustomerForm((prev) => ({ ...prev, password: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="nome completo" value={customerForm.fullName} onChange={(event) => setCustomerForm((prev) => ({ ...prev, fullName: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="telefone" value={customerForm.phoneNumber} onChange={(event) => setCustomerForm((prev) => ({ ...prev, phoneNumber: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="telefone encarregado" value={customerForm.phoneParents} onChange={(event) => setCustomerForm((prev) => ({ ...prev, phoneParents: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input placeholder="endereço" value={customerForm.address} onChange={(event) => setCustomerForm((prev) => ({ ...prev, address: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2 sm:col-span-2" />
            </div>
            <button className="mt-3 rounded bg-slate-700 px-3 py-2 hover:bg-slate-600">Salvar cliente</button>
          </form>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs uppercase tracking-wide text-slate-400">Total de Clientes</p><p className="mt-2 text-3xl font-semibold text-slate-50">{kpis.totalClientes}</p></article>
          <article className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs uppercase tracking-wide text-slate-400">Novos Clientes (mês)</p><p className="mt-2 text-3xl font-semibold text-slate-50">{kpis.novosClientesAtual}</p><p className={`mt-1 text-sm ${kpis.variacaoClientes >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{kpis.variacaoClientes >= 0 ? "+" : ""}{kpis.variacaoClientes}%</p></article>
          <article className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="text-xs uppercase tracking-wide text-slate-400">Total de Pedidos</p><p className="mt-2 text-3xl font-semibold text-slate-50">{kpis.totalPedidos}</p></article>
          <article className="rounded-xl border border-rose-900 bg-rose-950/40 p-4"><p className="text-xs uppercase tracking-wide text-rose-200">Alertas de Atraso</p><p className="mt-2 text-3xl font-semibold text-rose-300">{kpis.alertasAtraso}</p></article>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-xl border border-slate-800 bg-slate-900 p-5 lg:col-span-2">
            <h2 className="text-lg font-semibold text-slate-50">Fluxo de Demanda</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-4"><p className="text-xs uppercase tracking-wide text-slate-400">Total</p><p className="mt-2 text-2xl font-semibold">{kpis.totalPedidos}</p></div>
              <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-4"><p className="text-xs uppercase tracking-wide text-slate-400">Pendentes</p><p className="mt-2 text-2xl font-semibold text-amber-300">{kpis.pedidosPendentes}</p></div>
              <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-4"><p className="text-xs uppercase tracking-wide text-slate-400">Finalizados</p><p className="mt-2 text-2xl font-semibold text-emerald-300">{kpis.pedidosFinalizados}</p></div>
            </div>
            <div className="mt-5 space-y-3">
              {[{ label: "Novos", valor: kpis.novosPedidos, colorClass: "bg-amber-500" }, { label: "Recorrentes", valor: kpis.recorrentesPedidos, colorClass: "bg-slate-500" }].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-sm text-slate-300"><span>{item.label}</span><span>{item.valor}</span></div>
                  <div className="h-3 rounded-full bg-slate-800"><div className={`h-3 rounded-full ${item.colorClass}`} style={{ width: `${(item.valor / maxBarra) * 100}%` }} /></div>
                </div>
              ))}
            </div>
          </article>
          <article className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="text-lg font-semibold text-slate-50">Entregues no Prazo</h2>
            <div className="mt-5 flex flex-col items-center gap-4">
              <div className="relative h-28 w-56 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-56 rounded-t-full border-[18px] border-slate-800 border-b-0" />
                <div className="absolute inset-x-0 bottom-0 h-56 rounded-t-full border-[18px] border-amber-400 border-b-0 [clip-path:inset(0_0_50%_0)]" style={{ transform: `rotate(${gaugeDegrees - 180}deg)`, transformOrigin: "50% 100%" }} />
              </div>
              <p className="-mt-7 text-3xl font-semibold text-amber-300">{kpis.entreguesNoPrazoPercentual}%</p>
            </div>
          </article>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <form onSubmit={handleCreateOrder} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-3 text-lg font-semibold">Criar Pedido</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              <select value={orderForm.customerId} onChange={(event) => setOrderForm((prev) => ({ ...prev, customerId: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2">
                <option value="">Selecionar cliente</option>
                {customers.map((user) => user.customerProfile ? <option key={user.customerProfile.id} value={user.customerProfile.id}>{user.fullName}</option> : null)}
              </select>
              <select value={orderForm.assignedToId} onChange={(event) => setOrderForm((prev) => ({ ...prev, assignedToId: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2">
                <option value="">Sem responsável</option>
                {employees.map((user) => user.employeeProfile ? <option key={user.employeeProfile.id} value={user.employeeProfile.id}>{user.fullName}</option> : null)}
              </select>
              <input type="datetime-local" value={orderForm.deadline} onChange={(event) => setOrderForm((prev) => ({ ...prev, deadline: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <select value={orderForm.status} onChange={(event) => setOrderForm((prev) => ({ ...prev, status: event.target.value as OrderStatus }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2">
                {orderStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <input placeholder="descrição item" value={orderForm.description} onChange={(event) => setOrderForm((prev) => ({ ...prev, description: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2 sm:col-span-2" />
              <input type="number" min={1} value={orderForm.quantity} onChange={(event) => setOrderForm((prev) => ({ ...prev, quantity: Number(event.target.value) }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
              <input type="number" step="0.01" min={0} value={orderForm.unitPrice} onChange={(event) => setOrderForm((prev) => ({ ...prev, unitPrice: Number(event.target.value) }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
            </div>
            <button className="mt-3 rounded bg-amber-500 px-3 py-2 font-medium text-slate-900 hover:bg-amber-400">Criar pedido</button>
          </form>

          <article className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-3 text-lg font-semibold">Ações no Pedido</h2>
            <div className="space-y-3">
              <select value={orderAction.orderId} onChange={(event) => setOrderAction((prev) => ({ ...prev, orderId: event.target.value }))} className="w-full rounded border border-slate-700 bg-slate-950 px-3 py-2">
                <option value="">Selecionar pedido</option>
                {orders.map((order) => <option key={order.id} value={order.id}>#{order.orderNumber} - {order.status}</option>)}
              </select>
              <div className="grid gap-2 sm:grid-cols-2">
                <select value={orderAction.status} onChange={(event) => setOrderAction((prev) => ({ ...prev, status: event.target.value as OrderStatus }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2">
                  {orderStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <button onClick={() => void handleStatusUpdate()} className="rounded bg-slate-700 px-3 py-2 hover:bg-slate-600">Atualizar status</button>
                <select value={orderAction.assignedToId} onChange={(event) => setOrderAction((prev) => ({ ...prev, assignedToId: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2">
                  <option value="">Sem responsável</option>
                  {employees.map((user) => user.employeeProfile ? <option key={user.employeeProfile.id} value={user.employeeProfile.id}>{user.fullName}</option> : null)}
                </select>
                <button onClick={() => void handleAssignOrder()} className="rounded bg-slate-700 px-3 py-2 hover:bg-slate-600">Atribuir</button>
                <input placeholder="novo item" value={orderAction.itemDescription} onChange={(event) => setOrderAction((prev) => ({ ...prev, itemDescription: event.target.value }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2 sm:col-span-2" />
                <input type="number" min={1} value={orderAction.itemQuantity} onChange={(event) => setOrderAction((prev) => ({ ...prev, itemQuantity: Number(event.target.value) }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
                <input type="number" step="0.01" min={0} value={orderAction.itemUnitPrice} onChange={(event) => setOrderAction((prev) => ({ ...prev, itemUnitPrice: Number(event.target.value) }))} className="rounded border border-slate-700 bg-slate-950 px-3 py-2" />
                <button onClick={() => void handleAddItem()} className="rounded bg-slate-700 px-3 py-2 hover:bg-slate-600 sm:col-span-2">Adicionar item</button>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold text-slate-50">Produção Ativa (WIP)</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-3 py-3">Cliente / Serviço</th>
                  <th className="px-3 py-3">Responsável</th>
                  <th className="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {wip.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-3"><p className="font-medium text-slate-100">{item.cliente}</p><p className="text-slate-400">{item.servico}</p></td>
                    <td className="px-3 py-3 text-slate-200">{item.responsavel}</td>
                    <td className="px-3 py-3"><span className="inline-flex rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-amber-200">{item.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
=======
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
>>>>>>> ae75bd5a8c1665c5c2155f14cae847d9cf601a32
}
