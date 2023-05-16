import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './QuickAccess.scss';

class QuickAccess extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }


    render() {
        return (
            <div className='quick-access-container'>
                <div className='quick-access-content'>
                    <div className='quick-access-menu'>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='flash-sale share-item'></div>
                            </div>
                            <div className='item-text'>
                                Flash Sale
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='sale-code share-item'></div>
                            </div>
                            <div className='item-text'>
                                Mã giảm giá
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='trending share-item'></div>
                            </div>
                            <div className='item-text'>
                                Xu hướng
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='new-product share-item'></div>
                            </div>
                            <div className='item-text'>
                                Sản phẩm mới
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='tuesday-sale share-item'></div>
                            </div>
                            <div className='item-text'>
                                Sale thứ 3
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='literature share-item'></div>
                            </div>
                            <div className='item-text'>
                                Văn học
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='mentality-skills share-item'></div>
                            </div>
                            <div className='item-text'>
                                Tâm lý<br />Kỹ năng
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='manga-comic share-item'></div>
                            </div>
                            <div className='item-text'>
                                Manga -<br />Comic
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='old-book share-item'></div>
                            </div>
                            <div className='item-text'>
                                Phiên chợ<br />sách cũ
                            </div>
                        </div>
                        <div className='quick-access-item'>
                            <div className='item-image'>
                                <div className='economic share-item'></div>
                            </div>
                            <div className='item-text'>
                                kinh Tế
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(QuickAccess);
