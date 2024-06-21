import React, { useState } from "react";
import InputComponent from "../components/InputComponent";
import ResponseComponent from "../components/ResponseComponent";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function Home() {
  const [response, setResponse] = useState("");

  // Access your API key as an environment variable
  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function handleRequest(input: string) {
    try {
      const prompt = input;

      const result = await model.generateContent(prompt);
      const res = await result.response;
      const text = await res.text();
      setResponse(text);
    } catch (error) {
      setResponse("Erro na requisição");
    }
  }

  return (
    <div className="App">
      <h1>Meu Sistema Web</h1>
      <InputComponent onRequest={handleRequest} />
      <ResponseComponent response={response} />
    </div>
  );
}
