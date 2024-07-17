import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();


    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    // const [coverImage, setCoverImage] = useState('');
    const [color, setColor] = useState('');
    const [textColor, setTextColor] = useState('');

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);


    const [updateProduct, { isLoading: loadingUpdate} ] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

    const navigate = useNavigate();


    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setColor(product.color);
            setImage(product.image);
            setTextColor(product.textColor);
            setDescription(product.description);
            setCountInStock(product.countInStock);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault(); 
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                category,
                description,
                countInStock,
                color,
                textColor,
        }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
            toast.success('Product updated');
            refetch();
            navigate('/admin/productlist');
        } catch (err) {
        toast.error(err?.data?.message || err.error);
        }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  return (
    <>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}

            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' >
                        <Form.Label>Name</Form.Label>
                        <Form.Control className='mb-3'
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control className='mb-3'
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.Control
                    label='Choose File'
                    onChange={uploadFileHandler}
                    type='file'
                ></Form.Control>
                {loadingUpload && <Loader />}
                </Form.Group>

                <Form.Group controlId='color'>
                <Form.Label>Color</Form.Label>
                <Form.Control className='mb-3'
                    type='text'
                    placeholder='Enter color'
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='textColor'>
                <Form.Label>Text Color</Form.Label>
                <Form.Control className='mb-3'
                    type='text'
                    placeholder='Enter text color'
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control className='mb-3'
                    type='number'
                    placeholder='Enter countInStock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                <Form.Label>Category</Form.Label>
                <Form.Control className='mb-3'
                    type='text'
                    placeholder='Enter category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='description'>
                <Form.Label>Description</Form.Label>
                <Form.Control className='mb-3'
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='light' style={{ width: "100%"}} className='mt-4 btn btn-outline-dark'>
                    Submit
                </Button>
                </Form>
            )}
        </FormContainer>
    </>
    
  )
}

export default ProductEditScreen
