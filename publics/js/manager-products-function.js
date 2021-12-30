var ids = ["new-order-section", "view-order-section", "view-order-detail-section"]

function cus_show(id) {

    ids.forEach(id => {
        var div = document.querySelector("#" + id);
        div.style.display = "none";
    })
    var div = document.querySelector("#" + id);
    div.style.display = "block";
}