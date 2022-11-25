import { Avatar, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { InsertEmoticon, Mic, MoreVert } from "@mui/icons-material";
import { AttachFile } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  orderBy,
  query,
  getDocs,
  getDoc,
  where,
  serverTimestamp,
  setDoc,
  addDoc,
} from "firebase/firestore";
import Message from "./Message";
import { useState } from "react";
import getRecipientEmail from "../lib/getRecipientEmail";
import TimeAgo from "timeago-react";

export default function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();

  const messagesQuery1 = doc(db, "chats", router.query.id);
  const messagesQuery2 = query(
    collection(messagesQuery1, "messages"),
    orderBy("timestamp", "asc")
  );

  const [messagesSnap] = useCollection(messagesQuery2);

  const recipientQuery = query(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(chat.users, user))
  );

  const [recipientSnap] = useCollection(recipientQuery);

  const messagesList = () => {
    if (messagesSnap) {
      return messagesSnap.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    await setDoc(
      doc(db, "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    // const insert = collection(doc(db, "chats", router.query.id));
    const firstRef = doc(db, "chats", router.query.id);
    const secondRef = collection(firstRef, "messages");
    await addDoc(secondRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
  };

  const recipientData = recipientSnap?.docs?.[0]?.data();
  const recipient = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar src={recipientData?.photoURL} />
        ) : (
          <Avatar>{recipient[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{recipient}</h3>
          {recipientSnap ? (
            <p>
              Last Active:{" "}
              {recipientData?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipientData?.lastSeen?.toDate()} />
              ) : (
                "N/A"
              )}
            </p>
          ) : (
            <p>Looking</p>
          )}
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {messagesList()}
        <EndOfMessage />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <Mic />
      </InputContainer>
    </Container>
  );
}

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }

  > p {
    font-size: 14px;
    color: gray;
  }
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #e5ded8;
  min-height: 90vh;
`;

const EndOfMessage = styled.div``;

const HeaderIcons = styled.div``;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;
