import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';


const { Title, Link, Paragraph } = Typography;

const Error = () => {
    return (
        <Row justify="center" align="center"> 
            <Col>
                <Paragraph style={{marginBottom: 0, fontWeight: 600, fontSize: 150, textAlign:'center'}}>
                    404
                </Paragraph>
                <Title 
                    level={4}
                    style={{marginBottom: '5%', margin:'0 5% 5% 5%', textAlign:'center'}}
                >
                    We're sorry, we couldn't find the page you were looking for :(
                </Title>
                <Row justify="center">
                    <Link href="/" >
                        <Button className="productButton" type="primary" size='medium' icon={<ArrowRightOutlined/>}  style={{marginTop: '10px', height: '45px', fontSize: '16px', width: '100%'}}>
                            Back to Home
                        </Button>
                    </Link>
                </Row>
            </Col>
        </Row> 
    )
}


export default Error;