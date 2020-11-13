function bind_row_select(table)
{
    $('#survey_table tbody').on('dblclick', 'tr', function () {
        var data = table.row( this ).data();
        // alert( 'You clicked on '+data['id']+'\'s row' );
        window.location.href = "/surveys/" + $("#beach_id").val() + "/profiles/" + data["survey_id"];
    } );
}


function populate_survey_table()
{
    var table = $('#survey_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/populate_survey_table",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "beach_id":$("#beach_id").val()
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
                for(var key in data["surveys"])
                {
                    table.row.add(data["surveys"][key]);
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


function show_survey_form()
{
    hide_edit_form();
    $("#survey_form").prop("hidden", false);
}


function hide_survey_form()
{
    $("#survey_form").prop("hidden", true);
    $("#start_date").val("");
    $("#elevation_control").val("");
    $("#mhhw").val("");
    $("#mllw").val("");
}


function show_edit_form()
{
    hide_survey_form();
    $("#edit_form").prop("hidden", false);
}


function hide_edit_form()
{
    $("#edit_form").prop("hidden", true);
    $("#edit_id").val("");
    $("#edit_start_date").val("");
    $("#edit_elevation_control").val("");
    $("#edit_mhhw").val("");
    $("#edit_mllw").val("");
}


function add_survey()
{
    var table = $('#survey_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/add_survey",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "beach_id" : $("#beach_id").val(),
            "start_date" : $("#start_date").val(),
            "elevation_control" : $("#elevation_control").val(),
            "mhhw" : $("#mhhw").val(),
            "mllw" : $("#mllw").val()          
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
                for(var key in data["surveys"])
                {
                    table.row.add(data["surveys"][key]);
                }
                table.draw();

                bind_row_select(table);
            }

            hide_survey_form();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_survey_form();
        }
    });
}


function edit_survey()
{
    var table = $('#survey_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/edit_survey",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "beach_id" : $("#beach_id").val(),
            "survey_id" : $("#edit_id").val(),
            "start_date" : $("#edit_start_date").val(),
            "elevation_control" : $("#edit_elevation_control").val(),
            "mhhw" : $("#edit_mhhw").val(),
            "mllw" : $("#edit_mllw").val()          
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
                for(var key in data["surveys"])
                {
                    table.row.add(data["surveys"][key]);
                }
                table.draw();

                bind_row_select(table);
            }

            hide_survey_form();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_survey_form();
        }
    });
}


function delete_survey(id)
{
    var table = $('#survey_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/delete_survey",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "beach_id" : $("#beach_id").val(),
            "id" : id
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
                for(var key in data["surveys"])
                {
                    table.row.add(data["surveys"][key]);
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



window.onload = function(e){
    var survey_table = $('#survey_table').DataTable({
        data:[],
        columns: [
            {
                data:"survey_id",
                title:"ID",
                name:"survey_id"
            },
            {
                data:"start_date",
                title:"Start Date",
                name:"start_date"
            },
            {
                data:"elevation_control",
                title:"Elevation Control",
                name:"elevation_control"
            },
            {
                data:"mhhw",
                title:"MHHW",
                name:"mhhw"
            },
            {
                data:"mllw",
                title:"MLLW",
                name:"mllw"
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
                title: "Export"
            },
            {
                className: "bg-secondary border-primary text-light mr-1 ml-1",
                text: "Edit Selected",
                action: function()
                {
                    var row = survey_table.row( ".selected" ).data();//{ selected: true } );
                    $("#edit_id").val(row["survey_id"]);
                    $("#edit_start_date").val(row["start_date"]);
                    $("#edit_elevation_control").val(row["elevation_control"]);
                    $("#edit_mhhw").val(row["mhhw"]);
                    $("#edit_mllw").val(row["mllw"]);
                    show_edit_form();
                }
            },
            {
                className: "bg-danger border-primary text-light mr-1 ml-1",
                text: "Delete Selected",
                action: function()
                {
                    var row = survey_table.row( ".selected" ).data();//{ selected: true } );
                    delete_survey(row["survey_id"]);
                    
                }
            }
        ],
        // pageLength: 25,
        paging:false,
        ordering:true,
        // info:true,
        searching:true,
        select:
        {
            style: 'single'
        },
        responsive:true,
        dom: "Blrtip"
    });

    populate_survey_table();

}