import { Observable } from 'rxjs';
import { CdkDropList } from '@angular/cdk/drag-drop';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  IWidget,
  IWidgetProperties,
  IWidgetPropertyEditor,
} from 'src/app/interfaces';
import { Editable } from '../decorators';

@Component({
  template: '',
})
export class GridEditorComponent implements IWidgetPropertyEditor {
  setValue(value: IWidgetProperties<{}>): void {
    throw new Error('Method not implemented.');
  }
  getValue(): IWidgetProperties<{}> {
    throw new Error('Method not implemented.');
  }
}

@Editable({
  name: '网格',
  type: '布局',
  editor: GridEditorComponent,
})
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, IWidget {
  @Input() rows: number = 1;
  @Input() columns: number = 3;
  @Input() props!: Observable<{}>;

  rowNumbers!: number[];
  colNumbers!: number[];

  @ViewChildren(CdkDropList) cdkDropLists!: QueryList<CdkDropList>;

  constructor() {}
  getDefaultProps(): {} {
    return {};
  }

  ngOnInit(): void {
    this.rowNumbers = Array(this.rows).fill(0);
    this.colNumbers = Array(this.columns).fill(0);
  }
}
