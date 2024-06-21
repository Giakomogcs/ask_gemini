import React from "react";

interface ResponseComponentProps {
  response: string;
}

const ResponseComponent: React.FC<ResponseComponentProps> = ({ response }) => {
  return (
    <div>
      <h2>Resposta da Requisição:</h2>
      <p>{response}</p>
    </div>
  );
};

export default ResponseComponent;
