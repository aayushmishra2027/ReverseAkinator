"use client";

import { Montserrat } from "next/font/google";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"] });
const exampleName = [
  "Keanu Reeves",
  "Lana Del Ray",
  "Harry Styles",
  "Joseph Vijay",
  "Ajith Kumar",
  "Keanu Reeves",
  "Lana Del Ray",
  "Harry Styles",
  "Joseph Vijay",
  "Ajith Kumar",
];

const exName = exampleName[Math.floor(Math.random() * 10)];

async function handleClick(usrPrompt: string) {
  const openConfig = new Configuration({
    apiKey: process.env.OPNEAI_KEY,
  });

  const openAI = new OpenAIApi(openConfig);
  const chatCompletion = await openAI.createCompletion({
    model: "text-davinci-003",
    prompt: `Assume that you are a person with a certain celebrity's name in you mind and you want the user to guess it and upon correct guess you reveal the Celebrity's name. The user will ask questions about that celebrity and you should give hints to them. don't reveal the celebrity's name unless the user guess is right. When the user guesses it will be in this format [answer] .Celebrity's name: ${exName}; User Prompt: ${usrPrompt} ?`,
    max_tokens: 1000,
  });

  return chatCompletion.data.choices[0].text;
}

export default function Home() {
  const [compText, setCompText] = useState("");
  const [usrPromp, setUserPrompt] = useState("");
  console.log(compText);
  return (
    <main className="h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <div>
          <input
            type="text"
            placeholder="Ask for Hints!!"
            value={usrPromp}
            onChange={(eV) => setUserPrompt(eV.target.value)}
            className={`p-3 w-[500px] rounded-xl outline-none text-xs ${montserrat.className} m-2 w-1/2`}
          />
          <button
            className={`p-3 bg-[#F7E6C4] rounded-xl text-[#606C5D] ${montserrat.className} text-xs`}
            onClick={async () => {
              setCompText((await handleClick(usrPromp)) as string);
            }}
          >
            Submit
          </button>
        </div>
        <p className={`${montserrat.className} text-sm text-[#F7E6C4]`}>
          {compText}
        </p>
      </div>
    </main>
  );
}
