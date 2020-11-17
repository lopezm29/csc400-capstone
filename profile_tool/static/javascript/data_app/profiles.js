function bind_row_select(table)
{
    $('#profile_table tbody').on('dblclick', 'tr', function () {
        var data = table.row( this ).data();
        window.location.href = "/surveys/" + $("#beach_id").val() + "/profiles/" + $("#survey_id").val() + "/stations/" + data["profile_id"];
    } );
}


function populate_profile_table()
{
    var table = $('#profile_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/populate_profile_table",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "survey_id":$("#survey_id").val()
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
                for(var key in data["profiles"])
                {
                    table.row.add(data["profiles"][key]);
                }
                table.draw();

                bind_row_select(table)
            }
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);
        }
    });
}


function show_profile_form()
{
    hide_edit_form();
    $("#profile_form").prop("hidden", false);
}


function hide_profile_form()
{
    $("#profile_form").prop("hidden", true);
    $("#elevation_control").val("");
    $("#profile_section").val("");
}


function show_edit_form()
{
    hide_profile_form();
    $("#edit_form").prop("hidden", false);
}


function hide_edit_form()
{
    $("#edit_form").prop("hidden", true);
    $("#edit_elevation_control").val("");
    $("#edit_section").val("");
}


function add_profile()
{
    var table = $('#profile_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/add_profile",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "survey_id" : $("#survey_id").val(),
            "section" : $("#section").val(),
            "elevation_control" : $("#elevation_control").val()
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
                for(var key in data["profiles"])
                {
                    table.row.add(data["profiles"][key]);
                }
                table.draw();

                bind_row_select(table);
            }

            hide_profile_form();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_profile_form();
        }
    });
}


function edit_profile()
{
    var table = $('#profile_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/edit_profile",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "survey_id" : $("#survey_id").val(),
            "profile_id" : $("#edit_id").val(),
            "section" : $("#edit_section").val(),
            "elevation_control" : $("#edit_elevation_control").val()
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
                for(var key in data["profiles"])
                {
                    table.row.add(data["profiles"][key]);
                }
                table.draw();

                bind_row_select(table);
            }

            hide_profile_form();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_profile_form();
        }
    });
}


function delete_profile(id)
{
    var table = $('#profile_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/delete_profile",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "survey_id" : $("#survey_id").val(),
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
                for(var key in data["profiles"])
                {
                    table.row.add(data["profiles"][key]);
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
    var profile_table = $('#profile_table').DataTable({
        data:[],
        columns: [
            {
                data:"profile_id",
                title:"ID",
                name:"profile_id"
            },
            {
                data:"section",
                title:"Section",
                name:"section"
            },
            {
                data:"elevation_control",
                title:"Elevation Control",
                name:"elevation_control"
            },
            {
                data:"width",
                title:"Width",
                name:"width"
            },
            {
                data:"volume",
                title:"Volume",
                name:"volume"
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
                title: $("#beach_name").val() + "_" + $("#survey_date").val() + "_profile_history",
                text: "Export to Excel"
            },
            {
                className: "bg-secondary border-primary text-light mr-1 ml-1",
                text: "Edit Selected",
                action: function()
                {
                    var row = profile_table.row( ".selected" ).data();
                    $("#edit_id").val(row["profile_id"]);
                    $("#edit_section").val(row["section"]);
                    $("#edit_elevation_control").val(row["elevation_control"]);
                    show_edit_form();
                }
            },
            {
                className: "bg-danger border-primary text-light mr-1 ml-1",
                text: "Delete Selected",
                action: function()
                {
                    var row = profile_table.row( ".selected" ).data();
                    delete_profile(row["profile_id"]);
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

    populate_profile_table();

}