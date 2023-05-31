import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

// import * as actions from "../store/actions";

class StationaryDescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: '',
            brand: '',
            origin: '',
            color: '',
            material: '',
            quantity: '',
            madeBy: ''
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    handleOnChangeInput = (event, key) => {
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        });
    }


    render() {
        let { supplier, brand, color, madeBy, material, origin, quantity } = this.state
        return (
            <div className='row'>
                <div className='col-4 form-group'>
                    <label>Nhà cung cấp</label>
                    <input className='form-control'
                        value={supplier}
                        onChange={(event) => this.handleOnChangeInput(event, 'supplier')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Thương hiệu</label>
                    <input className='form-control'
                        value={brand}
                        onChange={(event) => this.handleOnChangeInput(event, 'brand')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Xuất xứ</label>
                    <input className='form-control'
                        value={origin}
                        onChange={(event) => this.handleOnChangeInput(event, 'origin')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Màu sắc</label>
                    <input className='form-control'
                        value={color}
                        onChange={(event) => this.handleOnChangeInput(event, 'color')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Chất liệu</label>
                    <input className='form-control'
                        value={material}
                        onChange={(event) => this.handleOnChangeInput(event, 'material')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Số lượng</label>
                    <input className='form-control'
                        type='number' min={0}
                        value={quantity}
                        onChange={(event) => this.handleOnChangeInput(event, 'quantity')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Nơi sản xuất</label>
                    <input className='form-control'
                        value={madeBy}
                        onChange={(event) => this.handleOnChangeInput(event, 'madeBy')} />
                </div>

            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(StationaryDescriptionComponent);
