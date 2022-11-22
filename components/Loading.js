import styled from "styled-components";

function Loading() {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <LoadingLogo
          src="https://cdn.dribbble.com/users/1081076/screenshots/2832850/pokemongo.gif"
          alt=""
        />
      </div>
    </center>
  );
}

export default Loading;

const LoadingLogo = styled.img`
  margin-bottom: 10;
  height: 200;
`;
