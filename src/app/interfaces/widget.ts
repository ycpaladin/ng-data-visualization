import { Observable } from 'rxjs';
export interface IWidgetPoint {
  x: string;
  y: string;
  z: string;
  width: string;
  height: string;
}

export type IWidgetGeneral<E = {}> = {
  key: string;
  title: string;
  backgroundColor: string;
} & E;

/**
 * Widget 属性结构
 */
export type IWidgetProperties<G = {}> = {
  /**
   * 坐标属性
   */
  point?: IWidgetPoint;
  /**
   * 通用属性
   */
  general?: IWidgetGeneral<G>;

  /**
   * 数据配置
   */
  data?: {};
};

export interface IWidget<P = IWidgetProperties> {
  // new (...args: any[]): IWidget<P>;
  props: Observable<P>;

  getDefaultProps(): P;
}
