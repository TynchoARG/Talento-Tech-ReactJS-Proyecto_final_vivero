// Componente que organiza los productos que recibe
// y los pone uno al lado del otro con "flex" y además
// los ordena al ponerle on "key"

import Item from "./Item";
import styles from "./Productos.module.css";

function ItemList({ productos }) {
  return (
    <div className={styles.ItemList}>
      {productos.map (prod => (
        <Item key={prod.id} {...prod}/>
      ))}
    </div>
  );
}

export default ItemList;