import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from './Product';
import Loader from './Loader';
import Message from './Message';
import { listProducts } from '../Redux/actions/productAction';

const Home = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
  
    const { loading, products, error } = productList;
 
    
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <h1>TRENDING PRODUCTS</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

export default Home;