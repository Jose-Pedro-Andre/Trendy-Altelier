export type Role = 'CEO' | 'SECRETARY' | 'PRODUCTION_MANAGER' | 'CUSTOMER';

export type OrderStatus =
  | 'PENDING'
  | 'IN_PRODUCTION'
  | 'AWAITING_FITTING'
  | 'FINISHED'
  | 'DELAYED'
  | 'DELIVERED';

export type ApiUser = {
  id: string;
  username: string;
  email: string | null;
  fullName: string;
  phoneNumber: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  employeeProfile?: {
    id: string;
    userId: string;
    jobTitle: string;
    hireDate: string;
    isActive: boolean;
  } | null;
  customerProfile?: {
    id: string;
    userId: string;
    address: string | null;
    isVip: boolean;
    bodyMeasurements: unknown;
  } | null;
};

export type AuthUser = {
  id: string;
  username: string;
  email: string | null;
  role: Role;
  fullName: string;
  phoneNumber: string;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export type OrderItem = {
  id: string;
  orderId: string;
  description: string;
  quantity: number;
  unitPrice: string;
};

export type Order = {
  id: string;
  orderNumber: number;
  customerId: string;
  assignedToId: string | null;
  status: OrderStatus;
  totalAmount: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  customer?: {
    id: string;
    userId: string;
    user: {
      fullName: string;
    };
  };
  assignedTo?: {
    id: string;
    userId: string;
    user: {
      fullName: string;
    };
  } | null;
};

export type RegisterStaffPayload = {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  phoneParents?: string;
  role: Exclude<Role, 'CUSTOMER'>;
  jobTitle: string;
  hireDate?: string;
  isActive?: boolean;
};

export type RegisterCustomerPayload = {
  username: string;
  email?: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  phoneParents?: string;
  address?: string;
  bodyMeasurements?: Record<string, unknown>;
};

export type CreateOrderPayload = {
  customerId: string;
  assignedToId?: string;
  deadline: string;
  status?: OrderStatus;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
};
