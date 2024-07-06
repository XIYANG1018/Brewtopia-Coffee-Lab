import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import {useRegisterMutation} from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const { userInfo } = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        } 
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        // check if the password and confirm password are the same
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        } else {
            try {
                const res = await register({ name, email, password }).unwrap(); // unwrap() is used to extract the data from the promise, get the response data
                dispatch(setCredentials(res)); // set the credentials in the redux store
                navigate(redirect); // redirect to the redirect page
                
            } catch (err) {
                toast.error(err?.data?.message || err.error); // question mark operator is used to avoid error if err is undefined
            }
        }
    }

  return (
    <FormContainer>
        <h1 >Sign Up</h1>

        <Form onSubmit={submitHandler}>

            <Form.Group controlId='name' className='my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='my-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='light' style={{ width: "100%"}} className='btn btn-outline-dark' disabled= { isLoading }>
                Register
            </Button>
            

            {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
            <Col>
            {/**if redirect is present in the url, then redirect to the redirect page after registration, else redirect to the /register page */}
            {/*redirect to the page 同时传递一个名为 "redirect" 的参数，其值是 redirect 变量的内容. 例如，如果 redirect 变量的值是 "/checkout"，那么最终的 URL 会是：
/register?redirect=/checkout */}
                Already have an account?
                <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                
            </Col>
        </Row>

        

    </FormContainer>
  )
}

export default RegisterScreen
