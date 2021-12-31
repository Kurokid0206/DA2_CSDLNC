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
        console.log(this.responseText)

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
    get_product(`CTDH${CTDHs.length}`)

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
        console.log(this.responseText)
        section_show('manager-products-section');
        get_product_for_manage();

    }

    xhtml.open("POST", "/manage_product/insert-product");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`TenSP=${TenSP}&MauSac=${MauSac}&ChuDe=${ChuDe}&GiaBan=${GiaBan}&SLTon=${SLTon}`);
}