import {React, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { PayPalButtons,  usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { usePayOrderMutation, useGetPayPalClientIdQuery, useGetOrderDetailsQuery, useDeliverOrderMutation } from '../slices/ordersApiSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const OrderScreen = () => {

  const { id: orderId } = useParams()

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
  // refetch() is used to refetch the new data from the server, in this case, the order details, don't end up with stale data
  // stale data is data that is outdated and no longer valid

  const [payOrder, { isLoading: loadingPay}] = usePayOrderMutation()

  const [deliverOrder, { isLoading: loadingDeliver}] = useDeliverOrderMutation()

  const [{ isPending}, paypalDispatch] = usePayPalScriptReducer()

  const { data: paypal, isLoading: loadingPaypal, error: errorPaypal } = useGetPayPalClientIdQuery()

  const { userInfo } = useSelector((state) => state.auth)


  // 用于在特定条件下加载 PayPal 脚本
  useEffect(() => {
    
    if (!errorPaypal && !loadingPaypal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({ type: 'reset', value: { 'client-id': paypal.clientId, currency: 'USD' } });
        paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
      }
      if (order && !order.isPaid) {
        if (!window.paypal) { // 检查 PayPal 脚本是否已经加载（通过检查 window.paypal 是否存在）
          loadPaypalScript()
        }
      }
    }
  }, [order, paypal, paypalDispatch, errorPaypal, loadingPaypal])

  function onApprove(data, actions) {
    return actions.order.capture().then(async function(details) {
      try {
        await payOrder({orderId, details})
        toast.success('Order paid')
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    })
  }
  
  function onError(err) {
    toast.error(err?.data?.message || err.message)
  }
  
  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    }).then((orderId) => {
      return orderId
    })
  }
  
  async function onApproveTest() {
    await payOrder({orderId, details: { payer: {}}})
    toast.success('Order paid')
    refetch()
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId)
      toast.success('Order delivered')
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }

  return (
    isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p><strong>Name: </strong>{order.user.name}</p>
                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p> 
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p><strong>Method: </strong>{order.paymentMethod}</p>
                {order.isPaid ? (
                  <Message variant='success'>Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant='danger'>Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col style={{fontWeight: 800}}>Total</Col>
                        <Col style={{fontWeight: 800}}>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    { !order.isPaid && (
                      <ListGroup.Item>
                        {loadingPay && <Loader />}
                        {isPending ? <Loader /> : (
                          <div>
                            {/* <Button
                        style={{ marginBottom: '10px' }}
                        onClick={onApproveTest}
                      >
                        Test Pay Order
                      </Button> */}
                          
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                                
                                
                            
                          </div>
                          
                        )}
                    
                      </ListGroup.Item>)
                    }

                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <ListGroup.Item>
                        <Button type='button' variant='light' style={{ width: "100%"}} className='mt-4 btn btn-outline-dark' onClick={deliverOrderHandler}>
                            Mark As Delivered
                        </Button>
                      </ListGroup.Item>)
                    }
                  </ListGroup>
                </Card>
          </Col>
        </Row>
      </>
    )
  )
}

export default OrderScreen
