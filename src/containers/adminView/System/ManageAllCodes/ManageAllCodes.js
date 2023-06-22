import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageAllCodes.scss';
import * as actions from "../../../../store/actions";
import AllCodesTableComponent from './AllCodesTableComponent';

class ManageAllCodes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            keyMap: '',
            valueVI: '',
            valueEN: ''
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
        this.setState({ ...copyState });
    }

    handleSaveNewCode = async () => {
        await this.props.addNewCode(this.state)
        // this.handleClearAllInput();
        // this.props.fetchAllCodes();
    }

    handleClearAllInput = () => {
        this.setState({
            type: '',
            keyMap: '',
            valueVI: '',
            valueEN: ''
        })
    }


    render() {
        let { type, keyMap, valueVI, valueEN } = this.state
        return (
            <Fragment>
                <div className='manage-all-codes-container'>
                    <div className='manage-all-codes-title'>
                        Quản lý các code
                    </div>

                    <div className='manage-all-codes-add-section row'>
                        <div className='col-6 form-group'>
                            <label>Loại</label>
                            <input className='form-control'
                                value={type}
                                onChange={(event) => this.handleOnChangeInput(event, 'type')} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Mã</label>
                            <input className='form-control'
                                value={keyMap}
                                onChange={(event) => this.handleOnChangeInput(event, 'keyMap')} />
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
                                onClick={() => this.handleSaveNewCode()}>Save</button>
                        </div>
                        <div className='col-6 form-group'>
                            <button className='btn btn-primary'
                                onClick={() => this.handleClearAllInput()}>Reset</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <AllCodesTableComponent />
                        </div>
                    </div>
                </div>
            </Fragment >
        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allCodesArr: state.admin.allCodesArr
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewCode: (codeData) => dispatch(actions.addNewCode(codeData)),
        fetchAllCodes: () => dispatch(actions.fetchAllCodes())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAllCodes);
