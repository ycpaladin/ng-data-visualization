import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { map } from 'rxjs/operators';
import { IWidget } from './../../../interfaces';
import { Editable } from '../decorators';
import { BarChartEditorComponent } from './bar-chart-editor.component';
import { IBarChartProperties } from './interface';
import { bartChartDefaultValue } from './consts';

@Editable({
  name: '柱状图',
  type: '图表',
  editor: BarChartEditorComponent,
})
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnInit, IWidget<IBarChartProperties> {
  props!: Observable<IBarChartProperties>;

  left$!: Observable<string>;
  top$!: Observable<string>;

  chartOption$!: Observable<EChartsOption>;

  constructor(private cdr: ChangeDetectorRef) {}

  getDefaultProps(): IBarChartProperties {
    return bartChartDefaultValue;
  }

  ngOnInit(): void {
    this.chartOption$ = this.props.pipe(
      map((props) => {
        const { general } = props;
        return {
          title: [{ text: general!.title }],
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
            },
          ],
        } as EChartsOption;
      })
    );
    this.left$ = this.props.pipe(map((props) => props.point!.x));
    this.top$ = this.props.pipe(map((props) => props.point!.y));
  }
}
