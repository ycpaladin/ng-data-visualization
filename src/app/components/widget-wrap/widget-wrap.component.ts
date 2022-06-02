import { IWidget } from './../../interfaces/widget';
import { AppComponent } from './../../app.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Type,
  ViewChild,
  Injector,
  ElementRef,
  Output,
  EventEmitter,
  ComponentRef,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-widget-wrap',
  templateUrl: './widget-wrap.component.html',
  styleUrls: ['./widget-wrap.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetWrapComponent implements OnInit, OnDestroy {
  @Input() type!: Type<IWidget>;

  @Input() isDesignMode = true;
  @Output() pointChange = new EventEmitter<{ x: string; y: string }>();
  @Output() sizeChange = new EventEmitter<{ width: string; height: string }>();
  @ViewChild(CdkDrag, { static: true }) drag!: CdkDrag;
  @ViewChild(TemplateRef, { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  componentRef!: ComponentRef<IWidget>;
  destory$ = new Subject<void>();
  onSelected(): void {
    if (this.componentRef) {
      this.app.selected(this.componentRef.instance);
    }
  }

  getPoint() {
    const { element } = this.drag;
    const cssText = (element as ElementRef<HTMLElement>).nativeElement.style
      .transform;
    const [x, y] = cssText.match(/[0-9]{1,}px/g)!;
    // x.match(/translate3d\([0-9]\)/)
    return {
      x,
      y,
    };
  }

  cdkDragEnded(e: any) {
    // this.pointChange.emit(this.getPoint());
    this.app.updatePoint(this.getPoint());
  }

  constructor(
    private injector: Injector,
    private app: AppComponent,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.componentRef = this.container.createComponent(this.type, {
      injector: this.injector,
    });
    const { instance } = this.componentRef;
    instance.props = this.app
      .select((s) => {
        return s.dancer.get(instance)!;
      })
      .pipe(filter((p) => !!p));
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
