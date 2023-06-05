import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

// import * as actions from "../store/actions";

class ToyDescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '',
            supplier: '',
            brand: '',
            origin: '',
            madeBy: '',
            color: '',
            material: '',
            specification: '',
            warning: '',
            usage: '',
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
        let { age, brand, color, material, madeBy, origin, specification, supplier, usage, warning } = this.state
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
                    <label>Nơi sản xuất</label>
                    <input className='form-control'
                        value={madeBy}
                        onChange={(event) => this.handleOnChangeInput(event, 'madeBy')} />
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
                    <label>Thông số kỹ thuật</label>
                    <input className='form-control'
                        value={specification}
                        onChange={(event) => this.handleOnChangeInput(event, 'specification')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Hướng dẫn sử dụng</label>
                    <input className='form-control'
                        value={usage}
                        onChange={(event) => this.handleOnChangeInput(event, 'usage')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Cảnh báo</label>
                    <input className='form-control'
                        value={warning}
                        onChange={(event) => this.handleOnChangeInput(event, 'warning')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Độ tuổi</label>
                    <input className='form-control'
                        type='number' min={0} max={100}
                        value={age}
                        onChange={(event) => this.handleOnChangeInput(event, 'age')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ToyDescriptionComponent);
