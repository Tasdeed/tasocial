import styled from "styled-components";

export default function Message({ user, message }) {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
}

const Container = styled.div``;
