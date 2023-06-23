import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './MakeOrderSuccess.scss';
import Header from '../components/Header';
import SignUpNewletter from '../Homepage/SignUpNewletter';
import Footer from '../components/Footer';

class MakeOrderSuccess extends Component {
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

    handleToHomepage = () => {
        if (this.props.history) {
            this.props.history.push("/home");
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />

                <div className='completed-ordering-container'>
                    <div className='completed-ordering-content'>
                        <div className='completed-ordering-title'>
                            <FormattedMessage id="customer.make-order-success.title" />
                        </div>
                        <div className='completed-ordering-icon'></div>
                        <div className='completed-ordering-button'>
                            <button className='to-homepage-btn'
                                onClick={() => this.handleToHomepage()}>
                                <FormattedMessage id="customer.make-order-success.to-homepage" />
                            </button>
                            <button className='check-order-btn'>
                                <FormattedMessage id="customer.make-order-success.check-order" />
                            </button>
                        </div>
                    </div>
                </div>

                <SignUpNewletter />
                <Footer />

            </React.Fragment >

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MakeOrderSuccess));
