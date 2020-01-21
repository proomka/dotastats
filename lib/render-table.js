const postgreSQL = require('../db/postgreSQL.js');
const render_icon = require('./render-icon.js');

function render_table(sql, eddit, table, data, doneT){
    const header = data.header;
    const formAdd = data.formAdd;
    const formEddit = data.formEddit;
    // data это обьект с параметрами header, formAdd, formEddit
    // в data.header хранится данные о заголовке, которые нужно отобразить, в место того что есть
    // добавить в отображения в место айди героя его изображение
    if (!eddit) {
        postgreSQL(sql, [], (res) => {
            let data_table = res;
            let html = `<input class="form-control" id="myInput" type="text" placeholder="Search.." style="width: 100%;">
                        <br>
                        <table id="table-id" class="table table-bordered table-striped table-dark">
                        <thead><tr>`;
            switch (table) {
                case 'hero':
                    html += `<th scope="col"></th>`;
                    break;
                default:

            }
            for (let i = 0; i < header.length; i++){
                html += `<th scope="col">${header[i]}</th>`;
            }
            html += `</tr></thead><tbody id="myTable">`;
            for (var i = 0; i < data_table.rows.length; i++) {
                html += `<tr>`;
                switch (table) {
                    case 'hero':
                        html += `<th>${ render_icon(data_table.rows[i]['hero_name']) }</th>`;
                        break;
                    default:

                }
                for (parm in data_table.rows[i]){
                    html += `<th>${data_table.rows[i][parm]}</th>`;
                }
                if (table == 'users') {
                    html += `<th>
                        <button class="button_pdf btn btn-link" type="button" name="button" OnClick="getPdf('${data_table.rows[i].nick_name}');">
                            Get
                        </button>
                    </th>`;
                } else if (table == 'hero') {
                    html += `<th>
                        <button class="button_pdf btn btn-link" type="button" name="button" OnClick="getPdf('${data_table.rows[i].hero_name}');">
                            Get
                        </button>
                    </th>`;
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
            let index = [];
            for (let item in header) {
                if (!formEddit.includes(header[item])){
                    index.push(header[item]);
                }
            }
            let html = `<input class="form-control" id="myInput" type="text" placeholder="Search.." style="width: 100%;">
                        <br>
                        <table id="table-id" class="table table-bordered table-striped table-dark">
                        <thead><tr>`;
            for (let i = 0; i < data_table.fields.length; i++){
                html += `<th scope="col">${header[i]}</th>`;
            }
            html += `<th scope="col">
                <button class="button_add btn btn-link" type="button" name="button" data-toggle="modal" data-target="#ModalCenterAdd">
                    Add
                </button>
            </th>
            <th scope="col">
            </th>`;
            html += `</tr></thead><tbody id="myTable">`;
            for (var i = 0; i < data_table.rows.length; i++) {
                html += `<tr>`;
                for (parm in data_table.rows[i]){
                    html += `<th>${data_table.rows[i][parm]}</th>`;
                }
                html += `<th>
                <button class="button_eddit btn btn-eddit" value="${data_table.rows[i]["steam_id"]}" type="button" name="button" data-toggle="modal" data-target="#ModalCenterEddit">
                    <img style="height:45px;width:45px; background-repeat: no-repeat; background-position: center; background-size: cover;"src="../img/pencil.png"></img>
                </button>
                </th>
                <th>
                    <form class="form-inline my-2 my-lg-0" action="/${table}/filter" method="post">`;

                for (let item in index) {
                    html += `<div class="form-group" style="display: none;">
                        <input type="search" class="form-control" aria-label="delete" name="${data_table.fields[item].name}" value="${data_table.rows[i][data_table.fields[item].name]}">
                    </div>`;
                }

                html += `<button class="btn btn-link my-2 my-sm-0" type="submit">
                            <img style="height:45px; width:45px; background-repeat: no-repeat;
                            background-position: center;
                            background-size: cover;" src="../img/trash.png"></img>
                        </button>
                    </form>
                </th>`;
                if (table == 'users'){
                    html += `<th>
                        <button class="button_pdf btn btn-link" type="button" name="button" OnClick="getNewData('${data_table.rows[i].nick_name}');">
                            New data
                        </button>
                    </th>`;
                }
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
            for (let item in index) {
                html += `           <div class="form-group">
                                        <label for="exampleInputEmail1">${index[item]}</label>
                                        <input type="text" class="form-control"  name="${index[item]}" placeholder="Enter ${index[item]}" value="123" readonly>
                                    </div>`;
            }
            if (formEddit != []) {
                for (var i = 0; i < formEddit.length; i++) {
                    html += `      <div class="form-group">
                                        <label for="exampleInputEmail1">${formEddit[i]}</label>
                                        <input type="text" class="form-control"  name="${formEddit[i]}" placeholder="Enter ${formEddit[i]}" required>
                                    </div>`;
                }
            } else if (formEddit == []) {
                for (let i = 1; i < data_table.fields.length; i++){
                    html +=            `<div class="form-group">
                                            <label for="exampleInputEmail1">${data_table.fields[i].name}</label>
                                            <input type="text" class="form-control"  name="${data_table.fields[i].name}" placeholder="Enter ${data_table.fields[i].name}" value="123" required>
                                        </div>`;
                }
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
