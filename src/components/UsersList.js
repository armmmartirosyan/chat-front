import React, {useEffect} from 'react';
import UsersSearch from "./UsersSearch";
import {useDispatch, useSelector} from "react-redux";
import User from "./User";
import {contactList} from "../store/actions/users";

function UsersList() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.contactList);
    const usersListStatus = useSelector(state => state.status.usersListStatus);

    useEffect(() => {
        dispatch(contactList({search: ''}));
    }, []);

    return (
        <div className="card mb-sm-3 mb-md-0 contacts_card">
            <UsersSearch/>
            <div className="card-body contacts_body">
                {usersListStatus === 'pending' ? 'Loading...' : null}
                <ul className="contacts">
                    {users.map(user => (
                        <User user={user} key={user.id}/>
                    ))}
                </ul>
            </div>
            <div className="card-footer"></div>
        </div>
    );
}

export default UsersList;
