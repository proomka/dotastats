function getPdf(name) {
    var xhr = new XMLHttpRequest();
    var body = 'name=' + encodeURIComponent(name);
    console.log(body);
    xhr.open("post", '/post/pdf_file_hero/' + body, true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(e) {
        if (this.status == 200) {
            var blob = new Blob([this.response], {type: 'image/pdf'});
            let a = document.createElement("a");
            a.style = "display: none";
            document.body.appendChild(a);
            let url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = 'statistics.pdf';
            a.click();
            console.log('Download!');
            window.URL.revokeObjectURL(url);
        };
    };
    xhr.send(body);
}

function getNewData(name) {
    var xhr = new XMLHttpRequest();
    var body = 'name=' + name;
    xhr.open("post", '/post/new_data/' + body, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(e) {
        location.reload(true);
    };
    xhr.send(body);
}
