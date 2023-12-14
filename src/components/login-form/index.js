import React, {useCallback, useState} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'
import PropTypes from "prop-types";
import useTranslate from "../../hooks/use-translate";

const LoginForm = (props) => {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const {t} = useTranslate();

  const cn = bem('LoginForm');

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      if(login && password){
        props.signIn(login, password);
        setLogin('')
        setPassword('')
      }
    },
    onChangeLogin: (e) => setLogin(e.target.value),
    onChangePassword: (e) => setPassword(e.target.value)
  }

  return (
      <form action = "" className={cn()} onSubmit={callbacks.onSubmit}>
        <span className={cn('title')}>{t('loginForm.title')}</span>
        <label className={cn('label')}>
          {t('loginForm.login')}
          <input type = "text" value={login} onChange={callbacks.onChangeLogin}/>
        </label>
        <label className={cn('label')}>
          {t('loginForm.password')}
          <input type = "password" value={password} onChange={callbacks.onChangePassword}/>
        </label>
        {props.error && <span className = {cn('error')}>{props.error}</span>}
        <button className={cn('submit')}>{t('loginForm.submit')}</button>
      </form>
  );
};

LoginForm.propTypes = {
  signIn: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default LoginForm;
