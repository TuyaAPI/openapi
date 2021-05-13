import * as crypto from 'crypto';
import got, {Got, Response} from 'got';
import {Device} from './device';
import {
  DevicesResponse,
  DeviceTokenResponse,
  PairingResultResponse,
  TokenResponse,
  TuyaResponse,
  UsersResponse
} from './responses';

// Re-export common types for further manipulation by consumers
export {Device, Status} from './device';

export class OpenAPI {
  public tokenAccess: string;
  public tokenRefresh: string;
  public tokenExpiresAt: Date;
  public schema: string;
  public handleToken: boolean;

  private readonly _client: Got;
  private readonly _key: string;
  private readonly _secret: string;

  constructor({key, secret, schema, region = 'us', handleToken = false}: {key: string; secret: string; schema: string; region: string; handleToken: boolean}) {
    this.tokenAccess = '';
    this.tokenRefresh = '';
    this.tokenExpiresAt = new Date();

    this._key = key;
    this._secret = secret;
    this.schema = schema;
    this.handleToken = handleToken;

    this._client = got.extend({
      responseType: 'json',
      prefixUrl: `https://openapi.tuya${region}.com/v1.0/`,
      headers: {
        client_id: this._key,
        sign_method: 'HMAC-SHA256'
      },
      hooks: {
        beforeRequest: [
          async options => {
            const isTokenUrl: boolean = options.url.toString().includes('token');

            if (!isTokenUrl && this.tokenAccess === '' && this.handleToken) {
              await this.getToken();
            }

            if (!isTokenUrl && this.isTokenExpired()) {
              await this.refreshToken();
            }

            const now = Date.now();
            options.headers.t = now.toString();

            // Calculate signature
            let sign = '';

            if (isTokenUrl) {
              sign = crypto
                .createHmac('sha256', this._secret)
                .update(this._key + now.toString())
                .digest('hex').toUpperCase();
            } else {
              sign = crypto
                .createHmac('sha256', this._secret)
                .update(`${this._key}${this.tokenAccess}${now}`)
                .digest('hex').toUpperCase();

              options.headers.access_token = this.tokenAccess;
            }

            options.headers.sign = sign;
          }
        ],
        afterResponse: [
          (response: Response) => {
            const body = response.body as TuyaResponse<unknown>;

            if (!body.success) {
              throw new Error(body.msg);
            }

            response.body = body.result;

            return response;
          }
        ]
      }
    });
  }

  // Authorization methods
  isTokenExpired(): boolean {
    return Date.now() > this.tokenExpiresAt.getTime();
  }

  async getToken(): Promise<void> {
    if (this.handleToken) {
      throw new HandleTokenError();
    }

    const {body: {access_token, refresh_token, expire_time}} = await this._client.get<TokenResponse>('token?grant_type=1');

    this.tokenAccess = access_token;
    this.tokenRefresh = refresh_token;
    this.tokenExpiresAt = new Date(Date.now() + (expire_time * 1000));
  }

  async refreshToken(): Promise<void> {
    const {body: {access_token, refresh_token, expire_time}} = await this._client.get<TokenResponse>(`token/${this.tokenRefresh}`);

    this.tokenAccess = access_token;
    this.tokenRefresh = refresh_token;
    this.tokenExpiresAt = new Date(Date.now() + (expire_time * 1000));
  }

  // API methods
  async putUser({countryCode, username, password, usernameType, nickname}: {countryCode: string; username: string; password: string; usernameType: string; nickname: string}): Promise<string> {
    const request = {
      schema: this.schema,
      country_code: countryCode,
      username,
      password,
      username_type: usernameType,
      nick_name: nickname
    };

    interface UserResponse {
      uid: string;
    }

    const response = await this._client.post<UserResponse>(`apps/${this.schema}/user`, {
      json: request
    });

    return response.body.uid;
  }

  async getUsers({pageNumber, pageSize}: {pageNumber: number; pageSize: number} = {pageNumber: 1, pageSize: 100}): Promise<UsersResponse> {
    const response = await this._client.get<UsersResponse>(`apps/${this.schema}/users`, {
      searchParams: {
        page_no: pageNumber,
        page_size: pageSize
      }
    });
    return response.body;
  }

  async getDeviceToken({uid, timezone}: {uid: string; timezone: string}): Promise<DeviceTokenResponse> {
    const response = await this._client.post<DeviceTokenResponse>('devices/token', {
      json: {
        uid,
        timeZoneId: timezone
      }
    });

    return response.body;
  }

  async getDevicesByToken(token: string): Promise<PairingResultResponse> {
    const response = await this._client.get<PairingResultResponse>(`devices/tokens/${token}`);

    return response.body;
  }

  async getDevicesByUser(uid: string): Promise<Device[]> {
    const response = await this._client.get<Device[]>(`users/${uid}/devices`);

    return response.body;
  }

  async getDevices({ids, pageNumber = 0, pageSize = 100}: {ids?: string[]; pageNumber: number; pageSize: number} = {pageNumber: 0, pageSize: 100}): Promise<DevicesResponse> {
    const searchParameters: any = {
      schema: this.schema,
      page_no: pageNumber,
      page_size: pageSize
    };

    if (ids) {
      searchParameters.device_ids = ids.toString();
    }

    const response = await this._client.get<DevicesResponse>('devices', {searchParams: searchParameters});

    return response.body;
  }

  async getDevice(deviceId: string): Promise<Device> {
    const response = await this._client.get<Device>(`devices/${deviceId}`);

    return response.body;
  }

  async getDeviceStatus(deviceId: string): Promise<Device['status']> {
    const response = await this._client.get<Device['status']>(`devices/${deviceId}/status`);

    return response.body;
  }

  async getSubDevicesOfZigbeeGateway(deviceId: string): Promise<Device> {
    const response = await this._client.get<Device>(`devices/${deviceId}/sub-devices`);

    return response.body;
  }
}

class HandleTokenError extends Error {
  constructor() {
    super('Token acquisition is automatically handled.');
  }
}

module.exports = OpenAPI;
