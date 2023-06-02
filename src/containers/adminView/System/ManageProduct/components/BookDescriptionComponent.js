import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';

import * as actions from "../../../../../store/actions";
import { languages } from '../../../../../utils';

class BookDescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier: '',
            author: '',
            translator: '',
            publisher: '',
            language: '',
            pages: '',
            booklayout: '',

            listBookLayout: [],
            selectedBookLayout: ''
        };
    }

    async componentDidMount() {
        // await this.props.fetchAllCodesByType('booklayout')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.bookLayoutArr !== this.props.bookLayoutArr) {
            let dataSelect = this.buildDataInputSelect(this.props.bookLayoutArr, "category");
            this.setState({
                listBookLayout: dataSelect
            })
        }

    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];
        let language = this.props.lang;

        inputData.map((item, index) => {
            let obj = {};
            let labelVI = item.valueVI;
            let labelEN = item.valueEN;

            obj.keyMap = item.keyMap;
            obj.label = language === languages.VI ? labelVI : labelEN;
            result.push(obj);
        });


        return result;
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

    handleChange = (selectedBookLayout) => {
        this.setState({
            selectedBookLayout: selectedBookLayout,
            booklayout: selectedBookLayout.keyMap
        })

    }


    render() {
        let { supplier, author, translator, publisher, pages, language,
            selectedBookLayout, listBookLayout } = this.state
        return (
            <div className='row'>
                <div className='col-4 form-group'>
                    <label>Nhà cung cấp</label>
                    <input className='form-control'
                        value={supplier}
                        onChange={(event) => this.handleOnChangeInput(event, 'supplier')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Nhà xuất bản</label>
                    <input className='form-control'
                        value={publisher}
                        onChange={(event) => this.handleOnChangeInput(event, 'publisher')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Tác giả</label>
                    <input className='form-control'
                        value={author}
                        onChange={(event) => this.handleOnChangeInput(event, 'author')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Người dịch</label>
                    <input className='form-control'
                        value={translator}
                        onChange={(event) => this.handleOnChangeInput(event, 'translator')} />
                </div>
                <div className='col-2 form-group'>
                    <label>Số trang</label>
                    <input className='form-control'
                        type='number' min={0}
                        value={pages}
                        onChange={(event) => this.handleOnChangeInput(event, 'pages')} />
                </div>
                <div className='col-3 form-group'>
                    <label>Ngôn ngữ</label>
                    <input className='form-control'
                        value={language}
                        onChange={(event) => this.handleOnChangeInput(event, 'language')} />
                </div>
                {/* <div className='col-3 form-group'>
                    <label>Hình thức bìa</label>
                    <Select
                        value={selectedBookLayout}
                        onChange={this.handleChange}
                        options={listBookLayout}
                        // placeholder={<FormattedMessage id='admin.manage-doctor.choose-doctor' />}
                        name="selectedBookLayout" />
                </div> */}
            </div>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        bookLayoutArr: state.admin.bookLayoutArr,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCodesByType: (inputType) => dispatch(actions.fetchAllCodesByType(inputType)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDescriptionComponent);
