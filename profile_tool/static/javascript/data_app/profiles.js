function bind_row_select(table)
{
    $('#profile_table tbody').on('dblclick', 'tr', function () {
        var data = table.row( this ).data();
        // alert( 'You clicked on '+data['id']+'\'s row' );
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
    $("#profile_form").prop("hidden", false);
}


function hide_profile_form()
{
    $("#profile_form").prop("hidden", true);
    $("#profile_name").val("");
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


window.onload = function(e){
    $('#profile_table').DataTable({
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
                data:"width",
                title:"Width",
                name:"width"
            },
            {
                data:"volume",
                title:"Volume",
                name:"volume"
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
        select:
        {
            style: 'single'
        },
        responsive:true,
        dom: "Blrtip"
    });

    populate_profile_table();

}