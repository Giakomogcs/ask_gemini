import React from "react";
import styled from "styled-components";
import { Home } from "./Pages/Home";

const AppContainer = styled.div`
  height: 100%;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <Home />
    </AppContainer>
  );
};

export default App;
