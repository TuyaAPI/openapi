export interface Status<TCode = string, TValue = unknown> {
  code: TCode;
  value: TValue;
}

export interface Device {
  id: string;
  uid: string;
  local_key: string;
  category: string;
  product_id: string;
  sub: boolean;
  uuid: string;
  owner_id: string;
  online: boolean;
  name: string;
  ip: string;
  time_zone: string;
  create_time: number;
  update_time: string;
  active_time: number;
  status: Status[];

  biz_type?: number;
  icon?: string;
  model?: string;
  product_name?: string;
}
