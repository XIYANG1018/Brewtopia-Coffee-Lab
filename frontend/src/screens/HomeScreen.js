import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import styles from "./Screens.module.css"
import Product from '../components/Product'

const HomeScreen = () => {
  return (
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
    
  )
}

export default HomeScreen
