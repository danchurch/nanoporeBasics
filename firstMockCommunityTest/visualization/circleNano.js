window.addEventListener('load', main);

function main(){
  d3.csv("noFours.csv",d3.autoType).then(data => {  
    //console.log(data);
    // we want to group by genus and epithet
    // each bubble should be scaled by it's children 
    // each genus by the epithet bubbles in them
    // each epithet by the cluster bubbles in them
    // each cluster scaled by its read number

    //var groups = d3.rollup(data, v => v.length, d => d.genus, d => d.epithet);
    //function sumReads(group) { d => d3.sum(group, d => d.reads)};
    //var groups = d3.rollup(data, sumReads, d => d.genus, d => d.epithet);

    function sumWorldwideGross(group) {
      return d3.sum(group, function(d) {
        return d.reads;
      });
    }

    var groups = d3.rollup(data, sumWorldwideGross, d => d.genus, d => d.epithet);


    var root = d3.hierarchy(groups);
    var packLayout = d3.pack();

    console.log(root);

    packLayout.size([300,300]);

    root.sum(d => d[1]);
    packLayout(root);

    svgCircsGr = d3.select('#plot')
      .append('svg')
      .append('g')
        .attr('id','circs');


  svgCircsGr.selectAll('circle')
    .data(root.descendants())
    .join('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', function(d) { return d.r; })

})}
