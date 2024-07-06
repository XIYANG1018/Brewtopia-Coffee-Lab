import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useLoginMutation} from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/' // if redirect is not present in the url, then redirect to the home page

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        } 
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap(); // unwrap() is used to extract the data from the promise, get the response data
            dispatch(setCredentials(res)); // set the credentials in the redux store
            navigate(redirect); // redirect to the redirect page
            
        } catch (err) {
            toast.error(err?.data?.message || err.error); // question mark operator is used to avoid error if err is undefined
        }
    }

  return (
    <FormContainer>
        <h1 >Sign In</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='light' style={{ width: "100%"}} className='mt-4 btn btn-outline-dark' disabled= { isLoading }>
                Sign In
            </Button>

            {isLoading && <Loader />}
        </Form>

        
        <Row className='py-3'>
            <Col>
            {/**if redirect is present in the url, then redirect to the redirect page after registration, else redirect to the /register page */}
            {/*redirect to the page 同时传递一个名为 "redirect" 的参数，其值是 redirect 变量的内容. 例如，如果 redirect 变量的值是 "/checkout"，那么最终的 URL 会是：
/register?redirect=/checkout */}
                New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
