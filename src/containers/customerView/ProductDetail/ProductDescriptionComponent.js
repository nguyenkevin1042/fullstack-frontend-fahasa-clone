import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ProductDescriptionComponent.scss';
// import * as actions from "../store/actions";

class ProductDescriptionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLess: true
        };
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.lang !== this.props.lang) {

        }


    }

    renderBookDescription = () => {
        let { showLess } = this.state
        return (
            <>
                <table>
                    <tr >
                        <th>Mã hàng</th>
                        <td>8935235228351</td>
                    </tr>
                    <tr>
                        <th>Tên Nhà Cung Cấp</th>
                        <td className='supplier-name'>Nhã Nam</td>
                    </tr>
                    <tr>
                        <th>Tác giả</th>
                        <td>José Mauro de Vasconcelos</td>
                    </tr>
                    <tr>
                        <th>Người Dịch</th>
                        <td>Nguyễn Bích Lan, Tô Yến Ly</td>
                    </tr>
                    <tr>
                        <th>NXB</th>
                        <td>NXB Hội Nhà Văn</td>
                    </tr>
                    <tr>
                        <th>Năm XB</th>
                        <td>2020</td>
                    </tr>
                    <tr>
                        <th>Trọng lượng (gr)</th>
                        <td>280</td>
                    </tr>
                    <tr>
                        <th>Kích thước</th>
                        <td>20 x 14.5 cm</td>
                    </tr>
                    <tr>
                        <th>Số Trang</th>
                        <td>244</td>
                    </tr>
                    <tr>
                        <th>Hình thức</th>
                        <td>Bìa Mềm</td>
                    </tr>
                </table>

                <div className='about-product-price'>
                    Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,..
                </div>
                <div className={showLess === true ? 'about-product-text-less' : 'about-product-text-more'}>
                    “Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng sống... một tác phẩm kinh điển của Brazil.” - Booklist

                    “Một cách nhìn cuộc sống gần như hoàn chỉnh từ con mắt trẻ thơ… có sức mạnh sưởi ấm và làm tan nát cõi lòng, dù người đọc ở lứa tuổi nào.” - The National

                    Hãy làm quen với Zezé, cậu bé tinh nghịch siêu hạng đồng thời cũng đáng yêu bậc nhất, với ước mơ lớn lên trở thành nhà thơ cổ thắt nơ bướm. Chẳng phải ai cũng công nhận khoản “đáng yêu” kia đâu nhé. Bởi vì, ở cái xóm ngoại ô nghèo ấy, nỗi khắc khổ bủa vây đã che mờ mắt người ta trước trái tim thiện lương cùng trí tưởng tượng tuyệt vời của cậu bé con năm tuổi.

                    Có hề gì đâu bao nhiêu là hắt hủi, đánh mắng, vì Zezé đã có một người bạn đặc biệt để trút nỗi lòng: cây cam ngọt nơi vườn sau. Và cả một người bạn nữa, bằng xương bằng thịt, một ngày kia xuất hiện, cho cậu bé nhạy cảm khôn sớm biết thế nào là trìu mến, thế nào là nỗi đau, và mãi mãi thay đổi cuộc đời cậu.

                    Mở đầu bằng những thanh âm trong sáng và kết thúc lắng lại trong những nốt trầm hoài niệm, Cây cam ngọt của tôi khiến ta nhận ra vẻ đẹp thực sự của cuộc sống đến từ những điều giản dị như bông hoa trắng của cái cây sau nhà, và rằng cuộc đời thật khốn khổ nếu thiếu đi lòng yêu thương và niềm trắc ẩn. Cuốn sách kinh điển này bởi thế không ngừng khiến trái tim người đọc khắp thế giới thổn thức, kể từ khi ra mắt lần đầu năm 1968 tại Brazil.

                    TÁC GIẢ:

                    JOSÉ MAURO DE VASCONCELOS (1920-1984) là nhà văn người Brazil. Sinh ra trong một gia đình nghèo ở ngoại ô Rio de Janeiro, lớn lên ông phải làm đủ nghề để kiếm sống. Nhưng với tài kể chuyện thiên bẩm, trí nhớ phi thường, trí tưởng tượng tuyệt vời cùng vốn sống phong phú, José cảm thấy trong mình thôi thúc phải trở thành nhà văn nên đã bắt đầu sáng tác năm 22 tuổi. Tác phẩm nổi tiếng nhất của ông là tiểu thuyết mang màu sắc tự truyện Cây cam ngọt của tôi. Cuốn sách được đưa vào chương trình tiểu học của Brazil, được bán bản quyền cho hai mươi quốc gia và chuyển thể thành phim điện ảnh. Ngoài ra, José còn rất thành công trong vai trò diễn viên điện ảnh và biên kịch.

                </div>

                <div className='show-hide-btn'>
                    <button onClick={() => this.handleShowDescription()}>
                        {showLess === true ? 'Xem thêm' : 'Rút gọn'}
                    </button>
                </div>
            </>
        )
    }

    handleShowDescription = () => {
        this.setState({
            showLess: !this.state.showLess
        })
    }


    render() {

        return (
            <div className='product-description-container'>
                <div className='product-description-content'>
                    <div className='description-header'>
                        Thông tin sản phẩm
                    </div>
                    {this.renderBookDescription()}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionComponent);
