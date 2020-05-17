var img = document.getElementById("img");
var p = document.getElementById("parag");

document.getElementById("img-file").onchange = function (e) {
    var imgFile = e.target.files[0];
    form = new FormData();
    form.append("img", imgFile);
    var ajax = new XMLHttpRequest();

    ajax.open("POST", "receber.php");

    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200){
            console.log(ajax.responseText);
            img.src = ajax.responseText;
            p.innerText = ajax.responseText.slice(10);
        }
    };
    ajax.send(form);

};