const postgreSQL = require('../db/postgreSQL.js');

function render_table(sql, table, data, doneT){
    const header = data.header;
    const formAdd = data.formAdd;
    const formEddit = data.formEddit;
    // data это обьект с параметрами header, formAdd, formEddit
    // в data.header хранится данные о заголовке, которые нужно отобразить, в место того что есть
    // добавить в отображения в место айди героя его изображение
    if (sql) {
        postgreSQL(sql, [], (res) => {
            let data_table = res;

            let html = `<input class="form-control" id="myInput" type="text" placeholder="Search.." style="width: 100%;">
                        <br>
                        <table id="table-id" class="table table-bordered table-striped table-dark">
                        <thead><tr>`;
            for (let i = 0; i < data_table.fields.length; i++){
                html += `<th scope="col">${data_table.fields[i].name}</th>`;
            }
            html += `</tr></thead><tbody id="myTable">`;
            for (var i = 0; i < data_table.rows.length; i++) {
                html += `<tr>`;
                for (parm in data_table.rows[i]){
                    html += `<th>${data_table.rows[i][parm]}</th>`;
                }
                html += `</tr>`;
            }
            html += `</tr></tbody></table>`;

            return doneT(html);
        });
    } else {
        sql = 'SELECT * FROM ' + table + ';';
        postgreSQL(sql, [], (res) => {
            let data_table = res;

            let html = `<input class="form-control" id="myInput" type="text" placeholder="Search.." style="width: 100%;">
                        <br>
                        <table id="table-id" class="table table-bordered table-striped table-dark">
                        <thead><tr>`;
            for (let i = 0; i < data_table.fields.length; i++){
                html += `<th scope="col">${data_table.fields[i].name}</th>`;
            }
            html += `<th scope="col">
                <button class="button_add btn btn-link" type="button" name="button" data-toggle="modal" data-target="#ModalCenterAdd">
                    Add
                </button>
            </th>`;
            html += `</tr></thead><tbody id="myTable">`;
            for (var i = 0; i < data_table.rows.length; i++) {
                html += `<tr>`;
                for (parm in data_table.rows[i]){
                    html += `<th>${data_table.rows[i][parm]}</th>`;
                }
                html += `<th>
                    <button class="button_eddit btn btn-link" value="${data_table.rows[i]["steam_id"]}" type="button" name="button" data-toggle="modal" data-target="#ModalCenterEddit">eddit</button>
                </th>
                <th>
                    <form class="form-inline my-2 my-lg-0" action="/${table}/filter" method="post">
                        <div class="form-group" style="display: none;">
                            <input type="search" class="form-control" aria-label="delete" name="delete" value="${data_table.rows[i]["steam_id"]}">
                        </div>
                        <button class="btn btn-link my-2 my-sm-0" type="submit">Delete</button>
                    </form>
                </th>
                </tr>`;
            }
            html += `</tr></tbody></table>
            <div class="modal fade" id="ModalCenterEddit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content bg-dark text-white">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLongTitleAdd">Eddit item</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form class="form-eddit" action="/${table}/eddit" method="post">`;
                html += `           <div class="form-group">
                                        <label for="exampleInputEmail1">${data_table.fields[0].name}</label>
                                        <input type="text" class="form-control"  name="${data_table.fields[0].name}" placeholder="Enter ${data_table.fields[0].name}" value="123" readonly>
                                    </div>`;

            for (let i = 1; i < data_table.fields.length; i++){
                html +=            `<div class="form-group">
                                        <label for="exampleInputEmail1">${data_table.fields[i].name}</label>
                                        <input type="text" class="form-control"  name="${data_table.fields[i].name}" placeholder="Enter ${data_table.fields[i].name}" value="123" required>
                                    </div>`;
            }


            html +=            `<button type="submit" class="btn btn-primary">Submit</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalCenterAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content bg-dark text-white">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalLongTitleAdd">Add new item</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form action="/${table}/add" method="post">`;
            if (formAdd != []) {
                for (var i = 0; i < formAdd.length; i++) {
                    html += `      <div class="form-group">
                                        <label for="exampleInputEmail1">${formAdd[i]}</label>
                                        <input type="text" class="form-control"  name="${formAdd[i]}" placeholder="Enter ${formAdd[i]}" required>
                                    </div>`;
                }
            } else if (formAdd == []) {
                for (var i = 1; i < data_table.fields.length; i++) {
                    html += `      <div class="form-group">
                                        <label for="exampleInputEmail1">${data_table.fields[i].name}</label>
                                        <input type="text" class="form-control"  name="${data_table.fields[i].name}" placeholder="Enter ${data_table.fields[i].name}" required>
                                    </div>`;
                }
            }

            html += `           <button type="submit" class="btn btn-primary">Submit</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div> `;

            return doneT(html);
        });
    }
}

module.exports = render_table;
