import React, { useState } from "react";
import InputComponent from "../../components/InputComponent";
import ResponseComponent from "../../components/ResponseComponent";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Container } from "./styles";

export function Home() {
  const [response, setResponse] = useState("");

  // Access your API key as an environment variable
  // const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const apiKey = "AIzaSyDI6tZ_EjXyw5e51eI5FJQkvfflatT-_1w";

  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function handleRequest(input: string) {
    try {
      const context = `
        1. O que você deseja que o Gemini faça:

        - Qual o tipo de conteúdo o Gemini deve gerar? (Ex: texto, imagens, código, música)
        resposta: a princípio para facilitar na integração com a API do aplicativo seria um JSON mas gostaria que me ajudasse a definir um padrão a ser enviado pelo gemini

        - Quais são os casos de uso específicos para o Gemini em seu app?
        resposta: usarei a sabedoria do Gemini para ajudar o usuário a definir bem a meta que quer fazer no app, vou explicar melhor sobre o app mas o gemini irá entender a meta que o usuário quer criar e ajudá-lo a definir melhor, prevenir metas impossíveis, dar mais clareza ou ajudar o usuário dando opções inteligentes

        - Existe algum estilo ou formato específico para o conteúdo gerado?
        resposta: no momento não sei dizer isso, estamos criando uma coisa do zero, hoje o JSON que iremos enviar ao gemini seria esse por exemplo:

        {
          "name": "salario absurdo",
          "patrimony": 10000,
          "dividends": 15000,
          "type_goal": 1,
          "initial_patrimony": 30000,
          "time_desired": 5,
          "monthly_aport": 0
        }

        essa meta seria uma meta para ter um segundo salário onde quer ganhar 15000 por mês de dividendos, e o tempo desejado para chegar nessa meta é 5 anos, o aporte está zerado pois ele não sabe então a API irá calcular

        2. Contexto da aplicação:

        - Quais dados ou informações o Gemini terá acesso para gerar o conteúdo?
        resposta:
        será algo bem simples que é um JSON, quando vou verificar com a minha API para calcular os juros compostos, os aportes necessários ou o tempo que irá durar a meta faço um post com esse body:

        {
          "name": "liberdade financeira",
          "patrimony": 0,
          "dividends": 10000,
          "type_goal": true,
          "initial_patrimony": 23000,
          "time_desired": 8,
          "monthly_aport":700,
          "rate": 0.0112
        }

        onde name é o título do projeto, patrimony é o patrimônio desejado, dividends é o dividendo desejado, type_goal é o tipo de meta true ele foca em dividendos desejados, false ele foca em patrimônio desejado para considerar nos cálculos, initial_patrimony é o patrimônio inicial, time_desired é o tempo desejado para terminar a meta e monthly_aport é o aporte mensal que deverá ser feito ou o possível e rate que é a taxa que irá render a aplicação

        assim que mando para a minha API ele retorna os cálculos de acordo com as informações fornecidas pelo usuário:

        {
          "name": "liberdade financeira",
          "dividends": 10000,
          "type_goal": true,
          "my_patrimony": 23000,
          "rate": 0.0112,
          "goalForTime": {
            "monthly_aport": 700,
            "time_desired": 18.083333333333332,
            "patrimony": 892857.1428571428
          },
          "goalForAport": {
            "monthly_aport": 4834.823855253758,
            "time_desired": 8,
            "patrimony": 892857.1428571428
          }
        }

        que seria os cálculos focando no tempo ou aporte mensal

        - Como o conteúdo gerado pelo Gemini será utilizado no seu app?
        resposta:
        o gemini irá entender a meta, ver se não tem nenhuma incoerência na meta ou algo impossível ex: uma criança quer uma meta para comprar um skate de 3000 reais mas não se sabe se ela precisa mesmo de um skate assim então precisamos saber a habilidade, se ela quer só o skate ou os acessórios, ou seja o gemini deve retornar um JSON com 3 perguntas personalizadas e objetivas para que o usuário reflita e consiga entender melhor o que quer, uma mensagem resumindo a meta da pessoa e uma sugestão final da meta

        - Quais são as interfaces ou componentes que exibirão o conteúdo gerado?
        resposta: faremos a API em node e o front em react native e typescript nos dois

        3. Personalização e Regras:
        impedir metas sexuais e que infrinjam os direitos humanos, melhorar as metas, deixá-las mais realistas e realmente ajudar os usuários com as 3 perguntas e o seu resumo a refletir e mudar de opinião, assim retornaremos para o gemini a nova meta após a resposta das 3 perguntas e o gemini cria a estrutura da meta finalizada em JSON

        - Você precisa de alguma customização nas respostas do Gemini, como remover ou modificar partes do texto?
        resposta: preciso que o JSON saia da forma que dê para integrar na API e no front então se for fácil depois de mudar o JSON enviado ou recebido seria ótimo

        - Existem regras específicas que o Gemini precisa seguir ao gerar o conteúdo? (Ex: tom de voz, linguagem formal/informal, etc.)
        resposta: quero que fale de forma muito simples que pessoas de todas as idades consigam entender, sem palavras de complexidade técnica e muito objetivo e claro, como se fosse um amigo ajudando a pensar melhor, elogiando e tratando bem

        - Como você pretende avaliar a qualidade do conteúdo gerado pelo Gemini?
        resposta: haverá uma forma de reenviar a meta pois não gostou das perguntas ou o resumo não fez sentido ou no resultado final da meta

        4. Integração com o código existente:
        - Como o código Gemini se integra ao restante do código do seu app?
        resposta: a aplicação irá fornecer os JSONs e receber uma response com as perguntas em seguida mandará a meta com as respostas das perguntas e o gemini devolverá o JSON da meta final e todas essas etapas a API da aplicação poderá reenviar pedindo para refazer as perguntas e resumo ou o resultado final

        - Quais eventos ou ações no app disparam a geração de conteúdo pelo Gemini?
        resposta: uma requisição para o gemini usando o GoogleGenerativeAI

        - Como o conteúdo gerado pelo Gemini é armazenado ou utilizado no seu app?
        resposta: com o JSON irá ser processado pela API salvando no banco de dados a meta criada

        esse é o jason para analisar:

      `;

      const prompt = context + input;
      console.log(prompt);

      const result = await model.generateContent(prompt);
      const res = result.response;
      const text = res.text();
      setResponse(text);

      // Utilize as variáveis questions, summary, suggestion e finalGoal para processar os dados
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
