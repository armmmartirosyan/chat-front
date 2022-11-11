import React, { useState } from 'react';
import moment from "moment/moment";
import classNames from "classnames";
import { Link } from "react-router-dom";

function User(props) {
  const { user } = props;

  return (
    <li>
      <Link to={`/user/${user.id}`}>
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
              src={user.avatar}
              className="rounded-circle user_img"
            />
            <span className={classNames(
              'online_icon',
              { offline: !user.isOnline })
            }>
                    </span>
          </div>
          <div className='user_info'>
            <span>{user.firstName}</span>
            <p>
              {`${user.firstName} ${user.isOnline ?
                'is online'
                : `was online ${user.lastVisit ? moment(user.lastVisit).fromNow() : ''}`}`
              }
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default User;
