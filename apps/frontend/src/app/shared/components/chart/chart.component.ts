import { NgClass } from "@angular/common";
import { Component, OnInit, Input, OnChanges } from "@angular/core";
import {
  AreaData,
  AreaStyleOptions,
  ChartOptions,
  createChart,
  DeepPartial,
  IChartApi,
  ISeriesApi,
  SeriesOptionsCommon,
  WhitespaceData,
} from "lightweight-charts";

@Component({
  selector: "carbon-chart",
  templateUrl: "./chart.component.html",
  standalone: true,
  imports: [NgClass],
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() chartOptions: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> =
    {};
  @Input() chartData: (AreaData | WhitespaceData)[] = [];
  @Input() canvaClass: string[] = [];
  @Input() canvasOptions: DeepPartial<ChartOptions> = {};
  chart: IChartApi | null = null;
  areaSeries: ISeriesApi<"Area"> | null = null;
  chartId = "";

  ngOnInit(): void {
    this.chartId = `chart-${new Date().getTime()}`;
    window.setTimeout(() => {
      this.chart = createChart(
        document.querySelector(`#${this.chartId}`) as HTMLElement,
        this.canvasOptions
      );
      this.areaSeries = this.chart.addAreaSeries(this.chartOptions);
      this.areaSeries.setData(this.chartData);
      this.chart.timeScale().fitContent();
    });
  }

  ngOnChanges(): void {
    if (this.areaSeries) {
      this.areaSeries.setData(this.chartData);
      this.chart?.timeScale().fitContent();
    }
  }
}
