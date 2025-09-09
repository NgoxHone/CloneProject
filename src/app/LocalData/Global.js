const devNum = 1;
const url = ['http://appcsc.csctech.vn:81', 'http://appcsc.csctech.vn:81'];
const webUrl = ['http://appcsc.csctech.vn:81', 'http://appcsc.csctech.vn:81'];
module.exports = {
  PRODUCTION: !__DEV__,
  API_URL: url[devNum],
  ParticipantId: null,
  prevParticipantId: null,
  AES_KEY: 'C0nt3ntManag3m3ntSyst3m_hgt!16kl',
  accessToken: '',
  userProfile: null,
  // RootId: '7c01146a-341d-7f19-2132-39fdb4e5e36a',
  // GoogleMapApiKey: 'AIzaSyCUt0Kgv2KzM0xGLot6rnzOIyJHhbT6L9w',
  GoogleNotifyToken: '',
  WebviewUrl: webUrl[devNum],
  RoleName: [],
  MenuRole: [],
  currentScreen: 'Home',
  globalParams: null,
  UserId: null,
  AppInfomations: null,
  updateVersionAppName: 'AppDemo',
};
