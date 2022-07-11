
var delButton = document.querySelector(".del")
console.log("del")

let executeDelete = async()=>{
    var delId = delButton.dataset.delete
    const results = await fetch(`/rest/deleteRecord/${delId}`, {method:"DELETE"})
    const data  =await results.json()
    window.location.href=data.redirect

}
delButton.addEventListener("click", executeDelete)
