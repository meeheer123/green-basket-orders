
export type Product = {
  id: string;
  name: string;
  category: 'vegetable' | 'fruit';
  price: number;
  unit: string;
  image: string;
  description: string;
};

export type OrderStatus = 'pending' | 'in-progress' | 'delivered';

export interface OrderItem {
  productId: string;
  quantity: number;
  pricePerUnit: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  total: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Carrots",
    category: "vegetable",
    price: 1.99,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Fresh, locally grown carrots. Perfect for salads and cooking."
  },
  {
    id: "2",
    name: "Ripe Tomatoes",
    category: "vegetable",
    price: 2.49,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Juicy, ripe tomatoes grown in our organic farms."
  },
  {
    id: "3",
    name: "Green Apples",
    category: "fruit",
    price: 3.99,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Crisp and sweet green apples. Great for snacking or baking."
  },
  {
    id: "4",
    name: "Bananas",
    category: "fruit",
    price: 1.79,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Perfectly ripe bananas, rich in potassium and natural sweetness."
  },
  {
    id: "5",
    name: "Fresh Spinach",
    category: "vegetable",
    price: 2.29,
    unit: "bunch",
    image: "/placeholder.svg",
    description: "Nutrient-packed spinach leaves, excellent for salads and cooking."
  },
  {
    id: "6",
    name: "Red Onions",
    category: "vegetable",
    price: 1.49,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Sweet red onions, perfect for salads and garnishing."
  },
  {
    id: "7",
    name: "Sweet Oranges",
    category: "fruit",
    price: 4.99,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Juicy, vitamin-C rich oranges. Perfect for juicing or eating."
  },
  {
    id: "8",
    name: "Fresh Cucumber",
    category: "vegetable",
    price: 1.89,
    unit: "kg",
    image: "/placeholder.svg",
    description: "Crisp cucumbers, perfect for salads and sandwiches."
  }
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      { productId: "1", quantity: 5, pricePerUnit: 1.99 },
      { productId: "3", quantity: 3, pricePerUnit: 3.99 }
    ],
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "555-123-4567",
      address: "123 Main St, Anytown, AN 12345"
    },
    status: "pending",
    createdAt: "2023-04-15T10:30:00Z",
    updatedAt: "2023-04-15T10:30:00Z",
    total: 21.92
  },
  {
    id: "ORD-002",
    items: [
      { productId: "2", quantity: 2, pricePerUnit: 2.49 },
      { productId: "4", quantity: 4, pricePerUnit: 1.79 }
    ],
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "555-987-6543",
      address: "456 Oak Ave, Somewhere, SM 67890"
    },
    status: "in-progress",
    createdAt: "2023-04-14T14:20:00Z",
    updatedAt: "2023-04-15T09:45:00Z",
    total: 12.14
  },
  {
    id: "ORD-003",
    items: [
      { productId: "5", quantity: 2, pricePerUnit: 2.29 },
      { productId: "7", quantity: 5, pricePerUnit: 4.99 }
    ],
    customer: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "555-333-7777",
      address: "789 Pine Rd, Elsewhere, EL 54321"
    },
    status: "delivered",
    createdAt: "2023-04-12T11:15:00Z",
    updatedAt: "2023-04-14T13:20:00Z",
    total: 29.53
  }
];
