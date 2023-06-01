import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageProduct.scss';
import AddProductModal from './AddProductModal';
import * as actions from "../../../../store/actions";

class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenedModal: false,
            listProduct: []
        };
    }

    componentDidMount() {
        this.props.fetchAllProduct();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allProductArr !== this.props.allProductArr) {
            // let dataSelect = this.buildDataInputSelect(this.props.allCodesArr, "category");
            this.setState({
                listProduct: this.props.allProductArr
            })
        }


    }

    handleOpenAddProductModal = () => {
        this.setState({
            isOpenedModal: true
        })
    }

    handleCloseAddProductModal = () => {
        this.setState({
            isOpenedModal: false
        })
        this.props.fetchAllProduct();
    }

    renderProductsTableData = () => {
        let { listProduct } = this.state
        return (
            <>
                {listProduct && listProduct.length > 0 &&
                    listProduct.map((item, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>

                                    <td>
                                        <button className='btn-edit'
                                        // onClick={() => this.handleEdit(item)}
                                        > <i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                        // onClick={() => this.handleDelete(item)}
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
        let { isOpenedModal } = this.state

        console.log(this.props.allProductArr)

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
                    isOpenedModal={isOpenedModal}
                    closeModal={this.handleCloseAddProductModal} />
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
        fetchAllProduct: () => dispatch(actions.fetchAllProduct())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
