import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ProductsOfTag.scss';

import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import * as actions from "../../../store/actions";
import ProductItem from '../components/ProductItem';

import Select from 'react-select';
import CustomPagination from '../../../components/CustomPagination';
import LoadingOverlay from 'react-loading-overlay'

class ProductsOfTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            tagKeyName: '',
            listProduct: [],
            message: '',

            totalRecords: "",
            totalPages: "",
            pageLimit: "",
            currentPage: "",
            startIndex: "",
            endIndex: "",

            selectedPageLimit: '',
            numberOfProductsArr: []
        };
    }

    async componentDidMount() {
        // await this.props.getProductByTagKeyName()
        await this.props.getProductByTagKeyName(this.props.match.params.tagKeyName)

        this.setState({
            numberOfProductsArr: [
                { value: 12, label: (<FormattedMessage id="customer.product-list.sort.12-products" />) },
                { value: 24, label: (<FormattedMessage id="customer.product-list.sort.24-products" />) },
                { value: 48, label: (<FormattedMessage id="customer.product-list.sort.48-products" />) }

            ],
            selectedPageLimit: this.state.numberOfProductsArr[0]
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevState.numberOfProductsArr !== this.state.numberOfProductsArr) {
            this.setState({
                selectedPageLimit: this.state.numberOfProductsArr[0]
            })
        }

        if (prevProps.allProductArr !== this.props.allProductArr ||
            prevProps.lang !== this.props.lang) {
            this.setState({
                listProduct: this.props.allProductArr,
                totalRecords: this.props.allProductArr.length
            })
        }

        if (prevProps.isFetchingData !== this.props.isFetchingData) {
            this.setState({
                isLoading: this.props.isFetchingData,
            })
        }

    }

    handleOnChangePage = (data) => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        });

    };

    handleChangeNumberOfProducts = (event) => {
        this.setState({
            selectedPageLimit: event,
            pageLimit: event.value
        })
    }

    renderProductList = (listProduct) => {
        return (
            <>
                {listProduct && listProduct.length > 0 &&
                    listProduct.map((item, index) => (
                        <div key={item.productId}
                            className='sharing-product-item-container col-4 col-md-3'>
                            {item && <ProductItem productId={item.productId} />}
                        </div>
                    ))
                }
            </>
        )
    }

    renderIfHavingProducts = () => {
        let { isLoading, listProduct } = this.state
        let { totalPages, currentPage, pageLimit,
            startIndex, endIndex, selectedPageLimit, numberOfProductsArr } = this.state;
        let rowsPerPage = [];

        rowsPerPage = listProduct.slice(startIndex, endIndex + 1);

        return (
            <>
                <div className='sort-actions'>
                    <label>Săp xếp theo:</label>

                    <Select
                        className={"sort-actions-select"}
                        value={selectedPageLimit}
                        onChange={(event) => this.handleChangeNumberOfProducts(event)}
                        options={numberOfProductsArr}
                        name="selectedPageLimit" />
                </div>
                <div className='search-result-list'>
                    <LoadingOverlay
                        active={isLoading}
                        spinner={true}
                        text='Please wait...'>
                        <div>
                            <div className='row'>
                                {this.renderProductList(rowsPerPage)}
                            </div>
                            {isLoading === false && listProduct.length === 0 && (
                                <div className='no-products-text'>
                                    <FormattedMessage id="customer.product-list.no-product" />
                                </div>
                            )}

                            <CustomPagination
                                totalRecords={listProduct.length}
                                pageLimit={pageLimit || 12}
                                initialPage={1}
                                pagesToShow={6}
                                onChangePage={this.handleOnChangePage}
                            />


                        </div>

                    </LoadingOverlay>
                </div>
            </>
        )
    }

    render() {
        let { isLoading, listProduct } = this.state
        let { totalPages, currentPage, pageLimit,
            startIndex, endIndex, selectedPageLimit, numberOfProductsArr } = this.state;
        let rowsPerPage = [];

        rowsPerPage = listProduct.slice(startIndex, endIndex + 1);

        console.log(listProduct)
        return (
            <>
                <Header />

                <div className='search-result-container'>
                    <div className='search-result-content'>

                        <div className='sort-actions'>
                            <label>Săp xếp theo:</label>

                            <Select
                                className={"sort-actions-select"}
                                value={selectedPageLimit}
                                onChange={(event) => this.handleChangeNumberOfProducts(event)}
                                options={numberOfProductsArr}
                                name="selectedPageLimit" />
                        </div>


                        <LoadingOverlay
                            active={isLoading}
                            spinner={true}
                            text='Please wait...'>
                            <div className='search-result-list'>
                                <div className='row'>
                                    {this.renderProductList(rowsPerPage)}
                                </div>

                                <CustomPagination
                                    totalRecords={listProduct.length}
                                    pageLimit={pageLimit || 12}
                                    initialPage={1}
                                    pagesToShow={6}
                                    onChangePage={this.handleOnChangePage}
                                />
                            </div>
                        </LoadingOverlay>
                    </div>
                </div>

                <SignUpNewletter />
                <Footer />
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allProductArr: state.admin.allProductArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductByTagKeyName: (keyName) => dispatch(actions.getProductByTagKeyName(keyName)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsOfTag));
