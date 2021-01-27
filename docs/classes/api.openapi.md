[@tuyapi/openapi](../README.md) / [Exports](../modules.md) / [api](../modules/api.md) / OpenAPI

# Class: OpenAPI

[api](../modules/api.md).OpenAPI

## Hierarchy

* **OpenAPI**

## Table of contents

### Constructors

- [constructor](api.openapi.md#constructor)

### Properties

- [\_client](api.openapi.md#_client)
- [\_key](api.openapi.md#_key)
- [\_secret](api.openapi.md#_secret)
- [handleToken](api.openapi.md#handletoken)
- [schema](api.openapi.md#schema)
- [tokenAccess](api.openapi.md#tokenaccess)
- [tokenExpiresAt](api.openapi.md#tokenexpiresat)
- [tokenRefresh](api.openapi.md#tokenrefresh)

### Methods

- [getDevice](api.openapi.md#getdevice)
- [getDeviceStatus](api.openapi.md#getdevicestatus)
- [getDeviceToken](api.openapi.md#getdevicetoken)
- [getDevices](api.openapi.md#getdevices)
- [getDevicesByToken](api.openapi.md#getdevicesbytoken)
- [getDevicesByUser](api.openapi.md#getdevicesbyuser)
- [getToken](api.openapi.md#gettoken)
- [getUsers](api.openapi.md#getusers)
- [isTokenExpired](api.openapi.md#istokenexpired)
- [putUser](api.openapi.md#putuser)
- [refreshToken](api.openapi.md#refreshtoken)

## Constructors

### constructor

\+ **new OpenAPI**(`__namedParameters`: { `handleToken`: *boolean* ; `key`: *string* ; `region`: *string* ; `schema`: *string* ; `secret`: *string*  }): [*OpenAPI*](api.openapi.md)

#### Parameters:

• **__namedParameters**: *object*

Name | Type |
------ | ------ |
`handleToken` | *boolean* |
`key` | *string* |
`region` | *string* |
`schema` | *string* |
`secret` | *string* |

**Returns:** [*OpenAPI*](api.openapi.md)

Defined in: [api.ts:25](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L25)

## Properties

### \_client

• `Private` `Readonly` **\_client**: *Got*

Defined in: [api.ts:23](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L23)

___

### \_key

• `Private` `Readonly` **\_key**: *string*

Defined in: [api.ts:24](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L24)

___

### \_secret

• `Private` `Readonly` **\_secret**: *string*

Defined in: [api.ts:25](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L25)

___

### handleToken

• **handleToken**: *boolean*

Defined in: [api.ts:21](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L21)

___

### schema

• **schema**: *string*

Defined in: [api.ts:20](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L20)

___

### tokenAccess

• **tokenAccess**: *string*

Defined in: [api.ts:17](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L17)

___

### tokenExpiresAt

• **tokenExpiresAt**: Date

Defined in: [api.ts:19](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L19)

___

### tokenRefresh

• **tokenRefresh**: *string*

Defined in: [api.ts:18](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L18)

## Methods

### getDevice

▸ **getDevice**(`deviceId`: *string*): *Promise*<[*Device*](../interfaces/device.device-1.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`deviceId` | *string* |

**Returns:** *Promise*<[*Device*](../interfaces/device.device-1.md)\>

Defined in: [api.ts:193](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L193)

___

### getDeviceStatus

▸ **getDeviceStatus**(`deviceId`: *string*): *Promise*<[*Status*](../interfaces/device.status.md)<*string*, *unknown*\>[]\>

#### Parameters:

Name | Type |
------ | ------ |
`deviceId` | *string* |

**Returns:** *Promise*<[*Status*](../interfaces/device.status.md)<*string*, *unknown*\>[]\>

Defined in: [api.ts:199](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L199)

___

### getDeviceToken

▸ **getDeviceToken**(`__namedParameters`: { `timezone`: *string* ; `uid`: *string*  }): *Promise*<[*DeviceTokenResponse*](../interfaces/responses.devicetokenresponse.md)\>

#### Parameters:

• **__namedParameters**: *object*

Name | Type |
------ | ------ |
`timezone` | *string* |
`uid` | *string* |

**Returns:** *Promise*<[*DeviceTokenResponse*](../interfaces/responses.devicetokenresponse.md)\>

Defined in: [api.ts:154](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L154)

___

### getDevices

▸ **getDevices**(`__namedParameters?`: { `ids?`: *undefined* \| *string*[] ; `pageNumber`: *number* ; `pageSize`: *number*  }): *Promise*<[*DevicesResponse*](../interfaces/responses.devicesresponse.md)\>

#### Parameters:

• **__namedParameters**: *object*

Name | Type |
------ | ------ |
`ids?` | *undefined* \| *string*[] |
`pageNumber` | *number* |
`pageSize` | *number* |

**Returns:** *Promise*<[*DevicesResponse*](../interfaces/responses.devicesresponse.md)\>

Defined in: [api.ts:177](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L177)

___

### getDevicesByToken

▸ **getDevicesByToken**(`token`: *string*): *Promise*<[*PairingResultResponse*](../interfaces/responses.pairingresultresponse.md)\>

#### Parameters:

Name | Type |
------ | ------ |
`token` | *string* |

**Returns:** *Promise*<[*PairingResultResponse*](../interfaces/responses.pairingresultresponse.md)\>

Defined in: [api.ts:165](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L165)

___

### getDevicesByUser

▸ **getDevicesByUser**(`uid`: *string*): *Promise*<[*Device*](../interfaces/device.device-1.md)[]\>

#### Parameters:

Name | Type |
------ | ------ |
`uid` | *string* |

**Returns:** *Promise*<[*Device*](../interfaces/device.device-1.md)[]\>

Defined in: [api.ts:171](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L171)

___

### getToken

▸ **getToken**(): *Promise*<*void*\>

**Returns:** *Promise*<*void*\>

Defined in: [api.ts:102](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L102)

___

### getUsers

▸ **getUsers**(`__namedParameters?`: { `pageNumber`: *number* ; `pageSize`: *number*  }): *Promise*<[*UsersResponse*](../interfaces/responses.usersresponse.md)\>

#### Parameters:

• **__namedParameters**: *object*

Name | Type |
------ | ------ |
`pageNumber` | *number* |
`pageSize` | *number* |

**Returns:** *Promise*<[*UsersResponse*](../interfaces/responses.usersresponse.md)\>

Defined in: [api.ts:144](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L144)

___

### isTokenExpired

▸ **isTokenExpired**(): *boolean*

**Returns:** *boolean*

Defined in: [api.ts:98](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L98)

___

### putUser

▸ **putUser**(`__namedParameters`: { `countryCode`: *string* ; `nickname`: *string* ; `password`: *string* ; `username`: *string* ; `usernameType`: *string*  }): *Promise*<*string*\>

#### Parameters:

• **__namedParameters**: *object*

Name | Type |
------ | ------ |
`countryCode` | *string* |
`nickname` | *string* |
`password` | *string* |
`username` | *string* |
`usernameType` | *string* |

**Returns:** *Promise*<*string*\>

Defined in: [api.ts:123](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L123)

___

### refreshToken

▸ **refreshToken**(): *Promise*<*void*\>

**Returns:** *Promise*<*void*\>

Defined in: [api.ts:114](https://github.com/TuyaAPI/openapi/blob/cd8f3c7/src/api.ts#L114)
