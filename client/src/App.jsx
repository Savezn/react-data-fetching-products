import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const main = async () => {
      const responese = await axios.get("http://localhost:4001/products");
      setProducts(responese.data.data || []);
    };
    main();
  }, []);
  console.log(products);
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      // อัปเดต State โดยกรองสินค้าที่ถูกลบออก
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>

      {products.map((item) => 
      <div className="product-list" key={item.id}>
        <div className="product">
          <div className="product-preview">
            <img
              src={item.image}
              alt={item.name}
              width="350"
              height="350"
            />
          </div>
          <div className="product-detail">
            <h1>Product name: {item.name}</h1>
            <h2>Product price: {item.price}</h2>
            <p>Product description: {item.description}</p>
          </div>

          <button className="delete-button" onClick={() => handleDelete(item.id)}>x</button>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
