import { takeEvery, fork, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
import { logoutUserSuccess, apiError } from './actions';

import { getFirebaseBackend } from '../../../helpers/firebase_helper';
import {webUrl} from "../../../config";
const fireBaseBackend = getFirebaseBackend();

const url = webUrl + '/v2/api/vendor/users/login';

function* loginUser({ payload: { user, history } }) {
    return axios.post(url, user).then(response => {
        if (response.data['success'] === false) {
            alert(response.data['msg']);
            return false;
        }
        else {
            localStorage.setItem('name', response.data['data']['username']);
            localStorage.setItem('authVendor', JSON.stringify(response['data']['token']));
            history.push('/')
        }

    }).catch(err => {
        throw err[1];
    });
}

function* logoutUser({ payload: { history } }) {
    try {
        sessionStorage.removeItem("authUser");

        if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
            const response = yield call(fireBaseBackend.logout);
            yield put(logoutUserSuccess(response));
        }
        history.push('/login');
    } catch (error) {
        yield put(apiError(error));
    }
}


export function* watchUserLogin() {
    yield takeEvery(LOGIN_USER, loginUser)
}

export function* watchUserLogout() {
    yield takeEvery(LOGOUT_USER, logoutUser)
}

function* authSaga() {
    yield all([
        fork(watchUserLogin),
        fork(watchUserLogout),
    ]);
}

export default authSaga;