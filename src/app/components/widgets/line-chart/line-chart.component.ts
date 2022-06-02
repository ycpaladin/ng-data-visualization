import { Observable } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ILineChartProperties } from './interface';
import { IWidget } from './../../../interfaces/widget';
import { Editable } from '../decorators';
import { LineChartEditorComponent } from './line-chart-editor.component';
import { bartChartDefaultValue } from './consts';
@Editable({
  name: '折线图',
  type: '图表',
  editor: LineChartEditorComponent,
})
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent
  implements OnInit, IWidget<ILineChartProperties>
{
  constructor() {}
  @Input() props!: Observable<ILineChartProperties>;

  getDefaultProps(): ILineChartProperties {
    return bartChartDefaultValue;
  }

  ngOnInit(): void {}
}
