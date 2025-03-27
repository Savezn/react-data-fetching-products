import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
/* - buile function async in side try catch
    try
    option- show text lond doing is true
    -declare varievble to get data server
    -checkout tybe data sting or array
    -get data in to useState tpye ArrayObject
    option- show text lond doing is false
    -log complete
    catch
    -log error
-declare useEffect to execute function get data from server
-declare useState to get data is type ArrayObject
-mapdata 
    -setKey is id
    -use data to show name useState .key
 */

function App() {
    const [dataServer, setDataServer] = useState([]);

    const getData = async () => {
        try {
            const result = await axios.get('http://localhost:4001/products');
            console.log(typeof result);
            console.log('result =  ', result);
            setDataServer((beforData) => [...beforData, ...result.data.data]);
            console.log('getdata complete');
        } catch (error) {
            console.log('getdata is lost', error);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    //ต้องเรียดใช้แบบ callback function เท่านั้น
    console.log('dataServer =  ', dataServer);
    return (
        <div className="App">
            <div className="app-wrapper">
                <h1 className="app-title">Products</h1>
            </div>
            <div className="product-list">
                {dataServer.map((dataServer) => {
                    return (
                        <div className="product" key={dataServer.id}>
                            <div className="product-preview">
                                <img
                                    src={dataServer.image}
                                    alt="some product"
                                    width="350"
                                    height="350"
                                />
                            </div>
                            <div className="product-detail">
                                <h1>Product name: {dataServer.name}</h1>
                                <h2>Product price: {dataServer.price} Baht</h2>
                                <p>
                                    Product description:{' '}
                                    {dataServer.description}
                                </p>
                            </div>

                            <button className="delete-button">x</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
