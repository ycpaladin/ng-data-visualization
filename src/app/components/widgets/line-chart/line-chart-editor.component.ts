import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  IWidgetProperties,
  IWidgetPropertyEditor,
} from './../../../interfaces';
import { ILineChartProperties } from './interface';

@Component({
  selector: 'app-line-chart-editor',
  templateUrl: './line-chart-editor.component.html',
  styleUrls: ['./line-chart-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartEditorComponent
  implements OnInit, IWidgetPropertyEditor<ILineChartProperties>
{
  constructor() {}

  setValue(value: IWidgetProperties<{}>): void {
    throw new Error('Method not implemented.');
  }
  getValue(): IWidgetProperties<{}> {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}
}
