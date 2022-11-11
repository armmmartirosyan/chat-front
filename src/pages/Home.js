import React from 'react';
import Wrapper from "../components/Wrapper";
import UsersList from "../components/UsersList";
import ChatHeader from "../components/ChatHeader";
import MessagesList from "../components/MessagesList";
import ChatFooter from "../components/ChatFooter";

function Home() {
    return (
        <Wrapper>
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-4 col-xl-3 chat">
                        <UsersList/>
                    </div>
                    <div className="col-md-8 col-xl-6 chat">
                        <div className="card">
                            <ChatHeader/>
                            <MessagesList/>
                            <ChatFooter/>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default Home;
