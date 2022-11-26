import styled from "styled-components";
import { Avatar, Button, IconButton } from "@mui/material";
import { Chat, MoreVert, Search } from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import UserChat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChats = query(
    collection(db, "chats"),
    where("users", "array-contains", user.email)
  );
  const [chats] = useCollection(userChats);

  const createChat = () => {
    const input = prompt(
      "Please enter the email for the user you want to chat with"
    );
    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !duplicateChat(input) &&
      input !== user.email
    ) {
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  const duplicateChat = (recipient) =>
    !!chats?.docs.find(
      (chat) => chat.data().users.find((user) => user === recipient)?.length > 0
    );
  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </IconsContainer>
      </Header>
      <ChatSearch>
        <Search />
        <SearchInput placeholder="Search" />
      </ChatSearch>
      <NewChatButton onClick={createChat}>New Chat</NewChatButton>
      {chats?.docs.map((chat) => (
        <UserChat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

const NewChatButton = styled(Button)`
  width: 100%;

  /* &&& increases CSS priority of whatever's inside */
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const ChatSearch = styled.div`
  display: flex;
  align-items: center;
  padding: 25px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.6;
  }
`;

const IconsContainer = styled.div``;
