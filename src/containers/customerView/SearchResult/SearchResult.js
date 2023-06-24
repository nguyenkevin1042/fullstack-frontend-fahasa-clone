import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './SearchResult.scss';
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import { languages } from '../../../utils';
import * as actions from "../../../store/actions";
import ProductItem from '../components/ProductItem';

import Select from 'react-select';
import CustomPagination from '../../../components/CustomPagination';
import LoadingOverlay from 'react-loading-overlay'

import Breadcrumb from 'rsuite/Breadcrumb';

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            searchQuery: '',
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
        document.title = "Search Result | Nguyenkevin1042's Fahasa Clone"

        this.setState({
            searchQuery: this.props.location.state
        })

        await this.props.getProductByName(this.props.location.state)

        this.setState({
            numberOfProductsArr: [
                { value: 12, label: (<FormattedMessage id="customer.product-list.sort.12-products" />) },
                { value: 24, label: (<FormattedMessage id="customer.product-list.sort.24-products" />) },
                { value: 48, label: (<FormattedMessage id="customer.product-list.sort.48-products" />) }

            ],
            selectedPageLimit: this.state.numberOfProductsArr[0]
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevState.numberOfProductsArr !== this.state.numberOfProductsArr) {
            this.setState({
                selectedPageLimit: this.state.numberOfProductsArr[0]
            })
        }

        if (prevProps.lang !== this.props.lang || prevProps.actionResponse !== this.props.actionResponse) {
            if (this.props.actionResponse.errCode !== 0) {
                this.setState({
                    message: this.props.lang === languages.VI ? this.props.actionResponse.messageVI :
                        this.props.actionResponse.messageEN
                })
            }
        }

        if (prevProps.location.state !== this.props.location.state) {
            await this.props.getProductByName(this.props.location.state)
            this.setState({
                searchQuery: this.props.location.state
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
                        <div key={index}
                            className='sharing-product-item-container col-4 col-md-3'>
                            <ProductItem productId={item.id} />
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
        let { isLoading, listProduct, searchQuery, message } = this.state

        return (
            <React.Fragment>
                <Header />

                {/* <Breadcrumb separator={'>'}>
                    <Breadcrumb.Item href="/">
                        Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item href="/components/overview">
                        Components
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>Breadcrumb</Breadcrumb.Item>
                </Breadcrumb> */}

                <div className='search-result-container'>
                    <div className='search-result-content'>
                        <div className='search-result-title'>
                            <FormattedMessage id="customer.search-result.title" /> &lsquo;{searchQuery}&rsquo;
                        </div>

                        {isLoading === false && listProduct.length === 0 &&
                            <div className='no-products-text'>
                                {message}
                            </div>}

                        <div className='search-result-list container'>
                            <div className='row'>
                                {this.renderIfHavingProducts()}
                            </div>
                        </div>
                    </div>
                </div>


                <SignUpNewletter />
                <Footer />
            </React.Fragment >

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allProductArr: state.admin.allProductArr,
        actionResponse: state.admin.actionResponse,
        isFetchingData: state.admin.isFetchingData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductByName: (inputName) => dispatch(actions.getProductByName(inputName)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResult));
