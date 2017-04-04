import Fetch from 'isomorphic-fetch';
import jws from 'jws';

export const LOGIN_TYPE_FACEBOOK = "Facebook"
export const LOGIN_TYPE_GOOGLEPLUS = "Google Plus"
export const LOGIN_TYPE_PINGID = "PingID"
export const LOGIN_TYPE_CIMA = "Cima"
const LOGIN_TYPE_EMAIL = "Email"
const LOGIN_TYPE_ANONYMOUS = "Anonymous"
const LOGIN_TYPE_DEVICE = "Device"
const LOGIN_TYPE_SERVER = "Server"

const getAuthString = (config) => {
  const plainAuth = config.appkey + ':' + config.appsecret;
  const buffer = new Buffer(plainAuth);
  const base64Auth = buffer.toString('base64');
  return base64Auth;
}

export class AuthManager {
  constructor(config) {
    this.config = config;
  }

  _checkStatus(response) {
    console.log('response status: ' + response.status);
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  _parseJSON(response) {
    return response.json();
  }

  deviceRegister(typeId, successCallback, errorCallback) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.managementApiUrl + 'user/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'Type': LOGIN_TYPE_DEVICE,
        'TypeID': typeId,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Device register failed: ' + error);
      errorCallback(error);
    });
  }

  mediaRegister(type, mediaToken, successCallback, errorCallback) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.managementApiUrl + 'user/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'Type': type,
        'MediaToken': mediaToken,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Social media register failed: ' + error);
      errorCallback(error);
    });
  }

  emailRegister(username, email, password, successCallback, errorCallback) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.managementApiUrl + 'user/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'Type': LOGIN_TYPE_EMAIL,
        'Email': email,
        'Password': password,
        'Name': username,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Email register failed: ' + error);
      errorCallback(error);
    });
  }

  userInformation(token, successCallback, errorCallback) {
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Bearer ${token}`);
    return fetch(this.config.managementApiUrl + 'user/current', {
      method: 'GET',
      headers: requestHeader,
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Get user information failed: ' + error);
      errorCallback(error);
    });
  }

  validateUserAccessToken(token, successCallback, errorCallback) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.managementApiUrl + 'user/validate?access_token=' + token, {
      method: 'GET',
      headers: requestHeader,
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Validate user token failed: ' + error);
      errorCallback(error);
    });
  }

  deviceLogin(typeId, successCallback, errorCallback) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.managementApiUrl + 'login/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'Type': LOGIN_TYPE_DEVICE,
        'TypeID': typeId,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Device login failed: ' + error);
      errorCallback(error);
    });
  }

  serverLogin(typeId, successCallback, errorCallback) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.managementApiUrl + 'login/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'Type': LOGIN_TYPE_SERVER,
        'TypeId': typeId,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Server login failed: ' + error);
      errorCallback(error);
    });
  }

  mediaLogin(type, mediaToken, successCallback, errorCallback) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.managementApiUrl + 'login/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'Type': type,
        'MediaToken': mediaToken,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Social media login failed: ' + error);
      errorCallback(error);
    });
  }

  emailLogin(email, password, successCallback, errorCallback) {
    const base64Auth = getAuthString(this.config);
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Basic ${base64Auth}`);
    return fetch(this.config.managementApiUrl + 'login/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'Type': LOGIN_TYPE_EMAIL,
        'Email': email,
        'Password': password,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Email login failed: ' + error);
      errorCallback(error);
    });
  }

  anonymousLogin(userID, successCallback, errorCallback) {
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('X-App-Key', this.config.appkey);
    return fetch(this.config.managementApiUrl + 'login/anonymous/', {
      method: 'POST',
      headers: requestHeader,
      body: JSON.stringify({
        'UserID': userID,
      }),
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Anonymous login failed: ' + error);
      errorCallback(error);
    });
  }

  logout(token, successCallback, errorCallback) {
    const requestHeader = new Headers();
    requestHeader.append('Content-Type', 'application/json');
    requestHeader.append('Authorization', `Bearer ${token}`);
    return fetch(this.config.managementApiUrl + 'logout/', {
      method: 'GET',
      headers: requestHeader,
    })
    .then(this._checkStatus)
    .then(this._parseJSON)
    .then((data) => {
      successCallback(data);
    })
    .catch((error) => {
      console.log('Logout failed: ' + error);
      errorCallback(error);
    });
  }

  decodeToken(token) {
    let decoded = jws.decode(token);
    if (!decoded) {
      return null;
    }
    let payload = decoded.payload;

    //try parse the payload
    if(typeof payload === 'string') {
      try {
        let obj = JSON.parse(payload);
        if(typeof obj === 'object') {
          payload = obj;
        }
      } catch (e) { }
    }

    return {
      header: decoded.header,
      payload: payload,
      signature: decoded.signature
    };
  }
}
