export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface ApiCallLog {
  id: string;
  method: string;
  url: string;
  status: number;
  responseTimeMs?: number;
  payload?: string;
  response?: string;
  timestamp: string;
}

export interface BackendStats {
  uptimeSeconds: number;
  totalRequests: number;
  memoryUsageMb: number;
  activeTasks: number;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
  email: string;
  address: string;
  password?: string;
  role: string;
}

export interface Product {
  id: number;
  productName: string;
  sellingPrice: number;
  priceAtPurchase: number;
  stockQuantity: number;
}

export interface SaleItemDTO {
  productId: number;
  quantity: number;
}

export interface CreateSaleDTO {
  employeeId: number;
  saleItemDTOS: SaleItemDTO[];
}

export interface SaleItem {
  product: Product;
  price: number;
  quantity: number;
}

export interface SaleDTO {
  id: number;
  createdAt: string;
  saleItems: SaleItem[];
  totalAmount: number;
  employeeId: number;
  employeeName?: string;
}
