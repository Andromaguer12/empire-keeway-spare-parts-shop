import { useCallback, useEffect, useState } from "react";
import styles from "./styles/OrdersTable.module.css";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export interface OrderItem {
  item_id: string;
  quantity: number;
}

export interface OrdersCards {
  _id?: string;
  date: Date;
  client: {
    name: string;
    ci: string;
    email: string;
    phone_number: string;
  };
  items: OrderItem[];
  total: number;
}

const OrdersTable = () => {
  const [orders, setOrders] = useState<OrdersCards[]>([]);

  const generateExcel = (orders) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders");

    // Configurar estilos para el encabezado
    worksheet.columns = [
      { header: "ID de Orden", key: "_id", width: 20 },
      { header: "Cliente", key: "client_name", width: 25 },
      { header: "Número de Teléfono", key: "phone_number", width: 20 },
      { header: "Correo electrónico", key: "email", width: 25 },
      { header: "Cédula", key: "ci", width: 20 },
      { header: "Productos", key: "products", width: 30 },
      { header: "Cantidad de Productos", key: "quantity", width: 20 },
      { header: "Total", key: "total", width: 15 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "0000FF" }, // Azul
      };
      cell.font = {
        color: { argb: "FFFFFF" }, // Blanco
        bold: true,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Añadir las filas de datos
    orders.forEach((order) => {
      worksheet.addRow({
        _id: order._id,
        client_name: order.client?.name ?? "--",
        phone_number: order.client?.phone_number ?? "--",
        email: order.client?.email ?? "--",
        ci: order.client?.ci ?? "--",
        products: (order.items ?? [])
          .map(
            (producto) =>
              `${producto?.item_id ?? "--"} qty: ${producto?.quantity ?? 0}`
          )
          .join(", "),
        quantity:
          order.items?.reduce((acc, obj) => (acc += obj.quantity), 0) ?? 0,
        total: order.total ?? 0,
      });
    });

    // Aplicar estilos a las filas alternas
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: rowNumber % 2 === 0 ? "FFF5EE" : "FFFFFF" }, // Piel claro y blanco
          };
          cell.font = {
            color: { argb: "000000" }, // Negro
          };
        });
      }
    });

    // Guardar el archivo Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), "orders.xlsx");
    });
  };
  useEffect(() => {
    const fetchFunction = async () => {
      const ordersQuery = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!ordersQuery.ok) {
        throw new Error("Error al enviar el formulario");
      }

      const response = await ordersQuery.json();

      setOrders(response ?? []);
    };

    fetchFunction();
  }, []);

  const handleGenerateExcel = useCallback(() => {
    generateExcel(orders);
  }, [orders]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Lista de Órdenes</h2>
        <button onClick={() => handleGenerateExcel()}>Descargar Excel</button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID de Orden</th>
            <th>Cliente</th>
            <th>Número de Teléfono</th>
            <th>Correo electrónico</th>
            <th>Cédula</th>
            <th>Productos</th>
            <th>Cantidad de Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order?.client?.name ?? "--"}</td>
              <td>{order?.client?.email ?? "--"}</td>
              <td>{order?.client?.phone_number ?? "--"}</td>
              <td>{order?.client?.ci ?? "--"}</td>
              <td>
                <ul>
                  {(order?.items ?? []).map((producto, index) => (
                    <li key={index}>
                      {producto?.item_id ?? "--"} qty: {producto?.quantity ?? 0}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                {order?.items?.reduce((acc, obj) => (acc += obj.quantity), 0) ??
                  0}
              </td>
              <td>{order?.total ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
