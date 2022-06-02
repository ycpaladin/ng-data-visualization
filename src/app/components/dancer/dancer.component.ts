import { AppComponent } from './../../app.component';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  Type,
  ViewContainerRef,
  TemplateRef,
  ViewChildren,
  QueryList,
  ComponentRef,
  ChangeDetectorRef,
  Injector,
} from '@angular/core';
import { WidgetWrapComponent } from '../widget-wrap/widget-wrap.component';
import { IWidget } from 'src/app/interfaces';

@Component({
  selector: 'app-dancer',
  templateUrl: './dancer.component.html',
  styleUrls: ['./dancer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DancerComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true, read: ViewContainerRef })
  container!: ViewContainerRef; // <HTMLDivElement>;

  add(type: Type<any>) {
    const componentRef = this.container.createComponent(WidgetWrapComponent, {
      injector: this.injector,
    });
    componentRef.instance.type = type; // BarChartComponent; // e.item.data.type;
    componentRef.instance.pointChange.subscribe(console.log);
    // componentRef.instance
    this.cdr.markForCheck();
    setTimeout(() => {
      this.parent.addWidgetToDancer(
        (componentRef.instance as { componentRef: ComponentRef<IWidget> })
          .componentRef.instance
      );
    }, 0);
  }

  constructor(
    public parent: AppComponent,
    public cdr: ChangeDetectorRef,
    public injector: Injector
  ) {}

  ngOnInit(): void {}
}
