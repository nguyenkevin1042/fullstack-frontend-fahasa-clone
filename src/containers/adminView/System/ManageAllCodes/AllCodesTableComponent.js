import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../../store/actions";
import EditCodeModel from './EditCodeModel';

class AllCodesTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCodes: [],
            selectedItem: {},
            isModalOpened: false
        };
    }

    async componentDidMount() {
        await this.props.fetchAllCodes();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }
        if (prevProps.allCodesArr !== this.props.allCodesArr) {
            this.setState({
                allCodes: this.props.allCodesArr
            })
        }
    }

    renderAllCodesTableData() {
        let { allCodes } = this.state
        return (
            <>
                {allCodes && allCodes.length > 0 &&
                    allCodes.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.type}</td>
                                <td>{item.keyMap}</td>
                                <td>{item.valueVI}</td>
                                <td>{item.valueEN}</td>
                                <td>
                                    <button className='btn-edit'
                                        onClick={() => this.handleEdit(item)} > <i className="fas fa-pencil-alt"></i></button>
                                    <button className='btn-delete'
                                        onClick={() => this.handleDelete(item)}><i className="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })

                }
            </>
        )
    }

    handleDelete = async (item) => {
        await this.props.deleteCode(item.id);
        await this.props.fetchAllCodes();
    }

    handleEdit = (item) => {
        this.setState({
            selectedItem: item,
            isModalOpened: true
        })
    }
    handleCloseEditModel = () => {
        this.setState({
            isModalOpened: false
        })
    }

    render() {
        let { isModalOpened, selectedItem } = this.state
        return (
            <Fragment>
                <div className='manage-sharing-table'>
                    <table className='sharing-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>KeyMap</th>
                                <th>ValueVI</th>
                                <th>ValueEN</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderAllCodesTableData()}
                        </tbody>


                    </table>
                </div>

                <EditCodeModel
                    isModalOpened={isModalOpened}
                    selectedItem={selectedItem}
                    closeEditCodeModel={this.handleCloseEditModel} />
            </Fragment>
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
        fetchAllCodes: () => dispatch(actions.fetchAllCodes()),
        deleteCode: (inputId) => dispatch(actions.deleteCode(inputId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCodesTableComponent);
