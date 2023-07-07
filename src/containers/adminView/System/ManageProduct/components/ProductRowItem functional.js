import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from 'react-intl';

import * as actions from "../../../../../store/actions";
import { languages } from '../../../../../utils';
import NumericFormat from 'react-number-format';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function ProductRowItem(props) {
    const [productData, setProductData] = useState({})
    const productId = props.productId
    const stateRedux = useSelector(state => ({
        lang: state.app.language,
        singleProduct: state.admin.singleProduct
    }))
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async (productId) => {

            dispatch(actions.fetchProductById(productId))
            setProductData(stateRedux.singleProduct)
            console.log(productData)
            // console.log(productId, stateRedux.singleProduct)
        };

        fetchData(productId);
    }, [productId])

    // console.log(productId, stateRedux.singleProduct)


    return (
        <></>
    )

}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        singleProduct: state.admin.singleProduct
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProductById: (inputId) => dispatch(actions.fetchProductById(inputId))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRowItem);
