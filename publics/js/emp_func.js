var ids =[
    "receive-order-section",
    "received-order-section",
    "delivered-order-section",
    "salary-section"
]
function show(id){
    ids.forEach(id=>{
        var div = document.querySelector("#"+id);
        div.style.display = "none";
    })
    var div = document.querySelector("#"+id);
        div.style.display = "flex";
}


function view_order(){
    let tbl = document.querySelector("#driver-order-table tbody")
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)
        show('receive-order-section')
        tbl.innerHTML=render_order(JSON.parse(this.responseText))
    }

    xhtml.open("GET", "emp/get-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function render_order(orders){
    if(orders.length<1){
       return  'No result'
    }
    
    var tr=''
    orders.forEach(order=>{
        tr=tr+`
        <tr>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${order.MaHD}</h6>
        </td>
        <td scope="col" style="width: 300px;">
        <h6 style="margin:5px 0 0 0;">${order.TenNguoiNhan}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${order.TongTien}</h6>
        </td>
        <td scope="col" style="width: 300px;">
        <h6 style="margin:5px 0 0 0;">${order.DiaChiGiaoHang}</h6>
        </td>
        <td scope="col">
        <button type="button" class="btn-primary" onclick="recv_order('${order.MaHD}')" id="take-order-btn">
        <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Nhận đơn</h6>
        </button>
        </td>
        </tr>
        `
    })
    return tr
}

function recv_order(MaHD){
    
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)
        show('received-order-section')

    }

    xhtml.open("POST", "emp/recv-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send('MaHD='+MaHD);

    return false;
}


function my_order(){
    show('driver-confirm-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        let orders = JSON.parse(this.responseText)
        document.querySelector("#driver-confirm-section tbody").innerHTML
        =render_my_order(orders)

    }

    xhtml.open("get", "dri-my-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();
}


function render_my_order(orders){
    if(orders.length<1){
        return  'No result'
     }
    tr=``
    orders.forEach(order=>{
        tr+=
        `<tr><td scope="col"><h6 style="margin:5px 0 0 0;">${order.MaHD}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.HoTen}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.TongTien}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.DiaChiGiaoHang}</h6></td>
        <td scope="col">
        <button class="btn-primary" onclick="confirm('${order.MaHD}',0)">
        <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Đã giao</h6></button></td></tr>`
    })
    return tr
}

function confirm(MaHD,opt){
    //show('driver-confirm-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

    }

    xhtml.open("post", "dri-update-order-stat");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`MaHD=${MaHD}`);

}

function income(){
    show('salary-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        let data = JSON.parse(this.responseText)
        render_income(data)
    }

    xhtml.open("get", "emp/get-salary");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

}


function render_income(orders){
    var tr=``

    orders.forEach(order=>{
        tr+=`<tr><td scope="col">
        <h6 style="margin:5px 0 0 0;">${new Date(order.NgayPhatLuong).toISOString().slice(0, 10)}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.Luong}</h6>
        </td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.Thuong}</h6>
        </td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.Luong+order.Thuong}</h6>
        </td>
        </tr>`
    })

    document.querySelector("#salary-section tbody").innerHTML=tr

}


