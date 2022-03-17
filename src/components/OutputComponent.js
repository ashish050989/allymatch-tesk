import React, { useEffect, useState } from 'react'
import { isEmpty } from '../Helper';

export default function OutputComponent({ selectedData }) {

    const data = {
        products: [],
        subCategries: [],
        subProducts: []
    };

    const getProductsdiff = () => {
 

        selectedData.forEach(item => {
            if (item.selected) {
                data.products.push(item.lable);
                if (!isEmpty(item.subCategries)) {
                    item.subCategries.forEach(subItem => {
                        if (subItem.selected) {
                            data.subCategries.push(subItem.lable);
                            if (!isEmpty(subItem.subProduct)) {
                                subItem.subProduct.forEach(subProduct => {
                                    if (subProduct.selected) {
                                        data.subProducts.push(subProduct.lable);
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })

        console.log(data);

        return (
            <div className="card " style={{ background: '#9ca2ac', padding: 10, }} >
                <div className="cardstyle={{ background: '#9ca2ac', padding: 10, }} -body">
                    <h5 className="card-title"> Products</h5>
                    <p className="card-text">
                        {!isEmpty(data.products) && data.products.toString()}

                    </p>
                    <h5 className="card-title">Sub Categories</h5>
                    <p className="card-text">
                        {!isEmpty(data.subCategries) && data.subCategries.toString()}
                    </p>

                    <h5 className="card-title">Sub Products</h5>
                    <p className="card-text">
                        {!isEmpty(data.subProducts) && data.subProducts.toString()}
                    </p>

                </div>
            </div>

        )
    }

    return (
        <div className='row'>
            <div className="col-sm-4">
                {getProductsdiff()}
            </div>
        </div>
    )
}
