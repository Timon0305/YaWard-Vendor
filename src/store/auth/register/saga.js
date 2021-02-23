import React from "react";
import { takeEvery, fork, all} from 'redux-saga/effects';

import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { REGISTER_USER } from './actionTypes';
import {webUrl} from "../../../config";

const url = webUrl + '/v2/api/vendor/users/register';


function* registerUser({ payload: { user } }) {

    console.log(user)
    axios.post(url, user)
        .then(response => {
            alert(response.data['msg']);
            if (response.data['success'] === true)
                return (<Redirect to='vendor/login' />);
            return false;
        })
        .catch((err) => {
            let message;
            if (err.response && err.response.status ) {
                switch (err.response.status) {
                    case 404: message = "Sorry! the page you are looking for could not be found"; break;
                    case 500: message = "Sorry! something went wrong, please contact our support team"; break;
                    case 401: message = "Invalid credentials"; break;
                    default: message = err[1]; break;
                }
            }
            throw message;
        });
    // try {
    //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //         const response = yield call(fireBaseBackend.registerUser, user.email, user.password);
    //         yield put(registerUserSuccessful(response));
    //     }
    //     else {
    //         const response = yield call(postRegister, '/post-register', user);
    //         yield put(registerUserSuccessful(response));
    //     }
    // } catch (error) {
    //     yield put(registerUserFailed(error));
    // }
}

export function* watchUserRegister() {
    yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
    yield all([fork(watchUserRegister)]);
}

export default accountSaga;