import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
// import './AllCategoryTableComponent.scss';
import CustomScrollbars from '../../../../components/CustomScrollbars';
import * as actions from "../../../../store/actions";

class AllCategoryTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSubCategory: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllSubCategory();
        this.setState({
            listSubCategory: this.props.allSubCategoryArr
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }

        if (prevProps.allSubCategoryArr !== this.props.allSubCategoryArr) {
            this.setState({
                listSubCategory: this.props.allSubCategoryArr
            })
        }


    }

    renderSubCategoriesTableData() {
        let { listSubCategory } = this.state

        return (
            <>
                {listSubCategory && listSubCategory.length > 0 &&
                    listSubCategory.map((item, index) => {
                        return (
                            <>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.categoryId}</td>
                                    <td>{item.valueVI}</td>
                                    <td>{item.valueEN}</td>
                                    <td>
                                        <button className='btn-edit'
                                        // onClick={() => this.handleEdit(item)}
                                        > <i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                        // onClick={() => this.handleDelete(item)}
                                        ><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </ >
                        )
                    })

                }
            </>
        )
    }


    render() {
        let { listSubCategory } = this.state
        console.log(listSubCategory)
        return (
            <>
                <CustomScrollbars style={{ height: '768px' }}>
                    <div className='manage-sharing-table'>
                        <table className='sharing-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category</th>
                                    <th>ValueVI</th>
                                    <th>ValueEN</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.renderSubCategoriesTableData()}
                            </tbody>


                        </table>
                    </div>
                </CustomScrollbars>

            </>

        );
    }
}


const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allSubCategoryArr: state.admin.allSubCategoryArr,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllSubCategory: () => dispatch(actions.fetchAllSubCategory()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCategoryTableComponent);
