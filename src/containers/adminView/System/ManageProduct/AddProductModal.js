import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './AddProductModal.scss';
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { CommonUtils, languages } from '../../../../utils'
import * as actions from "../../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import BookDescriptionComponent from './components/BookDescriptionComponent';
import StationaryDescriptionComponent from './components/StationaryDescriptionComponent';
import ToyDescriptionComponent from './components/ToyDescriptionComponent';

class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            discount: '',
            weight: '',
            height: '',
            width: '',
            length: '',
            childCategoryId: '',
            image: '',
            previewImgURL: '',

            listCategory: [], selectedCategory: '',
            listSubCategory: [], selectedSubCategory: '',
            listChildCategory: [], selectedChildCategory: '',

            selectedProductType: '',
            stateFromComponent: []
        };
    }

    componentDidMount() {

        this.props.fetchAllCodesByType('category')
        this.props.fetchAllChildCategory()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.isOpenedModal !== this.props.isOpenedModal) {
            // this.setState({
            //     name: '',
            //     price: '',
            //     discount: '',
            //     weight: '',
            //     height: '',
            //     width: '',
            //     length: '',
            //     childCategoryId: '',
            //     image: '',
            //     previewImgURL: '',
            //     selectedProductType: '',

            //     listCategory: [], selectedCategory: '',
            //     listSubCategory: [], selectedSubCategory: '',
            //     listChildCategory: [], selectedChildCategory: '',

            //     isOpenedPreviewImage: false
            // })
        }

        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
            this.setState({
                listCategory: dataSelect
            })
        }

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allSubCategoryArr, "subCategory");
            this.setState({
                listSubCategory: dataSelect
            })
        }

        if (prevProps.allChildCategoryArr !== this.props.allChildCategoryArr) {
            let dataSelect = this.buildDataInputSelect(this.props.allChildCategoryArr, "childCategory");
            this.setState({
                listChildCategory: dataSelect
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

                    obj.keyMap = item.keyMap;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "subCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.id = item.id;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }
            if (type === "childCategory") {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVI = item.valueVI;
                    let labelEN = item.valueEN;

                    obj.id = item.id;
                    obj.label = language === languages.VI ? labelVI : labelEN;
                    result.push(obj);
                });
            }

        }

        return result;
    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleChangeCategory = async (selectedCategory) => {
        this.setState({
            selectedCategory: selectedCategory,
            selectedSubCategory: '',
            selectedChildCategory: ''
        })
        await this.props.fetchAllSubCategoryByCategoryType(selectedCategory.keyMap);
    }

    handleChangeSubCategory = async (selectedSubCategory) => {
        this.setState({
            selectedSubCategory: selectedSubCategory,
            selectedChildCategory: ''
        })
        await this.props.fetchAllChildCategoryById(selectedSubCategory.id)
    }

    handleChangeChildCategory = (selectedChildCategory) => {
        this.setState({
            childCategoryId: selectedChildCategory.id,
            selectedChildCategory: selectedChildCategory
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;

        let file = data[0];


        if (file) {
            let objectURL = URL.createObjectURL(file);

            let base64 = await CommonUtils.getBase64(file);
            console.log(base64)
            this.setState({
                previewImgURL: objectURL,
                image: base64.result
            })
        }

    }

    handleOpenPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpenedPreviewImage: true
        })
    }

    onChangeRadioValue = (event) => {
        this.setState({
            selectedProductType: event.target.value
        })
    }

    handleSaveNewProduct = () => {
        this.props.addNewProduct({
            name: this.state.name,
            price: this.state.price,
            discount: this.state.discount,
            weight: this.state.weight,
            height: this.state.height,
            width: this.state.width,
            length: this.state.length,
            childCategoryId: this.state.childCategoryId,
            image: this.state.image,
            productType: this.state.selectedProductType,
            descriptionData: this.state.stateFromComponent
        })
        this.props.closeModal();
    }

    eventhandler = (data) => {
        this.setState({
            stateFromComponent: data
        })
    }

    renderDescriptionSectionByProductType = (productType) => {
        return (
            <>
                {productType === 'book' &&
                    <BookDescriptionComponent onChange={this.eventhandler} />
                }
                {productType === 'toy' &&
                    <ToyDescriptionComponent onChange={this.eventhandler} />
                }
                {productType === 'stationary' &&
                    <StationaryDescriptionComponent onChange={this.eventhandler} />
                }

            </>
        )
    }


    render() {
        let { name, price, discount, weight, image, previewImgURL,
            height, width, length,
            listCategory, selectedCategory,
            listSubCategory, selectedSubCategory,
            listChildCategory, selectedChildCategory,
            isOpenedPreviewImage, selectedProductType } = this.state;
        let { isOpenedModal, closeModal } = this.props
        // console.log(listCategory)
        return (

            <>

                <Modal isOpen={isOpenedModal}
                    className={isOpenedPreviewImage == true ? 'hidden' : 'show'}
                    size='xl'
                    centered>

                    <div className='sharing-modal-container'>

                        <div className='sharing-modal-header'>
                            Thêm sản phẩm
                        </div>

                        <div className='modal-input-section row'>
                            <div className='col-4 form-group'>
                                <label>Danh mục chính</label>
                                <Select
                                    value={selectedCategory}
                                    onChange={this.handleChangeCategory}
                                    options={listCategory}
                                    // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                    name="selectedCategory" />
                            </div>
                            <div className='col-4 form-group'>
                                <label>Danh mục phụ</label>
                                <Select
                                    value={selectedSubCategory}
                                    onChange={this.handleChangeSubCategory}
                                    options={listSubCategory}
                                    // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                    name="selectedSubCategory" />
                            </div>
                            <div className='col-4 form-group'>
                                <label>Danh mục con</label>
                                <Select
                                    value={selectedChildCategory}
                                    onChange={this.handleChangeChildCategory}
                                    options={listChildCategory}
                                    // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                                    name="selectedChildCategory" />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Tên sản phảm</label>
                                <input className='form-control'
                                    value={name}
                                    onChange={(event) => this.handleOnChangeInput(event, 'name')} />
                            </div>
                            <div className='col-3 form-group'>
                                <label>Giá sản phẩm</label>
                                <input className='form-control'
                                    value={price}
                                    onChange={(event) => this.handleOnChangeInput(event, 'price')} />
                            </div>
                            <div className='col-3 form-group'>
                                <label>Giảm giá (%)</label>
                                <input type='number'
                                    min="0" max="100"
                                    className='form-control'
                                    value={discount}
                                    onChange={(event) => this.handleOnChangeInput(event, 'discount')} />
                            </div>
                            <div className='col-3 form-group'>
                                <label>Trọng lượng (g)</label>
                                <input type='number'
                                    step='0.01'
                                    className='form-control'
                                    value={weight}
                                    onChange={(event) => this.handleOnChangeInput(event, 'weight')} />
                            </div>

                            <div className='col-3 form-group'>
                                <label>Chiều dài (cm)</label>
                                <input type='number' min="0"
                                    step='0.01'
                                    className='form-control'
                                    value={length}
                                    onChange={(event) => this.handleOnChangeInput(event, 'length')} />
                            </div>
                            <div className='col-3 form-group'>
                                <label>Chiều rộng (cm)</label>
                                <input type='number' min="0"
                                    step='0.01'
                                    className='form-control'
                                    value={width}
                                    onChange={(event) => this.handleOnChangeInput(event, 'width')} />
                            </div>
                            <div className='col-3 form-group'>
                                <label>Chiều cao (cm)</label>
                                <input type='number' min="0"
                                    step='0.01'
                                    className='form-control'
                                    value={height}
                                    onChange={(event) => this.handleOnChangeInput(event, 'height')} />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Hình ảnh sản phẩm</label>
                                <input type='file' id='previewImg'
                                    className='form-control-file'
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                                {/* <label htmlFor='previewImg' className='label-upload'>Tải ảnh <i className='fas fa-upload'></i></label> */}
                            </div>

                            <div className='col-6 form-group'>

                                <div className='preview-img'
                                    style={{
                                        backgroundImage: "url(" + previewImgURL + ")"
                                    }}
                                    onClick={() => this.handleOpenPreviewImage()}>
                                </div>
                            </div>


                            <div className="radio col-4 form-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="book"
                                        name="productType"
                                        onChange={(event) => this.onChangeRadioValue(event)}
                                    />
                                    Sách
                                </label>
                            </div>
                            <div className="radio col-4 form-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="toy"
                                        name="productType"
                                        onChange={(event) => this.onChangeRadioValue(event)} />
                                    Đồ chơi
                                </label>
                            </div>
                            <div className="radio col-4 form-group">
                                <label>
                                    <input
                                        type="radio"
                                        value="stationary"
                                        name="productType"
                                        onChange={(event) => this.onChangeRadioValue(event)} />
                                    Văn phòng phẩm/Sản phẩm khác
                                </label>
                            </div>


                        </div>



                        {this.renderDescriptionSectionByProductType(selectedProductType)}



                        <div className='sharing-modal-buttons'>
                            <button className='add-btn'
                                onClick={() => this.handleSaveNewProduct()}>Save</button>
                            <button className='cancel-btn'
                                onClick={closeModal}>Cancel</button>
                        </div>
                    </div>

                </Modal>

                {/* {isOpenedPreviewImage === true &&
                    <Lightbox
                        className={'lightbox-preview-img'}
                        mainSrc={previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenedPreviewImage: false })}

                    />
                } */}
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr,
        allSubCategoryArr: state.admin.allSubCategoryArr,
        allChildCategoryArr: state.admin.allChildCategoryArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),
        fetchAllSubCategoryByCategoryType: (category) => dispatch(actions.fetchAllSubCategoryByCategoryType(category)),
        fetchAllChildCategory: () => dispatch(actions.fetchAllChildCategory()),
        fetchAllChildCategoryById: (subCatId) => dispatch(actions.fetchAllChildCategoryById(subCatId)),
        addNewProduct: (inputData) => dispatch(actions.addNewProduct(inputData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
