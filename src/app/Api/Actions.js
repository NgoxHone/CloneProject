import Axios from 'axios';
import Utilities from '../Common/Utilities';
import Global from '../LocalData/Global';
import {getApi, postApi} from './Api';
import Constant from './Constants';
import {jwtDecode} from 'jwt-decode';
import {decode} from 'base-64';
global.atob = decode;

function post(url, data, headers = null, params = null, responseType = null) {
  const options = buildOptions(headers, params);
  if (responseType) {
    options['responseType'] = responseType;
  }
  return Axios.post(Global.API_URL + url, data, options);
}

function buildOptions(headers, params) {
  const options = {
    headers: headers
      ? headers
      : {'Content-Type': 'application/json; charset=utf8', platform: 'web'},
  };

  if (params) {
    options.params = params;
  }

  return options;
}

export const getMenu = async () => {
  const params = {};

  try {
    const res = await getApi(Constant.ACTION_GETMENU, params);

    return res.data;
  } catch (err) {
    throw new Error(`Failed to fetch menu: ${err.message}`);
  }
};

export const getPermission = async () => {
  const params = {};

  try {
    const res = await getApi(Constant.ACTION_PERMISSION, params);
    return res.data;
  } catch (err) {
    throw new Error(`Failed to fetch permission: ${err.message}`);
  }
};

export const guestLogin = async (username = 'guest', password = '1q2w3E*') => {
  const Iv = Utilities.generateIV();
  try {
    const result = await post(
      '/api/TokenAuth/Authenticate',
      {
        username,
        password: Utilities.encrypt(password, Iv),
      },
      {Iv},
    );
    if (result.status === 200) {
      Global.accessToken = result.data.result.accessToken;
      let user = jwtDecode(result.data.result.accessToken);

      return {success: true, user: user, data: result.data};
    } else {
      return {success: false, error: result.data};
    }
  } catch (error) {
    return {success: false, error};
  }
};

export const getDanhSachTauChay = async () => {
  const params = {};
  try {
    const res = await getApi(
      'https://tauca.nongnghiepcamau.vn/api/app/tauCaDangKy',
      params,
    );
    return res.data;
  } catch (err) {
    console.log('https://tauca.nongnghiepcamau.vn/api/app/tauCaDangKy', err);
  }
};
