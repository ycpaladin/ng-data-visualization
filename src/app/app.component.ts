import { IWidgetProperties } from './interfaces/index';
import { getEditableComponents } from './components/widgets/decorators';
import { Component, Type, ViewChild } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store, IWidget } from './interfaces';
import { DancerComponent } from './components/dancer/dancer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [{ provide: ComponentStore, useExisting: AppComponent }],
})
export class AppComponent extends ComponentStore<Store> {
  title = 'editable-form';

  @ViewChild(DancerComponent, { static: true }) dancer!: DancerComponent;

  add(type: Type<any>) {
    this.dancer.add(type);
  }

  selected = this.updater((state: Store, widget: IWidget) => {
    return {
      ...state,
      currentSelected: widget,
    };
  });

  addWidgetToDancer = this.updater((state: Store, component: IWidget) => {
    state.dancer.set(component, component.getDefaultProps());
    return {
      ...state,
      // dancer: [...state.dancer, component],
      currentSelected: component,
    };
  });

  updatePoint = this.updater(
    (state: Store, { x, y }: { x: string; y: string }) => {
      const { point, ...rest } = state.dancer.get(state.currentSelected!)!;
      state.dancer.set(state.currentSelected!, {
        ...rest,
        point: {
          ...point!,
          x,
          y,
        },
      });
      return state;
    }
  );

  updateProps = this.updater((state: Store, props: IWidgetProperties) => {
    state.dancer.set(state.currentSelected!, props);
    return state;
  });

  currentSelectedProps = this.select((s) => s.dancer.get(s.currentSelected!));

  constructor() {
    super({
      components: getEditableComponents(),
      dancer: new Map(),
      currentSelected: null,
    });
  }
}
