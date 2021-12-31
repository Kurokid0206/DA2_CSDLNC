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