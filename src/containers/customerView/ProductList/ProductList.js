import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProductList.scss';
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';
import { languages } from '../../../utils';
import * as actions from "../../../store/actions";

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategory: []
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodesByType('category')
        let dataSelectCategory = this.buildDataInputSelect(this.props.allCodesArr, "category");
        this.setState({
            listCategory: dataSelectCategory,

        })
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
                    result.push(obj);
                });
            }
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.keyName = item.keyName;
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

    renderCategoryList = () => {
        return (
            <div className='sharing-menu'>
                <div className='sharing-title'>
                    <FormattedMessage id="customer.product-list.category.title" />
                </div>

                <div className='sharing-menu'>

                </div>
            </div>
        )
    }


    render() {
        console.log(this.props.match.params)
        console.log(this.props.allCodesArr)

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
