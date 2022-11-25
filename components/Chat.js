import { Avatar } from "@mui/material";
import { collection, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../lib/getRecipientEmail";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const receiversDb = query(
    collection(db, "users"),
    where("email", "==", getRecipientEmail(users, user))
  );
  const [receivers] = useCollection(receiversDb);

  const clickChat = () => {
    router.push(`/chat/${id}`);
  };

  const recipient = receivers?.docs?.[0]?.data();
  console.log(recipient?.photoURL);
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <Container onClick={clickChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;

  :hover {
    background-color: #eee;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
