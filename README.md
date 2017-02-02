# Iris Auth JS SDK
## Introduction
This section describes JavaScript SDK for Iris Auth Manager.  This SDK is isomorphic and can be used both from the browser or node.  Package can be installed with

```
npm i iris-auth-js-sdk
```

or can be included from webpage from following cdn:

```
https://npmcdn.com/iris-auth-js-sdk@1.0.7/dist/iris.auth.min.js
```

## Registration – Social Media
Register user using social media.  This approach requires valid Facebook or Google access token that can be obtained using Facebook or Google SDKs.  The following API will exchange Facebook or Google access token for Iris JWT token.  The registration API validates provided social media token and uses the user information to create Iris user and returns JWT token that then can be used to access all other Iris platform APIs.

```
mediaRegister(type, mediaToken, successCallback, errorCallback)


type – “Facebook” or “Google Plus”
mediaToken – social media access token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
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

## Get User Information
This API allows to get user information associated with JWT token.

```
userInformation(token, successCallback, errorCallback)

token – Iris JWT access token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

## Validate Access Token
This API will validate if the token is valid.

```
validateUserAccessToken(token, successCallback, errorCallback)

token – Iris JWT access token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
```

Returns if the token is valid or not.

## Social Login
Login using social media.

```
socialLogin(type, mediaToken, successToken, errorCallback)

type – “Facebook” or “Google Plus”
mediaToken – social media access token
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
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

Returns Iris JWT access token.

## Anonymous Login
This API allows anonymous login.  This is useful if applications that do not require concept of user.

```
anonymousLogin(userID, successCallback, errorCallback)

userID – optional string with user name or id.  It can be empty.
successCallback – when API succeeds this callback will receive JSON response.
failureCallback – in case of failure error information will be passed into this callback.
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

or from the browser you can use cdn: https://npmcdn.com/iris-auth-js-sdk@1.0.2/dist/iris.auth.min.js

```
let authMgr = new irisAuth.AuthManager({"managementApiUrl": "<iris auth manager url>", "appKey": "<your app key>"});
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
