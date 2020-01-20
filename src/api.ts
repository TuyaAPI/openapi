import * as crypto from 'crypto';
import got, {Got, Response} from 'got';

interface TuyaResponse {
  msg: string;
  t: number;
  success: boolean;
  result: object;
}

class OpenAPI {
  public tokenAccess: string;
  public tokenRefresh: string;
  public tokenExpiresAt: Date;
  public schema: string;

  private readonly _client: Got;
  private readonly _key: string;
  private readonly _secret: string;

  constructor({key, secret, schema}: {key: string; secret: string; schema: string}) {
    this.tokenAccess = '';
    this.tokenRefresh = '';
    this.tokenExpiresAt = new Date();

    this._key = key;
    this._secret = secret;
    this.schema = schema;

    this._client = got.extend({
      responseType: 'json',
      prefixUrl: 'https://openapi.tuyaus.com/v1.0/',
      headers: {
        _client_id: this._key,
        sign_method: 'HMAC-SHA256'
      },
      hooks: {
        beforeRequest: [
          async options => {
            if (this.isTokenExpired() && !options.url.toString().includes('token')) {
              await this.refreshToken();
            }

            const now = new Date().getTime();
            options.headers.t = now.toString();

            // Caculate signature
            let sign = '';

            if (this.tokenAccess === '') {
              sign = crypto
                .createHmac('sha256', this._secret)
                .update(`${this._key}${now}`)
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
            const body = response.body as TuyaResponse;

            if (!body.success) {
              throw new Error(body.msg);
            }

            response.body = body.result as TuyaResponse;

            return response;
          }
        ]
      }
    });
  }

  // Authorization methods
  isTokenExpired(): boolean {
    return new Date().getTime() > this.tokenExpiresAt.getTime();
  }

  async getToken(): Promise<void> {
    const {body: {access_token, refresh_token, expire_time}} = await this._client.get('token?grant_type=1');

    this.tokenAccess = access_token;
    this.tokenRefresh = refresh_token;
    this.tokenExpiresAt = new Date(new Date().getTime() + (expire_time * 1000));
  }

  async refreshToken(): Promise<void> {
    const {body: {access_token, refresh_token, expire_time}} = await this._client.get(`token/${this.tokenRefresh}`);

    this.tokenAccess = access_token;
    this.tokenRefresh = refresh_token;
    this.tokenExpiresAt = new Date(new Date().getTime() + (expire_time * 1000));
  }

  // API methods
  async putUser({countryCode, username, password, usernameType, nickname}: {countryCode: string; username: string; password: string; usernameType: string; nickname: string}): Promise<string> {
    const req = {
      schema: this.schema,
      country_code: countryCode,
      username,
      password,
      username_type: usernameType,
      nick_name: nickname
    };

    const res = await this._client.post(`apps/${this.schema}/user`, {
      json: req
    });

    interface UserResponse {
      uid: string;
    }

    const {uid}: {uid: string} = res.body as unknown as UserResponse;

    return uid;
  }

  async getUsers({pageNumber, pageSize}: {pageNumber: number; pageSize: number} = {pageNumber: 1, pageSize: 100}): Promise<object> {
    const res = await this._client.get(`apps/${this.schema}/users`, {
      searchParams: {
        page_no: pageNumber,
        page_size: pageSize
      }
    });

    return res.body as unknown as object;
  }

  async getDeviceToken({uid, timezone}: {uid: string; timezone: string}): Promise<string> {
    const res = await this._client.post('devices/token', {
      json: {
        uid,
        timeZoneId: timezone
      }
    });

    return res.body;
  }

  async getDevicesByToken(token: string): Promise<object> {
    const res = await this._client.get(`devices/tokens/${token}`);

    return res.body as unknown as object;
  }
}

module.exports = OpenAPI;
