import React from 'react'
import { useState, useEffect } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../slices/cartSlice'


const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form className='my-6' onSubmit={submitHandler}>
            <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label> 
            <Col>
                <Form.Check
                type='radio'
                className='my-3'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                type='radio'
                className='my-3'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>
            </Form.Group>


            <Button type='submit' variant='light' style={{ width: "100%"}} className='mt-4 btn btn-outline-dark' >
                Continue
            </Button>
        </Form> 
    </FormContainer>
  )
}

export default PaymentScreen
