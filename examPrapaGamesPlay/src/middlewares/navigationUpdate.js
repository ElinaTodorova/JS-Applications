import { getUserData } from "../services/userDataSettings.js";

export function navigationUpdate() {
    const userData = getUserData();

    if(userData) {
        document.getElementById('user').style.display = 'block';
        document.getElementById('guest').style.display = 'none'
    }else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'block'
    }
}