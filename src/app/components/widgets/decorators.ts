import { Type } from '@angular/core';
import {
  Comp,
  ComponentTypes,
  EditableOptions,
  IWidget,
  IWidgetPropertyEditor,
} from 'src/app/interfaces';

const map = new Map<string, Comp[]>();

const properties = new Map<Type<IWidget>, Type<IWidgetPropertyEditor>>();

export const getEditableComponents = (): ComponentTypes => {
  const obj = Object.create(null) as ComponentTypes;
  // {
  //   name: '布局',
  //   components: []
  // }
  map.forEach((v, k) => {
    obj[k] = v;
  });
  return obj;
};

export const getEditor = (widget: Type<IWidget>) => {
  return properties.get(widget)!;
};

export function Editable(options: EditableOptions) {
  const { type, name, editor } = options;
  const array = map.get(type) || [];
  map.set(type, array);
  return function (constructor: Type<IWidget>) {
    array.push({
      name,
      icon: '',
      type: constructor,
    });
    properties.set(constructor, editor);
  };
}
