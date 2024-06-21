import React, { useState } from "react";

interface InputComponentProps {
  onRequest: (input: string) => void;
}

const InputComponent: React.FC<InputComponentProps> = ({ onRequest }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequest(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite algo"
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default InputComponent;
