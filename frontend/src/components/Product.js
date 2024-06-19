import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product}) => {
  return (

    <Card className='my-3 p-3 rounded'>

        <Link to={`/product/${product._id}`}>
            <div className='product-image'>
                <Card.Img src={product.image} variant='top' className='card-image'/>
                <Card.Img src={product.hoverImage} variant='top' className='hover-image'/>
            </div>
            
        </Link>


        <Card.Body>
            <Card.Title as='div' className='product-title'>
                <strong>{product.name}</strong>
            </Card.Title>

            <Card.Text as='div'>
                <Rating value={product.rating}  text={`${product.numReviews} reviews`} />
            </Card.Text>

            <Card.Text as='h5'>${product.price}</Card.Text>

        </Card.Body>
    </Card>

    
  )
}

export default Product
