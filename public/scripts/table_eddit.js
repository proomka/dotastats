$(document).ready(function(){
    $(".button_eddit").on('click', function(event) {
        event.preventDefault();
        let indexBlock = $(".button_eddit").index(this);
        let tdList = $("#myTable").children()[indexBlock].children;
        let dataInTable = [];
        for (let i = 0; i < tdList.length-1; i++){
            dataInTable.push(tdList[i].childNodes[0].data);
        }
        let formEddit = $(".form-eddit").children();
        for (var i = 0; i < formEddit.length-2; i++) {
            formEddit[i].children[1].value = dataInTable[i];
        }
    });
});
