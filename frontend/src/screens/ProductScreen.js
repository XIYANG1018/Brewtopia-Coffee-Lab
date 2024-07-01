// import React, { useEffect, useState } from 'react';

import React, { useState } from 'react';
import Rating from '../components/Rating';
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import styles from "./Screens.module.css"
// import axios from 'axios';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

import { Row, Col, ListGroup, Image, Form} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';


const ProductScreen = () => {
  // get the id from the router
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1); // default quantity is 1

  

  // 用axios从后端获取数据的方法：

  // // product 的初始状态设置为一个空对象，以避免在未定义对象上访问属性时出现错误
  // const [product, setProduct] = useState({});
  
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } =  await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   }

  //   fetchProduct();
  // }, [productId]);

  // 用Redux Toolkit的useGetProductDetailsQuery自定义 Hook从后端获取数据的方法：
  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty})); // dispatch the addToCart action function with the product and quantity
    navigate('/cart'); // redirect to the cart page
  }

  // console.log(product);

  
  const sizes = ['4oz', '10oz', '2lbs', '5lbs'];
  const [activeButton, setActiveButton] = useState(sizes[0]);

  // useGetProductDetailsQuery 自定义 Hook 返回的数据有延迟，那么在初始渲染时可能是 undefined。
  // 这种情况下，需要确保在访问 product 属性之前进行有效性检查，以避免访问 undefined 的属性。
  const colorStyle = product ? {
    backgroundColor: product.color,
    color: product.textColor
  } : {};
  
  const textColor = product ? {
    color: product.textColor
  } : {};
  

  
  const handleButtonClick = (size) => {
    setActiveButton(size);
  };


  return (
    <>
    <Link className='btn btn-light my-3' to='/' style={colorStyle}>Go Back</Link>
    {isLoading ? (
        <Loader />
    ) : error ? (
      <Message variant={'danger'}>{ error?.data?.message || error.error }</Message>
    ) : (
    <Row>
        <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
        </Col>

        <Col className={styles.details} md={7} style={colorStyle}>

          <ListGroup variant='flush'>
            <ListGroup.Item className={styles.listGroupItem}>
              <h3 style={textColor}>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item className={styles.listGroupItem}>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} style={textColor}/>
            </ListGroup.Item>

            <ListGroup.Item className={styles.listGroupItem}>
              <p style={textColor}>{product.description}</p>
            </ListGroup.Item>

            <ListGroup.Item className={styles.listGroupItem}>
              <h3 style={textColor}>Select a Size</h3>
              <div className='d-flex justify-content-between'>
                <div className="btn-group" role="group">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`btn btn-outline-light ${activeButton === size ? 'active' : ''}`}
                      onClick={() => handleButtonClick(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <h2>
    
                ${product.sizes?.[activeButton]}
                </h2>
              </div>

              <div className='d-flex justify-content-end'>
                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
              </div>           

            </ListGroup.Item>
              
            <ListGroup.Item className={styles.listGroupItem}>
              {product.countInStock > 0 && (
                <Row>
                  <Col xs={3} className="d-flex align-items-center">
                    <span>Quantity:</span></Col>
                  <Col xs={3}>
                    <Form.Control 
                      as='select'
                      value={qty} 
                      onChange={(e) => setQty(Number(e.target.value))}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                      
                  
                  </Col>
                  <Col xs={6}>
                    <button 
                      style={{ width: "100%"}}
                      className='btn btn-outline-light' 
                      
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                      >
                      + Add To Cart
                    </button>
                  </Col>

                </Row>
              )}
             

            </ListGroup.Item>

          </ListGroup>

    
        </Col>

        
        
    </Row>
    )}
    </>
  )
}

export default ProductScreen
