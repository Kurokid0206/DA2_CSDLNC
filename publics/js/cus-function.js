var ids = ['new-order-section',
    'Search-product-section',
    'view-order-section',
    'view-order-detail-section'
]

var Shopping_bag = [];
var glb_data = [];
var page_max = 5;

function prev(section) {
    let page = document.querySelector(`#${section} .nav-page-number`)
    if (page.value >= 2) {
        page.value--
    }

}

function next(section) {
    let page = document.querySelector(`#${section} .nav-page-number`)
    if (page.value < glb_data.length / page_max) {
        page.value++
    }
}

function check_navpage(section) {
    let page = document.querySelector(`#${section} .nav-page-number`);
    if (page.value >= glb_data.length / page_max) {
        page.value = parseInt((glb_data.length / page_max).toFixed(0))
    }
}

function cus_show(id) {

    ids.forEach(id => {
        var div = document.querySelector("#" + id);
        div.style.display = "none";
    })
    var div = document.querySelector("#" + id);
    div.style.display = "block";
}

function customer_view_products() {
    var TenSP = document.getElementById("name-for-search").value
    var MauSac = document.getElementById("color-for-search").value
    var ChuDe = document.getElementById("title-for-search").value


    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        glb_data = JSON.parse(this.responseText)
        render_product_for_customer();

    }

    xhtml.open("POST", "/customer/search-products");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("TenSP=" + TenSP + "&MauSac=" + MauSac + "&ChuDe=" + ChuDe);
    return false;
}

function render_product_for_customer() {
    var page_num = document.querySelector('#Search-product-section .nav-page-number').value;
    var data = []
    for (i = (page_num - 1) * page_max; i < page_num * page_max; i++) {
        if (i >= glb_data.length) break;
        data.push(glb_data[i])
    }

    var table = document.querySelector("#Search-products-container")
    var tr = ``
    data.forEach(element => {
        console.log(element.GiaBan)
        tr = tr + `<!-- product card start -->
        <div class="col-xs-12 mb-30">
            <div class="course-box list-view clearfix">
                <div class="thumb text-center pull-left">
                    <img src="/images/Hoa_1.png" alt="Hoa thanh tâm" />
                </div>
                <div class="course-content">

                    <h3 class="text-capitalize">${element.TenSP}</h3>

                    <div class="product-price clearfix">
                        <div class="pull-left">
                            <h6><span>Giá: </span>${element.GiaBan} vnd</h6>
                        </div>
                    </div>
                    <h6 style="margin:5px 0 10px 0;">Màu: ${element.MauSac}</h6>
                    <h6 style="margin:5px 0 5px 0; height: 120px;">Chủ đề: ${element.ChuDe}</h6>
                    <a class="btn btn-1"  onclick="return Add_product_to_shopping('${element.MaSP}','${element.TenSP}',${element.GiaBan});">Thêm vào giỏ hàng</a>
                    

                </div>
            </div>
        </div>
        <!-- product card end -->`
    });
    table.innerHTML = tr
}

function Add_product_to_shopping(MaSP, TenSp, GiaBan) {
    Shopping_bag.forEach(element => {
        if (element.MaSP == MaSP) return false
    })
    Shopping_bag.push({ 'MaSP': MaSP, 'TenSP': TenSp, 'GiaBan': GiaBan });
    event.target.innerHTML = "Đã thêm vào giỏ hàng";
    event.target.removeAttribute("onclick")
    add_order_detail(MaSP, TenSp);
    return false;
}

function add_order_detail(MaSP, TenSP) {
    var container = document.querySelector(`#order_detail-container`);
    var CTDHs = document.querySelectorAll('.CT_donhang');

    var temp = document.createElement('div');
    temp.setAttribute('id', `CTDH${CTDHs.length}`)
    temp.classList.add('CT_donhang')
    temp.classList.add('enter-box')
    temp.innerHTML = `
    <h4 style="margin:5px 0 0 0; display: inline-block;">Sản phẩm ${CTDHs.length+1}:</h4>

    <br><br>

    <h6 style="margin:5px 0 0 0;">Sản phẩm:</h6>
    <select name="product" id="select-product" placeholder="Chọn đối tác" required disacbled>
        <option value="${MaSP}">${TenSP}</option>
    </select>
    <h6 style="margin:5px 0 0 0;">Số lượng:</h6>
    <input type="number" name="quantity" placeholder="Số lượng" required/>
    <br><br>`
    container.appendChild(temp);


}

function check_order_epmty() {
    if (Shopping_bag.length <= 0) {
        document.getElementById('order_is_emp').style.display = "block"
        document.getElementById('order_div').style.display = "none"
    } else {
        document.getElementById('order_is_emp').style.display = "none"
        document.getElementById('order_div').style.display = "block"
    }
}

function customer_view_order() {
    cus_show('view-order-section');
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        glb_data = JSON.parse(this.responseText);
        render_view_order()

    }

    xhtml.open("GET", "/customer/cus-view-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function render_view_order() {
    var page_num = document.querySelector('#view-order-section .nav-page-number').value;
    var data = []
    for (i = (page_num - 1) * page_max; i < page_num * page_max; i++) {
        if (i >= glb_data.length) break;
        data.push(glb_data[i])
    }
    if (data.length <= 0) {
        document.querySelector("#bill tbody").innerHTML = "No result."
        return;
    }
    var bill = document.querySelector("#bill tbody")
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr><td scope="col" >
        <h6 style="margin:5px 0 0 0;">${element.MaHD}</h6>
        </td>
        <td scope="col" >
        <h6 style="margin:5px 0 0 0;">${element.DiaChiGiaoHang}</h6>
        </td>
        <td scope="col" >
        <h6 style="margin:5px 0 0 0;">${(element.TongTien).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} vnd</h6>
        </td>
        <td scope="col" >
        <h6 style="margin:5px 0 0 0;">${new Date(element.NgayLap).toISOString().slice(0, 10)}</h6>
        </td>
        <td scope="col" >
        <h6 style="margin:5px 0 0 0;">${element.TrangThai}</h6>
        </td>
        <td><button class="btn-primary" onclick="customer_view_order_detail('${element.MaHD}')">
        <h6 style="margin:5px 0 0 0; color: aliceblue;">Xem đơn</h6></button></td>
        <td><button class="btn-danger" onclick="cancel_order('${element.MaHD}')">
        <h6 style="margin:5px 0 0 0; color: aliceblue;">Hủy đơn</h6>
        </button></td></tr>`
    });
    bill.innerHTML = tr
}

function customer_view_order_detail(MaHD) {
    cus_show('view-order-detail-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        render_view_order_detail(JSON.parse(this.responseText))
            // input.value="";
            // var data=JSON.parse(this.responseText)
            // console.log(data)

    }

    xhtml.open("POST", "/customer/cus-view-order-detail");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send('MaHD=' + MaHD);

    return false;
}

function render_view_order_detail(data) {
    console.log(data)
    if (data.length <= 0) {
        document.querySelector("#bill-detail tbody").innerHTML = "No result."
        return;
    }
    var bill = document.querySelector("#bill-detail tbody")
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr>
        <th scope="col" ">
            <h6 style="margin:5px 0 0 0;">${element.MaSP}</h6>
        </th>
        <th scope="col" ">
            <h6 style="margin:5px 0 0 0;">${element.TenSP}</h6>
        </th>
        <th scope="col" ">
            <h6 style="margin:5px 0 0 0;">${element.SoLuong}</h6>
        </th>
        <th scope="col" ">
            <h6 style="margin:5px 0 0 0;">${(element.ThanhTien).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} vnd</h6>
        </th>
    </tr>`
    });
    bill.innerHTML = tr
}




function insert_order() {
    var products = document.querySelectorAll('.CT_donhang');
    var data = [];
    products.forEach(product => {
        let temp = { MaSP: "", SoLuong: 0 };
        temp.MaSP = product.querySelector('#select-product').value
        temp.SoLuong = parseInt(product.querySelector('input').value)
        data.push(temp);
        temp = { MaSP: "", SoLuong: 0 };
    })
    data = JSON.stringify(data);
    let NguoiNhan = document.getElementById("NguoiNhan").value
    let DiaChi = document.getElementById("address").value
    let LoiNhan = document.getElementById("LoiNhan").value
    let MaGiamGia = document.getElementById("MaGiamGia").value

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        customer_view_order();
    }

    xhtml.open("POST", "customer/insert-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`NguoiNhan=${NguoiNhan}&DiaChi=${DiaChi}&LoiNhan=${LoiNhan}&MaGiamGia=${MaGiamGia}&data=${data}`);

    return false;
}



function insert_contract() {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-contract");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}












function get_product_forAll() {
    let MaDT = document.querySelector(`#select-partner`).value
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        var CTDHs = document.querySelectorAll(".CT_donhang")
        for (i = 0; i < CTDHs.length; i++) {
            render_product(JSON.parse(this.responseText), `CTDH${i}`)
        }

    }
    xhtml.open("POST", "product-data");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("MaDT=" + MaDT);
}

function get_product(CTDH) {
    let MaDT = document.querySelector(`#select-partner`).value
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        render_product(JSON.parse(this.responseText), CTDH)
    }
    xhtml.open("POST", "product-data");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("MaDT=" + MaDT);
}

function render_product(data, CTDH) {
    var product = document.querySelector(`#${CTDH} #select-product`)
    var opt = `<option selected>Chọn Sản Phẩm</option>`
    data.forEach(element => {
        opt = opt + `<option value="${element.MaSP}">${element.TenSP}-
        ${(element.GiaBan)
            .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}(vnd)</option>`
    });
    product.innerHTML = opt
}






function cancel_order(MaHD) {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        customer_view_order();

    }

    xhtml.open("POST", "customer/cancel-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("MaHD=" + MaHD);

    return false;
}

function delete_componentbyID(CTDH) {
    document.getElementById(CTDH).remove();
}