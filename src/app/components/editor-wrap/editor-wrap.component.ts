import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Injector,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
} from '@angular/core';
import { filter, pairwise, takeUntil, withLatestFrom } from 'rxjs/operators';
import { AppComponent } from './../../app.component';
import { IWidgetPropertyEditor } from 'src/app/interfaces';
import { getEditor } from '../widgets/decorators';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-editor-wrap',
  templateUrl: './editor-wrap.component.html',
  styleUrls: ['./editor-wrap.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorWrapComponent implements OnInit, OnDestroy {
  destory$ = new Subject<void>();
  componentRef!: ComponentRef<IWidgetPropertyEditor>;

  @ViewChild(TemplateRef, { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  constructor(
    public app: AppComponent,
    public cdr: ChangeDetectorRef,
    private injector: Injector
  ) {
    const current$ = app
      .select((s) => s.currentSelected)
      .pipe(
        pairwise(),
        filter(([prev, curr]) => {
          // console.log(prev, curr, prev === curr);
          return prev != curr;
        })
      );
    const props$ = this.app.currentSelectedProps;

    // combineLatest([current$, props$])
    current$
      .pipe(withLatestFrom(props$), takeUntil(this.destory$))
      .subscribe(([[, widget], props]) => {
        if (!this.container) {
          return;
        }
        this.container.clear();
        if (widget) {
          const editor = getEditor((widget as any).__proto__.constructor); // as ComponentType<IWidgetPropertyEditor>; // TODO
          this.componentRef = this.container.createComponent(editor, {
            injector: this.injector,
          });
          if (props) {
            this.componentRef.instance.setValue(props!);
          }
        } else {
          if (this.componentRef) {
            this.componentRef.destroy();
          }
        }
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
    this.destory$.next();
    this.destory$.complete();
  }
}
