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
