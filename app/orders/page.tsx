"use client";

import OrdersTable from "../components/OrdersTable";

export default function Orders() {
  // Ejemplo de datos de órdenes
  const orders = [
    {
      id: "1",
      cliente: { nombre: "Juan Pérez", telefono: "123-456-7890" },
      productos: ["P1", "P2", "P3"],
      cantidad: 3,
      total: "$150.00",
    },
    {
      id: "2",
      cliente: { nombre: "Ana Gómez", telefono: "987-654-3210" },
      productos: ["P4", "P5"],
      cantidad: 2,
      total: "$80.00",
    },
  ];

  return (
    <div>
      <OrdersTable orders={orders} />
    </div>
  );
}
