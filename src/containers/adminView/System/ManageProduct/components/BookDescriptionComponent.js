import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

// import * as actions from "../store/actions";

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
        let { supplier, author, translator, publisher, pages, language } = this.state
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
                <div className='col-4 form-group'>
                    <label>Số trang</label>
                    <input className='form-control'
                        type='number' min={0}
                        value={pages}
                        onChange={(event) => this.handleOnChangeInput(event, 'pages')} />
                </div>
                <div className='col-4 form-group'>
                    <label>Ngôn ngữ</label>
                    <input className='form-control'
                        value={language}
                        onChange={(event) => this.handleOnChangeInput(event, 'language')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BookDescriptionComponent);
