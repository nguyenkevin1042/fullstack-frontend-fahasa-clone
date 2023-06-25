import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';

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
            pages: null,
            chapter: null,
        };
    }

    async componentDidMount() {
        if (this.props.descriptionData) {
            this.setState({
                supplier: this.props.descriptionData.supplier,
                author: this.props.descriptionData.author,
                translator: this.props.descriptionData.translator,
                publisher: this.props.descriptionData.publisher,
                language: this.props.descriptionData.language,
                pages: this.props.descriptionData.pages,
                chapter: this.props.descriptionData.chapter,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (this.props.descriptionData && prevProps.descriptionData !== this.props.descriptionData) {
            this.setState({
                supplier: this.props.descriptionData.supplier,
                author: this.props.descriptionData.author,
                translator: this.props.descriptionData.translator,
                publisher: this.props.descriptionData.publisher,
                language: this.props.descriptionData.language,
                pages: this.props.descriptionData.pages,
                chapter: this.props.descriptionData.chapter,
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
        let { supplier, author, translator, publisher, pages, language, chapter } = this.state

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
                <div className='col-2 form-group'>
                    <label>Chương</label>
                    <input className='form-control'
                        type='number' min={1}
                        value={chapter}
                        onChange={(event) => this.handleOnChangeInput(event, 'chapter')} />
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
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDescriptionComponent);
