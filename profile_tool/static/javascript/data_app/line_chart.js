function plot_line_chart(profile_distance_list, profile_z_list, section, title, mhhw, mllw, waterline_z)
{
    profile_trace = create_line_chart(profile_distance_list, profile_z_list, section);
    layout = create_layout(title, mhhw, mllw, waterline_z);
    Plotly.newPlot('line_chart_div', [profile_trace], layout);
}


function create_line_chart(profile_distance_list, profile_z_list, section)
{
    var profile_trace = {
        x: profile_distance_list,
        y: profile_z_list,
        mode: 'lines+markers',
        marker: 
        {
            color: 'rgb(255, 165, 0)',
            size: 8
        },
        line: {
            color: 'rgb(255, 165, 0)',
            width: 4
        },
        name: 'Section ' + section
    };

    return profile_trace;
}


function create_layout(title, mhhw, mllw, waterline_z)
{
    var layout = {
        title:title,
        shapes: [
            {
                type: 'line',
                xref: 'paper',
                x0: 0,
                y0: mhhw,
                x1: 1,
                y1: mhhw,
                line:
                {
                    color: 'rgb(255, 0, 0)',
                    width: 4,
                    dash:'dot'
                }
            },
            {
                type: 'line',
                xref: 'paper',
                x0: 0,
                y0: mllw,
                x1: 1,
                y1: mllw,
                line:
                {
                    color: 'rgb(0, 255, 0)',
                    width: 4,
                    dash:'dot'
                }
            },
            {
                type: 'line',
                xref: 'paper',
                x0: 0,
                y0: waterline_z,
                x1: 1,
                y1: waterline_z,
                line:
                {
                    color: 'rgb(0, 0, 255)',
                    width: 4,
                    dash:'dot'
                }
            }
        ]
    };

    return layout;
}
