var ids = ["manager-import-history-detail-section",
    "manager-import-history-section",
    "new-import-goods-section",
    "manager-warehouse-section",
    "manager-products-price-section",
    "manager-products-section"
]

function section_show(id) {

    ids.forEach(id => {
        var div = document.querySelector("#" + id);
        div.style.display = "none";
    })
    var div = document.querySelector("#" + id);
    div.style.display = "block";
}

function get_product_for_manage() {
    var name = document.getElementById("product_name-for-seach-manager-products").value;
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        render_manager_view_products(JSON.parse(this.responseText))
            // input.value="";
            // var data=JSON.parse(this.responseText)
            //console.log(this.responseText)

    }

    xhtml.open("POST", "/manage_product/view-products");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send('nameSearch=' + name);

}

function render_manager_view_products(data) {
    var table = document.querySelector("#manage-products-table tbody");
    if (data.length <= 0) {
        table.innerHTML = "No result."
        return
    }
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr id="${element.MaSP}">
        <td>
            <h6 style="margin:15px 0 0 0;">${element.MaSP}</h6>
        </td>
        <td>
            <input class="TenSP-for-edit" type="text" value="${element.TenSP}" disabled>
        </td>
        <td>
            <input class="MauSac-for-edit" type="text" value="${element.MauSac}" disabled>
        </td>
        <td>
            <input class="ChuDe-for-edit" type="text" value="${element.ChuDe}" disabled>
        </td>
        <td>
            <input class="GiaBan-for-edit" type="number" value="${element.GiaBan}" disabled>
        </td>
        <td>
            <h6 style="margin:15px 0 0 0;">${element.SoLuongTon}</h6>
        </td>
        <td style="padding-top:15px;">
            <button type="button" class="btn-primary save-btn" onclick="save_manage_edit_product('${element.MaSP}');"  disabled style="display:none">Save</button>
            <button type="button" class="btn-secondary" onclick="enable_edit('${element.MaSP}')">Edit</button>
        </td>

    </tr>`
    });
    table.innerHTML = tr
}

function save_manage_edit_product(MaSP) {
    var tr = document.getElementById(MaSP);
    var TenSP = tr.querySelector(` .TenSP-for-edit`).value;
    var MauSac = tr.querySelector(` .MauSac-for-edit`).value;
    var ChuDe = tr.querySelector(` .ChuDe-for-edit`).value;
    var GiaBan = tr.querySelector(` .GiaBan-for-edit`).value;
    var tr = document.getElementById(MaSP);
    tr.querySelector(` .TenSP-for-edit`).disabled = true;
    tr.querySelector(` .MauSac-for-edit`).disabled = true;
    tr.querySelector(` .ChuDe-for-edit`).disabled = true;
    tr.querySelector(` .GiaBan-for-edit`).disabled = true;
    tr.querySelector(` .save-btn`).style.display = "none";

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        console.log(this.responseText)

    }

    xhtml.open("POST", "/manage_product/save-edit-products");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`MaSP=${MaSP}&TenSP=${TenSP}&MauSac=${MauSac}&ChuDe=${ChuDe}&GiaBan=${GiaBan}`);
}

function enable_edit(MaSP) {
    var tr = document.getElementById(MaSP);
    tr.querySelector(` .TenSP-for-edit`).disabled = false;
    tr.querySelector(` .MauSac-for-edit`).disabled = false;
    tr.querySelector(` .ChuDe-for-edit`).disabled = false;
    tr.querySelector(` .GiaBan-for-edit`).disabled = false;
    tr.querySelector(` .save-btn`).disabled = false;
    tr.querySelector(` .save-btn`).style.display = "inline-block"
}



function delete_componentbyID(CTDH) {
    document.getElementById(CTDH).remove();
}

function show_form(id) {
    var div = document.querySelector("#" + id);
    div.style.display = "block";
}

function manage_add_new_product() {
    var form = document.getElementById("add-new-product-form")
    var TenSP = form[0].value;
    var MauSac = form[1].value;
    var ChuDe = form[2].value;
    var GiaBan = form[3].value;
    var SLTon = form[4].value;



    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        //console.log(this.responseText)
        document.getElementById("add-product-container").style.display = "none"
        section_show('manager-products-section');
        get_product_for_manage();

    }

    xhtml.open("POST", "/manage_product/insert-product");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`TenSP=${TenSP}&MauSac=${MauSac}&ChuDe=${ChuDe}&GiaBan=${GiaBan}&SLTon=${SLTon}`);
    return false;
}



function get_products_price() {
    var name = document.getElementById("product_ID-for-seach-manager-products-price").value;
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        render_manager_view_products_price(JSON.parse(this.responseText))
            // input.value="";
            // var data=JSON.parse(this.responseText)
            //console.log(this.responseText)

    }

    xhtml.open("POST", "/manage_product/view-products-price");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send('MaSP=' + name);

}


function render_manager_view_products_price(data) {
    var table = document.querySelector("#manager-products-price-table tbody");
    if (data.length <= 0) {
        table.innerHTML = "No result."
        return
    }
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.MaSP}</h6>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.TenSP}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.GiaNhap}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.GiaBan}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${new Date(element.NgayApDung).toISOString().slice(0, 10)}</h>
        </td>

    </tr>`
    });
    table.innerHTML = tr
}


function get_warehouse_data() {
    var name = document.getElementById("product_name-for-seach-warehouse").value;
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        render_warehouse_data(JSON.parse(this.responseText))
            // input.value="";
            // var data=JSON.parse(this.responseText)
            //console.log(this.responseText)

    }

    xhtml.open("POST", "/manage_product/view-warehouse-data");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send('nameSearch=' + name);

}

function render_warehouse_data(data) {
    var table = document.querySelector("#manager-warehouse-table tbody");
    if (data.length <= 0) {
        table.innerHTML = "No result."
        return
    }
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.MaSP}</h6>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.TenSP}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;color: rgb(0, 161, 27)">${element.SoLuongTon}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;color: rgb(255, 0, 119);">100</h>
        </td>
        <td>
            <button type="button" class="btn-primary" onclick="show_import_goods_form('${element.MaSP}');">Nhập hàng</button>
        </td>
    </tr>`
    });
    table.innerHTML = tr
}


function show_import_goods_form(MaSP) {
    section_show('new-import-goods-section');
    get_product_forAll();
    // document.querySelector("#new-import-goods-section #CTDH0 option").value = MaSP;
    // document.querySelector("#new-import-goods-section #CTDH0 option").innerHTML = MaSP;
    // document.querySelector("#new-import-goods-section #CTDH0").disabled = true;

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
    <button class="btn-danger" type="button" onclick="delete_componentbyID('CTDH${CTDHs.length}')" style="display: inline-block; margin-left: 50%;">
        <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Xóa</h6>
    </button>
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
    get_product_forOne(`CTDH${CTDHs.length}`)

}

function get_product_forAll() {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        var CTDHs = document.querySelectorAll(".CT_donhang")
        CTDHs.forEach(element => {
            render_product_for_import(JSON.parse(this.responseText), element)
        })

    }
    xhtml.open("GET", "/manage_product/product-data");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}

function get_product_forOne(ID) {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        var temp = document.getElementById(ID)

        render_product_for_import(JSON.parse(this.responseText), temp)
    }


    xhtml.open("GET", "/manage_product/product-data");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}

function render_product_for_import(data, target) {
    var product = target.querySelector(`#select-product`)
    var opt = `<option selected>Chọn Sản Phẩm</option>`
    data.forEach(element => {
        opt = opt + `<option value="${element.MaSP}">${element.TenSP} - ${element.MaSP}</option>`
    });
    product.innerHTML = opt
}

function import_goods() {
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
    let date = document.getElementById("NgayNhap").value
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        customer_view_order();
    }

    xhtml.open("POST", "/manage_product/import-goods");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`date=${date}&data=${data}`);

    return false;
}

function get_import_history() {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        render_import_history(JSON.parse(this.responseText))
    }


    xhtml.open("GET", "/manage_product/import-history-data");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}

function render_import_history(data) {
    var table = document.querySelector("#manager-import-history-table tbody");
    if (data.length <= 0) {
        table.innerHTML = "No result."
        return
    }
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.MaDonNhap}</h6>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${new Date(element.NgayNhap).toISOString().slice(0, 10)}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.TongTien}</h>
        </td>
        <td>
            <button type="button" class="btn-primary" onclick="get_import_history_detail('${element.MaDonNhap}');">
                <h6 style="margin:5px 0 0 0;color: cornsilk;">Chi tiết</h6>
            </button>
        </td>
    </tr>`
    });
    table.innerHTML = tr
}

function get_import_history_detail(MaDonNhap) {
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        render_import_history_detail(JSON.parse(this.responseText))
        section_show('manager-import-history-detail-section')

    }


    xhtml.open("POST", "/manage_product/view-import-history-detail-data");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send("MaDonNhap=" + MaDonNhap);
}

function render_import_history_detail(data) {
    var table = document.querySelector("#manager-import-history-detail-table tbody");
    if (data.length <= 0) {
        table.innerHTML = "No result."
        return
    }
    var tr = ``
    data.forEach(element => {
        tr = tr + `<tr>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.MaDonNhap}</h6>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.STT}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.MaSP}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.TenSP}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.SoLuong}</h>
        </td>
        <td>
            <h6 style="margin:5px 0 0 0;">${element.TongTien}</h>
        </td>

    </tr>`
    });
    table.innerHTML = tr
}