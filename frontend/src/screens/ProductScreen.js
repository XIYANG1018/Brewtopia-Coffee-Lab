import {React, useState} from 'react'
import products from '../products'
import Rating from '../components/Rating';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import styles from "./Screens.module.css"

import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem, ButtonGroup, ToggleButton } from 'react-bootstrap';

const ProductScreen = () => {
    // get the id from the router
    const { id:productId } = useParams();
    // find the product by id
    const product = products.find((p) => p._id === productId)
    console.log(product);

    const colorStyle = {
      backgroundColor: product.color,
      color: product.textColor
    }

    const textColor = {
      color: product.textColor
    }

    const [selectedSize, setSelectedSize] = useState(Object.keys(product.sizes)[0]);


  return (
    <>
    <Link className='btn btn-light my-3' to='/' style={colorStyle}>Go Back</Link>
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
              <ButtonGroup toggle>
                {Object.keys(product.sizes).map((size) => (
                  <ToggleButton
                  key={size}
                  type='radio'
                  variant='secondary'
                  name='size'
                  value={size}
                  checked={selectedSize === size}
                  onChange={(e) => setSelectedSize(e.currentTarget.value)}
                  >
                    {size}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>${product.sizes[selectedSize].toFixed(2)}</h2>
            </ListGroup.Item>
          </ListGroup>

    
        </Col>

        
        
    </Row>

    </>
  )
}

export default ProductScreen
