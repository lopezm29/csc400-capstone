function plot_surface_chart(survey_z_lists, mhhw_lists, mllw_lists, waterline_z_lists)
{
    var survey_z = {z:survey_z_lists ,type:'surface'}
    var mhhw = {z:mhhw_lists ,showscale:false, opacity:0.6, type:'surface'}
    var mllw = {z:mllw_lists ,showscale:false, opacity:0.6, type:'surface'}
    var waterline_z = {z:waterline_z_lists ,showscale:false, opacity:0.6, type:'surface'}

    Plotly.newPlot('surface_chart_div', [survey_z, mhhw, mllw, waterline_z]);
}
