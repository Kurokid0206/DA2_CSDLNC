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


function driver_view_order(){
    let tbl = document.querySelector("#driver-order-table tbody")
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)
        dri_show('driver-order-section')
        tbl.innerHTML=render_order(JSON.parse(this.responseText))
    }

    xhtml.open("GET", "emp/get-order");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

    return false;
}

function dri_update_order(){

    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

    }

    xhtml.open("POST", "dri-update-order-stat");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
        <h6 style="margin:5px 0 0 0;">${order.MaDH}</h6>
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
        <button type="button" class="btn-primary" onclick="dri_recv_order('${order.MaDH}')" id="take-order-btn">
        <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Nhận đơn</h6>
        </button>
        </td>
        </tr>
        `
    })
    return tr
}

function dri_recv_order(MaDH){
    dri_confirm(MaDH,2);
    
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

        // input.value="";
        // var data=JSON.parse(this.responseText)
        // console.log(data)
        dri_show('driver-confirm-section')

    }

    xhtml.open("POST", "dri-recv-order");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send('MaDH='+MaDH);

    return false;
}


function dri_my_order(){
    dri_show('driver-confirm-section')
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
        `<tr><td scope="col"><h6 style="margin:5px 0 0 0;">${order.MaDH}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.HoTen}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.TongTien}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.DiaChiGiaoHang}</h6></td>
        <td scope="col">
        <button class="btn-primary" onclick="dri_confirm('${order.MaDH}',0)">
        <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Đã giao</h6></button></td></tr>`
    })
    return tr
}

function dri_confirm(MaDH,opt){
    //dri_show('driver-confirm-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {

    }

    xhtml.open("post", "dri-update-order-stat");
    xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send(`MaDH=${MaDH}`);

}

function dri_income(){
    dri_show('driver-salary-section')
    var xhtml = new XMLHttpRequest();
    xhtml.onload = function() {
        let data = JSON.parse(this.responseText)
        render_income(data)
    }

    xhtml.open("get", "dri_income");
    //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhtml.send();

}

function render_income(orders){
    var tr=``
    var tt=0
    orders.forEach(order=>{
        tr+=`<tr><td scope="col">
        <h6 style="margin:5px 0 0 0;">${order.MaDH}</h6></td>
        <td scope="col"><h6 style="margin:5px 0 0 0;">${order.DiaChiGiaoHang}</h6>
        </td>
        <td scope="col">
        <h6 style="margin:5px 0 0 0;">${(order.TongTien*0.05).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND</h6>
        </td>
        </tr>`
        tt+=order.TongTien*0.05
    })

    document.querySelector("#driver-salary-section tbody").innerHTML=tr
    document.getElementById("driver-salary-table").innerHTML= 
    `<tr><th scope="col" style="width: 400px;">
    <h4 style="margin:5px 0 0 0; margin-left: 138px; font-weight: bold;">Tổng tiền</h4>
    </th><th scope="col" style="width: 200px;">
    <h6 style="margin:5px 0 0 0; font-weight: bold;" id="total-salary">${(tt).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND</h6>
    </th></tr>`
}


