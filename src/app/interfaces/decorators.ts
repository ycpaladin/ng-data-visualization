import { Type } from "@angular/core";
import { IWidgetPropertyEditor } from "./editor";

export type EditableOptionType = '布局' | '图表';

export interface EditableOptions {
  name: string;
  type: EditableOptionType;
  editor: Type<IWidgetPropertyEditor>;
}
