import React, {useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import ProfileInfo from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import AuthStatus from "../../components/auth-status";
import useStore from "../../hooks/use-store";

const Profile = () => {
  const navigate = useNavigate();
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    token: state.auth.token,
    user: state.profile.user,
  }));

  useEffect(() => {
    if (!select.token) {
      navigate('/login')
    }
    else store.actions.profile.getUserInfo(select.token)
  }, [select.token])

  return (
    <PageLayout head={<AuthStatus/>}>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo userInfo={select.user} t={t}/>
    </PageLayout>
  );
};

export default Profile;
