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

const Login = () => {

  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.auth.error
  }));

  const callbacks = {
    signIn: useCallback((login, password) => store.actions.auth.signIn(login, password), [store]),
  }

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
