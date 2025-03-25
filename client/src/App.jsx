import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
    // เมื่อมีการ rerender
    useEffect(() => {
        resilt();
    }, []);
    // ดึงข้อมูลจากserverเข้ามา
    const resilt = async () => {
        const produst = await axios.get('http://localhost:4001/products');
        setData(produst.data.data);
        // console.log(produst.data.data);
    };
    // เก็บข้อมูลจาก server
    const [data, setData] = useState();

    // console.log(data);

    return data.map((productData) => (
        <div className="App">
            <div className="app-wrapper">
                <h1 className="app-title">Products</h1>
            </div>
            <div className="product-list">
                <div className="product">
                    <div className="product-preview">
                        <img
                            src={productData.image}
                            alt="some product"
                            width="350"
                            height="350"
                        />
                    </div>
                    <div className="product-detail">
                        <h1>Product name: {productData.name}</h1>
                        <h2>Product price: {productData.price} Baht</h2>
                        <p>Product description: {productData.description}</p>
                    </div>

                    <button className="delete-button" value={productData.id}>
                        x
                    </button>
                </div>
            </div>
        </div>
    ));
}

export default App;
