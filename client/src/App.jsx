import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    getProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");

  const getProducts = async () => {
    try {
      console.log("Loading...");
      setStatus("Loading...");
      const response = await axios.get("http://localhost:4001/products");

      if (response.status === 200) {
        setProducts(response.data.data);
        setStatus("");
        console.log("Product loading success.");
      } else {
        console.log(`Unexpected status code: ${response.status}`);
        setProducts("");
        setStatus("Fetching Error...");
      }
    } catch (error) {
      console.error("Product loading failed:", error.message);
      setProducts("");
      setStatus("Fetching Error...");
    }
  };

  const deleteProducts = async (productId) => {
    try {
      console.log("Deleting product...");
      const response = await axios.delete(
        `http://localhost:4001/products/${productId}`
      );

      // Update the state with the remaining products
      // Method1:
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      // Method2: getProducts()

      console.log("Product deletion success.");
      return true;
    } catch (error) {
      console.error("Product deletion failed:", error.message);
      return false;
    }
  };

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {products && products.length > 0 ? (
        products.map((item) => {
          return (
              <div className="product-list" key={item.id}>
                <div className="product">
                  <div className="product-preview">
                    <img
                      src={item.image}
                      alt="some product"
                      width="350"
                      height="350"
                    />
                  </div>
                  <div className="product-detail">
                    <h1>Product name: {item.name}</h1>
                    <h2>Product price: {item.price} Baht</h2>
                    <p>Product description: {item.description}</p>
                  </div>

                  <button
                    className="delete-button"
                    onClick={() => deleteProducts(item.id)}
                  >
                    x
                  </button>
                </div>
              </div>
          );
        })
      ) : (
        <h1>{status}</h1>
      )}
    </div>
  );
}

export default App;
