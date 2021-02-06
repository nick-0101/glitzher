import React from 'react';
import { Skeleton, Card, Col, Row } from 'antd';

const SkeletonLoader = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <Row justiy="center" align="center">
            {arr.map((index) => {
                return (
                    <Row style={{textAlign: 'left', padding: '20px'}} key={index} gutter={16}>
                        <Col style={{width: '400px'}}> 
                            <Card>
                                {/* Product Image */}
                                <Row justiy="center" align="center">
                                    <Skeleton.Image style={{width: '335px', height: '200px', objectFit: 'scale-down', marginBottom: 25}}/>
                                </Row>
                                <Skeleton.Input style={{ width: 300, height: 20, borderRadius: 4, marginBottom: 15 }} active />
                                <Skeleton.Input style={{ width: 300, height: 20, borderRadius: 4, marginBottom: 25 }} active />
                                <Skeleton.Input style={{ width: 250, height: 20, borderRadius: 4, marginBottom: 15 }} active  />
                                <Skeleton.Input style={{ width: 150, height: 20, borderRadius: 4, marginBottom: 25}} active  />
                                <Row>
                                    <Skeleton.Button style={{ width: 90, height: 35}} active size='default' />
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                )
            })} 
        </Row>
    )
}

export default SkeletonLoader;