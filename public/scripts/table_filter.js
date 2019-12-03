$(document).ready(function(){
    $(".myCheckButton").on("click", function() {
        const checkBox = $(".myCheckBox");
        let values = [];
        for (var i = 0; i < checkBox.length; i++) {
            if (checkBox[i].checked) {
                values.push(checkBox[i].defaultValue);
            }
        }
        console.log(values);
        let table = $("#myTable")[0].children;
        let check = false;
        for (var i = 0; i < table.length; i++) {
            table[i].style.display = '';
        }
        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table[i].children.length; j++) {
                for (var k = 0; k < values.length; k++) {
                    if (table[i].children[j].innerHTML == values[k]) {
                        check = true;
                    }
                }
            }
            if (!check) {
                table[i].style.display = 'none';
            }
            check = false;
        }
    });
});
