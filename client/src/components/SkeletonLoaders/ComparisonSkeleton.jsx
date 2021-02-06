import React from 'react';
import { Skeleton, Table, Col, Row, Divider } from 'antd';
import '../../pages/PriceComparison/PriceComparison.css'
import './skeleton.css'

const ComparisonSkeleton = () => {
    const columns = [
        // Merchant
        {
            title: <Skeleton.Input style={{ width: 90, height: 20, borderRadius: 4 }} active />,
            dataIndex: 'shopButton',
            key: 'shopButton',
            render: shopButton =>   
            <Skeleton.Input style={{ width: 100, height: 20, borderRadius: 4 }} active />
        },
        // Product Image
        {
            title: <Skeleton.Input style={{ width: 90, height: 20, borderRadius: 4 }} active />,
            dataIndex: "imageURL", 
            render: theImageURL => <Skeleton.Image style={{width: 115, height: 115, objectFit: 'scale-down'}}/>  
        },
        // Details
        {
            title: <Skeleton.Input style={{ width: 120, height: 20, borderRadius: 4 }} active />,
            dataIndex: 'details',
            key: 'details',
            responsive: ['md'],
            render: theImageURL => 
            <Skeleton.Input style={{ width: 130, height: 20, borderRadius: 4 }} active />
        },
        // Price
        {
            title: <Skeleton.Input style={{ width: 90, height: 20, borderRadius: 4 }} active />,
            dataIndex: 'price',
            key: 'price',
            responsive: ['md'],
            render: price => <Skeleton.Input style={{ width: 80, height: 20, borderRadius: 4 }} active />
        },
        // Shop Button
        {
            title: '',
            dataIndex: 'shopButton',
            key: 'shopButton',
            render: shopButton =>   
            <Skeleton.Button style={{ width: 100, height: 40}} active size='default' />
        },
    ];

    // mock data
    const data = [
        {
            key: '1',
            merchant: '',
            imageURL: '',
            details: '',  
            price: '',
            shopButton: ''
        },
        {
            key: '2',
            merchant: '',
            imageURL: '',
            details: '',  
            price: '',
            shopButton: ''
        },
        {
            key: '3',
            merchant: '',
            imageURL: '',
            details: '',  
            price: '',
            shopButton: ''
        }
    ]
    return (
        <>
            <Divider />
            <Row className="productWrapper">
                {/* Product Title */}
                <Skeleton.Input style={{ width: 400, height: 30, borderRadius: 4}} active />
                <Divider />
                {/* Product Image */}
                <Col flex="0 0 40%" className="column productImage">
                    <Skeleton.Image style={{width: 300, height: 300, objectFit: 'scale-down'}}/>
                </Col>
                {/* Product Information */}
                <Col flex="0 0 60%" className="column productDetails">
                    <Row className="column productPrice">
                        <Col>
                            {/* Merchant */}
                            <Row>
                                <Skeleton.Input style={{ width: 200, height: 20, borderRadius: 4, marginBottom: 15 }} active />
                            </Row>
                            {/* Price */}
                            <Row className="priceSkeleton">
                                <Skeleton.Input style={{ width: 130, height: 40, borderRadius: 4 }} active />
                            </Row>
                        </Col>
                    </Row>
                    <Divider />

                    {/* Reviews */}
                    <Row className="column productReviews">
                        <Skeleton.Input style={{ width: 300, height: 20, borderRadius: 4 }} active />
                    </Row>
                    <Divider />
                    {/* Buy & Cart Buttons */}
                    <Col>
                        <Row className="skeletonButton">
                            <Row>
                                <Skeleton.Button style={{ width: 170, height: 40, marginBottom: 15}} active size='default' />
                            </Row>
                        </Row>
                        <Row className="skeletonButton">
                            <Row>
                                <Skeleton.Button style={{ width: 170, height: 40}} active size='default' />
                            </Row>
                        </Row>
                    </Col>
                </Col>
                <Divider />
                {/* Compare title */}
                <Skeleton.Input style={{ width: 250, height: 30, borderRadius: 4 }} active />
                <Divider />
                {/* Cpmar table */}
                <Table style={{width: '100%'}} columns={columns} dataSource={data} pagination={false}/>
            </Row>
        </>
    )
}

export default ComparisonSkeleton;