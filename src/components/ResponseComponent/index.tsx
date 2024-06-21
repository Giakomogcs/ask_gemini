import React from "react";
import { Container } from "./styles";

interface ResponseComponentProps {
  response: string;
}

const ResponseComponent: React.FC<ResponseComponentProps> = ({ response }) => {
  return (
    <Container>
      <h2>Resposta da Requisição:</h2>
      <p>{response}</p>
    </Container>
  );
};

export default ResponseComponent;
