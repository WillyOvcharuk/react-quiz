import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT} from './actionTypes'

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/relyingparty/signupNewUser?key=AIzaSyCqS-nBVhmN7o95wuvJSSA8hTts3aR9CF4';

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqS-nBVhmN7o95wuvJSSA8hTts3aR9CF4'
        }
        const response = await axios.post(url, authData)
        const data = response.data

        const expirationDate = new Date(new Date.getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.IsToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', data.expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))
        // try{
        //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?keyAIzaSyCqS-nBVhmN7o95wuvJSSA8hTts3aR9CF4', authData)
        //     console.log(response.data)
        // } catch (e) {
        //     console.log(e)
        // }
    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function authLogin() {

}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}