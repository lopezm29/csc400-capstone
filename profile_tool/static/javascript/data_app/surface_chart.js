function plot_surface_chart(survey_x_lists, survey_y_lists, survey_z_lists, mhhw_lists, mllw_lists, title)
{
    var survey_z = {
        // x:survey_x_lists, 
        // y:survey_y_lists, 
        z:survey_z_lists, 
        type:'surface'
    };

    var mhhw = {
        // x:survey_x_lists, 
        // y:survey_y_lists,
        z:mhhw_lists, 
        showscale:false, 
        opacity:0.9, 
        type:'surface'
    };

    var mllw = {
        // x:survey_x_lists, 
        // y:survey_y_lists,
        z:mllw_lists, 
        showscale:false, 
        opacity:0.9, 
        type:'surface'
    };

    var layout = {
        title: title,
        // autosize: true,
        // width: 500,
        // height: 500,
        margin: {
          l: 10,
          r: 10,
          b: 10,
          t: 30,
        },
        scene:
        {
            xaxis: 
            {
                // nticks: 5,
                // range: [0, 150],
                title: "Easting"
            },
            yaxis: 
            {
                // nticks: 5,
                // range: [0, 300],
                title: "Northing"
            },
            zaxis: 
               {
               nticks: 9,
            //    range: [-3, 3],
               title: "Elevation (m)"
            }
        }
        
    };

    Plotly.newPlot('surface_chart_div', [survey_z, mhhw, mllw], layout);
}
