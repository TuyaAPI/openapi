import {Device} from './device';

export interface TuyaResponse<T extends object | unknown> {
  msg: string;
  t: number;
  success: boolean;
  result: T;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expire_time: number;
}

export interface UsersResponse {
  has_more: boolean;
  list: Array<{
    create_time: number;
    email: string;
    uid: string;
    update_time: number;
    username: string;
  }>;
  total: number;
}

export interface DeviceTokenResponse {
  expire_time: number;
  region: string;
  secret: string;
  token: string;
}

export interface PairingResultResponse {
  errorDevices: Array<{
    device_id: string;
    product_id: string;
    name: string;
    category: string;
  }>;
  successDevices: Array<{
    device_id: string;
    code: string;
    msg: string;
    name: string;
  }>;
}

export interface DevicesResponse {
  total: number;
  devices: Device[];
  last_id?: string;
}
