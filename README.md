# Iris Auth JS SDK
## Introduction
This section describes JavaScript SDK for Iris Auth Manager.  This SDK is isomorphic and can be used both from the browser or node.  Package can be installed with

```
npm i iris-auth-js-sdk
```

or can be included from webpage from following cdn:

```
https://npmcdn.com/iris-auth-js-sdk@1.0.9/dist/iris.auth.min.js
```

## Registration – Social Media, Cima, SSO, or PingID
This API requires valid Facebook, Google, Cima, PingID access token.  The API will exchange the given access token for Iris JWT token.  The registration API validates provided token and uses the user information to create Iris user and returns JWT token that then can be used to access all other Iris platform APIs.

```
mediaRegister(type, mediaToken, successCallback, errorCallback)


type – LOGIN_TYPE_FACEBOOK, LOGIN_TYPE_GOOGLEPLUS, LOGIN_TYPE_PINGID, LOGIN_TYPE_SSO, LOGIN_TYPE_CIMA
mediaToken – token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
mediaRegisterAsync(type, mediaToken)


type – LOGIN_TYPE_FACEBOOK, LOGIN_TYPE_GOOGLEPLUS, LOGIN_TYPE_PINGID, LOGIN_TYPE_SSO, LOGIN_TYPE_CIMA
mediaToken – token

Returns promise that returns JSON payload on success and error on failure.
```

To get constants import them like this:
```
import {
  LOGIN_TYPE_FACEBOOK,
  LOGIN_TYPE_GOOGLEPLUS,
  LOGIN_TYPE_PINGID,
  LOGIN_TYPE_SSO,
  LOGIN_TYPE_CIMA
} from 'iris-auth-js-sdk';
```

## Registration – Email
Register using email.

```
emailRegister(username, email, password, successCallback, errorCallback)

username – user name like first name and last name with optional middle name
email – user’s email
password – user’s password
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
emailRegisterAsync(username, email, password)

username – user name like first name and last name with optional middle name
email – user’s email
password – user’s password

Returns promise that returns JSON payload on success and error on failure.
```

## Registration – Device
Register using device unique id.

```
emailRegister(typeId, successCallback, errorCallback)

typeId - device uunique id
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
emailRegisterAsync(typeId)

typeId - device uunique id

Returns promise that returns JSON payload on success and error on failure.
```

## Get User Information
This API allows to get user information associated with JWT token.  This API
can be used with any Iris token accept the ones obtained with anonymous login.

```
userInformation(token, successCallback, errorCallback)

token – Iris JWT access token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
userInformationAsync(token)

token – Iris JWT access token

Returns promise that returns JSON payload on success and error on failure.
```

## Validate Access Token
This API will validate if the token is valid.  This API
can be used with any Iris token accept the ones obtained with anonymous login.

```
validateUserAccessToken(token, successCallback, errorCallback)

token – Iris JWT access token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
validateUserAccessTokenAsync(token)

token – Iris JWT access token

Returns promise that returns JSON payload on success and error on failure.
```

Returns if the token is valid or not.

## Login - Social Media, SSO, Cima or PingID
Login using social media, SSO, Cima or PingID.

```
mediaLogin(type, mediaToken, successToken, errorCallback)

type – LOGIN_TYPE_FACEBOOK, LOGIN_TYPE_GOOGLEPLUS, LOGIN_TYPE_PINGID, LOGIN_TYPE_SSO, LOGIN_TYPE_CIMA
mediaToken – token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
mediaLoginAsync(type, mediaToken)

type – LOGIN_TYPE_FACEBOOK, LOGIN_TYPE_GOOGLEPLUS, LOGIN_TYPE_PINGID, LOGIN_TYPE_SSO, LOGIN_TYPE_CIMA
mediaToken – token

Returns promise that returns JSON payload on success and error on failure.
```

Returns Iris JWT access token.

## Email Login
Login using email.

```
emailLogin(email, password, successCallback, errorCallback)

email – user’s email
password – user’s password
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
emailLoginAsync(email, password)

email – user’s email
password – user’s password

Returns promise that returns JSON payload on success and error on failure.
```

Returns Iris JWT access token.

## Device Login
Register using device unique id.

```
deviceLogin(typeId, successCallback, errorCallback)

typeId - device uunique id
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
deviceLoginAsync(typeId, successCallback, errorCallback)

typeId - device uunique id

Returns promise that returns JSON payload on success and error on failure.
```

Returns Iris JWT access token.

## Anonymous Login
This API allows anonymous login.  This is useful if applications that do not require concept of user.

```
anonymousLogin(userID, successCallback, errorCallback)

userID – optional string with user name or id.  It can be empty.
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
anonymousLoginAsync(userID)

userID – optional string with user name or id.  It can be empty.

Returns promise that returns JSON payload on success and error on failure.
```


Returns Iris JWT access token.

## Logout
Logout API takes valid Iris JWT and adds it to blacklist so it cannot be used further to access Iris platform.

```
logout(token, successCallback, errorCallback)

token – Iris JWT token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

```
logoutAsync(token)

token – Iris JWT token

Returns promise that returns JSON payload on success and error on failure.
```

## Decode Iris JWT
This API will return object with decoded JWT’s header, claims and signature.

```
decodeToken(token)

token – valid Iris JWT token
```
# Example
After you npm i iris-auth-js-sdk you can test it out with the following code:

```
let irisAuth = require("iris-auth-js-sdk")
let authMgr = new irisAuth.AuthManager({"managementApiUrl": "<iris auth manager url>", "appKey": "<your app key>"})
authMgr.anonymousLogin("Some Name", (data) => { console.log(data); }, (error) => { console.log(error); })
```

or from the browser you can use cdn: https://npmcdn.com/iris-auth-js-sdk@1.0.9/dist/iris.auth.min.js

```
let authMgr = new irisAuth.AuthManager({"managementApiUrl": "<iris auth manager url>", "appkey": "<your app key>", "appsecret": "<your app secret"});
    console.log("Auth Manager:");
    authMgr.emailLogin("someemial@gmail.com", "password", (data) => {
      console.log(data);
      console.log(data.Token);
      let decoded = authMgr.decodeToken(data.Token);
      console.log(decoded);
      authMgr.validateUserAccessToken(data.Token, (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      });
    }, (error) => { console.log(error); })
```
