import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ProductList.scss';
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import { languages } from '../../../utils';
import * as actions from "../../../store/actions";
import ProductItem from '../components/ProductItem';
import Slider from 'react-slick';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyName: '',
            listCategory: [],
            listSubCategory: [],
            listProduct: []
        };
    }

    async componentDidMount() {
        this.setState({
            keyName: this.props.match.params.keyName
        })

        await this.props.fetchAllCodesByType('category')

        let dataSelectCategory = this.buildDataInputSelect(this.props.allCodesArr, "category");
        this.setState({
            listCategory: dataSelectCategory,
        })

        // if (this.props.match.params.keyName === 'all') {
        await this.props.fetchAllProduct()
        // }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allCodesArr !== this.props.allCodesArr ||
            prevProps.lang !== this.props.lang) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
            this.setState({
                listCategory: dataSelect
            })
        }

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr ||
            prevProps.lang !== this.props.lang) {
            let dataSelectSubCategory = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
            this.setState({
                listSubCategory: dataSelectSubCategory,
            })
        }

        if (prevProps.match.params.keyName !== this.props.match.params.keyName) {
            this.setState({
                keyName: this.props.match.params.keyName
            })
        }

        if (
            prevProps.allProductArr !== this.props.allProductArr) {
            this.setState({
                // keyName: this.props.match.params.keyName,
                listProduct: this.props.allProductArr,
            })
        }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        if (inputData && inputData.length > 0) {
            if (type === "category") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    obj.subCategories = item.SubCategories;
                    result.push(obj);
                });
            }
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
                    obj.childCategories = item.ChildCategories;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "childCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }

        }

        return result;
    }

    handleOnClickCategory = (item) => {

        if (item != undefined && this.props.history) {
            let dataSubCategory = this.buildDataInputSelect(item.subCategories, "subCategory");

            this.setState({
                listSubCategory: dataSubCategory
            })
            this.props.history.push("/category/" + item.keyName);
        } else {
            this.props.history.push("/category/all");
        }
    }

    handleOnClickSubCategory = (item) => {
        console.log(item)
        if (this.props.history) {

            this.props.history.push("/category/" + item.keyName);
        }
    }


    renderCategoryList = () => {
        let { listCategory, listSubCategory, keyName } = this.state
        return (
            <div className='sharing-menu'>
                <div className='sharing-title'>
                    <FormattedMessage id="customer.product-list.category.title" />
                </div>

                <div className='sharing-list-category'>
                    <div className={keyName === 'all' ?
                        'all-category-text active' : 'all-category-text hover'}
                        onClick={() => this.handleOnClickCategory()}>
                        <FormattedMessage id="customer.product-list.category.all-category" />
                    </div>

                    <div className='list-category'>
                        <ul>
                            {listCategory && listCategory.length > 0 &&
                                listCategory.map((item, index) => (
                                    <>

                                        <li key={index}
                                            onClick={() => this.handleOnClickCategory(item)}
                                        // className={keyName === item.keyName ? 'active' : 'hover'}
                                        >
                                            <div className={keyName === item.keyName ? 'active' : 'hover'}>
                                                {item.label}
                                            </div>

                                            {/* <ul>
                                                {listSubCategory && listSubCategory.length > 0 &&
                                                    listSubCategory.map((item, index) => (
                                                        <li key={index}
                                                            onClick={() => this.handleOnClickSubCategory(item)}
                                                            className={keyName === item.keyName ? 'active' : 'hover'}
                                                        >
                                                            {item.label}
                                                        </li>

                                                    ))
                                                }
                                            </ul> */}
                                        </li>

                                        {/* {this.renderSubCategoryList(item)} */}
                                        {keyName === item.keyName ?
                                            <>{this.renderSubCategoryList(item)}</>
                                            : <></>}
                                    </>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    renderSubCategoryList = (item) => {
        let { listSubCategory, keyName } = this.state
        // console.log(item)
        return (
            <>
                {keyName === item.keyName &&
                    <ul>
                        {listSubCategory && listSubCategory.length > 0 &&
                            listSubCategory.map((item, index) => (
                                <li key={index}
                                    onClick={() => this.handleOnClickSubCategory(item)}
                                    className={keyName === item.keyName ? 'active' : 'hover'}
                                >
                                    {item.label}
                                </li>

                            ))
                        }
                    </ul>}
                {/* <ul>
                    {listSubCategory && listSubCategory.length > 0 &&
                        listSubCategory.map((item, index) => (
                            <li key={index}
                                onClick={() => this.handleOnClickSubCategory(item)}
                                className={keyName === item.keyName ? 'active' : 'hover'}
                            >
                                {item.label}
                            </li>

                        ))
                    }
                </ul> */}
            </>
        )
    }

    renderAProduct = () => {
        return (
            <div className='sharing-product-item' title='Shaman King - Tập 30 - Bìa Đôi'>
                <div className='sharing-product-item-image sold'>
                    <div className='discount'>50%</div>
                </div>
                <div className='sharing-product-item-text'>
                    <div className='item-name'>
                        Shaman King - Tập 30 - Bìa Đôi
                    </div>
                    <div className='item-price-chapter'>
                        <div className='item-discount-price'>
                            17.500
                        </div>
                        <div className='item-price'>
                            35.000
                        </div>
                        <div className='item-chapter'>
                            Tập 30
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    renderProductList = () => {
        let { listProduct } = this.state
        let settings = {
            // className: "flash-sale-list",
            dots: false,
            infinite: false,
            slidesToShow: 5,
            slidesToScroll: 2,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                }
            }]
        };

        return (
            <>
                {/* <Slider {...settings} >
                    {Array(7).fill(
                        this.renderAProduct())
                    }
                </Slider> */}
                {listProduct && listProduct.length > 0 &&
                    listProduct.map((item, index) => (
                        <ProductItem productData={item}
                        // redirectToProductDetail={this.handleRedirectToProductDetail(item)} 
                        />
                    ))
                }

            </>
        )
    }


    render() {
        console.log(this.props.allProductArr)

        return (
            <React.Fragment>
                <Header />

                <div className='product-list-container'>
                    <div className='row'>
                        <div className='left-menu-content col-xl-3'>
                            <div className='left-content'>
                                {this.renderCategoryList()}
                            </div>
                        </div>
                        <div className='right-list-content col-xl-9'>
                            {/* <div className='container'> */}
                            <div className='row'>
                                {this.renderProductList()}
                            </div>
                            {/* </div> */}

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
        allCodesArr: state.admin.allCodesArr,
        allSubCategoryArr: state.admin.allSubCategoryArr,
        allProductArr: state.admin.allProductArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllSubCategoryByCategory: (category) => dispatch(actions.fetchAllSubCategoryByCategory(category)),
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));
