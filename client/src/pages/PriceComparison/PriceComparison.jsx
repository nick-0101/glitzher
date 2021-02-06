import React, { useContext, useEffect, useState, useRef, useCallback  } from 'react';
import { AppContext } from "../../components/Context/Context";
import { Col, Row, Typography, Divider, Button, Rate, Table, Image } from 'antd';
import { ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import axios from 'axios';

// Get search query from search component. If the 'query' param is empty just redirect to homepage
// here get context api value and plug it into fetch api. From there display skeleton loader until
// data is done fetching & manipulated

import SkeletonLoader from '../../components/SkeletonLoaders/ComparisonSkeleton';
import './PriceComparison.css'

const { Text, Title, Link } = Typography;

const PriceComparison = ({ history }) => {
    // Context (search value)
    const ctx = useContext(AppContext);
    const isMounted = useRef(false)
    const [data, setData] = useState('')
    const [tableData, setTableData] = useState('')
    const [noData, setNoData] = useState(false)

    const getProductData = useCallback(async() => {
        try {
            const res = await axios.get(`/api/bestProduct?q=${ctx.searchValue}`)
            const data = res.data;

            if(data === undefined || data.length === 0) {
                console.log(data)
                setNoData(true)
                return;
            } else {
                // Get the lowest price
                data.sort((a, b) => 
                    // Special expression is replacing '$'
                    parseFloat(a.price.replace(/\$/g, '')) - parseFloat(b.price.replace(/\$/g, ''))
                );

                // Set & format table data
                const tabledData = data.map((item, index) => ({
                    key: index,
                    merchant: item.brand,
                    imageURL: item.thumbnail || item.subThumbnail || 'data:image/png;base64,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',
                    details: item.title,
                    price: item.price,
                    shopButton: item.url || item.link
                }))

                
                setTableData(tabledData)
                setData(data)
                console.log(data)
            }
        } catch(err) {
            console.error(err)
        }
    }, [ctx.searchValue])

    // Fetch data
    useEffect(() => { 
        isMounted.current = true;
        if(ctx.searchValue === '') {
            history.push('/')
            return () => (isMounted.current = false)
        } else {
            getProductData()
            return () => (isMounted.current = false)
        }
    }, [ctx.searchValue, history, getProductData]);

    const columns = [
        // Merchant
        {
            title: 'Shop',
            dataIndex: 'merchant',
            key: 'merchant',
            render: merchant => <Title level={5} style={{margin:0}}>{merchant === undefined ? 'Unknown' : merchant}</Title>,
        },
        // Product Image
        {
            title: "Image",
            dataIndex: "imageURL", 
            render: theImageURL => <Image preview={false} width={115} height={115} src={theImageURL} />  
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
            render: price => <Title level={5} style={{margin:0}}>{(price).includes('$') ? price : '$'+price}</Title>
        },
        // Shop Button
        {
            title: '',
            dataIndex: 'shopButton',
            key: 'shopButton',
            render: shopButton => 
            <Link target="_blank" rel="noopener noreferrer" href={shopButton} className="productButtonWrapper">
                <Button type="primary" size='medium' style={{height: '45px', fontSize: '15px', paddingTop:'4.5px'}} icon={<ShoppingOutlined/>}>
                    Buy Now
                </Button>
            </Link>
        },
    ];

    return (
        <>
        {noData === true ? 
            <h1>No Data</h1>  
            : 
            <>
                {data ?
                    <>
                    <Divider /> 
                        <Row className="productWrapper">
                            <Title level={2} style={{margin:0}}>{data[0].title}</Title>
                            {/* <Row>
                                <Tag color="red" style={{margin: '12px 10px'}}>BEST PRICE</Tag>
                            </Row> */}
                            <Divider />
                            {/* Product image */}
                            <Col flex="0 0 40%" className="column productImage">
                                {data[0].thumbnail || data[0].subThumbnail ?
                                    <> 
                                    {data[0].thumbnail ?
                                        <img src={data[0].thumbnail} className="productThumbnail" alt={data[0].title} />
                                        :
                                        <img src={data[0].subThumbnail} className="productThumbnail" alt={data[0].title} />
                                    }
                                    </>
                                    : 
                                    <Image
                                        width={300}
                                        height={300}
                                        src="error"
                                        fallback="data:image/png;base64,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"
                                    />
                                }
                            </Col>
                            {/* Product Information */}
                            <Col flex="0 0 60%" className="column productDetails">
                                <Row className="column productPrice">
                                    <Col>
                                        {/* Best price title */}
                                        {data[0].brand ? 
                                            <Text>
                                                The best price by <Link>{data[0].brand}</Link>
                                            </Text>     
                                        :   <Text>
                                                This is the best price we found.
                                            </Text>
                                        }
                                        {/* Price */}
                                        {data[0].price ? 
                                            <Title level={3} style={{margin:0}}>
                                                {(data[0].price).includes('$') ? data[0].price : '$' + data[0].price}
                                            </Title>
                                            : 
                                            <Title level={3} style={{margin:0}}>
                                                {data[0].price.current_price}
                                            </Title>   
                                        }
                                    </Col>
                                </Row>
                                <Divider />
                                {/* Product reviews */}
                                <Row className="column productReviews">
                                    {/* Rating Number */}
                                    {data[0].rating ? 
                                        <Title level={4} style={{marginRight: '10px', marginBottom: 0}}>{data[0].rating === "No Stars" ? 'N/A' : data[0].rating + ' / 5'}</Title>
                                        :  
                                        <Title level={4} style={{marginRight: '10px', marginBottom: 0}}>{data[0].reviews.rating} / 5</Title>
                                    }
                                    {/* Star Rating */}
                                    {data[0].totalReviews ?
                                        <Rate disabled allowHalf defaultValue={parseFloat(data[0].rating)} style={{fontSize: '16px'}} />
                                        :
                                        <Rate disabled allowHalf defaultValue={data[0].reviews.total_rating} style={{fontSize: '16px'}} />
                                    }
                                    {/* Total Reviews */}
                                    {data[0].totalReviews ? 
                                        <Link target="_blank" rel="noopener noreferrer" href={data[0].link} style={{margin: "6px 0 0 13px"}}>
                                            {data[0].totalReviews === "N/A" ? 'N/A' : parseFloat(data[0].totalReviews ) + ' reviews'} 
                                        </Link>
                                        :  
                                        <Link target="_blank" rel="noopener noreferrer" href={data[0].url + '/#customerReviews'} style={{margin: "6px 0 0 13px"}}>
                                            {data[0].reviews.total_reviews} reviews
                                        </Link>
                                    }
                                </Row>
                                <Divider />
                                <Col>
                                    <Row justify="left">
                                        <Link target="_blank" rel="noopener noreferrer" href={data[0].link} className="productButtonWrapper">
                                            <Button className="productButton" type="primary" size='medium' icon={<ShoppingCartOutlined/>}  style={{marginTop: '10px', marginBottom: '10px', height: '45px', fontSize: '16px'}}>
                                                Add to cart
                                            </Button>
                                        </Link>
                                    </Row>
                                    <Row justify="left">
                                        <Link target="_blank" rel="noopener noreferrer" href={data[0].link} className="productButtonWrapper">
                                            <Button className="productButton" type="primary" size='medium' icon={<ShoppingOutlined/>}  style={{height: '45px', fontSize: '16px'}}>
                                                Buy Now
                                            </Button>
                                        </Link>
                                    </Row>
                                </Col>
                            </Col>
                            <Divider />
                            {/* Compare title */}
                            <Title level={2} style={{margin:0}}>Compare Prices</Title>
                            <Divider />

                            <Table className="table-striped-rows" style={{width: '100%'}} columns={columns} dataSource={tableData} pagination={false}/>
                        </Row>
                    </>
                    :
                    <SkeletonLoader />
                }
            </>
        }

        </>
    )
}

export default withRouter(PriceComparison)







