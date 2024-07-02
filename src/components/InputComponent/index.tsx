import React, { useState } from "react";
import { Container } from "./styles";

interface InputComponentProps {
  onRequest: (input: string) => void;
}

type Goal = {
  name: string;
  patrimony: number;
  dividends: number;
  type_goal: boolean;
  initial_patrimony: number;
  time_desired: number;
  monthly_aport: number;
  rate: number;
  objective?: string;
  motivation?: string;
};

const goalData: Goal = {
  name: "liberdade financeira",
  patrimony: 0,
  dividends: 10000,
  type_goal: true,
  initial_patrimony: 23000,
  time_desired: 8,
  monthly_aport: 700,
  rate: 0.0112,
};

const InputComponent: React.FC<InputComponentProps> = ({ onRequest }) => {
  const [input, setInput] = useState("");
  const [goal, setGoal] = useState(goalData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRequest(JSON.stringify(goal));
  };

  return (
    <Container onSubmit={handleSubmit}>
      <input
        type="text"
        value={JSON.stringify(goal)}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite algo"
      />
      <button type="submit">Enviar</button>
    </Container>
  );
};

export default InputComponent;
