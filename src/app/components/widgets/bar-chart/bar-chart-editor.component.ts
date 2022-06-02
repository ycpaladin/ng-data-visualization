import { AppComponent } from './../../../app.component';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IWidgetPropertyEditor } from 'src/app/interfaces';
import { IBarChartProperties } from './interface';

@Component({
  selector: 'app-bar-chart-editor',
  templateUrl: './bar-chart-editor.component.html',
  styleUrls: ['./bar-chart-editor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartEditorComponent
  implements OnInit, IWidgetPropertyEditor<IBarChartProperties>, OnDestroy
{
  formGroup!: FormGroup;
  destory$ = new Subject<void>();
  constructor(public fb: FormBuilder, public app: AppComponent) {
    this.formGroup = fb.group({
      general: fb.group({
        title: [''],
        key: [''],
        backgroundColor: [''],
      }),
      data: fb.group({}),
      point: fb.group({
        x: [''],
        y: [''],
        z: [''],
        width: [''],
        height: [''],
      }),
    });
  }
  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  setValue(value: IBarChartProperties): void {
    const { general, data, point } = value;
    this.formGroup.patchValue({
      general,
      data,
      point,
    });
  }

  getValue(): IBarChartProperties {
    return this.formGroup.value as IBarChartProperties;
  }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destory$))
      .subscribe((value) => {
        this.app.updateProps(value);
      });
  }
}
