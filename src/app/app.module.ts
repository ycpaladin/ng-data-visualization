import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { ComponentListComponent } from './components/component-list/component-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DancerComponent } from './components/dancer/dancer.component';
import {
  GridComponent,
  GridEditorComponent,
} from './components/widgets/grid/grid.component';
import { WidgetWrapComponent } from './components/widget-wrap/widget-wrap.component';
import { BarChartComponent } from './components/widgets/bar-chart/bar-chart.component';
import { PortalModule } from '@angular/cdk/portal';
import { BarChartEditorComponent } from './components/widgets/bar-chart/bar-chart-editor.component';
import { EditorWrapComponent } from './components/editor-wrap/editor-wrap.component';
import { LineChartComponent } from './components/widgets/line-chart/line-chart.component';
import { LineChartEditorComponent } from './components/widgets/line-chart/line-chart-editor.component';
import { NgxEchartsModule } from 'ngx-echarts';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ComponentListComponent,
    DancerComponent,
    GridComponent,
    GridEditorComponent,
    WidgetWrapComponent,
    BarChartComponent,
    BarChartEditorComponent,
    EditorWrapComponent,
    LineChartComponent,
    LineChartEditorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    PortalModule,
    NzLayoutModule,
    NzGridModule,
    NzFormModule,
    NzCollapseModule,
    NzInputModule,
    NzInputNumberModule,
    NzListModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent],
})
export class AppModule {}
