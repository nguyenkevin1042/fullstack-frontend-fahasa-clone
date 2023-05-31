import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageProduct.scss';
import AddProductModal from './AddProductModal';
// import * as actions from "../store/actions";

class ManageProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenedModal: false
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

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
    }


    render() {
        let { isOpenedModal } = this.state
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
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProduct);
