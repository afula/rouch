import React, { useEffect, useState } from 'react';
import platform from 'platform';
import { useDispatch } from 'react-redux';

import Fingerprint2 from 'fingerprintjs2';
import Input from '../../components/Input';
import useAction from '../../hooks/useAction';

import Style from './LoginRegister.less';
import { login, getLinkmansLastMessages } from '../../service';

import { ActionTypes } from '../../state/action';


const getFingerprint: () => Promise<string> = () =>
    new Promise((resolve) => {
        Fingerprint2.get((components) => {
            const values = components.map((component) => component.value);
            const fp = Fingerprint2.x64hash128(values.join(''), 31);
            resolve(fp);
        });
    });


/** 登录框 */
function Login() {
    const action = useAction();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fingerprint, setFingerPrint] = useState('');

    // function getFinger(){
    //     let fp: string = '';
    //     Fingerprint2.get((components: any[]) => {
    //         // console.log(components); // an array of components: {key: ..., value: ...}
    //         const values = components.map((component) => component.value);
    //         fp = Fingerprint2.x64hash128(values.join(''), 31);
    //         setFingerPrint(fp);
    //     });
    // }
    useEffect(() => {
        getFingerprint().then((finger) => {
            console.log(`finger: ${finger}`);
            setFingerPrint(finger);
        }).catch(() => {
            setTimeout(() => {
                getFingerprint().then((finger) => {
                    console.log(`finger: ${finger}`);
                    setFingerPrint(finger);
                });
            }, 1000);
        });
    }, []);
    async function handleLogin() {
        // 指纹
        // Fingerprint2.get((components: any[]) => {
        //     // console.log(components); // an array of components: {key: ..., value: ...}
        //     const values = components.map((component) => component.value);
        //     fp = Fingerprint2.x64hash128(values.join(''), 31);
        //     setFingerPrint(fp);
        // });

        const user = await login(
            username,
            password,
            fingerprint,
            platform.os?.family,
            platform.name,
            platform.description,
        );
        if (user) {
            action.setUser(user);
            action.toggleLoginRegisterDialog(false);
            window.localStorage.setItem('token', user.token);

            const linkmanMessages = user.messages;
            if (linkmanMessages) {
                console.log(`login messages: ${JSON.stringify(linkmanMessages)}`);
                dispatch({
                    type: ActionTypes.SetLinkmansLastMessages,
                    payload: linkmanMessages,
                });
            }
        }
    }

    return (
        <div className={Style.loginRegister}>
            <h3 className={Style.title}>用户名</h3>
            <Input
                className={Style.input}
                value={username}
                onChange={setUsername}
                onEnter={handleLogin}
            />
            <h3 className={Style.title}>密码</h3>
            <Input
                className={Style.input}
                type="password"
                value={password}
                onChange={setPassword}
                onEnter={handleLogin}
            />
            <button className={Style.button} onClick={handleLogin} type="button">
                登录
            </button>
        </div>
    );
}

export default Login;
