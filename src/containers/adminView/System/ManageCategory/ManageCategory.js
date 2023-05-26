import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageCategory.scss';
import { languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import CustomScrollbars from '../../../../components/CustomScrollbars';
import Select from 'react-select';
import AllCategoryTableComponent from './AllCategoryTableComponent';

class ManageCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: '',
            valueVI: '',
            valueEN: '',

            listCategory: [],
            selectedCategory: '',

        };
    }

    componentDidMount() {
        this.props.fetchAllCodesByType('category')

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
            this.setState({
                listCategory: dataSelect
            })
        }

        // if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allSubCategoryArr, "category");
        //     this.setState({
        //         listSubCategory: dataSelect
        //     })
        // }

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

                    obj.key = item.id;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
        }

        return result;
    }

    handleChange = (selectedCategory) => {
        this.setState({
            categoryId: selectedCategory.key,
            selectedCategory: selectedCategory
        })
    }

    handleSaveNewSubCategory = () => {
        console.log(this.state)
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleClearAllInput = () => {
        this.setState({
            categoryId: '',
            type: '',
            valueVI: '',
            valueEN: '',

            listCategory: [],
            selectedCategory: ''
        })
    }

    render() {
        let { categoryId, valueVI, valueEN, listCategory, selectedCategory } = this.state;
        let { allCodesArr } = this.props
        // let dataHeader = Object.getOwnPropertyNames(allCodesArr);

        // console.log(allCodesArr)
        // console.log(dataHeader)
        // Object.getOwnPropertyNames(allCodesArr.shift()).
        //     forEach(function (val) {
        //         console.log(val);

        //     });

        return (
            <React.Fragment>
                <CustomScrollbars style={{ height: '768px' }}>
                    <div className='manage-category-container'>
                        <div className='manage-category-title'>
                            Quản lý danh mục phụ
                        </div>

                        <div className='manage-category-add-section row'>
                            <div className='col-12 form-group'>
                                <label>Thể loại</label>
                                <Select
                                    value={selectedCategory}
                                    onChange={this.handleChange}
                                    options={listCategory}
                                    // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                    name="selectedCategory"
                                />

                            </div>
                            <div className='col-6 form-group'>
                                <label>Giá trị bằng Tiếng Việt</label>
                                <input className='form-control'
                                    value={valueVI}
                                    onChange={(event) => this.handleOnChangeInput(event, 'valueVI')} />
                            </div>
                            <div className='col-6'>
                                <label>Giá trị bằng Tiếng Anh</label>
                                <input className='form-control'
                                    value={valueEN}
                                    onChange={(event) => this.handleOnChangeInput(event, 'valueEN')} />
                            </div>
                            <div className='col-6'>
                                <button className='btn btn-primary'
                                    onClick={() => this.handleSaveNewSubCategory()}>Save</button>
                            </div>
                            <div className='col-6 form-group'>
                                <button className='btn btn-primary'
                                    onClick={() => this.handleClearAllInput()} > Reset</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <AllCategoryTableComponent />
                            </div>
                        </div>
                    </div>
                </CustomScrollbars>
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
        addNewSubCategory: (inputData) => dispatch(actions.addNewSubCategory(inputData)),
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategory);
