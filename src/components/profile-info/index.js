import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

const ProfileInfo = (props) => {

  const cn = bem('ProfileInfo');

  return (
    <div className={cn()}>
      <h2>Профиль</h2>
     <div className={cn('content')}>
       <p className={cn('point')}>
         {props.t('profile.name')}
         <span>{props.userInfo?.name}</span>
       </p>
       <p className={cn('point')}>
         {props.t('profile.phone')}
         <span>{props.userInfo?.phone}</span>
       </p>
       <p className={cn('point')}>email:
         <span>{props.userInfo?.email}</span>
       </p>
     </div>
    </div>
  );
};

ProfileInfo.propTypes = {
  t: PropTypes.func,
  user: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  })
}

export default ProfileInfo;
