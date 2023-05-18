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
                    <div className='quick-access-menu row'>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image img-fluid'>
                                <div className='flash-sale share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.flash-sale" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='sale-code share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.discount-code" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='trending share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.trending" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='new-product share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.new-product" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='tuesday-sale share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.tuesday-sale" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='literature share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.literature" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='mentality-skills share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.mentality" />
                                <br />
                                <FormattedMessage id="customer.homepage.quick-access.skills" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='manga-comic share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.manga" />
                                <br />
                                <FormattedMessage id="customer.homepage.quick-access.comic" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='old-book share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.secondhand-book-fair" />
                            </div>
                        </div>
                        <div className='quick-access-item col-2 col-md-1'>
                            <div className='item-image'>
                                <div className='economic share-item'></div>
                            </div>
                            <div className='item-text'>
                                <FormattedMessage id="customer.homepage.quick-access.economic" />
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
