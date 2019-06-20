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
          "bullet": "../../assets/visualization/muyflaca.png"
      }, {
          "name": "Delgada",
          "points": 36,
          "color": chart.colors.next(),
          "bullet": "../../assets/visualization/flaca.png"
      }, {
          "name": "Fit",
          "points": 5,
          "color": chart.colors.next(),
          "bullet": "../../assets/visualization/fit.png"
      }, {
          "name": "Con Curvas",
          "points": 16,
          "color": chart.colors.next(),
          "bullet": "../../assets/visualization/curvas.png"
      },
      {
          "name": "Mediana",
          "points": 23,
          "color": chart.colors.next(),
          "bullet": "../../assets/visualization/mediana.png"
      },
      {
          "name": "Gorda",
          "points": 11,
          "color": chart.colors.next(),
          "bullet": "../../assets/visualization/gorda.png"
      },
      {
          "name": "Obesa",
          "points": 0,
          "color": chart.colors.next(),
          "bullet": "../../assets/visualization/obesa.png"
      },
      {
          "name": "No muestra",
          "points": 5,
          "color": chart.colors.next(),
          "bullet": ""
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
          categoryAxis.renderer.labels.template.fill = am4core.color("#ccc");
          categoryAxis.renderer.labels.template.fontSize = 20;
          categoryAxis.renderer.labels.template.disabled = true;




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
          image.dy = 110;
          image.y = am4core.percent(100);
          image.propertyFields.href = "bullet";
          image.tooltipText = series.columns.template.tooltipText;
          image.propertyFields.fill = "color";
          image.scale=3;
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
        valueAxis.renderer.labels.template.disabled = true;

        
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
            
              pieSeries.labels.template.disabled = true;


              chart.data = [{
                "color": "Café Claro",
                "porc": 362
              },{
                "color": "Café Medio",
                "porc": 123
              }, {
                "color": "Café Oscuro",
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

            series.labels.template.disabled = true;

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
                  

            let iconPath = "m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm12,13.4c0,0.3-0.1,0.5-0.3,0.7l-9.6,9.6c-0.1,0.1-0.1,0.2-0.1,0.4v10c0,0.6-0.4,1-1,1h-2c-0.6,0-1-0.4-1-1v-10c0-0.1-0.1-0.3-0.1-0.4l-9.6-9.6c-0.2-0.2-0.3-0.4-0.3-0.7v-3.4c0-0.6 0.4-1 1-1h22c0.6,0 1,0.4 1,1v3.4z"

            let chart = am4core.create("filtro", am4charts.SlicedChart);
            chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
            chart.paddingLeft = 150;

            chart.data = [{
                "name": "Si",
                "value": 51.10,
                "disabled":true
            }, {
                "name": "No",
                "value": 48.90,
                "disabled":true
            }];

            let series = chart.series.push(new am4charts.PictorialStackedSeries());
            series.dataFields.value = "value";
            series.dataFields.category = "name";
            series.alignLabels = false;
            // this makes only A label to be visible
            series.labels.template.propertyFields.disabled = "disabled";
            series.ticks.template.propertyFields.disabled = "disabled";


            series.maskSprite.path = iconPath;
            series.ticks.template.locationX = 1;
            series.ticks.template.locationY = 0;

            //series.labelsContainer.width = 100;

            chart.legend = new am4charts.Legend();
            chart.legend.position = "bottom";
            chart.legend.paddingRight = 5;
            chart.legend.paddingBottom = 20;
            chart.legend.fontSize=15;
            let marker = chart.legend.markers.template.children.getIndex(0);
            chart.legend.markers.template.width = 15;
            chart.legend.markers.template.height = 15;
           // marker.cornerRadius(20,20,20,20);


        
      });

      this.zone.runOutsideAngular(()=>{// Create chart instance
        let chart = am4core.create("planos", am4charts.RadarChart);
        
        // Add data
        chart.data = [{
          "category": "Primerísimo Primer Plano",
          "value": 2,
          "full": 100
        }, {
          "category": "Primer Plano",
          "value": 2,
          "full": 100
        }, {
          "category": "Corto",
          "value": 27,
          "full": 100
        }, {
          "category": "Medio",
          "value": 27,
          "full": 100
        },{
          "category": "Americano",
          "value": 5,
          "full": 100
        },
        {
          "category": "Entero",
          "value": 36,
          "full": 100
        },
      ];
        
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
        valueAxis.renderer.labels.template.disabled = true;

        
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
                  

          let iconPath = "m22,0c-12.2,0-22,9.8-22,22s9.8,22 22,22 22-9.8 22-22-9.8-22-22-22zm12,13.4c0,0.3-0.1,0.5-0.3,0.7l-9.6,9.6c-0.1,0.1-0.1,0.2-0.1,0.4v10c0,0.6-0.4,1-1,1h-2c-0.6,0-1-0.4-1-1v-10c0-0.1-0.1-0.3-0.1-0.4l-9.6-9.6c-0.2-0.2-0.3-0.4-0.3-0.7v-3.4c0-0.6 0.4-1 1-1h22c0.6,0 1,0.4 1,1v3.4z"

          let chart = am4core.create("filtro-plano", am4charts.SlicedChart);
          chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
          chart.paddingLeft = 150;

          chart.data = [{
              "name": "Primerisimo Primer Plano",
              "value": 1,
              "disabled":true
          }, {
              "name": "Primer Plano",
              "value": 1,
              "disabled":true
          },
          {
            "name": "Corto",
            "value": 18,
            "disabled":true
        },
        {
          "name": "Medio",
          "value": 13,
          "disabled":true
         },
         {
          "name": "Americano",
          "value": 2,
          "disabled":true
        },
        {
          "name": "Entero",
          "value": 15,
          "disabled":true
        }
        
        ];

          let series = chart.series.push(new am4charts.PictorialStackedSeries());
          series.dataFields.value = "value";
          series.dataFields.category = "name";
          series.alignLabels = false;
          // this makes only A label to be visible
          series.labels.template.propertyFields.disabled = "disabled";
          series.ticks.template.propertyFields.disabled = "disabled";


          series.maskSprite.path = iconPath;
          series.ticks.template.locationX = 1;
          series.ticks.template.locationY = 0;

          //series.labelsContainer.width = 100;

          chart.legend = new am4charts.Legend();
          chart.legend.position = "bottom";
          chart.legend.paddingRight = 2;
          chart.legend.paddingBottom = 10;
          chart.legend.fontSize=15;
          let marker = chart.legend.markers.template.children.getIndex(0);
          chart.legend.markers.template.width = 10;
          chart.legend.markers.template.height = 10;
         // marker.cornerRadius(20,20,20,20);


      
    
        });
    
      this.zone.runOutsideAngular(()=>{



          let data = [{
            "country": "Flexionado tocando el Cuerpo",
            "disabled": true,
            "litres": 132,
            "color": am4core.color("#dadada"),
            "opacity": 0.3,
            "strokeDasharray": "4,4"
          }, {
            "country": "Estirado tocando el Cuerpo",
            "litres": 127
          }, {
            "country": "Flexionado tocando laCara",
            "litres": 78
          }, {
            "country": "Sin tocar el cuerpo o cara",
            "litres": 202
          }, {
            "country": "No muestra",
            "litres": 66
          },
      
        ];


          // cointainer to hold both charts
          let container = am4core.create("brazos", am4core.Container);
          container.width = am4core.percent(100);
          container.height = am4core.percent(100);
          container.layout = "horizontal";

          container.events.on("maxsizechanged", function () {
            chart1.zIndex = 0;
            separatorLine.zIndex = 1;
            dragText.zIndex = 2;
            chart2.zIndex = 3;
          })

          let chart1 = container.createChild(am4charts.PieChart);
          chart1 .fontSize = 11;
          chart1.hiddenState.properties.opacity = 0; // this makes initial fade in effect
          chart1.data = data;
          chart1.radius = am4core.percent(70);
          chart1.innerRadius = am4core.percent(40);
          chart1.zIndex = 1;

          let series1 = chart1.series.push(new am4charts.PieSeries());
          series1.dataFields.value = "litres";
          series1.dataFields.category = "country";
          series1.colors.step = 2;
          series1.alignLabels = false;
          series1.labels.template.bent = true;
          series1.labels.template.radius = 3;
          series1.labels.template.padding(0,0,0,0);

          let sliceTemplate1 = series1.slices.template;
          sliceTemplate1.cornerRadius = 5;
          sliceTemplate1.draggable = true;
          sliceTemplate1.inert = true;
          sliceTemplate1.propertyFields.fill = "color";
          sliceTemplate1.propertyFields.fillOpacity = "opacity";
          sliceTemplate1.propertyFields.stroke = "color";
          sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
          sliceTemplate1.strokeWidth = 1;
          sliceTemplate1.strokeOpacity = 1;

          let zIndex = 5;

          sliceTemplate1.events.on("down", function (event) {
            event.target.toFront();
            // also put chart to front
            let series = event.target.dataItem.component;
            series.chart.zIndex = zIndex++;
          })

          series1.ticks.template.disabled = true;

          sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;

          sliceTemplate1.events.on("dragstop", function (event) {
            handleDragStop(event);
          })

          // separator line and text
          let separatorLine = container.createChild(am4core.Line);
          separatorLine.x1 = 0;
          separatorLine.y2 = 300;
          separatorLine.strokeWidth = 3;
          separatorLine.stroke = am4core.color("#dadada");
          separatorLine.valign = "middle";
          separatorLine.strokeDasharray = "5,5";


          let dragText = container.createChild(am4core.Label);
          dragText.text = "Drag slices over the line";
          dragText.rotation = 90;
          dragText.valign = "middle";
          dragText.align = "center";
          dragText.paddingBottom = 5;

          // second chart
          let chart2 = container.createChild(am4charts.PieChart);
          chart2.hiddenState.properties.opacity = 0; // this makes initial fade in effect
          chart2 .fontSize = 11;
          chart2.radius = am4core.percent(70);
          chart2.data = data;
          chart2.innerRadius = am4core.percent(40);
          chart2.zIndex = 1;

          let series2 = chart2.series.push(new am4charts.PieSeries());
          series2.dataFields.value = "litres";
          series2.dataFields.category = "country";
          series2.colors.step = 2;

          series2.alignLabels = false;
          series2.labels.template.bent = true;
          series2.labels.template.radius = 3;
          series2.labels.template.padding(0,0,0,0);
          series2.labels.template.propertyFields.disabled = "disabled";

          let sliceTemplate2 = series2.slices.template;
          sliceTemplate2.copyFrom(sliceTemplate1);

          series2.ticks.template.disabled = true;

          function handleDragStop(event) {
            let targetSlice = event.target;
            let dataItem1;
            let dataItem2;
            let slice1;
            let slice2;

            if (series1.slices.indexOf(targetSlice) != -1) {
                slice1 = targetSlice;
                slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
            }
            else if (series2.slices.indexOf(targetSlice) != -1) {
                slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
                slice2 = targetSlice;
            }


            dataItem1 = slice1.dataItem;
            dataItem2 = slice2.dataItem;

            let series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
            let series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);

            let series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
            let series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

            // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
            let targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);

            if (targetSlice == slice1) {
                if (targetSlicePoint.x > container.pixelWidth / 2) {
                    let value = dataItem1.value;

                    dataItem1.hide();

                    let animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
                    animation.events.on("animationprogress", function (event) {
                        slice1.hideTooltip();
                    })

                    slice2.x = 0;
                    slice2.y = 0;

                    dataItem2.show();
                }
                else {
                    slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                }
            }
            if (targetSlice == slice2) {
                if (targetSlicePoint.x < container.pixelWidth / 2) {

                    let value = dataItem2.value;

                    dataItem2.hide();

                    let animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
                    animation.events.on("animationprogress", function (event) {
                        slice2.hideTooltip();
                    })

                    slice1.x = 0;
                    slice1.y = 0;
                    dataItem1.show();
                }
                else {
                    slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
                }
            }

            toggleDummySlice(series1);
            toggleDummySlice(series2);

            series1.hideTooltip();
            series2.hideTooltip();
          }

          function toggleDummySlice(series) {
            let show = true;
            for (var i = 1; i < series.dataItems.length; i++) {
                let dataItem = series.dataItems.getIndex(i);
                if (dataItem.slice.visible && !dataItem.slice.isHiding) {
                    show = false;
                }
            }

            let dummySlice = series.dataItems.getIndex(0);
            if (show) {
                dummySlice.show();
            }
            else {
                dummySlice.hide();
            }
          }

          series2.events.on("datavalidated", function () {

            let dummyDataItem = series2.dataItems.getIndex(0);
            dummyDataItem.show(0);
            dummyDataItem.slice.draggable = false;
            dummyDataItem.slice.tooltipText = undefined;

            for (var i = 1; i < series2.dataItems.length; i++) {
                series2.dataItems.getIndex(i).hide(0);
            }
          })

          series1.events.on("datavalidated", function () {
            let dummyDataItem = series1.dataItems.getIndex(0);
            dummyDataItem.hide(0);
            dummyDataItem.slice.draggable = false;
            dummyDataItem.slice.tooltipText = undefined;
          })




      });

      this.zone.runOutsideAngular(()=>{



        let data = [{
          "country": "Pierna estirada y pierna flexionada",
          "disabled": true,
          "litres": 33,
          "color": am4core.color("#dadada"),
          "opacity": 0.3,
          "strokeDasharray": "4,4"
        }, {
          "country": "No muestran pierna",
          "litres": 50
        }, {
          "country": "Otra pose",
          "litres": 17
        },{
          "country": "Pierna estirada y pierna flexionada",
          "litres": 33
        },
          ];


        // cointainer to hold both charts
        let container = am4core.create("piernas", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";

        container.events.on("maxsizechanged", function () {
          chart1.zIndex = 0;
          separatorLine.zIndex = 1;
          dragText.zIndex = 2;
          chart2.zIndex = 3;
        })

        let chart1 = container.createChild(am4charts.PieChart);
        chart1 .fontSize = 11;
        chart1.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart1.data = data;
        chart1.radius = am4core.percent(70);
        chart1.innerRadius = am4core.percent(40);
        chart1.zIndex = 1;

        let series1 = chart1.series.push(new am4charts.PieSeries());
        series1.dataFields.value = "litres";
        series1.dataFields.category = "country";
        series1.colors.step = 2;
        series1.alignLabels = false;
        series1.labels.template.bent = true;
        series1.labels.template.radius = 3;
        series1.labels.template.padding(0,0,0,0);

        let sliceTemplate1 = series1.slices.template;
        sliceTemplate1.cornerRadius = 5;
        sliceTemplate1.draggable = true;
        sliceTemplate1.inert = true;
        sliceTemplate1.propertyFields.fill = "color";
        sliceTemplate1.propertyFields.fillOpacity = "opacity";
        sliceTemplate1.propertyFields.stroke = "color";
        sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
        sliceTemplate1.strokeWidth = 1;
        sliceTemplate1.strokeOpacity = 1;

        let zIndex = 5;

        sliceTemplate1.events.on("down", function (event) {
          event.target.toFront();
          // also put chart to front
          let series = event.target.dataItem.component;
          series.chart.zIndex = zIndex++;
        })

        series1.ticks.template.disabled = true;

        sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;

        sliceTemplate1.events.on("dragstop", function (event) {
          handleDragStop(event);
        })

        // separator line and text
        let separatorLine = container.createChild(am4core.Line);
        separatorLine.x1 = 0;
        separatorLine.y2 = 300;
        separatorLine.strokeWidth = 3;
        separatorLine.stroke = am4core.color("#dadada");
        separatorLine.valign = "middle";
        separatorLine.strokeDasharray = "5,5";


        let dragText = container.createChild(am4core.Label);
        dragText.text = "Drag slices over the line";
        dragText.rotation = 90;
        dragText.valign = "middle";
        dragText.align = "center";
        dragText.paddingBottom = 5;

        // second chart
        let chart2 = container.createChild(am4charts.PieChart);
        chart2.hiddenState.properties.opacity = 0; // this makes initial fade in effect
        chart2 .fontSize = 11;
        chart2.radius = am4core.percent(70);
        chart2.data = data;
        chart2.innerRadius = am4core.percent(40);
        chart2.zIndex = 1;

        let series2 = chart2.series.push(new am4charts.PieSeries());
        series2.dataFields.value = "litres";
        series2.dataFields.category = "country";
        series2.colors.step = 2;

        series2.alignLabels = false;
        series2.labels.template.bent = true;
        series2.labels.template.radius = 3;
        series2.labels.template.padding(0,0,0,0);
        series2.labels.template.propertyFields.disabled = "disabled";

        let sliceTemplate2 = series2.slices.template;
        sliceTemplate2.copyFrom(sliceTemplate1);

        series2.ticks.template.disabled = true;

        function handleDragStop(event) {
          let targetSlice = event.target;
          let dataItem1;
          let dataItem2;
          let slice1;
          let slice2;

          if (series1.slices.indexOf(targetSlice) != -1) {
              slice1 = targetSlice;
              slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
          }
          else if (series2.slices.indexOf(targetSlice) != -1) {
              slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
              slice2 = targetSlice;
          }


          dataItem1 = slice1.dataItem;
          dataItem2 = slice2.dataItem;

          let series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
          let series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);

          let series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
          let series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

          // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
          let targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);

          if (targetSlice == slice1) {
              if (targetSlicePoint.x > container.pixelWidth / 2) {
                  let value = dataItem1.value;

                  dataItem1.hide();

                  let animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
                  animation.events.on("animationprogress", function (event) {
                      slice1.hideTooltip();
                  })

                  slice2.x = 0;
                  slice2.y = 0;

                  dataItem2.show();
              }
              else {
                  slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
              }
          }
          if (targetSlice == slice2) {
              if (targetSlicePoint.x < container.pixelWidth / 2) {

                  let value = dataItem2.value;

                  dataItem2.hide();

                  let animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
                  animation.events.on("animationprogress", function (event) {
                      slice2.hideTooltip();
                  })

                  slice1.x = 0;
                  slice1.y = 0;
                  dataItem1.show();
              }
              else {
                  slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
              }
          }

          toggleDummySlice(series1);
          toggleDummySlice(series2);

          series1.hideTooltip();
          series2.hideTooltip();
        }

        function toggleDummySlice(series) {
          let show = true;
          for (var i = 1; i < series.dataItems.length; i++) {
              let dataItem = series.dataItems.getIndex(i);
              if (dataItem.slice.visible && !dataItem.slice.isHiding) {
                  show = false;
              }
          }

          let dummySlice = series.dataItems.getIndex(0);
          if (show) {
              dummySlice.show();
          }
          else {
              dummySlice.hide();
          }
        }

        series2.events.on("datavalidated", function () {

          let dummyDataItem = series2.dataItems.getIndex(0);
          dummyDataItem.show(0);
          dummyDataItem.slice.draggable = false;
          dummyDataItem.slice.tooltipText = undefined;

          for (var i = 1; i < series2.dataItems.length; i++) {
              series2.dataItems.getIndex(i).hide(0);
          }
        })

        series1.events.on("datavalidated", function () {
          let dummyDataItem = series1.dataItems.getIndex(0);
          dummyDataItem.hide(0);
          dummyDataItem.slice.draggable = false;
          dummyDataItem.slice.tooltipText = undefined;
        })




      });

      this.zone.runOutsideAngular(()=>{

                // Create chart instance
        let chart = am4core.create("sonrisa", am4charts.PieChart);

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
        //chart.legend = new am4charts.Legend();
        chart.width=200;
        chart.x=90;
        pieSeries.labels.template.fontSize=12;

        chart.data = [{
        "color": "Sonrisa",
        "porc": 255,
        "autoResize":true
        
        },{
        "color": "Cerrada",
        "porc": 151,
        "autoResize":true
        }, {
        "color": "Pato",
        "porc": 35,
        "autoResize":true
        }, {
          "color": "Otro",
          "porc": 64,
          "autoResize":true
          }
      
      ];
        });

      
        this.zone.runOutsideAngular(()=>{

          // Create chart instance
  let chart = am4core.create("mirada", am4charts.PieChart);

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

  chart.width=200;
  chart.x=90;
  pieSeries.labels.template.fontSize=11;

  // Add a legend
  //chart.legend = new am4charts.Legend();

  chart.data = [{
  "color": "De frente",
  "porc": 280
  
  },{
  "color": "Hacia abajo",
  "porc": 123
  }, {
  "color": "Hacia el costado",
  "porc": 56
  }, {
    "color": "Otro",
    "porc": 35
    }

];
      });


      this.zone.runOutsideAngular(()=>{

        // Create chart instance
let chart = am4core.create("posci", am4charts.PieChart);

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

chart.width=200;
chart.x=90;
pieSeries.labels.template.fontSize=12;

// Add a legend
//chart.legend = new am4charts.Legend();

chart.data = [{
"color": "De perfil",
"porc": 157

},{
"color": "De frente",
"porc": 303
}, {
"color": "De espalda",
"porc": 35
}, {
  "color": "Otro",
  "porc": 10
  }

];
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
