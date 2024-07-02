import React, { useState } from "react";
import InputComponent from "../../components/InputComponent";
import ResponseComponent from "../../components/ResponseComponent";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Container } from "./styles";

export function Home() {
  const [response, setResponse] = useState("");

  // Access your API key as an environment variable
  //const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const apiKey = "AIzaSyDI6tZ_EjXyw5e51eI5FJQkvfflatT-_1w";

  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function handleRequest(input: string) {
    try {
      const prompt = input;

      const result = await model.generateContent(prompt);
      const res = result.response;
      const text = res.text();
      setResponse(text);
    } catch (error) {
      setResponse("Erro na requisição");
    }
  }

  return (
    <Container>
      <h1>Perguntando pro GEMINI</h1>
      <InputComponent onRequest={handleRequest} />
      <ResponseComponent response={response} />
    </Container>
  );
}
