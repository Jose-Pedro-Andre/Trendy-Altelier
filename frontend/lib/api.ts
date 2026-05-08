import {
  ApiUser,
  CreateOrderPayload,
  LoginResponse,
  Order,
  OrderStatus,
  RegisterCustomerPayload,
  RegisterStaffPayload,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8001';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH';
  token?: string | null;
  body?: unknown;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const fallbackMessage = `HTTP ${response.status}`;

    try {
      const payload = (await response.json()) as { message?: string | string[] };
      const message = Array.isArray(payload.message)
        ? payload.message.join(', ')
        : payload.message;
      throw new Error(message ?? fallbackMessage);
    } catch {
      throw new Error(fallbackMessage);
    }
  }

  return response.json() as Promise<T>;
}

export const api = {
  login(identifier: string, password: string) {
    return request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: { identifier, password },
    });
  },

  listUsers(token?: string | null) {
    return request<ApiUser[]>('/user', { token });
  },

  registerStaff(payload: RegisterStaffPayload, token?: string | null) {
    return request('/user/staff', {
      method: 'POST',
      token,
      body: payload,
    });
  },

  registerCustomer(payload: RegisterCustomerPayload, token?: string | null) {
    return request('/user/customer', {
      method: 'POST',
      token,
      body: payload,
    });
  },

  listOrders(token?: string | null) {
    return request<Order[]>('/task/orders', { token });
  },

  createOrder(payload: CreateOrderPayload, token?: string | null) {
    return request<Order>('/task/orders', {
      method: 'POST',
      token,
      body: payload,
    });
  },

  updateOrderStatus(orderId: string, status: OrderStatus, token?: string | null) {
    return request<Order>(`/task/orders/${orderId}/status`, {
      method: 'PATCH',
      token,
      body: { status },
    });
  },

  assignOrder(orderId: string, assignedToId?: string, token?: string | null) {
    return request<Order>(`/task/orders/${orderId}/assign`, {
      method: 'PATCH',
      token,
      body: { assignedToId: assignedToId || undefined },
    });
  },

  addOrderItem(
    orderId: string,
    payload: { description: string; quantity: number; unitPrice: number },
    token?: string | null,
  ) {
    return request<Order>(`/task/orders/${orderId}/items`, {
      method: 'POST',
      token,
      body: payload,
    });
  },
};
