// App 
import React, { useEffect, useState, useCallback } from 'react';
// import { AppContext } from "../../components/Context/Context";
import { withRouter } from "react-router-dom";

// Ant Design 
import { Col, Row, Typography, Divider, Button, Rate, Table, Image, Tooltip } from 'antd';
import { ShoppingOutlined, ShoppingCartOutlined, ArrowRightOutlined, InfoCircleOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';

// Application Packages 
import axios from 'axios';
import ReactPaginate from 'react-paginate';


// Components
import SkeletonLoader from '../../components/SkeletonLoaders/ComparisonSkeleton';

// Css
import './PriceComparison.css'

// Image
import noFound from './images/search_not_found.webp';

const { Text, Title, Link, Paragraph } = Typography;

const PriceComparison = ({ history }) => {
    const [comparisonData, setComparisonData] = useState(null)
    const [tableData, setTableData] = useState(null)

    // Pagination 
    const [page, setPageNumber] = useState(1);
    const [perPage] = useState(5); 
    const [pageCount, setPageCount] = useState(0)

    // Errors
    const [errorTitle, setErrorTitle] = useState(null)
    const [errorDesc, setErrorDesc] = useState(null)

    const searchProducts = useCallback(async() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const searchValue = sessionStorage.getItem("searchResult");

        // /api/bestProduct?q=${searchValue}
        axios.get(`/algolia/search?q=${searchValue}`, 
        { cancelToken: source.token })
        .then(res => {            
            const data = res.data;

            // Add Pages
            const startIndex = (page - 1) * perPage;
            const endIndex = page * perPage;
            const dataResult = data.slice(startIndex, endIndex);

            // Set Data
            setComparisonData(dataResult)
            setPageCount(Math.ceil(data.length / perPage))

            // Set & format table data
            const tabledData = dataResult.map((item, index) => ({
                key: index,
                merchant: item.brand,
                imageURL: item.thumbnail || item.subThumbnail || 'data:image/png;base64,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',
                details: item.title,
                price: item.price.current_price,
                shopButton: item.url
            }))
            
            setTableData(tabledData)        
        }).catch((err) => {
            if (axios.isCancel(err)) {
                console.log("CATCH = ", err.response);
            } else {
                console.log("CATCH = ", err.response);
                setErrorTitle(err.response.data.title)
                setErrorDesc(err.response.data.desc + ' Make sure your search is descriptive and contains no major spelling mistakes.')
            }
        });
    }, [page, perPage])

    const handlePagination = (e) => {
        const selectedPage = e.selected;
        setPageNumber(selectedPage + 1)
        searchProducts()
    }
    // Fetch data
    useEffect(() => { 
        searchProducts()
    }, [searchProducts]);

    const columns = [
        // Merchant
        {
            title: 'Shop',
            dataIndex: 'merchant',
            key: 'merchant',
            responsive: ['md'],
            render: merchant => <Title level={5} style={{margin:0}}>{merchant === undefined ? 'Unknown' : merchant}</Title>,
        },
        // Product Image
        {
            title: "Image",
            dataIndex: "imageURL", 
            render: theImageURL => <Image preview={false} style={{width: '115px', height: '115px', objectFit: 'scale-down'}} src={theImageURL} />  
        },
        // Details
        {
            title: 'Product Details',
            dataIndex: 'details',
            key: 'details',
            render: details => 
                <Paragraph className="table-details" ellipsis={{ rows:0, expandable: false }}>
                    {details}
                </Paragraph>
        },
        // Price
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: price => <Title level={5} style={{margin:0}}>{typeof price == "string" && price.indexOf('$') > -1 ? price : '$'+ price}</Title>
        },
        // Shop Button
        {
            title: '',
            dataIndex: 'shopButton',
            key: 'shopButton',
            responsive: ['md'],
            render: shopButton => 
            <Link target="_blank" rel="noopener noreferrer" href={shopButton} className="productButtonWrapper">
                <Button type="primary" size='medium' style={{height: '45px', fontSize: '15px', paddingTop:'4.5px'}} icon={<ShoppingOutlined/>}>
                    Buy Now
                </Button>
            </Link>
        },

        // Responsive
        {
            title: '',
            dataIndex: 'shopButton',
            key: 'shopButton',
            render: shopButton =>
            <Col>
                <Link target="_blank" rel="noopener noreferrer" href={shopButton} className="shopbuttonResponsive">
                    <Button type="primary" size='medium' style={{height: '45px', fontSize: '15px', paddingTop:'4.5px'}}>
                        <ShoppingOutlined/>
                    </Button>
                </Link>
            </Col> 
        },
    ];

    return (
        <>
        {errorTitle && errorDesc ? 
            <Row justify="center" align="center">
                <Col>
                    <Row justify="center">
                        <Image 
                            preview={false}
                            width={400}
                            height={400}
                            src={noFound}
                            fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
                        />
                    </Row>
                    <Row justify="center">
                        <Title
                            level={2} 
                            style={{marginBottom: '5%', textAlign:'center'}}>
                                {errorTitle}
                        </Title>
                    </Row>
                    <Paragraph 
                        style={{marginLeft:'25%', marginRight: '25%', textAlign:'center'}}
                    >
                        {errorDesc}
                    </Paragraph>
                    <Row justify="center">
                        <Link href="/" >
                            <Button className="productButton" type="primary" size='medium' icon={<ArrowRightOutlined/>}  style={{marginTop: '10px', height: '45px', fontSize: '16px', width: '100%'}}>
                                Back to Home
                            </Button>
                        </Link>
                    </Row>
                </Col>
            </Row> 
            : 
            <>
                {comparisonData ?
                    <>
                    <Divider style={{marginTop: 0}} /> 
                        <Row className="productWrapper">
                            <Paragraph 
                                className="productTitle" 
                                ellipsis={{ rows: 1, expandable: false }}
                                style={{marginBottom: 0}}
                                >
                                    {comparisonData[0].title}
                            </Paragraph>
                            <Divider />
                            {/* Product image */}
                            <Col flex="0 0 40%" className="column productImage">
                                {comparisonData[0].thumbnail || comparisonData[0].subThumbnail ?
                                    <> 
                                    {comparisonData[0].thumbnail ?
                                        <a target="_blank" rel="noopener noreferrer" href={comparisonData[0].url}>
                                            <img src={comparisonData[0].thumbnail} className="productThumbnail" alt={comparisonData[0].title} />     
                                        </a>
                                        :
                                        <a target="_blank" rel="noopener noreferrer" href={comparisonData[0].url}>
                                            <img src={comparisonData[0].subThumbnail} className="productThumbnail" alt={comparisonData[0].title} />
                                        </a>
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
                                        {comparisonData[0].brand ? 
                                            <Text>
                                                The best price by <Link>{comparisonData[0].brand}</Link>
                                            </Text>     
                                        :   <Text>
                                                This is the best price we found.
                                            </Text>
                                        }
                                        {/* Price */}
                                        {comparisonData[0].price.current_price ? 
                                            <Title level={3} style={{margin:0}}>
                                                {'$' + comparisonData[0].price.current_price}    
                                            </Title> 
                                            :
                                            <Title level={3} style={{margin:0}}>
                                                $0.00
                                            </Title>
                                        }
                                    </Col>
                                </Row>
                                <Divider />
                                {/* Product reviews */}
                                <Row className="column productReviews">
                                    {/* Rating Number */}
                                    {comparisonData[0].rating ? 
                                        <Title level={4} style={{marginRight: '10px', marginBottom: 0}}>{comparisonData[0].reviews.rating} / 5</Title>
                                        :  
                                        null
                                    }
                                    {/* Star Rating */}
                                    {comparisonData[0].total_reviews ?
                                        <Rate disabled allowHalf defaultValue={parseFloat(comparisonData[0].reviews.rating)} style={{fontSize: '16px'}} />
                                        :
                                        <Rate disabled allowHalf defaultValue={0} style={{fontSize: '16px'}} />
                                    }
                                    {/* Total Reviews */}
                                    {comparisonData[0].total_reviews ? 
                                        <Link target="_blank" rel="noopener noreferrer" href={comparisonData[0].url + '/#customerReviews'} style={{margin: "6px 0 0 13px"}}>
                                            {parseFloat(comparisonData[0].reviews.total_reviews) + ' reviews'}
                                        </Link>
                                        :
                                        null
                                    }
                                </Row>
                                <Divider />
                                <Col>
                                    <Row justify="left">
                                        <Link target="_blank" rel="noopener noreferrer" href='' className="productButtonWrapper">
                                            <Button className="productButton" type="primary" size='medium' icon={<ShoppingCartOutlined/>}  style={{marginBottom: '10px', height: '45px', fontSize: '16px'}}>
                                                Add to cart
                                            </Button>
                                        </Link>
                                    </Row>
                                    <Row justify="left">
                                        <Link target="_blank" rel="noopener noreferrer" href={comparisonData[0].url} className="productButtonWrapper">
                                            <Button className="productButton" type="primary" size='medium' icon={<ShoppingOutlined/>}  style={{height: '45px', fontSize: '16px'}}>
                                                Buy Now
                                            </Button>
                                        </Link>
                                    </Row>
                                    <Row justify="left">
                                        <Tooltip className="productTip" placement="bottom" title="Make sure you search is descriptive and contains keywords (ie. brand, product name, etc).">
                                            <Text style={{marginTop:'10px'}}>Not what you were looking for?</Text>
                                            {/* <InfoCircleOutlined style={{fontSize: '13px', margin: '15px 0 0 7px'}}/> */}
                                        </Tooltip>
                                    </Row>
                                </Col>
                            </Col>
                            <Divider />
                            {/* Compare title */}
                            <Row>
                                <Title level={3} style={{margin:0}}>Compare Prices</Title>
                                <Tooltip placement="topLeft" title="We may be compensated through affiliate links on some products.">
                                    <InfoCircleOutlined style={{fontSize: '18px', margin: 'auto 10px'}}/>
                                </Tooltip>
                            </Row>
                            <Divider />

                            <Table className="table-striped-rows" style={{width: '100%'}} columns={columns} dataSource={tableData} pagination={false}/>
                        </Row>
                    </>
                    :
                    <SkeletonLoader />
                }
                {comparisonData ? 
                    <>
                        <Row justify="center" align="center" style={{margin: '2rem 0'}}>
                            {/* Paginate */}
                            <Row className="desktopPagination"> 
                                <ReactPaginate
                                    previousLabel={<><CaretLeftOutlined /> Prev</>}
                                    nextLabel={<><CaretRightOutlined /> Next</>}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={pageCount}
                                    onPageChange={handlePagination}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                    onClick={window.scrollTo(0, 0)}
                                />
                            </Row>
                            {/* Mobile Paginate */}
                            <Row className="mobilePagination">
                                <ReactPaginate
                                    previousLabel={<><CaretLeftOutlined /> Prev</>}
                                    nextLabel={<><CaretRightOutlined /> Next</>}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={pageCount}
                                    onPageChange={handlePagination}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                    onClick={window.scrollTo(0, 0)}
                                />
                            </Row>
                        </Row> 
                    </>
                : null} 
            </>
        }

        </>
    )
}

export default withRouter(PriceComparison)







