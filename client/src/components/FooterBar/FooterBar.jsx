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
                <Link href="/tos" title="Terms of Service">
                    <Text>Terms of Service</Text>
                </Link>
                <Row className="breaker">|</Row>
                <Link href="#" title="Copyright">
                    <Text>Copyright ©{new Date().getFullYear()} Glitzher All Rights Reserved</Text>
                </Link>
                <Row className="breaker">|</Row>
                <Link href="/polices/privacy" title="Privacy Policy">
                    <Text>Privacy Policy</Text>
                </Link>
            </Footer>
        </>
    )
}

export default FooterBar;