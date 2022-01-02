var ids = [
  'Revenue-section',
  'number-section',
  'emp-eff-section',
  'discount-section',
  'Revenue-compare-section',
]
var glb_data = []
const page_max = 5
var called=false

function show(id) {
  glb_data = []
  ids.forEach((id) => {
    var div = document.querySelector('#' + id)
    div.style.display = 'none'
  })
  var div = document.querySelector('#' + id)
  div.style.display = 'flex'
}

function get_revenue() {
  let month = document.querySelector('#Revenue-section select').value
  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    glb_data = JSON.parse(this.responseText)
    document.querySelector('#Revenue-section .page-number').value = 1
    render_revenue()
    if(!called){get_total_rev() }
  }

  xhtml.open('post', 'manager/get-revenue')
  xhtml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhtml.send(`month=${month}`)
}

function render_revenue() {
  let data = glb_data
  let page = document.querySelector('#Revenue-section .page-number').value
  tr = ``
  for (var i = (page - 1) * page_max; i < page * page_max; i++) {
    try {
      let element = data[i]
      tr += `
    <tr>
      <td scope="col" style="width: 100px;">
          <h6 style="margin:5px 0 0 0;">${element.MaSP}</h6>
      </td>
      <td scope="col" style="width: 300px;">
          <h6 style="margin:5px 0 0 0;">${element.TenSP}</h6>
      </td>
      <td scope="col" style="width: 200px;">
          <h6 style="margin:5px 0 0 0;">`
            
      if(element.DoanhThu == null){tr+='0'}
      else{tr+=element.DoanhThu}
            tr+=`</h6>
      </td>
  </tr>`
    } catch (err) {
      break
    }
  }
  document.querySelector('#Revenue-section tbody').innerHTML = tr
}
function get_total_rev(){
  let data=glb_data
  sum=0
  data.forEach(element=>{
    sum+=element.DoanhThu
  })
  document.getElementById("Sum_Revenue").innerHTML=sum
}
function next(name) {
  let page = document.querySelector(`#${name} .page-number`)
  if (page.value < glb_data.length / page_max) {
    page.value++
  }
}

function prev(name) {
  let page = document.querySelector(`#${name} .page-number`)
  if (page.value >= 2) {
    page.value--
  }
}

function get_eff() {
  let month = document.querySelector('#emp-eff-section select').value
  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    document.querySelector('#emp-eff-section .page-number').value=1
    glb_data = JSON.parse(this.responseText)
    render_eff()

  }

  xhtml.open('post', 'manager/get-eff')
  xhtml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhtml.send(`month=${month}`)
}

function render_eff() {
   let data = glb_data

  if(data.length<1){
    document.querySelector('#emp-eff-section tbody').innerHTML =`
    <tr><td scope="col" >
    <h6 style="margin:5px 0 0 0;">No result</h6></td>`
    return
  }
  let page = document.querySelector('#emp-eff-section .page-number').value
  tr = ``
  for (var i = (page - 1) * page_max; i < page * page_max; i++) {
    try {
      let emp = data[i]
      tr += `<tr><td scope="col" >
    <h6 style="margin:5px 0 0 0;">${emp.MaNV}</h6></td>
    <td scope="col" >
    <h6 style="margin:5px 0 0 0;">${emp.TenNV}</h6></td>
    <td scope="col" >
    <h6 style="margin:5px 0 0 0;">${emp.MucTieu}</h6></td>
    <td scope="col">
    <h6 style="margin:5px 0 0 0;">${emp.HieuSuat}</h6></td></tr>`
    } catch (err) {
      break
    }
  }
  document.querySelector('#emp-eff-section tbody').innerHTML = tr
}

function get_discount() {
  show('discount-section')
  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    glb_data = JSON.parse(this.responseText)
    document.querySelector('#discount-section .page-number').value = 1
    render_discount()
    document.getElementById('btn-add-discount').style.display = 'inline-block'
  }

  xhtml.open('get', 'manager/get-discount')
  //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhtml.send()
}

function render_discount() {
  let data = glb_data
  let page = document.querySelector('#discount-section .page-number').value
  if (data.length < 1) {
    return `<tr><td scope="col">
        <h6 style="margin:5px 0 0 0;">No result</h6>
        </td><tr>`
  }
  tr = ``
  for (var i = (page - 1) * page_max; i < page * page_max; i++) {
    let discount = data[i]
    try {
      tr += `
        <tr><td scope="col">
        <h6 style="margin:5px 0 0 0;">${discount.MaGiamGia}</h6></td>`
      if (discount.LoaiGiamGia) {
        tr += `<td scope="col">
            <h6 style="margin:5px 0 0 0;">${discount.PhanTramGiam}%</h6></td>`
      } else {
        tr += `<td scope="col">
            <h6 style="margin:5px 0 0 0;">${discount.SoTienGiam.toFixed(
              0,
            ).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND</h6></td>`
      }

      tr += `<td scope="col" >
        <h6 style="margin:5px 0 0 0;">${new Date(discount.NgayHetHan)
          .toISOString()
          .slice(0, 10)}</h6></td></tr>`
    } catch (err) {
      break
    }
  }
  document.querySelector('#discount-table tbody').innerHTML = tr
}

function show_add_discount() {
  document.querySelector('#discount-section .error-message').style.display =
    'none'
  document.getElementById('btn-add-discount').style.display = 'none'
  document.querySelector(
    '#discount-table tbody',
  ).innerHTML += `<tr><td scope="col" >
    <input type="text" id="code"></td>
    <td scope="col" >
    <input type="text" id="discount"></td>                                            
    <td scope="col" >
    <input type="date" id="date" style="width: 300px;">
    <button type="button" style="width: 75px;" onclick="add_discount();">Thêm</button>
    <button type="button" style="width: 75px;" onclick="cancel_add_discount();">Hủy</button>
    </td></tr>`
}

function add_discount() {
  let code = document.querySelector('#code')
  let discount = document.querySelector('#discount')
  let date = document.querySelector('#date')

  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    let data = this.responseText

    if (data) {
      document.querySelector('#discount-section .error-message').style.display =
        'inline-block'
      document.querySelector(
        '#discount-section .error-message h6',
      ).innerHTML = data
    }
    get_discount()
  }

  xhtml.open('post', 'manager/add-discount')
  xhtml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhtml.send(`code=${code.value}&discount=${discount.value}&date=${date.value}`)
}

function cancel_add_discount() {
  document.getElementById('btn-add-discount').style.display = 'inline-block'
  let list = document.querySelector('#discount-table tbody')
  list.removeChild(list.lastChild)
}

function show_compare(section) {
  document.querySelector(`#${section} .btn`).style.display = 'none'

  document.querySelectorAll(`#${section} .compare`).forEach((element) => {
    element.style.display = 'table-cell'
  })
}

function compare() {
  data1 = []
  data2 = []
  for (var i = 0; i < 100; i++) {
    //do sth
  }
}
