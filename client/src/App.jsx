import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
// เอาไอดีมาใส่หลังAPI
function App() {
    // เมื่อมีการ rerender
    useEffect(() => {
        result();
    }, []);

    // ดึงข้อมูลจากserverเข้ามา
    const result = async () => {
        const produst = await axios.get('http://localhost:4001/products');
        setData(produst.data.data);
        // console.log(produst.data.data);
    };

    // เก็บข้อมูลจาก server
    const [data, setData] = useState([]);
    // const [dataDelete, setDataDelete] = useState();
    console.log('data', data);

    // execute delete data
    const removeData = async (event) => {
        const idDelet = Number(event.target.value);
        // ให้ลบข้อมูลใน server
        // console.log(event.target.value);
        // console.log(typeof idDelet);

        await axios.delete(`http://localhost:4001/products/${idDelet}`);
        // result();
        // ให้ลบข้อมูลใน UseState data
        const deleteData = data.filter((product) => {
            console.log('product.idDelet', idDelet);
            console.log('product.id ', product.id);
            return idDelet !== product.id;
        });
        console.log(deleteData);

        setData(deleteData);
    };
    // console.log(data);

    return data.map((productData) => (
        <div className="App" key={productData.id}>
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

                    <button
                        className="delete-button"
                        value={productData.id}
                        // onClick={() => removeData(productData.id)}
                        onClick={removeData}
                    >
                        x
                    </button>
                </div>
            </div>
        </div>
    ));
}

export default App;
