
import React from "react";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/mockData";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  let badgeClass = "";
  
  switch (status) {
    case "pending":
      badgeClass = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      break;
    case "in-progress":
      badgeClass = "bg-blue-100 text-blue-800 hover:bg-blue-100";
      break;
    case "delivered":
      badgeClass = "bg-green-100 text-green-800 hover:bg-green-100";
      break;
    default:
      badgeClass = "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
  
  return (
    <Badge className={badgeClass} variant="outline">
      {status === "pending" ? "Pending" : 
       status === "in-progress" ? "In Progress" : 
       status === "delivered" ? "Delivered" : status}
    </Badge>
  );
};
