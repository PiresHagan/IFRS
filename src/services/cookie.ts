import cookie from 'js-cookie';

export const getToken = (name:string = "token") => {
    return cookie.get(name);
  };

export const setToken = (key:string,token: string) => {
    cookie.set(key, token);
}

export const removeToken = (key:string,options:any) => {
    cookie.remove(key,options);
}
export const setTokenWithOption = (key:string,value:string,options:any) => {
    cookie.set(key,value,options);
}

export const setProfile = (profile: string) => {
    localStorage.setItem('db_profile', profile);
}

export const getProfile = () => {
    let profile = localStorage.getItem('db_profile');
    return profile ? JSON.parse(profile) : null;
}