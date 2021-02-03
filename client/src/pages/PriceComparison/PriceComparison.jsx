import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from "../../components/Context/Context";
import { Col, Row, Typography, Divider, Button, Rate, Tag, Table } from 'antd';
import { ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import axios from 'axios';

// Get search query from search component. If the 'query' param is empty just redirect to homepage
// here get context api value and plug it into fetch api. From there display skeleton loader until
// data is done fetching & manipulated


import './PriceComparison.css'

const { Text, Title, Link } = Typography;

const columns = [
    // Merchant
  {
    title: 'Shops',
    dataIndex: 'merchant',
    key: 'merchant',
    render: merchantImage => <img alt={merchantImage} src={merchantImage} />,
  },
  // Product Image
   {
    title: "Image",
    dataIndex: "imageURL", 
    render: theImageURL => <img alt={theImageURL} src={theImageURL} /> 
  },
  // Details
  {
    title: 'Product Details',
    dataIndex: 'details',
    key: 'details',
    responsive: ['md'],
  },
  // Price
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  // Shop Button
  {
    title: '',
    dataIndex: 'shopButton',
    key: 'shopButton',
    render: shopButton => 
    <Button type="primary" size='medium' style={{height: '45px', fontSize: '15px'}} icon={<ShoppingOutlined/>}>
        {shopButton}
    </Button>
  },
];

const dataTest = [
  {
    key: '1',
    merchant: 'http://placehold.it/75x25',
    imageURL: 'http://placehold.it/115x115',
    details: 'Apple iPhone XR 64GB White in Very Good condition Unlocked',
    price: '$699.00',
    shopButton: 'Buy Now'
  },
];

const PriceComparison = ({ history }) => {
    // Context (search value)
    const ctx = useContext(AppContext);
    const isMounted = useRef(false)
    const [data, setData] = useState('')
    
    // Fetch data
    useEffect(() => {
        isMounted.current = true;
        const getProductData = async () => {
            if(ctx.searchValue === '') {
                history.push('/')
                return () => (isMounted.current = false)
            } else {
                const res = await axios.get(`/api/bestProduct?q=${ctx.searchValue}`)
                const data = res.data;

                // Get the lowest price

                setData(data)
                console.log(data)
                return () => (isMounted.current = false)
            }
        }
        getProductData()
    }, [ctx.searchValue, history]);

    return (
        <>
            <Divider /> 
            {/* Best price product wrapper */}
            <Row className="productWrapper">
                {/* Product title */}
                <Title level={2} style={{margin:0}}>iPhone X 64gb space-grey</Title>
                <Tag color="volcano" style={{margin: 'auto 10px'}}>BEST PRICE</Tag>
                <Divider />
                {/* Product image */}
                <Col flex="0 0 40%" className="column productImage"> 
                    <img src='http://placehold.it/308x308' className="image" alt="test"/>
                </Col>
                {/* Product Information */}
                <Col flex="0 0 60%" className="column productDetails">
                    <Row className="column productPrice">
                        <Col>
                            <Text>
                                The best price by <Link>Apple</Link>
                            </Text>
                            <Title level={3} style={{margin:0}}>$689.00</Title>
                        </Col>
                        {/* <Col style={{margin: 'auto 0', marginLeft: 'auto'}}>
                            <Button type="primary" size='medium' icon={<ShoppingOutlined/>} >
                                Compare Prices
                            </Button>
                        </Col>     */}
                    </Row>
                    <Divider />
                    {/* Product reviews */}
                    <Row className="column productReviews">
                        <Title level={4} style={{marginRight: '10px', marginBottom: 0}}>4.5 / 5</Title>
                        <Rate disabled allowHalf defaultValue='4.5' style={{fontSize: '16px'}} />
                        <Link target="_blank" rel="noopener noreferrer" href={'/#customerReviews'} style={{margin: "6px 0 0 13px"}}>
                            1234 reviews
                        </Link>
                    </Row>
                    <Divider />
                    <Col>
                        <Row justify="left">
                            <Button className="productButtons" type="primary" size='medium' icon={<ShoppingCartOutlined/>} style={{ marginTop: '10px', marginBottom: '10px', height: '45px', fontSize: '16px'}}>
                                Add to cart
                            </Button>
                        </Row>
                        <Row justify="left">
                            <Button className="productButtons" type="primary" size='medium' icon={<ShoppingOutlined/>}  style={{height: '45px', fontSize: '16px'}}>
                                Buy Now
                            </Button>
                        </Row>
                    </Col>
                </Col>
                <Divider />
                {/* Compare title */}
                <Title level={2} style={{margin:0}}>Compare Prices</Title>
                <Divider />
                <Table style={{width: '100%'}} columns={columns} dataSource={dataTest} pagination={false}/>
                {/* Comparison table labels*/}
                {/* <Row className="tableLabels">
                    <Row className="shopLabel" style={{width: '12.5%'}}>
                        <Text>Shops</Text>
                    </Row>
                    <Row className="imageLabel" style={{width: '14.5%'}}>
                        <Text>Product Image</Text>
                    </Row>
                    <Row className="productLabel" style={{width: '38.5%'}}>
                        <Text>Product Details</Text>
                    </Row>
                    <Row className="shippingLabel" style={{width: '8.5%'}}>
                        <Text>
                            Shipping
                        </Text>
                    </Row>
                    <Row className="priceLabel" style={{width: '26%'}}>
                        <Text>Price</Text>
                    </Row>
                </Row>
                <Row>
                    <a href="#" className="tableWrapper" style={{padding: '20px 0'}}> 
                        <Row>
                            <Row style={{paddingRight: '50px', width: '12.5%'}} >
                                <img src='http://placehold.it/75x25' alt="test"/>
                            </Row>
                        </Row>
                        <Row>
                             <Row style={{width: '14.5%'}}>
                                <img src='http://placehold.it/115x115'  alt="ipgoe"/>
                            </Row>
                        </Row>
                        <Row>
                            <Text>Apple iPhone XR 64GB White in Very Good condition Unlocked</Text>
                        </Row>
                        <Row>
                            <Text>In Stock</Text>
                        </Row>
                    </a>
                </Row> */}
            </Row>
        </>
    )
}

export default withRouter(PriceComparison)







