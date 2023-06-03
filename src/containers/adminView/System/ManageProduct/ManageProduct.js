import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageProduct.scss';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import * as actions from "../../../../store/actions";

class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenedAddModal: false,
            isOpenedEditModal: false,
            listProduct: [],
            selectedProduct: ''
        };
    }

    componentDidMount() {
        this.props.fetchAllProduct();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allProductArr !== this.props.allProductArr) {
            this.setState({
                listProduct: this.props.allProductArr
            })
        }


    }

    handleOpenAddProductModal = () => {
        this.setState({
            isOpenedAddModal: true
        })
    }

    handleCloseAddProductModal = () => {
        this.setState({
            isOpenedAddModal: false
        })
        this.props.fetchAllProduct();
    }

    handleEdit = (item) => {
        console.log(item)
        this.setState({
            isOpenedEditModal: true,
            selectedProduct: item
        })
    }

    handleCloseEditProductModal = () => {
        this.setState({
            isOpenedEditModal: false
        })
        this.props.fetchAllProduct();
    }

    handleDelete = async (item) => {
        await this.props.deleteProduct(item.id)
    }

    renderProductsTableData = () => {
        let { listProduct } = this.state

        return (
            <>
                {listProduct && listProduct.length > 0 &&
                    listProduct.map((item, index) => {
                        let imageBase64 = '';
                        if (item.image) {
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                        }
                        return (
                            <>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td className='product-img'>
                                        <div className='img'
                                            style={{
                                                backgroundImage: "url(" + imageBase64 + ")"
                                            }} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>

                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEdit(item)}
                                        > <i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDelete(item)}
                                        ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </ >
                        )
                    })

                }
            </>
        )
    }



    render() {
        let { isOpenedAddModal, isOpenedEditModal, selectedProduct } = this.state

        return (
            <>
                <div className='sharing-manage-container'>
                    <div className='sharing-manage-title'>
                        Quản lý sản phẩm
                    </div>
                    <div className='sharing-manage-add'>
                        <button className='btn btn-primary'
                            onClick={() => this.handleOpenAddProductModal()}>Thêm sản phẩm mới</button>
                    </div>

                    <div className='manage-sharing-table'>
                        <table className='sharing-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ảnh sản phẩm</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá sản phẩm</th>

                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderProductsTableData()}
                            </tbody>


                        </table>
                    </div>
                </div>
                <AddProductModal
                    isOpenedAddModal={isOpenedAddModal}
                    closeModal={this.handleCloseAddProductModal} />
                <EditProductModal
                    isOpenedEditModal={isOpenedEditModal}
                    closeModal={this.handleCloseEditProductModal}
                    product={selectedProduct} />
            </>
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allProductArr: state.admin.allProductArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),
        deleteProduct: (inputId) => dispatch(actions.deleteProduct(inputId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
