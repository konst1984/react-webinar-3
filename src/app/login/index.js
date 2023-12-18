import React, {useCallback, useEffect, useState} from 'react';
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import PageLayout from "../../components/page-layout";
import useTranslate from "../../hooks/use-translate";
import LoginForm from "../../components/login-form";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import AuthStatus from "../../components/auth-status";
import {useNavigate} from "react-router-dom";

const Login = () => {

  const store = useStore();
  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.auth.error,
    token: state.auth.token
  }));
console.log(select.token)
  const callbacks = {
    signIn: useCallback((login, password) => {
      store.actions.auth.signIn(login, password)
    }, [store]),
    resetError: () => store.actions.auth.resetError()
  }

  useEffect(() =>{
    callbacks.resetError()
    if (select.token) {
      navigate(-1)
    }
  },[select.token])

  return (
    <PageLayout head={<AuthStatus/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm signIn={callbacks.signIn} error={select.error}/>
    </PageLayout>
  );
};

export default Login;
