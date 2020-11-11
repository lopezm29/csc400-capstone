function bind_row_select(table)
{
    $('#survey_table tbody').on('dblclick', 'tr', function () {
        var data = table.row( this ).data();
        // alert( 'You clicked on '+data['id']+'\'s row' );
        window.location.href = "/surveys/" + $("#beach_id").val() + "/profiles/" + data["id"];
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
    $("#survey_form").prop("hidden", false);
}


function hide_survey_form()
{
    $("#survey_form").prop("hidden", true);
    $("#survey_name").val("");
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



window.onload = function(e){
    $('#survey_table').DataTable({
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
            // 'copy','csv','excel','pdf','print'
            {
                extend: "csv",
                className: "bg-primary border-primary mr-1 ml-1",
                title: "Export"
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

    populate_survey_table();

}