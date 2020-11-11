function bind_row_select(table)
{
    $('#beach_table tbody').on('dblclick', 'tr', function () {
        var data = table.row( this ).data();
        // alert( 'You clicked on '+data['id']+'\'s row' );
        window.location.href = "/surveys/" + data["id"];
    } );
}


function populate_beach_table()
{
    var table = $('#beach_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/populate_beach_table",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken
        },
        beforeSend: function()
        {
            table.clear();
        },
        success: function(data)
        {
            console.log(data);

            if(data["result"])
            {
                for(var key in data["beaches"])
                {
                    table.row.add(data["beaches"][key]);
                }
                table.draw();

                bind_row_select(table);
            }
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);
        }
    });
}


function show_beach_form()
{
    hide_edit_form();
    $("#beach_form").prop("hidden", false);
}


function hide_beach_form()
{
    $("#beach_form").prop("hidden", true);
    $("#beach_name").val("");
}


function show_edit_form()
{
    hide_beach_form();
    $("#edit_form").prop("hidden", false);
}


function hide_edit_form()
{
    $("#edit_form").prop("hidden", true);
    $("#edit_id").val("");
    $("#edit_name").val("");
}


function add_beach()
{
    var table = $('#beach_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/add_beach",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "name" : $("#beach_name").val()
        },
        beforeSend: function()
        {
            show_loading_modal();
            table.clear();
        },
        success: function(data)
        {
            console.log(data);

            if(data["result"])
            {
                for(var key in data["beaches"])
                {
                    table.row.add(data["beaches"][key]);
                }
                table.draw();

                bind_row_select(table);
            }

            hide_beach_form();
            hide_loading_modal();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_beach_form();
            hide_loading_modal();
        }
    });
}


function edit_beach()
{
    var table = $('#beach_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/edit_beach",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "id" : $("#edit_id").val(),
            "name" : $("#edit_name").val()
        },
        beforeSend: function()
        {
            show_loading_modal();
            table.clear();
        },
        success: function(data)
        {
            console.log(data);

            if(data["result"])
            {
                for(var key in data["beaches"])
                {
                    table.row.add(data["beaches"][key]);
                }
                table.draw();

                bind_row_select(table);
                
            }

            hide_beach_form();
            hide_loading_modal();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_beach_form();
            hide_loading_modal();
        }
    });
}


function delete_beach(id)
{
    var table = $('#beach_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/delete_beach",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "id" : id
        },
        beforeSend: function()
        {
            show_loading_modal();
            table.clear();
        },
        success: function(data)
        {
            console.log(data);

            if(data["result"])
            {
                for(var key in data["beaches"])
                {
                    table.row.add(data["beaches"][key]);
                }
                table.draw();

                bind_row_select(table);
            }
            console.log("ready to hide");
            hide_loading_modal();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_loading_modal();
        }
    });
}


window.onload = function(e){

    var beach_table = $('#beach_table').DataTable({
        data:[],
        columns: [
            {
                data:"id",
                title:"ID",
                name:"id"
            },
            {
                data:"name",
                title:"Beach Name",
                name:"name"
            },
        ],
        "columnDefs":[{
            "className": "dt-center",
            "targets": "_all"
        }],
        buttons:[
            {
                extend: "csv",
                className: "bg-primary border-primary text-light mr-1 ml-1",
                title: "beach_history",
                text: "Export to Excel",
            },
            {
                className: "bg-secondary border-primary text-light mr-1 ml-1",
                text: "Edit Selected",
                action: function()
                {
                    var row = beach_table.row( ".selected" ).data();//{ selected: true } );
                    $("#edit_id").val(row["id"]);
                    $("#edit_name").val(row["name"]);
                    show_edit_form();
                }
            },
            {
                className: "bg-danger border-primary text-light mr-1 ml-1",
                text: "Delete Selected",
                action: function()
                {
                    var row = beach_table.row( ".selected" ).data();//{ selected: true } );
                    delete_beach(row["id"]);
                }
            }
        ],
        // pageLength: 25,
        paging:false,
        ordering:true,
        // info:true,
        searching:true,
        select:true,
        responsive:true,
        dom: "Blrtip"
    });

    populate_beach_table();

}