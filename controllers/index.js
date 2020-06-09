// Tạo ra đối tượng chứa 3 thuộc tính cần thiết để giao tiếp với backend
var objectAjax = {
    url: '../data/DanhSachNguoiDung.json', // Đường dẫn đến file chứa dữ liệu hoặc api backend
    method: 'GET', // Giao thức backend ung cấp ứng với url
    responseType: 'json' // Định dạng dữ liệu trả về server
}



// Dùng thư viện để đọc file hoặc api từ backend
var promise = axios(objectAjax);
promise.then(function(res) {
    var noiDungTable = '';
    for (var i = 0; i < res.data.length; i++) {
        // Sau mỗi lần lặp lấy ra 1 đối tượng người dùng
        var nguoiDung = res.data[i];
        // Từ đối tượng người dùng mình sẽ tạo ra thẻ tr tương ứng
        noiDungTable += `
        <tr>
            <th>${nguoiDung.TaiKhoan}</th>
            <th>${nguoiDung.MatKhau}</th>
            <th>${nguoiDung.HoTen}</th>
            <th>${nguoiDung.Email}</th>
            <th>${nguoiDung.SoDT}</th>
        </tr>
        `
    }
    // DOM đến table tbody chèn các thẻ tr vừa tạo vào
    document.getElementById('tblNguoiDung').innerHTML = noiDungTable;
    
}).catch(function(error) {
    // Hàm xử lý thất bại
    console.log(error);
    
});