import passwordValidator from 'password-validator'
import emailValidator from "email-validator";

const schema = new passwordValidator();

schema.is().min(8)
    .is().max(16)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)

class CommonUtils {
    static validateEmail(email) {
        let isValid = emailValidator.validate(email)
        let response = {}

        if (email) {
            if (isValid) {
                response.errCode = 0;
            } else {
                response.errCode = 1;
                response.messageVI = 'Sai định dạng mail'
                response.messageEN = 'Wrong email syntax'
            }
        } else {
            response.errCode = 1;
            response.messageVI = 'Email không được để trống'
            response.messageEN = 'Email can not be left empty'
        }


        return response;
    }

    static validatePassword(password) {
        let isValid = schema.validate(password)
        let response = {}

        if (isValid) {
            response.errCode = 0;
        } else {
            response.errCode = 1;
            response.messageVI = 'Mặt khẩu phải từ 8 đến 16 kí tự, 1 kí tự in hoa và 1 kí tự số'
            response.messageEN = 'Password must have 8 to 16 characters, including an uppercase and a number'
        }
        return response;
    }

    static validateKey(key) {
        let response = {}

        if (key) {
            response.errCode = 0;
        } else {
            response.errCode = 1;
            response.messageVI = "Vui lòng nhập mã được gửi đến email của quý khách!"
            response.messageEN = "Please input code that has been sent to your email!"
        }
        return response;
    }

    static checkChosenAddress(target) {
        if (target) {
            return true;
        }
        return false
    }

    static getSalePrice(price, discount) {
        return price - ((price * discount) / 100);
    }

    static getName(firstName, lastName) {

    }

    static getBase64(file) {
        return new Promise(resolve => {
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader);
            };
        });
    }

    static convertToKeyName = (inputName) => {
        let keyArr = ['(', ')', ':', ' ', '/', ',', '.', '+', '-', '&', '#', "'", '"', '---', '--']

        inputName = this.convertToNonAccentVietnamese(inputName)

        for (let index = 0; index < keyArr.length; index++) {
            inputName = inputName.split(keyArr[index]).join('-');
        }

        inputName = inputName.toLowerCase();

        let lastChar = inputName.slice(- 1)
        if (lastChar === '-') {
            inputName = inputName.slice(0, -1)
        }

        return inputName;
    }

    static convertToNonAccentVietnamese(string) {
        string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        string = string.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        string = string.replace(/đ/g, "d");

        string = string.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a");
        string = string.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e");
        string = string.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "i");
        string = string.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o");
        string = string.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "u");
        string = string.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "y");
        string = string.replace(/Đ/g, "d");

        return string;
    }

}

export default CommonUtils;