class CommonUtils {
    static getBase64(file) {
        return new Promise(resolve => {
            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader);
            };
        });
    }

}

export default CommonUtils;