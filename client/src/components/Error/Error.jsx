import React from 'react';
import { Row, Col, Typography } from 'antd';

const { Title, Link } = Typography;

const Error = () => {
    return (
        <Row justify="center">
            <Col>
                <Title level={1}>404</Title>
                <Link href='/'>Return Home</Link>
            </Col>
        </Row>
    )
}


export default Error;