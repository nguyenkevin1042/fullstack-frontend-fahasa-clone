import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import './ChangingQuantityComponent.scss';
// import * as actions from "../store/actions";

class ChangingQuantityComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,

        };
    }

    componentDidMount() {
        this.setState({
            value: this.props.quantityValue
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.quantityValue !== this.props.quantityValue) {
            this.setState({
                value: this.props.quantityValue
            })
        }


    }

    handleOnChangeInput = (event) => {
        let key = event.target.id;
        let data = event.target.value;
        let copyState = { ...this.state };
        copyState[key] = data;
        this.setState({ ...copyState });
    }

    handleIncreaseQuantityValue = () => {
        this.setState({
            value: this.state.value + 1
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        })
    }

    handleDecreaseQuantityValue = () => {
        let result = this.state.value <= 1 ?
            1 : this.state.value - 1
        this.setState({
            value: result
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(this.state);
            }
        })
    }


    render() {
        let { value } = this.state

        return (
            <React.Fragment>
                <div className='select-quantity'>
                    <button onClick={() => this.handleDecreaseQuantityValue()}>-</button>
                    <input type='number' value={value}
                        id='value'
                        onChange={(event) => this.handleOnChangeInput(event)} />
                    <button onClick={() => this.handleIncreaseQuantityValue()}>+</button>
                </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangingQuantityComponent));
