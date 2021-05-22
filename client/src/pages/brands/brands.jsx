import React from 'react';

// Images
import Amazon from './images/amazon.webp';
import HudsonBay from './images/hudsonsbay.webp';
import Sephora from './images/sephora.webp';
import ShoppersDrugMart from './images/shoppersdrugmart.webp';
import Walmart from './images/walmart.webp';
import Wellca from './images/wellca.webp';


const brands = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-20 text-center">
            <div className='text-4xl md:text-5xl font-medium text-gray-800 my-10'>
                What brand's does Glitzher track?
            </div>
            <div className="mx-auto border-t-2 border-gray-100 w-2/4"></div>
            <div className="flex flex-col mt-10">
                <div className="flex justify-center flex-wrap mx-auto">
                    <img width={200} height={150} src={Amazon} alt="Amazon logo" />
                    <img width={200} height={150} src={HudsonBay} alt="HudsonBay logo" />
                    <img width={200} height={150} src={ShoppersDrugMart} alt="ShoppersDrugMart logo" />
                    <img width={200} height={150} src={Sephora} alt="Sephora logo" />            
                </div>
                <div className="flex justify-center flex-wrap mx-auto">
                    <img width={200} height={150} src={Walmart} alt="Walmart logo" />
                    <img width={200} height={150} src={Wellca} alt="Wellca logo" />
                </div>
            </div>
            <div className="mx-auto border-t-2 border-gray-100 w-2/4"></div>
            <div className="mt-9 mx-0 md:mx-24 text-base text-gray-900">
                Glitzher tracks thousands of products from Amazon, Hudson's Bay, Shoppers Drug Mart, Sephora, Walmart and Well.ca.
                We are constantly working to add new brands & to keep existing products up to date.
            </div>
        </div>
    );
}

export default brands;
