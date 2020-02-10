//data
var realSalary = {features: [
  {
  state: 'New York',
  hourly: 42.90,
  annual: 89240
  },
  {
    state: 'Massachusetts',
    hourly: 42.56,
    annual: 88535
  },
  {
    state:'New Hampshire',
    hourly:41.75,
    annual:86627
  },
  {
    state:'Maryland',
    hourly:39.72,
    annual:82627
  },
  {
    state:'Nebraska',
    hourly:39.31,
    annual:81770
  },
  {
    state:'Hawaii',
    hourly:39.29,
    annual:81731
  },
  {
    state:'Vermont',
    hourly:39.29,
    annual:81738
  },
  {
    state:'Connecticut',
    hourly:39.24,
    annual:81621
  },
  {
    state:'Nevada',
    hourly:39.21,
    annual:81552
  },
  {
    state:'Alaska',
    hourly:39.21,
    annual:81552
  },
  {
    state:'Wyoming',
    hourly:39.21,
    annual:81552
  },
  {
    state:'Idaho',
    hourly:39.21,
    annual:81552
  },
  {
    state:'North Dakota',
    hourly:39.21,
    annual:81552
  },
  {
    state: 'Montana',
    hourly:39.21,
    annual:81552
  },
  {
    state:'Washington',
    hourly:39.01,
    annual:81149
  },
  {
    state:'California',
    hourly:38.64,
    annual:80372
  },
  {
    state:'Virginia',
    hourly:38.38,
    annual:79823
  },
  {
    state:'West Virginia',
    hourly:37.96,
    annual:78964
  },
  {
    state:'Rhode Island',
    hourly:37.90,
    annual:78827
  },
  {
    state:'New Jersey',
    hourly:37.51,
    annual:78028
  },
  {
    state:'Colorado',
    hourly:37.24,
    annual:77458
  },
  {
    state:'Pennsylvania',
    hourly:37.15,
    annual:77273
  },
  {
    state:'Arizona',
    hourly:37.14,
    annual:77245
  },
  {
    state:'Oregon',
    hourly:37.01,
    annual:76979
  },
  {
    state:'South Carolina',
    hourly: 36.97,
    annual:76897
  },
  {
    state:'South Dakota',
    hourly:36.91,
    annual:76771
  },
  {
    state:'Delaware',
    hourly:36.90,
    annual:76758
  },
  {
    state:'Tennessee',
    hourly:36.90,
    annual:76747
  },
  {
    state:'Minnesota',
    hourly:36.87,
    annual:76470
  },
  {
    state:'Utah',
    hourly:36.76,
    annual:76470
  },
  {
    state:'Kentucky',
    hourly:36.45,
    annual:75820
  },
  {
    state: 'Ohio',
    hourly: 36.39,
    annual:75684
  },
  {
    state:'Indiana',
    hourly:36.31,
    annual:75532
  },
  {
    state:'Oklahoma',
    hourly:36.24,
    annual:75380
  },
  {
    state:'Louisiana',
    hourly: 36.12,
    annual:75129
  },
  {
    state:'Kansas',
    hourly:36.07,
    annual:75027
  },
  {
    state:'Iowa',
    hourly:35.78,
    annual:74430
  },
  {
    state:'Wisconsin',
    hourly:35.70,
    annual:74266
  },
  {
    state:'Maine',
    hourly:35.57,
    annual:73979
  },
  {
    state:'Arkansas',
    hourly:35.32,
    annual:73413
  },
  {
    state:'Texas',
    hourly:35.29,
    annual:73413
  },
  {
    state:'Georgia',
    hourly:35.07,
    annual:72944
  },
  {
    state:'Alabama',
    hourly:35.02,
    annual:72838
  },
  {
    state:'New Mexico',
    hourly:34.72,
    annual:72216
  },
  {
    state:'Mississippi',
    hourly:34.38,
    annual:71502
  },
  {
    state:'Illinois',
    hourly:34.38,
    annual:71502
  },
  {
    state:'Michigan',
    hourly:34.36,
    annual:71472
  },
  {
    state:'Missouri',
    hourly:33.61,
    annual:69915
  },
  {
    state:'Florida',
    hourly:33.00,
    annual:68631
  },
  {
    state: 'North Carolina',
    hourly: 30.42,
    annual: 63266
  }
]};




//set up

var height = 700;
var width= 960;

var projection = d3.geoAlbers()
				   .translate([width/2, height/3]) 
           .scale([1000]);   
           
var path = d3.geoPath()
          .projection(projection);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
var div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity',0);
var g = svg.append('g');

//data

var toolTip = d3.select("body").append("div")
    .attr("class", "tooltip");


d3.json("../static/js/us-states.json", function(us) {  
    var features = us.features;
    features.forEach(element => {
      for (var i=0;i<realSalary.features.length; i++) {
        var obj = realSalary.features[i];
        var state = element.properties.NAME;
      if (state == obj.state) {
        element.properties.ANNUAL = obj.annual;
        element.properties.HOURLY = obj.hourly;
        console.log('match');
      };
    };
    })
  //build map
  g.selectAll('path')
    .data(features)
    .enter()
    .append('path')
    .attr('d', path)
    .style("stroke", "#000000")
  .style("stroke-width", "1")
	.style("fill", function(d) {
    var selStates = ["Mississippi", 'Alabama', 'Tennessee'];
    if (selStates.includes(d.properties.NAME)) {
      return "#bdb800";
    } if (d.properties.ANNUAL > 80000) {
      return "#99ccff";
    } if (d.properties.ANNUAL> 75000) {
      return "#b3d9ff";
    } if (d.properties.ANNUAL> 70000) {
      return "#cce6ff";
    } else {
      return "#e6f2ff";
    }
  })
  .on("mouseover", function(c) {
        div.transition()
        .style('display', 'block')
        div.html('<strong>' + c.properties.NAME + "</strong></br>Annual Salary: $" + c.properties.ANNUAL.toString().slice(0,2)+","+ c.properties.ANNUAL.toString().slice(2,6) + '</br>Hourly Salary: $'+ c.properties.HOURLY)
        .style("opacity", .9)
        .style("left", (d3.event.pageX) + "px")		
        .style("top", (d3.event.pageY - 28) + "px");	
      })
      .on("mouseout", function(c) {
        div.transition()
        .style('display', 'none')
        
      })
});
