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

const Profile = () => {
  const navigate = useNavigate();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.auth.user,
    token: state.auth.token
  }));

  useEffect(() => {
    if (!select.token) {
      navigate('/login')
    }
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
