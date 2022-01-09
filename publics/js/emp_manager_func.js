var ids = [
  'Revenue-section',
  'salary-section',
  'salary-detail-section',
  'Revenue-detail-section',
]

var glb_data = []
const page_max = 10

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
  show('Revenue-section')
  let month = document.querySelector('#Revenue-section #month').value
  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    glb_data = JSON.parse(this.responseText)
    document.querySelector('#Revenue-section .page-number').value = 1
    render_revenue()
  }

  xhtml.open('post', 'emp_manager/revenue')
  xhtml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhtml.send(`month=${month}`)
}

function render_revenue() {
  if (glb_data.length < 1) {
    document.querySelector(
      '#revenue-table tbody',
    ).innerHTML = `<tr><td>No result</td></tr>`
  }
  let data = glb_data
  let page = document.querySelector('#Revenue-section .page-number').value
  tr = ``
  for (var i = (page - 1) * page_max; i < page * page_max; i++) {
    try {
      let element = data[i]
      tr += `<tr>
        <td scope="col" style="width: 100px;">
            <h6 style="margin:5px 0 0 0;">${element.MaNV}</h6>
        </td>
        <td scope="col" style="width: 200px;">
            <h6 style="margin:5px 0 0 0;">${element.TenNV}</h6>
        </td>
        <td scope="col" style="width: 100px;">
            <h6 style="margin:5px 0 0 0;">${element.DoanhThu}</h6>
        </td>
        <td scope="col">
            <button type="button" class="btn-primary" onclick="get_revenue_detail('${element.MaNV}');">
                <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Xem chi tiết</h6>
            </button>
        </td>
    </tr>
    `
    } catch (err) {
      break
    }
  }
  document.querySelector('#revenue-table tbody').innerHTML = tr
}

function get_revenue_detail(MaNV) {
  document.querySelector('#Revenue-detail-section').style.display = 'flex'
  document.querySelector(
    '#Revenue-detail-section h3',
  ).innerText = `Doanh thu của nhân viên ${MaNV}`
  let month = document.querySelector('#Revenue-section #month').value
  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    let data = JSON.parse(this.responseText)
    console.log(data)
    document.querySelector(
      '#revenue-detail-table tbody',
    ).innerHTML = render_revenue_detail(data)
  }

  xhtml.open('post', 'emp_manager/revenue-detail')
  xhtml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhtml.send(`month=${month}&MaNV=${MaNV}`)
}

function render_revenue_detail(data) {
  if (data.length < 1) {
    return `<tr><td>No result</td></tr>`
  }
  var tr = ''

  data.forEach((emp) => {
    tr += `<tr>
        <td scope="col" style="width: 200px;">
        <h6 style="margin:5px 0 0 0;">${emp.MaHD}</h6>
        </td>
        <td scope="col" style="width: 200px;">
        <h6 style="margin:5px 0 0 0;">${new Date(emp.NgayLap)
          .toISOString()
          .slice(0, 10)}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${emp.TongTien}</h6>
        </td></tr>
        `
  })
  return tr
}

function get_emp_salary() {
  show('salary-section')
  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    glb_data = JSON.parse(this.responseText)
    render_salary();
  }

  xhtml.open('get', 'emp_manager/emp-salary')
  //xhtml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhtml.send()
}

function render_salary() {
  if (glb_data.length < 1) {
    document.querySelector(
      '#salary-table tbody',
    ).innerHTML = `<tr><td>No result</td></tr>`
  }
  let data = glb_data
  let page = document.querySelector('#salary-section .page-number').value
  tr = ``
  for (var i = (page - 1) * page_max; i < page * page_max; i++) {
    try {
      let element = data[i]
      tr += `<tr>
        <td scope="col" style="width: 200px;">
            <h6 style="margin:5px 0 0 0;">${element.MaNV}</h6>
        </td>
        <td scope="col" style="width: 200px;">
        <h6 style="margin:5px 0 0 0;">${element.TenNV}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.Luong}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.Thuong}</h6>
        </td>

        <td scope="col">
        <button type="button" class="btn-primary" onclick="salary_detail('${element.MaNV}')">
        <h6 style=" margin:5px 0 0 0; color: aliceblue; ">Xem chi tiết</h6>
        </button>
        </td>

    </tr>
    `
    } catch (err) {
      break
    }
  }
  document.querySelector('#salary-table tbody').innerHTML = tr
}

function salary_detail(MaNV) {
  show('salary-detail-section')
  document.querySelector(
    '#salary-detail-section h3',
  ).innerHTML = `Lịch sử lương của ${MaNV}`

  var xhtml = new XMLHttpRequest()
  xhtml.onload = function () {
    let data = JSON.parse(this.responseText)
    document.querySelector(
      '#salary-detail-table tbody',
    ).innerHTML = render_salary_detail(data)
  }

  xhtml.open('post', 'emp_manager/emp-salary-detail')
  xhtml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhtml.send('MaNV=' + MaNV)
}

function render_salary_detail(data) {
  if (data.length < 1) {
    return `<tr><td>No result</td></tr>`
  }
  var tr = ''
  data.forEach((element) => {
    tr += `
        <tr>
        <td scope="col" style="width: 200px;">
        <h6 style="margin:5px 0 0 0;">${new Date(element.NgayPhatLuong)
          .toISOString()
          .slice(0, 10)}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.Luong}</h6>
        </td>
        <td scope="col" style="width: 100px;">
        <h6 style="margin:5px 0 0 0;">${element.Thuong}</h6>
        </td>
        </tr>`
  })
  return tr
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
