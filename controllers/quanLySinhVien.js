// Tạo object chứa thông tin request về api từ (Lưu ý: các thông tin phải chính xác với BE cung cấp)
var objectAjax = {
    url: 'http://svcy.myclass.vn/api/SinhVien/LayDanhSachSinhVien',
    method: 'GET',
    responseType: 'json'
}

// Dùng thư viện axios gửi thông tin yêu cầu BE trả dữ liệu
var promise = axios(objectAjax);

promise.then(function (res) {

    var noiDungTable = '';
    for (var i = 0; i < res.data.length; i++) {
        // Mỗi lần duyệt lấy ra dữ liệu của 1 sinh viên
        var sinhVien = res.data[i];
        // Từ dữ liệu sinh viên => tạo ra thẻ tr
        noiDungTable += `
        <tr>
            <th>${sinhVien.MaSV}</th>
            <th>${sinhVien.HoTen}</th>
            <th>${sinhVien.Email}</th>
            <th>${sinhVien.SoDT}</th>
            <th>${sinhVien.DiemToan}</th>
            <th>${sinhVien.DiemLy}</th>
            <th>${sinhVien.DiemHoa}</th>
            <th>
            <button class="btn btn-danger" onclick="xoaSinhVien('${sinhVien.MaSV}')">Xóa</button>
            <button class="btn btn-primary" onclick="chinhSua('${sinhVien.MaSV}')">Sửa</button>

            </th>
        </tr>
        `
    }
    document.getElementById('tblSinhVien').innerHTML = noiDungTable;
    console.log(res.data);
}).catch(function (error) {
    console.log(error);

})

var chinhSua = function (maSV) {
    axios({
        url: `http://svcy.myclass.vn/api/SinhVien/LayThongTinSinhVien/${maSV}`,// Đường dẫn đến BE
        method: 'get'
    }).then(function(res) {
        var sinhVien = res.data;
        // console.log(res.data);
        // DOM đến input set giá trị value đúng thuộc tính
        document.getElementById('MaSV').value = sinhVien.MaSV;
        document.getElementById('HoTen').value = sinhVien.HoTen;
        document.getElementById('Email').value = sinhVien.Email;
        document.getElementById('SoDT').value = sinhVien.SoDT;
        document.getElementById('DiemToan').value = sinhVien.DiemToan;
        document.getElementById('DiemLy').value = sinhVien.DiemLy;
        document.getElementById('DiemHoa').value = sinhVien.DiemHoa;
    }).catch(function(err) {
        console.log(err.response.data);
        
    })
}

// Chức năng cập nhật dữ liệu
document.getElementById('btnCapNhatSinhVien').onclick = function() {
    // Lấy thông tin nhập liệu từ người dùng
    var sv = new sinhVien();
    sv.MaSV = document.getElementById('MaSV').value;
    sv.HoTen = document.getElementById('HoTen').value;
    sv.Email = document.getElementById('Email').value;
    sv.SoDT = document.getElementById('SoDT').value;
    sv.DiemToan = document.getElementById('DiemToan').value;
    sv.DiemLy = document.getElementById('DiemLy').value;
    sv.DiemHoa = document.getElementById('DiemHoa').value;

    console.log(sv);
    // Gọi api cập nhật dữ liệu BE cung cấp
    axios ({
        url:'http://svcy.myclass.vn/api/SinhVien/CapNhatThongTinSinhVien',
        method: 'PUT',
        data: sv
    }).then(function(res){
        console.log(res.data);
        loadDanhSachSinhVien();
    }).catch(function(err){
        console.log(err.response.data);
    })
}

var xoaSinhVien = function (MaSV) {
    var obAjaxXoaSinhVien = {
        url: `http://svcy.myclass.vn/api/SinhVien/XoaSinhVien/${MaSV}`,
        method: 'DELETE'
    }
    // Gọi api xóa sinh viên
    axios(obAjaxXoaSinhVien).then(function (res) {
        console.log(res);
        loadDanhSachSinhVien();
    }).catch(function (err) {
        console.log(err);
        loadDanhSachSinhVien();
    })

}


// -------------------Chức năng thêm sinh viên-------------------
document.getElementById('btnThemSinhVien').onclick = function () {
    var sv = new sinhVien();
    sv.MaSV = document.getElementById('MaSV').value;
    sv.HoTen = document.getElementById('HoTen').value;
    sv.Email = document.getElementById('Email').value;
    sv.SoDT = document.getElementById('SoDT').value;
    sv.DiemToan = document.getElementById('DiemToan').value;
    sv.DiemLy = document.getElementById('DiemLy').value;
    sv.DiemHoa = document.getElementById('DiemHoa').value;

    // Tạo object đưa dữ liệu về BE
    var obAxios = {
        url: 'http://svcy.myclass.vn/api/SinhVien/ThemSinhVien',
        method: 'POST',
        data: sv // sv là dữ liệu đưa về BE xử lý vì vậy cần phải ghi đúng chính xác tên cách thuộc tính BE yêu cầu
    }
    // Dùng axios đưa dữ liệu về BE
    axios(obAxios).then(function (res) {
        console.log(res);
        loadDanhSachSinhVien();
    }).catch(function (err) {
        console.log(err);
        // Gọi lại phương thức load danh sách sinh viên mới từ server về
        loadDanhSachSinhVien();
    })
}

function loadDanhSachSinhVien() {
    window.location.reload();
}