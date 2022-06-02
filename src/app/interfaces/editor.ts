import { IWidgetProperties } from './widget';

export interface IWidgetPropertyEditor<T = IWidgetProperties> {
  setValue(value: T): void;
  getValue(): T;
}
