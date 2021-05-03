 import {createContext} from 'react'
// import {decorate, observable, computed} from "mobx"
//import {makeObservable, observable, computed, action} from "mobx"
import {makeAutoObservable, observable, computed, action, autorun} from "mobx"

class UserStore {
    token = null;
    username = null;
    user = null;

    // constructor(token, username) {
    //     makeAutoObservable(this, {
    //         token: observable,
    //         name: computed,
    //         clear: action
    //     })
    //     this.token = token;
    //     this.username = username;       
    // }

    constructor() {
        makeAutoObservable(this, {
            token: observable,
            username: observable,
            user: observable,
            // apply: computed,
            setting: action,
            logout: action,
        })

        // this.token = token;
        this.user = JSON.parse(window.localStorage.getItem('user')) || null;
        this.token = window.localStorage.getItem('token') || null;
        // this.token = data.token;
        // this.user = data.user;
        autorun(()=>{
            console.log("autorun", this);
            window.localStorage.setItem('user', JSON.stringify(this.user));
            // window.localStorage.setItem('user', this.user);
            window.localStorage.setItem('token', this.token);
            this.username=this.user && this.user.username  ?  this.user.username || null : null;

            // console.log("WeidongNavbar effect", store)
        });
    }

    // get apply() {
    //     return this.username = this.user.username;
    // }

    logout() {
        this.token=null;
        this.username=null;
        this.user=null;
        window.localStorage.removeItem('user');
        window.localStorage.removeItem('token');
    }

    setting(token, user) {
        this.token=token;
        this.user=user;
    }
}

// const userStore =  new UserStore('1', '2');

// export default UserStore;

export default createContext(new UserStore());