import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import Message from '../../components/Message'  
import Loader from '../../components/Loader'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
// import Paginate from '../../components/Paginate'
import { toast } from 'react-toastify';


const ProductListScreen = () => {
    const { data: products, error, isLoading, refetch } = useGetProductsQuery();

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();


    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure to delete')) {
          try {
            await deleteProduct(id);
            await refetch();
          } catch (error) {
            toast.error(error?.data?.message || error.message);
          }
        }
    }

    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product?')) {
          try {
            await createProduct();
            toast.success('Product created successfully');
            await refetch();
            
          } catch (error) {
            toast.error(error?.data?.message || error.message);
          }
        }
    }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-end'>
            <Button type='button' variant='light' style={{ width: "50%"}} className='btn btn-outline-dark' onClick={createProductHandler}>
                <FaPlus />  Create Product
            </Button>
            
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/admin/product/${product._id}/edit`}
                      variant='light'
                      className='btn-sm mx-2'
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

        </>
      )}
    </>
  )
}

export default ProductListScreen
