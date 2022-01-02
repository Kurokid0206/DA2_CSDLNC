var ids = [
  'Revenue-section',
  'dddd-section',
  'emp-eff-section',
  'discount-section',
  'Revenue-compare-section',
]
var glb_data = []

function show(id) {
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
    render_revenue(glb_data)
  }

  xhtml.open('get', 'manager/get-revenue')
  xhtml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhtml.send(`month=${month}`)
}

function render_revenue(data) {
  show('Revenue-section');
  let page = document.querySelector('#Revenue-section .page-number').value
  tr = ``
  for (var i = (page - 1) * 2; i < page * 2; i++) {//need replace

    // if(i>=data.length){break;}
    try {
      tr += `
    <tr>
      <td scope="col" style="width: 100px;">
          <h6 style="margin:5px 0 0 0;">${data[i].MaSP}</h6>
      </td>
      <td scope="col" style="width: 300px;">
          <h6 style="margin:5px 0 0 0;">${data[i].TenSP}</h6>
      </td>
      <td scope="col" style="width: 200px;">
          <h6 style="margin:5px 0 0 0;">${data[i].DoanhThu}</h6>
      </td>
  </tr>`
    } catch (err) {
      break
    }
  }
  document.querySelector('#Revenue-section tbody').innerHTML = tr
}

function next(name) {
  let page = document.querySelector(`#${name} .page-number`)
  //console.log(glb_data.length/100)
  if(page.value<glb_data.length/2){//(glb_data.length/100)){
    page.value++
    render_revenue(glb_data)
  }
  
}
function prev(name) {

  let page = document.querySelector(`#${name} .page-number`)
  if(page.value>=2){
    page.value--
    render_revenue(glb_data)
  }
  
}
function get_discount() {
  show('discount-section')
  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    let data = JSON.parse(this.responseText)
    test = data
    document.querySelector('#discount-table tbody').innerHTML = render_discount(
      data,
    )
    document.getElementById('btn-add-discount').style.display = 'inline-block'
  }

  xhtml.open('get', 'manager/get-discount')
  //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhtml.send()
}
function render_discount(data) {
  if (data.length < 1) {
    return `<tr><td scope="col">
        <h6 style="margin:5px 0 0 0;">No result</h6>
        </td><tr>`
  }
  tr = ``
  data.forEach((discount) => {
    tr += `
        <tr><td scope="col">
        <h6 style="margin:5px 0 0 0;">${discount.MaGiamGia}</h6></td>`
    if (discount.LoaiGiamGia == '0') {
      tr += `<td scope="col">
            <h6 style="margin:5px 0 0 0;">${discount.SoTienGiam.toFixed(
              0,
            ).replace(/\d(?=(\d{3})+\.)/g, '$&,')} VND</h6></td>`
    } else {
      tr += `<td scope="col">
            <h6 style="margin:5px 0 0 0;">${discount.PhanTramGiam}%</h6></td>`
    }

    tr += `<td scope="col" >
        <h6 style="margin:5px 0 0 0;">${new Date(discount.NgayHetHan)
          .toISOString()
          .slice(0, 10)}</h6></td></tr>`
  })
  return tr
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
