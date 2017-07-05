import { expect } from 'chai';
import {
  AuthManager,
  LOGIN_TYPE_FACEBOOK,
  LOGIN_TYPE_GOOGLEPLUS,
  LOGIN_TYPE_PINGID,
  LOGIN_TYPE_CIMA,
  LOGIN_TYPE_SSO
} from './index';
import Config from '../config.json';

describe('anonymousLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('anonymousLoginLogout', () => {
  it('should logout successfully', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
        done();
      }, (error) => {
        console.log(error);
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('anonymousLoginDecodeToken', () => {
  it('should logout successfully', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.anonymousLogin('UserName', (data) => {
      expect(data).to.have.property('Token');
      const decoded = authMgr.decodeToken(data.Token);
      expect(decoded.header.alg).to.equal('ES256');
      expect(decoded.header.typ).to.equal('JWT');
      expect(decoded.payload.iss).to.equal('irisauth');
      done();
    }, (error) => {
      console.log(error);
      expect(true).to.be.false;
      done();
    });
  });
});

describe('emailRegister', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.emailRegister('UserName', 'test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      const responseBody = error.response;
      expect(responseBody.status).to.equal(401);
      done();
    });
  });
});

describe('emailLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('emailDecodeToken', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      const decodedToken = authMgr.decodeToken(data.Token);
      console.log(decodedToken);
      expect(decodedToken.header).to.exists;
      expect(decodedToken.payload).to.exists;
      expect(decodedToken.signature).to.exists;
      done();
    });
  });
});

describe('emailLoginGetUserInformation', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      authMgr.userInformation(data.Token, (data) => {
        expect(data.Id).to.exists;
        expect(data.User_data).to.exists;
        expect(data.idmapping_count).to.exists;
        expect(data.User_data.email).to.equal('test1@test.com');
        expect(data.User_data.name).to.equal('UserName');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('emailLoginValidateAccessToken', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      authMgr.validateUserAccessToken(data.Token, (data) => {
        expect(data.message).to.equal('Valid token');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('emailLoginLogout', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.emailLogin('test1@test.com', 'password', (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('deviceRegister', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.deviceRegister('someuniquedeviceid', (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      const responseBody = error.response;
      expect(responseBody.status).to.equal(401);
      done();
    });
  });
});

describe('deviceLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.deviceLogin('someuniquedeviceid', (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('deviceLoginGetUserInformation', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.deviceLogin('someuniquedeviceid', (data) => {
      expect(data).to.have.property('Token');
      authMgr.userInformation(data.Token, (data) => {
        expect(data.Id).to.exists;
        expect(data.User_data).to.exists;
        expect(data.idmapping_count).to.exists;
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('deviceLoginValidateAccessToken', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.deviceLogin('someuniquedeviceid', (data) => {
      expect(data).to.have.property('Token');
      authMgr.validateUserAccessToken(data.Token, (data) => {
        expect(data.message).to.equal('Valid token');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('deviceLoginLogout', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.deviceLogin('someuniquedeviceid', (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('facebookRegister', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaRegister(LOGIN_TYPE_FACEBOOK, Config.facebook_token, (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      const responseBody = error.response;
      expect(responseBody.status).to.equal(401);
      done();
    });
  });
});

describe('facebookLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_FACEBOOK, Config.facebook_token, (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('facebookLoginGetUserInformation', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_FACEBOOK, Config.facebook_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.userInformation(data.Token, (data) => {
        expect(data.Id).to.exists;
        expect(data.User_data).to.exists;
        expect(data.idmapping_count).to.exists;
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('facebookLoginValidateAccessToken', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_FACEBOOK, Config.facebook_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.validateUserAccessToken(data.Token, (data) => {
        expect(data.message).to.equal('Valid token');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('facebookLoginLogout', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_FACEBOOK, Config.facebook_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('googleRegister', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaRegister(LOGIN_TYPE_GOOGLEPLUS, Config.google_token, (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      const responseBody = error.response;
      expect(responseBody.status).to.equal(401);
      done();
    });
  });
});

describe('googleLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_GOOGLEPLUS, Config.google_token, (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('googleLoginGetUserInformation', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_GOOGLEPLUS, Config.google_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.userInformation(data.Token, (data) => {
        expect(data.Id).to.exists;
        expect(data.User_data).to.exists;
        expect(data.idmapping_count).to.exists;
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('googleLoginValidateAccessToken', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_GOOGLEPLUS, Config.google_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.validateUserAccessToken(data.Token, (data) => {
        expect(data.message).to.equal('Valid token');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('googleLoginLogout', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_GOOGLEPLUS, Config.google_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('cimaRegister', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaRegister(LOGIN_TYPE_CIMA, Config.cima_token, (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      const responseBody = error.response;
      expect(responseBody.status).to.equal(401);
      done();
    });
  });
});

describe('cimaLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_CIMA, Config.cima_token, (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('ssoRegister', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaRegister(LOGIN_TYPE_SSO, Config.sso_token, (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      const responseBody = error.response;
      expect(responseBody.status).to.equal(401);
      done();
    });
  });
});

describe('ssoLogin', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_SSO, Config.sso_token, (data) => {
      expect(data).to.have.property('Token');
      done();
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('ssoLoginLogout', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_SSO, Config.sso_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('cimaLoginGetUserInformation', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_CIMA, Config.cima_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.userInformation(data.Token, (data) => {
        expect(data.Id).to.exists;
        expect(data.User_data).to.exists;
        expect(data.idmapping_count).to.exists;
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('cimaLoginValidateAccessToken', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_CIMA, Config.cima_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.validateUserAccessToken(data.Token, (data) => {
        expect(data.message).to.equal('Valid token');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});

describe('cimaLoginLogout', () => {
  it('should get valid JWT', (done) => {
    let authMgr = new AuthManager(Config);
    authMgr.mediaLogin(LOGIN_TYPE_CIMA, Config.cima_token, (data) => {
      expect(data).to.have.property('Token');
      authMgr.logout(data.Token, (data) => {
        expect(data.status).to.equal('User logged out');
        done();
      }, (error) => {
        expect(true).to.be.false;
        done();
      });
    }, (error) => {
      expect(true).to.be.false;
      done();
    });
  });
});
