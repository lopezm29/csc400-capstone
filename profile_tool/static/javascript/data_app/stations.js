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
    $("#station_form").prop("hidden", false);
}


function hide_station_form()
{
    $("#station_form").prop("hidden", true);
    $("#station_name").val("");
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
            "distance" : $("distance").val(),       
            "z" : $("z").val(),       
            "comment" : $("comment").val(),       
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


window.onload = function(e){
    $('#station_table').DataTable({
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
                data:"section",
                title:"Comment",
                name:"section"
            },
            {
                data:"true_distance",
                title:"True Distance",
                name:"true_distance"
            },
            {
                data:"true_z",
                title:"True Elevation",
                name:"true_z"
            },
            // {
            //     data:"actions",
            //     title:"Actions",
            //     name:"actions"
            // }
        ],
        "columnDefs":[{
            "className": "dt-center",
            "targets": "_all"
        }],
        buttons:[
            // 'copy','csv','excel','pdf','print'
            {
                extend: "csv",
                className: "bg-primary border-primary mr-1 ml-1",
                title: "CSV"
            }
        ],
        // pageLength: 25,
        paging:false,
        ordering:true,
        // info:true,
        searching:true,
        select:true,
        responsive:true
    });

    populate_station_table();

}