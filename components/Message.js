import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

export default function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;
  console.log(message.timestamp);
  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <Time>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </Time>
      </TypeOfMessage>
    </Container>
  );
}

const Container = styled.div``;

const Messages = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;

const Sender = styled(Messages)`
  margin-left: auto;
  background-color: #dcf8c6;
`;

const Reciever = styled(Messages)`
  background-color: whitesmoke;
  text-align: left;
`;

const Time = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
