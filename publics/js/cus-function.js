var ids = ['new-order-section',
    'Search-product-section',
    'view-order-section',
    'view-order-detail-section'
]

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

        render_product_for_customer(JSON.parse(this.responseText))

    }

    xhtml.open("POST", "/customer/search-products");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("TenSP=" + TenSP + "&MauSac=" + MauSac + "&ChuDe=" + ChuDe);
    return false;
}

function render_product_for_customer(data) {
    var table = document.querySelector("#Search-products-container")
    var tr = ``
    data.forEach(element => {
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
                            <h6><span>Giá: </span>${(element.GiaBan).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} vnd</h6>
                        </div>
                    </div>
                    <h6 style="margin:5px 0 10px 0;">Màu: ${element.MauSac}</h6>
                    <h6 style="margin:5px 0 5px 0; height: 120px;">Chủ đề: ${element.ChuDe}</h6>
                    <a class="btn btn-1" href="course-details.html" onclick="return Add_product_to_shopping('${element.MaSP}','${element.TenSP}');">Thêm vào giỏ hàng</a>

                </div>
            </div>
        </div>
        <!-- product card end -->`
    });
    table.innerHTML = tr
}

function customer_view_order() {
    cus_show('view-order-section');
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        render_view_order(JSON.parse(this.responseText))

    }

    xhtml.open("GET", "cus-view-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function customer_view_order_detail(MaDH) {
    cus_show('view-order-detail-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        render_view_order_detail(JSON.parse(this.responseText))
            // input.value="";
            // var data=JSON.parse(this.responseText)
            // console.log(data)

    }

    xhtml.open("POST", "cus-view-order-detail");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send('MaDH=' + MaDH);

    return false;
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
    let supp = document.getElementById("select-partner")
    let addr = document.getElementById("address")
    let pay = document.getElementById("type-payment")
    let CT_DHs = document.querySelectorAll(".CT_donhang")
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        customer_view_order();
    }

    xhtml.open("POST", "insert-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`Httt=${pay.value}&DiaChi=${addr.value}&MaDT=${supp.value}&data=${data}`);

    return false;
}

function insert_order_detail() {
    var xhtml = new XMLHttpRequest();

    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(JSON.parse);

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


function render_view_order(data) {
    var bill = document.querySelector("#bill tbody")
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr><td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.MaDH}</h6>
        </td>
        <td scope="col" style="width: 200px;">
        <h6 style="margin:5px 0 0 0;">${element.DiaChiGiaoHang}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.TongTien}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.TinhTrang}</h6>
        </td>
        <td><button class="btn-danger" onclick="customer_view_order_detail('${element.MaDH}')">
        <h6 style="margin:5px 0 0 0; color: aliceblue;">Xem đơn</h6></button></td>
        <td><button class="btn-danger" onclick="cancel_order('${element.MaDH}')">
        <h6 style="margin:5px 0 0 0; color: aliceblue;">Hủy đơn</h6>
        </button></td></tr>`
    });
    bill.innerHTML = tr
}


function render_view_order_detail(data) {
    var bill = document.querySelector("#bill-detail tbody")
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr>
        <th scope="col" style="width: 120px;">
            <h6 style="margin:5px 0 0 0;">${element.MaSP}</h6>
        </th>
        <th scope="col" style="width: 200px;">
            <h6 style="margin:5px 0 0 0;">${element.TenSP}</h6>
        </th>
        <th scope="col" style="width: 100px;">
            <h6 style="margin:5px 0 0 0;">${element.GiaBan}</h6>
        </th>
        <th scope="col" style="width: 100px;">
            <h6 style="margin:5px 0 0 0;">${element.SoLuong}</h6>
        </th>
        <th scope="col" style="width: 10px;">
            <h6 style="margin:5px 0 0 0;">${element.ThanhTien}</h6>
        </th>
    </tr>`
    });
    bill.innerHTML = tr
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

function add_order_detail() {
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
    <select name="product" id="select-product" placeholder="Chọn đối tác" required>
        <option selected>Chọn sản phẩm</option>
        <option value="Mã sp">Tên sản phẩm</option>
    </select>
    <h6 style="margin:5px 0 0 0;">Số lượng:</h6>
    <input type="number" name="quantity" placeholder="Số lượng" required/>
    <br><br>`
    container.appendChild(temp);


}

function insert_product_branch() {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)

    }

    xhtml.open("POST", "insert-product_branch");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}


function cancel_order(MaDH) {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        customer_view_order();

    }

    xhtml.open("POST", "cancel-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("MaDH=" + MaDH);

    return false;
}

function delete_componentbyID(CTDH) {
    document.getElementById(CTDH).remove();
}