class CommonUtils {
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
        // inputName = inputName.replace("'", 'a');
        // inputName = inputName.replace('"', 'a');

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