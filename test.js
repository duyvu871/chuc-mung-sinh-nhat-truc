const fs = require('fs').promises;
const path = require('path');

const folderPath = __dirname + '/public/anh'; // Thay đổi đường dẫn tới thư mục của bạn

const images = []

async function listFiles() {
    try {
        const files = await fs.readdir(folderPath);
        console.log('Danh sách các tệp trong thư mục:');
        files.forEach(file => {
            // console.log(file);
            images.push("./public/anh/" + file);
        });
        fs.writeFile('images.json', JSON.stringify(images), (err) => {
            if (err) throw err;
            console.log('File đã được lưu!');
        });
        // console.log(images);
    } catch (error) {
        console.error('Đã có lỗi khi đọc thư mục:', error.message);
    }
}

listFiles();
