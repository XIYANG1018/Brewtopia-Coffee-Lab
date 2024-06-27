// import { useEffect, useState } from 'react'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
// import products from '../products' 应该从后端fetch data
import styles from "./Screens.module.css"
import Product from '../components/Product'
// import axios from 'axios'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const {data} = await axios.get('/api/products');
    //         setProducts(data);
    //     };

    //     fetchProducts();
    // }, []);
    const { data: products, isLoading, error } = useGetProductsQuery();


    return (
    <> 
    {isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant={'danger'}>{ error?.data?.message || error.error }</Message>
    ) : (
        <>
        <div className={styles.heading}>
            <h1>
                Our Best Coffee

            </h1>
            <hr></hr>
        </div>
    
        <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
        </>
    ) }
        
    </>
    
    )
}

export default HomeScreen
