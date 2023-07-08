import { connect, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions";
import { useCallback, useEffect, useState } from "react";
import ProductRowItem from "../ManageProduct/components/ProductRowItem";
import CustomPagination from "../../../../components/CustomPagination";
import LoadingOverlay from 'react-loading-overlay'

function ManageProductReviews(props) {
    const { allProductArr } = props
    const productArrClone = [...allProductArr]
    const [listProduct, setListProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [pagination, setPagination] = useState({
        totalRecords: "",
        totalPages: "",
        pageLimit: "",
        currentPage: "",
        startIndex: "",
        endIndex: "",
    })
    const [rowsPerPage, setRowsPerPage] = useState([]);

    useEffect(async () => {
        await props.fetchAllProduct();

    }, [])
    // // useCallback(() => {
    // //     setListProduct(props.allProductArr);
    // // }, [listProduct])

    // console.log("useEffect: ", listProduct)
    // // console.log("props.allProductArr: ", allProductArr)


    // // useCallback(async () => {
    // //     await props.fetchAllProduct();
    // //     setListProduct(props.allProductArr);
    // //     return;
    // // }, [listProduct])
    // // console.log("useCallback: ", listProduct)

    // // rowsPerPage = listProduct.slice(pagination.startIndex, pagination.endIndex + 1);
    // // setRowsPerPage(listProduct.slice(pagination.startIndex, pagination.endIndex + 1))

    // // const onChangePage = (data) => {
    // // const rows = listProduct.slice(data.startIndex, data.endIndex + 1)
    // //     setRowsPerPage(rows)
    // // };

    const onChangePage = useCallback((data) => {
        const rows = productArrClone.slice(data.startIndex, data.endIndex + 1)

        setPagination({
            totalPages: data.totalPages,
            pageLimit: data.pageLimit,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex,
        })
        setRowsPerPage(rows)

    })

    return (
        <LoadingOverlay
            classNamePrefix="Fullscreen_"
            active={isLoading}
            spinner={true}
            text='Please wait...'>
            <div className='sharing-manage-container'>
                <div className='sharing-manage-title'>
                    Quản lý đánh giá sản phẩm
                </div>

                <div className='manage-sharing-table'>
                    <table className='sharing-table'>
                        <thead>
                            <tr>
                                <th>Mã sản phẩm</th>
                                <th>Ảnh</th>
                                <th>Tên sản phẩm</th>
                                <th>Điểm đánh giá của người dùng</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* {renderProductsTableData(allProductArr)} */}
                            {renderProductsTableData(rowsPerPage)}
                        </tbody>
                    </table>

                    <CustomPagination
                        totalRecords={productArrClone.length}
                        pageLimit={pagination.pageLimit || 10}
                        initialPage={1}
                        pagesToShow={5}
                        onChangePage={onChangePage}
                    />
                </div>
            </div>
        </LoadingOverlay>
    )
}


function renderProductsTableData(products) {
    return (
        <>
            {products && products.length > 0 &&
                products.map((item, index) => (

                    <tr key={item.id}>
                        <ProductRowItem productId={item.id}
                            // editProduct={this.handleEdit}
                            // deleteProduct={this.handleDelete}
                            category={'off'}
                            price={'off'}
                            actions={'off'}
                            rating={'on'}
                        />
                    </tr>

                ))

            }
        </>
    )
};

// export default ManageProductReviews

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        allProductArr: state.admin.allProductArr,
        isFetchingData: state.admin.isFetchingData,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllProduct: () => dispatch(actions.fetchAllProduct()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductReviews);
