import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css'
import {Link} from "react-router-dom";
import useStore from "../../hooks/use-store";

import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

const AuthStatus = () => {

  const cn = bem('SignIn');

  const {t} = useTranslate();

  const store = useStore();

  const select = useSelector(state => ({
    username: state.auth.user?.name,
  }));

  const callbacks = {
    signOut: (e) => {
      store.actions.auth.signOut()
      store.actions.profile.resetData()
    },
  }

  return (
    <div className={cn()}>
      <Link to='/profile'>{select.username}</Link>
      {select.username
        ?
        <button className = {cn('button')} onClick={callbacks.signOut}>{t('authStatus.logout')}</button>
        :
        <button className = {cn('button')}>
          <Link to = '/login'>{t('authStatus.login')}</Link>
        </button>
      }
    </div>
  );
};

export default AuthStatus;
