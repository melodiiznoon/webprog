var source;
var rgb1, rgb2, red1, red2;
var r1=[],g1=[],b1=[],a1=[];
var r2=[],g2=[],b2=[],a2=[];
var red1;
var points = [120, 100, 200, 5, 25, 10];
$(document).ready(function(){
	
	
	$("#btn-dtw").click(dtw);
	$("#btn-eu").click(eu);
	$("#btn-r").click(showRed);
	$("#btn-g").click(showGreen);
	$("#btn-b").click(showBlue);
	$("#result").hide();
	$("#img1").hide();
	$("#img2").hide();
	$("#green").hide();
	$("#blue").hide();
	$("#cv1").hide();
	$("#cv2").hide();

	$(function () {
	    $("#in-img1:file").change(function () {
	        if (this.files && this.files[0]) {
	            var reader = new FileReader();
	            reader.onload = imageIsLoaded1;
	            reader.readAsDataURL(this.files[0]);
	        }
	    });
	});

	$(function () {
	    $("#in-img2:file").change(function () {
	        if (this.files && this.files[0]) {
	            var reader = new FileReader();
	            reader.onload = imageIsLoaded2;
	            reader.readAsDataURL(this.files[0]);
	        }
	    });
	});
});

function showRed(e) {
	$("#red").show();
	$("#green").hide();
	$("#blue").hide();
};

function showGreen(e) {
	$("#red").hide();
	$("#green").show();
	$("#blue").hide();
};

function showBlue(e) {
	$("#red").hide();
	$("#green").hide();
	$("#blue").show();
};

function imageIsLoaded1(e) {
    $('#img1').attr('src', e.target.result);
    $('#img11').attr('src', e.target.result);
    $("#img1").show();

};

function imageIsLoaded2(e) {
    $('#img2').attr('src', e.target.result);
    $('#img22').attr('src', e.target.result);
    $("#img2").show();
    
};


function dtw(e){
	$("#func").hide();
	getRGB1();
	getRGB2();
	drawGraph();
	$("#result").show();
};

function eu(){

};

function getRGB1(e){
	var c = document.getElementById("cv1");
    var ctx=c.getContext("2d");
    var img = document.getElementById("img1");
    
    var w = img.width;
    var h = img.height;
    c.width = w;
    c.height = h;
	ctx.drawImage(img, 0, 0);
	// c.width = 500;
	// c.height = h*500/w;
	rgb1 = ctx.getImageData(0, 0, c.width, c.height).data;
	for (var i = 0, n = 100; i < n; i += 4) {
	    
		r1.push(rgb1[i  ]);
		g1.push(rgb1[i +1]); // green
		b1.push(rgb1[i +2]); // blue
		a1.push(rgb1[i +3]); // alpha
	}
	
	//var rgb1Array = Array.prototype.slice.call(rgb1);
};

function getRGB2(e){
	var c = document.getElementById("cv2");
    var ctx=c.getContext("2d");
    var img = document.getElementById("img2");
    c.width = img.width;
    c.height = img.height;
	ctx.drawImage(img, 0, 0);
	rgb2 = ctx.getImageData(0, 0, c.width, c.height).data;
	for (var i = 0, n = 100; i < n; i += 4) {
	    
		r2.push(rgb2[i  ]);
		g2.push(rgb2[i +1]); // green
		b2.push(rgb2[i +2]); // blue
		a2.push(rgb2[i +3]); // alpha
	}
};



function drawGraph(){
	// red graph
	$('#graph-r').highcharts({
        title: {
            text: 'Red',
            x: -20 //center
        },
        subtitle: {
            text: 'from 2 pictures',
            x: -20
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'red scale'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'First picture',
            data: r1
        }, {
            name: 'Second picture',
            data: r2
        }]
    });

	// green graph
    $('#graph-g').highcharts({
        title: {
            text: 'Green',
            x: -20 //center
        },
        subtitle: {
            text: 'from 2 pictures',
            x: -20
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'red scale'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'First picture',
            data: g1
        }, {
            name: 'Second picture',
            data: g2
        }]
    });

    // blue graph
    $('#graph-b').highcharts({
        title: {
            text: 'Blue',
            x: -20 //center
        },
        subtitle: {
            text: 'from 2 pictures',
            x: -20
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'red scale'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'First picture',
            data: b1
        }, {
            name: 'Second picture',
            data: b2
        }]
    });
};

function drawGraph1(){
	/**
     * In order to synchronize tooltips and crosshairs, override the
     * built-in events with handlers defined on the parent element.
     */
    $('#graph').bind('mousemove touchmove touchstart', function (e) {
        var chart,
            point,
            i,
            event;

        for (i = 0; i < Highcharts.charts.length; i = i + 1) {
            chart = Highcharts.charts[i];
            event = chart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
            point = chart.series[0].searchPoint(event, true); // Get the hovered point

            if (point) {
                point.onMouseOver(); // Show the hover marker
                chart.tooltip.refresh(point); // Show the tooltip
                chart.xAxis[0].drawCrosshair(event, point); // Show the crosshair
            }
        }
    });
    /**
     * Override the reset function, we don't need to hide the tooltips and crosshairs.
     */
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    /**
     * Synchronize zooming through the setExtremes event handler.
     */
    function syncExtremes(e) {
        var thisChart = this.chart;

        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
            Highcharts.each(Highcharts.charts, function (chart) {
                if (chart !== thisChart) {
                    if (chart.xAxis[0].setExtremes) { // It is null while updating
                        chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                    }
                }
            });
        }
    }

    // Get the data. The contents of the data file can be viewed at
    // https://github.com/highcharts/highcharts/blob/master/samples/data/activity.json
    //$.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=activity.json&callback=?', function (activity) {

    var activity = {"xData": [],
    "datasets": [{
        "name": "First picture",
        "data": [13.833,12.524,11.441,10.651,9.961,4.566,4.617,4.728,4.823,4.844,4.856,4.87,4.702,4.679,4.674,4.641,4.47,4.688,4.798,4.756,4.903,4.919,5.017,4.938,4.879,4.831,4.623,3.887,3.502,3.083,3.123,3.073,2.922,2.827,2.805,2.605,2.743,2.698,2.513,2.41,2.17,2.288,2.308,2.222,2.183,2.224,2.163,2.223,2.142,2.257,2.015,1.971,1.894,1.848,1.835,1.85,2.036,1.827,1.904,1.803,1.852,1.866,1.906,1.956,1.954,1.734,1.904,1.899,2.001,1.966,1.844,1.879,1.856,1.837,1.827,1.907,1.729,1.74,1.68,1.797,1.811,1.941,2.026,2.217,2.281,2.517,2.673,2.702,2.893,3.016,3.073,3.126,3.283,3.361,3.33,3.465,3.916,4.49,5.074,5.717,6.523,7.012,6.726,7.095,7.471,7.824,7.802,4.441,4.625,4.696,4.861,4.768,4.889,5.281,5.36,5.419,5.137,5.278,5.151,4.934,4.952,4.742,4.666,4.525,4.126,4.228,4.334,4.383,5.287,5.088,5.28,5.274,5.251,5.413,5.365,5.372,5.512,4.839,5.099,5.196,5.219,5.094,5.582,5.91,5.952,6.012,5.854,5.789,5.465,5.525,5.659,5.67,5.173,5.033,5.318,5.289,5.226,5.15,5.106,4.989,5.103,5.288,5.428,5.363,5.026,5,4.941,4.872,4.751,4.408,4.425,4.301,4.134,4.171,4.272,4.34,4.543,4.826,5.381,5.374,5.433,5.483,5.539,5.869,6.956,7.443,7.654,8.005,8.181,8.386,9.202,9.51,9.66,9.141,8.79,8.747,8.949,9.188,9.625,10.154,10.173,10.361,11.186,11.226,11.091,10.899,10.945,10.892,9.618,9.092,8.465,7.864,7.396,7.076,7.053,6.772,6.958,7.202,6.93,6.857,7.007,7.059,7.099,7.025,6.95,7.116,6.331,6.39,6.571,6.571,6.604,6.407,6.371,6.348,6.348,5.995,6.162,6.287,6.241,6.033,6.083,6.313,6.118,5.78,5.698,5.804,5.743,5.655,5.976,6.005,6.06,5.988,6.021,6.049,5.882,5.296,5.142,4.701,4.701,4.647,4.491,4.48,4.384,4.263,4.515,4.721,5.084,6.225,6.302,6.409,6.52,6.462,6.525,6.816,6.656,6.566,6.34,6.177,6.143,7.462,7.783,7.885,7.998,8.182,8.352,8.32,8.5,8.967,8.474,8.178,7.89,7.436,7.634,7.777,7.628,7.189,6.787,6.048,6.003,6.189,6.216,6.389,6.353,7.341,7.899,7.849,7.757,7.314,7.134,6.858,6.689,6.526,5.909,5.138,4.617,4.339,4.558,4.493,4.545,4.419,4.245,4.468,5.093,5.737,6.215,6.613,6.876,7.566,7.586,7.901,7.736,7.23,6.703,5.896,5.73,6.032,6.263,6.458,7.107,7.766,7.911,7.794,7.776,7.876,7.866,7.462,7.298,6.898,6.62,6.747,7.285,8.139,8.411,8.776,8.946,9.155,9.296,10.15,9.96,9.885,9.99,10.203,10.401,10.935,11.071,11.274,11.566,11.851,12.187,12.363,12.426,12.478,12.486,12.117,12.132,11.791,11.332,11.441,11.38,11.309,10.985,10.627,10.355,9.899,9.833,9.747,9.693,9.514,9.502,9.888,9.98,10.255,10.667,10.531,10.452,10.267,10.2,10.437,10.553,10.577,10.661,11.022,11.213,11.311,11.572,11.708,11.176,10.857,10.754,10.629,10.185,10.052,10.083,10.31,10.478,10.626,11.121,11.141,11.221,11.299,11.435,11.599,11.353,11.299,11.288,11.279,11.208,11.307,11.685,11.58,11.379,11.096,11.144,10.947,10.699,10.881,10.746,10.276,9.994,9.629,9.76,9.749,10.012,10.184,10.336,10.473,10.848,11.349,11.978,12.167,12.327,12.339,12.064,12.09,12.12,11.94,11.562,11.208,10.974,10.948,10.983,10.76,10.694,10.534,10.273,10.364,10.421,10.357,10.316,10.472,10.94,11.314,11.485,11.488,11.606,11.479,11.091,11.288,11.354,11.501,11.302,10.968,11.026,10.944,11.08,11.388,11.504,11.279,10.683,10.533,10.505,10.305,10.146,10.148,9.501,9.366,9.23,9.067,8.956,8.935],
        "unit": "",
        "type": "line",
        "valueDecimals": 0
    }, {
        "name": "Second picture",
        "data": [26.857,27,27.111,27.2,27.272,30.545,32.181,33.818,35.272,36.545,37.818,41.818,44.545,47.272,48.545,49.818,53.545,61,64.909,68.818,72.727,75.09,77.454,82.181,84.545,84.454,86.181,87.909,89.636,93.09,96.727,100.363,104,107.636,111.272,116.727,121.09,125.454,129.818,134.181,136.727,151.636,159.09,166.545,174,181.454,186.363,201.636,209.272,216.909,222.818,228.727,234.636,249.363,258.181,267,273.09,279.181,288.181,303,308.818,314.636,326.909,336.272,345.636,364.363,373.727,380.181,389.818,399.454,409.09,425.727,432.727,439.727,446.727,453.727,460.727,473.272,478.818,484.363,489.909,491.636,493.363,498.272,500.727,503.181,506.454,508,509.545,512.636,514.363,516.09,517.909,519.727,521.545,525.636,527.272,528.909,529.636,530.363,530.909,531.181,531.3,531.444,530.75,529.857,528.666,521,521,521.777,522.4,522.909,522.818,522.636,522.545,522.454,522.363,522.272,522.181,520.727,520.545,521.09,521.636,522.181,523.272,523.818,524.363,524.909,525.454,528.09,532.272,534.363,536.454,537.909,539.363,540.818,543.727,545.909,544.818,543.727,542.636,541.545,540,539.545,539.09,538.636,537.272,535.181,533.363,532.454,531.545,530.636,529.727,528.818,526.272,525.909,525.545,525.181,524.818,524.454,523.727,522.363,521,520,519,516.545,511.636,510.636,509.636,506.909,504.181,502.454,499,497.272,497,496.727,497.454,496.727,493.818,491.636,489.454,487.272,487.09,486.909,486.545,485.363,484.181,484.09,481.545,479,478.181,477.909,477.636,477.363,477.09,476.818,476.363,481.818,487.272,492.727,493.909,493.181,491.727,491,490.272,489.545,487.636,485.727,482.363,474.454,468.454,462.454,456.454,450.454,439.727,435,430.272,425.545,418.727,418.363,418.545,419.09,419.636,420.181,419.454,418.727,413.818,413,412.181,411.363,409.636,407.909,405,403.818,397.454,392.818,388.181,383.545,374.272,369.636,365,358.363,351.181,344,340,338,336,334,332,328.636,323.909,322.545,321.181,319.818,318.272,315.181,313.636,312.09,311.909,311.727,310.545,308.181,307,306,305,302.818,300.636,297.545,296.636,296.727,296.181,295.636,295.09,294,294.636,293.09,291.545,291.545,291.545,292.181,292.818,293.454,294.09,292.545,291,292.272,292.363,292.454,292.545,289.818,287.09,281.636,281.09,280.545,277,273.454,271.454,267.454,265.181,262.909,260.636,258.363,256.09,248.909,246.818,240.909,235,229.09,226.272,220.636,217.818,215,215,211.545,208.09,201.181,197.727,194.272,190.818,187.363,183.909,170.818,173,175.181,177.363,179.545,181.727,186.09,182.727,179.363,179.09,178.818,173.272,160.272,152.818,145.363,137.909,130.454,126.818,116.272,111,107.363,101.909,98.363,94.818,87,82.818,80.363,79.545,78.272,77,73,71.454,69.636,67.909,66.727,65.454,62.909,62.09,61.272,60.363,59.454,59,58.545,58.272,58.09,57.909,57.727,57.545,57.272,57.181,56.909,56.636,56.454,56.272,55.909,55.727,55.818,55.545,55.272,54.909,54.818,54.727,54.636,54.545,54.454,54,54,54,54,54,53.636,52.909,52.545,52.636,52.727,52.818,52.909,52.636,52.272,52.272,52.272,52.272,52.818,53,53.09,53.181,53.272,53.818,54.363,55.09,55.454,55.272,55.09,54.909,54.727,54.363,53.727,53.09,52.636,52.181,51.727,50.818,50.363,50.363,50.363,50.363,50.818,51.727,51.272,50.818,50.363,50.636,50.909,50.545,50.363,50.181,50,49.818,50.818,52.818,53.09,53.363,53.636,53.909,54.181,53.272,52.818,52.09,51.363,50.636,49.909,47.818,46.09,44.363,43.363,42.363,41.363,39.363,37.636,35.909,35.181,35.09,35.363,35.909,36.181,36.545,36.909,37.272,38.363,39.545,39.636,39.727,39.818,38.636,37.454,34.909,33.636,32.363,31.09,29.818,27.181,21.909,20.545,19.181,17.818,16.454,15.09,10.727,8.545,8.636,8.727,8.818,8.909,9.09,8.9,8.666,9.5,10.571,12],
        "unit": "",
        "type": "line",
        "valueDecimals": 0
    }]};

    JSON.stringify(activity);

        $.each(activity.datasets, function (i, dataset) {

            // Add X values
            dataset.data = Highcharts.map(dataset.data, function (val, j) {
                return [activity.xData[j], val];
            });

            $('<div class="chart">')
                .appendTo('#graph')
                .highcharts({
                    chart: {
                        marginLeft: 40, // Keep all charts left aligned
                        spacingTop: 20,
                        spacingBottom: 20
                    },
                    title: {
                        text: dataset.name,
                        align: 'left',
                        margin: 0,
                        x: 30
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    xAxis: {
                        crosshair: true,
                        events: {
                            setExtremes: syncExtremes
                        },
                        labels: {
                            format: '{value} km'
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        positioner: function () {
                            return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
                                y: -1 // align to title
                            };
                        },
                        borderWidth: 0,
                        backgroundColor: 'none',
                        pointFormat: '{point.y}',
                        headerFormat: '',
                        shadow: false,
                        style: {
                            fontSize: '18px'
                        },
                        valueDecimals: dataset.valueDecimals
                    },
                    series: [{
                        data: dataset.data,
                        name: dataset.name,
                        type: dataset.type,
                        color: Highcharts.getOptions().colors[i],
                        fillOpacity: 0.3,
                        tooltip: {
                            valueSuffix: ' ' + dataset.unit
                        }
                    }]
                });
        });
    //});
};