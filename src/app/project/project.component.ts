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
    "state": "North Dakota",
    "sales": 920
  },
  {
    "region": "Abdomen",
    "state": "Cara Dakota",
    "sales": 1317
  },
  {
    "region": "Abdomen",
    "state": "Kansas",
    "sales": 2916
  },
  {
    "region": "Abdomen",
    "state": "Iowa",
    "sales": 4577
  },
  {
    "region": "Abdomen",
    "state": "Nebraska",
    "sales": 7464
  },
  {
    "region": "Abdomen",
    "state": "Oklahoma",
    "sales": 19686
  },
  {
    "region": "Abdomen",
    "state": "Missouri",
    "sales": 22207
  },
  {
    "region": "Abdomen",
    "state": "Minnesota",
    "sales": 29865
  },
  {
    "region": "Abdomen",
    "state": "Wisconsin",
    "sales": 32125
  },
  {
    "region": "Abdomen",
    "state": "Indiana",
    "sales": 53549
  },
  {
    "region": "Abdomen",
    "state": "Michigan",
    "sales": 76281
  },
  {
    "region": "Abdomen",
    "state": "Illinois",
    "sales": 80162
  },
  {
    "region": "Abdomen",
    "state": "Texas",
    "sales": 170187
  },
  {
    "region": "Piernas",
    "state": "West Virginia",
    "sales": 1209
  },
  {
    "region": "Piernas",
    "state": "Maine",
    "sales": 1270
  },
  {
    "region": "Piernas",
    "state": "District of Columbia",
    "sales": 2866
  },
  {
    "region": "Piernas",
    "state": "New Hampshire",
    "sales": 7294
  },
  {
    "region": "Piernas",
    "state": "Vermont",
    "sales": 8929
  },
  {
    "region": "Piernas",
    "state": "Connecticut",
    "sales": 13386
  },
  {
    "region": "Piernas",
    "state": "Rhode Island",
    "sales": 22629
  },
  {
    "region": "Piernas",
    "state": "Maryland",
    "sales": 23707
  },
  {
    "region": "Piernas",
    "state": "Delaware",
    "sales": 27453
  },
  {
    "region": "Piernas",
    "state": "Massachusetts",
    "sales": 28639
  },
  {
    "region": "Piernas",
    "state": "New Jersey",
    "sales": 35763
  },
  {
    "region": "Piernas",
    "state": "Ohio",
    "sales": 78253
  },
  {
    "region": "Piernas",
    "state": "Pennsylvania",
    "sales": 116522
  },
  {
    "region": "Piernas",
    "state": "New York",
    "sales": 310914
  },
  {
    "region": "Cara",
    "state": "Cara Carolina",
    "sales": 8483
  },
  {
    "region": "Cara",
    "state": "Louisiana",
    "sales": 9219
  },
  {
    "region": "Cara",
    "state": "Mississippi",
    "sales": 10772
  },
  {
    "region": "Cara",
    "state": "Arkansas",
    "sales": 11678
  },
  {
    "region": "Cara",
    "state": "Alabama",
    "sales": 19511
  },
  {
    "region": "Cara",
    "state": "Tennessee",
    "sales": 30662
  },
  {
    "region": "Cara",
    "state": "Kentucky",
    "sales": 36598
  },
  {
    "region": "Cara",
    "state": "Georgia",
    "sales": 49103
  },
  {
    "region": "Cara",
    "state": "North Carolina",
    "sales": 55604
  },
  {
    "region": "Cara",
    "state": "Virginia",
    "sales": 70641
  },
  {
    "region": "Cara",
    "state": "Florida",
    "sales": 89479
  },
  {
    "region": "West",
    "state": "Wyoming",
    "sales": 1603
  },
  {
    "region": "West",
    "state": "Idaho",
    "sales": 4380
  },
  {
    "region": "West",
    "state": "New Mexico",
    "sales": 4779
  },
  {
    "region": "West",
    "state": "Montana",
    "sales": 5589
  },
  {
    "region": "West",
    "state": "Utah",
    "sales": 11223
  },
  {
    "region": "West",
    "state": "Nevada",
    "sales": 16729
  },
  {
    "region": "West",
    "state": "Oregon",
    "sales": 17431
  },
  {
    "region": "West",
    "state": "Colorado",
    "sales": 32110
  },
  {
    "region": "West",
    "state": "Arizona",
    "sales": 35283
  },
  {
    "region": "West",
    "state": "Washington",
    "sales": 138656
  },
  {
    "region": "West",
    "state": "California",
    "sales": 457731
  }
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
      case "West":
        return chart.colors.getIndex(3);
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
  range.label.dx = -130;
  range.label.dy = 12;
  range.label.fontWeight = "bold";
  range.label.fontSize = 12;
  range.label.horizontalCenter = "left"
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

addRange("Abdomen", "Texas", "North Dakota", chart.colors.getIndex(0));
addRange("Piernas", "New York", "West Virginia", chart.colors.getIndex(1));
addRange("Cara", "Florida", "Cara Carolina", chart.colors.getIndex(2));
addRange("West", "California", "Wyoming", chart.colors.getIndex(3));

chart.cursor = new am4charts.XYCursor();
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
