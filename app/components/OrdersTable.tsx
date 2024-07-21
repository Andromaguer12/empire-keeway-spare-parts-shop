import styles from "./styles/OrdersTable.module.css";

const OrdersTable = ({ orders }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Lista de Órdenes</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID de Orden</th>
            <th>Cliente</th>
            <th>Número de Teléfono</th>
            <th>Productos</th>
            <th>Cantidad de Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.cliente.nombre}</td>
              <td>{order.cliente.telefono}</td>
              <td>
                <ul>
                  {order.productos.map((producto, index) => (
                    <li key={index}>{producto}</li>
                  ))}
                </ul>
              </td>
              <td>{order.cantidad}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
