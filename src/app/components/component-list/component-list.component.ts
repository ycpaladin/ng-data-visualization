import { AppComponent } from './../../app.component';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Store, ComponentTypes } from '../../interfaces';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentListComponent implements OnInit {
  componentType$!: Observable<ComponentTypes>;

  // cdkDropListConnectedTo!: any[];

  cdkDropListDropped(e: any) {
    console.log(e);
  }

  add(item: any) {
    (this.parent as any).add(item.type);
  }

  constructor(
    public parent: ComponentStore<Store>,
    public cdr: ChangeDetectorRef
  ) {
    this.componentType$ = parent.select((s) => s.components);
  }

  ngOnInit(): void {
    // this.cdkDropListConnectedTo = [(this.parent as AppComponent).dancer.dancer];
    // this.cdr.markForCheck();
    // console.log(this.parent)
  }
}
