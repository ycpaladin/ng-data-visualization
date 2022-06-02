import { Type } from "@angular/core";
import { IWidget, IWidgetProperties } from "./widget";

export interface Store {
  components: ComponentTypes;
  dancer: Map<IWidget, IWidgetProperties>; // 舞台上的所有的图表
  currentSelected: IWidget|null;
}

export type ComponentTypes = { [K: string]: Comp[] };

export interface Comp {
  name: string;
  icon: string;
  type: Type<IWidget>;
}
