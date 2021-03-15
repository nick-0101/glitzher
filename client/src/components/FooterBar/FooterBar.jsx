import React from 'react';

// Ant d
import { Layout, Row, Typography } from 'antd';

// Css
import './FooterBar.css';

const { Footer } = Layout;
const { Text, Link } = Typography;

const FooterBar = () => {
    return (
        <>
            <Footer className="footer">
                <Link href="/" title="Homepage">
                     <Text>Home</Text>
                </Link>
                <Row className="breaker">|</Row>
                <Link href="/tos" title="Terms of Service">
                    <Text>Terms of Service</Text>
                </Link>
                <Row className="breaker">|</Row>
                <Link href="#" title="Copyright">
                    <Text>Copyright 2021 Glamurbot.com</Text>
                </Link>
            </Footer>
        </>
    )
}

export default FooterBar;