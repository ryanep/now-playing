export function hasAuthCode() {
    return localStorage.getItem('code') ? true : false;
}

export function saveAuthCode(authCode) {
    localStorage.setItem('code', authCode);
}

export function removeAuthCode() {
    localStorage.removeItem('code');
}