import { Component, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent {
    private chart: am4charts.XYChart;
  
    constructor(private zone: NgZone) {}
  
    ngAfterViewInit() {
      this.zone.runOutsideAngular(() => {

        let chart = am4core.create("tipo_de_cuerpo", am4charts.XYChart);
  
        chart.paddingRight = 20;
  
        let data = [{
          "name": "Muy Delgada",
          "points": 4,
          "color": chart.colors.next(),
          "bullet": "https://www.amcharts.com/lib/images/faces/A04.png"
      }, {
          "name": "Delgada",
          "points": 36,
          "color": chart.colors.next(),
          "bullet": "https://www.amcharts.com/lib/images/faces/C02.png"
      }, {
          "name": "Fit",
          "points": 5,
          "color": chart.colors.next(),
          "bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
      }, {
          "name": "Con Curvas",
          "points": 16,
          "color": chart.colors.next(),
          "bullet": "https://www.amcharts.com/lib/images/faces/E01.png"
      },
      {
          "name": "Mediana",
          "points": 23,
          "color": chart.colors.next(),
          "bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
          "name": "Gorda",
          "points": 11,
          "color": chart.colors.next(),
          "bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
          "name": "Obesa",
          "points": 0,
          "color": chart.colors.next(),
          "bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
      },
      {
          "name": "No muestra",
          "points": 5,
          "color": chart.colors.next(),
          "bullet": "https://www.amcharts.com/lib/images/faces/D02.png"
      }
    ];
        let visits = 10;
        
  
         chart.data = data;
        
              // Create axes
          var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "name";
          categoryAxis.renderer.grid.template.disabled = true;
          categoryAxis.renderer.minGridDistance = 30;
          categoryAxis.renderer.inside = true;
          categoryAxis.renderer.labels.template.fill = am4core.color("#fff");
          categoryAxis.renderer.labels.template.fontSize = 20;
          
          var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
          valueAxis.renderer.grid.template.strokeDasharray = "4,4";
          valueAxis.renderer.labels.template.disabled = true;
          valueAxis.min = 0;
          
          // Do not crop bullets
          chart.maskBullets = false;
          
          // Remove padding
          chart.paddingBottom = 0;
          
          // Create series
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = "points";
          series.dataFields.categoryX = "name";
          series.columns.template.propertyFields.fill = "color";
          series.columns.template.propertyFields.stroke = "color";
          series.columns.template.column.cornerRadiusTopLeft = 15;
          series.columns.template.column.cornerRadiusTopRight = 15;
          series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/b]";
          
          // Add bullets
          var bullet = series.bullets.push(new am4charts.Bullet());
          var image = bullet.createChild(am4core.Image);
          image.horizontalCenter = "middle";
          image.verticalCenter = "bottom";
          image.dy = 20;
          image.y = am4core.percent(100);
          image.propertyFields.href = "bullet";
          image.tooltipText = series.columns.template.tooltipText;
          image.propertyFields.fill = "color";
          image.filters.push(new am4core.DropShadowFilter());
       
          
          this.chart = chart;


          
          
          
      });

      this.zone.runOutsideAngular(()=>{// Create chart instance
        let chart = am4core.create("piel", am4charts.RadarChart);
        
        // Add data
        chart.data = [{
          "category": "No tiene",
          "value": 66,
          "full": 100
        }, {
          "category": "Bolsas y ojeras",
          "value": 11,
          "full": 100
        }, {
          "category": "Manchas y rosaceo",
          "value": 15,
          "full": 100
        }, {
          "category": "Lunares y pecas",
          "value": 22,
          "full": 100
        }];
        
        // Make chart not full circle
        chart.startAngle = -90;
        chart.endAngle = 180;
        chart.innerRadius = am4core.percent(20);
        
        // Set number format
        chart.numberFormatter.numberFormat = "#.#'%'";
        
        // Create axes
        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis()as any);
        categoryAxis.dataFields.category = "category";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.grid.template.strokeOpacity = 0;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.fontWeight = 500;
        categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
          return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
        });
        categoryAxis.renderer.minGridDistance = 10;
        
        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis()as any);
        valueAxis.renderer.grid.template.strokeOpacity = 0;
        valueAxis.min = 0;
        valueAxis.max = 100;
        valueAxis.strictMinMax = true;
        
        // Create series
        let series1 = chart.series.push(new am4charts.RadarColumnSeries());
        series1.dataFields.valueX = "full";
        series1.dataFields.categoryY = "category";
        series1.clustered = false;
        series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
        series1.columns.template.fillOpacity = 0.08;
        //series1.columns.template.cornerRadiusTopLeft = 20;
        series1.columns.template.strokeWidth = 0;
        series1.columns.template.radarColumn.cornerRadius = 20;
        
        let series2 = chart.series.push(new am4charts.RadarColumnSeries());
        series2.dataFields.valueX = "value";
        series2.dataFields.categoryY = "category";
        series2.clustered = false;
        series2.columns.template.strokeWidth = 0;
        series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
        series2.columns.template.radarColumn.cornerRadius = 20;
        
        series2.columns.template.adapter.add("fill", function(fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });
        
        // Add cursor
        chart.cursor = new am4charts.RadarCursor();
        
        });
     
      this.zone.runOutsideAngular(()=>{

          
// Create chart instance


let chart = am4core.create("cuerpopartes", am4charts.XYChart);


// Add data
chart.data = [
  {
    "region": "Abdomen",
    "state": "Muy delgada",
    "sales": 3
  },
  {
    "region": "Abdomen",
    "state": "Delgada",
    "sales": 11
  },
  {
    "region": "Abdomen",
    "state": "Mediana",
    "sales": 3
  },
  {
    "region": "Abdomen",
    "state": "Gorda",
    "sales": 1
  },
  
  {
    "region": "Abdomen",
    "state": "Curvy",
    "sales": 8
  },
  {
    "region": "Abdomen",
    "state": "Fit",
    "sales": 4
  },

  {
    "region": "Piernas",
    "state": "P-Muy delgada",
    "sales": 3
  },
  {
    "region": "Piernas",
    "state": "P-Delgada",
    "sales": 16
  },
  {
    "region": "Piernas",
    "state": "P-Mediana",
    "sales": 3
  },
  {
    "region": "Piernas",
    "state": "P-Gorda",
    "sales": 2
  },
  
  {
    "region": "Piernas",
    "state": "P-Curvyy",
    "sales": 9
  },
  {
    "region": "Piernas",
    "state": "P-Fit",
    "sales": 4
  },{
    "region": "Cara",
    "state": "C-Muy delgada",
    "sales": 4
  },
  {
    "region": "Cara",
    "state": "C-Delgada",
    "sales": 34
  },
  {
    "region": "Cara",
    "state": "C-Mediana",
    "sales": 22
  },
  {
    "region": "Cara",
    "state": "C-Gorda",
    "sales": 11
  },
  
  {
    "region": "Cara",
    "state": "C-Curvyy",
    "sales": 16
  },
  {
    "region": "Cara",
    "state": "C-Fit",
    "sales": 5
  },
  
  
];

// Create axes
let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
yAxis.dataFields.category = "state";
yAxis.renderer.grid.template.location = 0;
yAxis.renderer.labels.template.fontSize = 10;
yAxis.renderer.minGridDistance = 10;

let xAxis = chart.xAxes.push(new am4charts.ValueAxis());

// Create series
let series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueX = "sales";
series.dataFields.categoryY = "state";
series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
series.columns.template.strokeWidth = 0;
series.columns.template.adapter.add("fill", function(fill, target) {
  if (target.dataItem) {
    switch(target.dataItem.dataContext.region) {
      case "Abdomen":
        return chart.colors.getIndex(0);
        break;
      case "Piernas":
        return chart.colors.getIndex(1);
        break;
      case "Cara":
        return chart.colors.getIndex(2);
        break;
      
    }
  }
  return fill;
});

// Add ranges
function addRange(label, start, end, color) {
  let range = yAxis.axisRanges.create();
  range.category = start;
  range.endCategory = end;
  range.label.text = label;
  range.label.disabled = false;
  range.label.fill = color;
  range.label.location = 0;
  range.label.dx = -115;
  range.label.dy = 30;
  range.label.fontWeight = "bold";
  range.label.fontSize = 12;
  range.label.horizontalCenter = "right"
  range.label.inside = true;
  
  range.grid.stroke = am4core.color("#396478");
  range.grid.strokeOpacity = 1;
  range.tick.length = 200;
  range.tick.disabled = false;
  range.tick.strokeOpacity = 0.6;
  range.tick.stroke = am4core.color("#396478");
  range.tick.location = 0;
  
  range.locations.category = 1;
}

addRange("Abdomen", "Fit", "Muy Delgada", chart.colors.getIndex(0));
addRange("Piernas", "P-Fit", "P-Muy Delgada", chart.colors.getIndex(1));
addRange("Cara","C-Fit", "C-Muy Delgada", chart.colors.getIndex(2));

chart.cursor = new am4charts.XYCursor();
        });

      this.zone.runOutsideAngular(()=>{

                        // Create chart instance
              let chart = am4core.create("color-piel", am4charts.PieChart);

              // Add and configure Series
              let pieSeries = chart.series.push(new am4charts.PieSeries());
              pieSeries.dataFields.value = "porc";
              pieSeries.dataFields.category = "color";

              // Let's cut a hole in our Pie chart the size of 30% the radius
              chart.innerRadius = am4core.percent(30);

              // Put a thick white border around each Slice
              pieSeries.slices.template.stroke = am4core.color("#fff");
              pieSeries.slices.template.strokeWidth = 2;
              pieSeries.slices.template.strokeOpacity = 1;
              pieSeries.slices.template

                // change the cursor on hover to make it apparent the object can be interacted with
                .cursorOverStyle = [
                  {
                    "property": "cursor",
                    "value": "pointer"
                  }
                ];

             
              // Create a base filter effect (as if it's not there) for the hover to return to
              let shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
              shadow.opacity = 0;

              // Create hover state
              let hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

              // Slightly shift the shadow and make it more prominent on hover
              let hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
              hoverShadow.opacity = 0.7;
              hoverShadow.blur = 5;

              // Add a legend
              chart.legend = new am4charts.Legend();

              chart.data = [{
                "color": "Blanca",
                "porc": 362
              },{
                "color": "Cafe claro",
                "porc": 123
              }, {
                "color": "Cafe medio",
                "porc": 9
              }];
        });


      this.zone.runOutsideAngular(()=>{
          
          // Themes end

            let chart = am4core.create("maquillaje", am4charts.PieChart);
            chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

            chart.data = [
              {
                country: "Sí",
                value: 156
              },
              {
                country: "No",
                value: 349
              },
              
             
            ];
            chart.radius = am4core.percent(70);
            chart.innerRadius = am4core.percent(40);
            chart.startAngle = 180;
            chart.endAngle = 360;  

            let series = chart.series.push(new am4charts.PieSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "country";

            series.slices.template.cornerRadius = 10;
            series.slices.template.innerCornerRadius = 7;
            series.slices.template.draggable = true;
            series.slices.template.inert = true;
            series.alignLabels = false;

            series.hiddenState.properties.startAngle = 90;
            series.hiddenState.properties.endAngle = 90;

            chart.legend = new am4charts.Legend();



        });

      this.zone.runOutsideAngular(()=>{
                    // Create chart instance
            let chart = am4core.create("color-pelo", am4charts.XYChart);
            chart.scrollbarX = new am4core.Scrollbar();

            // Add data
            chart.data = [{
              "country": "Rubio",
              "visits": 38
            }, {
              "country": "Morocho",
              "visits": 31
            }, {
              "country": "Negro",
              "visits": 25
            }, {
              "country": "Colorado",
              "visits": 2
            
            }];

            // Create axes
            let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "country";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 30;
            categoryAxis.renderer.labels.template.horizontalCenter = "right";
            categoryAxis.renderer.labels.template.verticalCenter = "middle";
            categoryAxis.renderer.labels.template.rotation = 270;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.minHeight = 110;

            let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.minWidth = 50;

            // Create series
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.sequencedInterpolation = true;
            series.dataFields.valueY = "visits";
            series.dataFields.categoryX = "country";
            series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
            series.columns.template.strokeWidth = 0;

            series.tooltip.pointerOrientation = "vertical";

            series.columns.template.column.cornerRadiusTopLeft = 10;
            series.columns.template.column.cornerRadiusTopRight = 10;
            series.columns.template.column.fillOpacity = 0.8;

            // on hover, make corner radiuses bigger
            let hoverState = series.columns.template.column.states.create("hover");
            hoverState.properties.cornerRadiusTopLeft = 0;
            hoverState.properties.cornerRadiusTopRight = 0;
            hoverState.properties.fillOpacity = 1;

            series.columns.template.adapter.add("fill", function(fill, target) {
              return chart.colors.getIndex(target.dataItem.index);
            });

            // Cursor
            chart.cursor = new am4charts.XYCursor();


      });

      this.zone.runOutsideAngular(()=>{
        // Create chart instance
            let chart = am4core.create("pelo-corporal", am4charts.PieChart);

            // Add data
            chart.data = [ {
              "country": "Si",
              "litres": 2
            }, {
              "country": "No",
              "litres": 503
            } ];

            // Add and configure Series
            let pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "litres";
            pieSeries.dataFields.category = "country";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;

            // This creates initial animation
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;


      });
      this.zone.runOutsideAngular(()=>{
       
        
      });



      

      

      

    }

    
  
    ngOnDestroy() {
      this.zone.runOutsideAngular(() => {
        if (this.chart) {
          this.chart.dispose();
        }

  
  



      });
    }
  }
