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

class AddProductModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            discount: '',
            weight: '',
            childCategoryId: '',
            image: '',
            previewImgURL: '',

            listCategory: [], selectedCategory: '',
            listSubCategory: [], selectedSubCategory: '',
            listChildCategory: [], selectedChildCategory: '',
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
            this.setState({
                name: '',
                price: '',
                discount: '',
                weight: '',
                childCategoryId: '',
                image: '',
                previewImgURL: '',

                listCategory: [], selectedCategory: '',
                listSubCategory: [], selectedSubCategory: '',
                listChildCategory: [], selectedChildCategory: '',

                isOpenedPreviewImage: false
            })
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
        console.log(data, file)

        if (file) {
            let objectURL = URL.createObjectURL(file);

            let base64 = await CommonUtils.getBase64(file);

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

    handleSaveNewProduct = () => {
        console.log(this.state)
    }




    render() {
        let { name, price, discount, weight, image, previewImgURL,
            listCategory, selectedCategory,
            listSubCategory, selectedSubCategory,
            listChildCategory, selectedChildCategory,
            isOpenedPreviewImage } = this.state;
        let { isOpenedModal, closeModal } = this.props

        return (
            <>

                <Modal isOpen={true}
                    className={isOpenedPreviewImage == true ? 'hidden' : 'show'}
                    size='lg'
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
                            <div className='col-6 form-group'>
                                <label>Giá sản phẩm</label>
                                <input className='form-control'
                                    value={price}
                                    onChange={(event) => this.handleOnChangeInput(event, 'price')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Trọng lượng</label>
                                <input className='form-control'
                                    value={weight}
                                    onChange={(event) => this.handleOnChangeInput(event, 'weight')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giảm giá</label>
                                <input className='form-control'
                                    value={discount}
                                    onChange={(event) => this.handleOnChangeInput(event, 'discount')} />
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
                        </div>

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
        fetchAllSubCategoryByCategoryType: (categoryType) => dispatch(actions.fetchAllSubCategoryByCategoryType(categoryType)),
        fetchAllChildCategory: () => dispatch(actions.fetchAllChildCategory()),
        fetchAllChildCategoryById: (subCatId) => dispatch(actions.fetchAllChildCategoryById(subCatId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
