function populate_station_table()
{
    var table = $('#station_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/populate_station_table",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "profile_id":$("#profile_id").val()
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
                for(var key in data["stations"])
                {
                    table.row.add(data["stations"][key]);
                }
                table.draw();
            }
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);
        }
    });
}


function show_station_form()
{
    hide_edit_form();
    $("#station_form").prop("hidden", false);
}


function hide_station_form()
{
    $("#station_form").prop("hidden", true);
    $("#number").val("");    
    $("#distance").val("");
    $("#z").val("");
    $("#comment").val("");

}


function show_edit_form()
{
    hide_station_form();
    $("#edit_form").prop("hidden", false);
}


function hide_edit_form()
{
    $("#edit_form").prop("hidden", true);
    $("#edit_number").val("");
    $("#edit_id").val("");     
    $("#edit_distance").val("");
    $("#edit_z").val("");
    $("#edit_comment").val("");

}


function add_station()
{
    var table = $('#station_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/add_station",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "profile_id" : $("#profile_id").val(),
            "number" : $("#number").val(),  
            "distance" : $("#distance").val(),       
            "z" : $("#z").val(),       
            "comment" : $("#comment").val(),       
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
                for(var key in data["stations"])
                {
                    table.row.add(data["stations"][key]);
                }
                table.draw();

                bind_row_select(table);
            }

            hide_station_form();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_station_form();
        }
    });
}


function edit_station()
{
    var table = $('#station_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/edit_station",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "profile_id" : $("#profile_id").val(),
            "station_id" : $("#edit_id").val(),
            "number" : $("#edit_number").val(),  
            "distance" : $("#edit_distance").val(),       
            "z" : $("#edit_z").val(),       
            "comment" : $("#edit_comment").val(),       
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
                for(var key in data["stations"])
                {
                    table.row.add(data["stations"][key]);
                }
                table.draw();

                bind_row_select(table);
            }

            hide_station_form();
        },
        error: function(error_data)
        {
            console.log("error");
            console.log(error_data);

            hide_station_form();
        }
    });
}


function delete_station(id)
{
    var table = $('#station_table').DataTable();
    $.ajax({
        method: "POST",
        url: "/delete_station",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "profile_id" : $("#profile_id").val(),
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
                for(var key in data["stations"])
                {
                    table.row.add(data["stations"][key]);
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


function generate_line_chart()
{
    $.ajax({
        method: "POST",
        url: "/populate_station_table",
        dataType: "json",
        data: 
        {
            "csrfmiddlewaretoken" : csrftoken,
            "profile_id" : $("#profile_id").val(),
        },
        success: function(data)
        {
            console.log(data);

            if(data["result"])
            {
                profile_distance_list = [];
                profile_z_list = [];
                waterline_z = 0.0;

                for(var key in data["stations"])
                {
                    profile_distance_list.push(parseFloat(data["stations"][key]["distance"]));
                    profile_z_list.push(parseFloat(data["stations"][key]["z"]));
                    if("W.L." == data["stations"][key]["comment"])
                    {
                        waterline_z = parseFloat(data["stations"][key]["z"]);
                    }
                }

                plot_line_chart(
                    profile_distance_list=profile_distance_list,
                    profile_z_list=profile_z_list,
                    title=$("#beach_name").val() + " " + $("#survey_date").val() + " " + $("#profile_section").val(),
                    mhhw=$("#survey_mhhw").val(),
                    mllw=$("#survey_mllw").val(),
                    waterline_z=waterline_z
                );

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
    var station_table = $('#station_table').DataTable({
        data:[],
        columns: [
            {
                data:"station_id",
                title:"ID",
                name:"station_id"
            },
            {
                data:"number",
                title:"Number",
                name:"number"
            },
            {
                data:"distance",
                title:"Distance",
                name:"distance"
            },
            {
                data:"z",
                title:"Elevation",
                name:"z"
            },
            {
                data:"comment",
                title:"Comment",
                name:"comment"
            },
            // {
            //     data:"true_distance",
            //     title:"True Distance",
            //     name:"true_distance"
            // },
            // {
            //     data:"true_z",
            //     title:"True Elevation",
            //     name:"true_z"
            // },
        ],
        "columnDefs":[{
            "className": "dt-center",
            "targets": "_all"
        }],
        buttons:[
            {
                extend: "csv",
                className: "bg-primary text-light mr-1 ml-1",
                title: $("#beach_name").val() + "_" + $("#survey_date").val() + "_" + $("#profile_section").val() + "_station_data",
                text: "Export to Excel",
            },
            {
                className: "bg-info text-light mr-1 ml-1",
                text: "Make Chart",
                action: function()
                {
                    generate_line_chart();
                }
            },
            {
                className: "bg-success text-light mr-1 ml-1",
                text: "Add New",
                action: function()
                {
                    show_station_form();
                }
            },
            {
                className: "bg-secondary text-light mr-1 ml-1",
                text: "Edit Selected",
                action: function()
                {
                    var row = station_table.row( ".selected" ).data();
                    $("#edit_id").val(row["station_id"]);
                    $("#edit_number").val(row["number"]);
                    $("#edit_distance").val(row["distance"]);
                    $("#edit_z").val(row["z"]);
                    $("#edit_comment").val(row["comment"]);
                    show_edit_form();
                }
            },
            {
                className: "bg-danger text-light mr-1 ml-1",
                text: "Delete Selected",
                action: function()
                {
                    var row = station_table.row( ".selected" ).data();
                    delete_station(row["station_id"]);
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

    populate_station_table();

}