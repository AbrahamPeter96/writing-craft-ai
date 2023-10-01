import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { textToParaphrase } = await request.json();
  console.log(textToParaphrase);
  const options = {
    method: "POST",
    url: "http://localhost:3001/paraphrasing",
    data: {
      prompt: textToParaphrase,
    },
  };

  try {
    const rapidApiResponse = await axios.request(options);
    const { data } = rapidApiResponse.data;
    return NextResponse.json({ aiPrompt: data });
  } catch (error) {
    console.error(error, "dog");
  }
}

// Testing backend
// export async function POST(request: Request) {
//   const { suggest } = await request.json();

//   // const options = {
//   //   method: "GET",
//   //   url: "https://ai-writer1.p.rapidapi.com/text/",
//   //   params: {
//   //     text: suggest,
//   //   },
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     "X-RapidAPI-Key": process.env.RAPID_API_KEY,
//   //     "X-RapidAPI-Host": process.env.RAPID_API_HOST,
//   //   },
//   // };

//   try {
//     const responsePromise = new Promise((resolve) => {
//       setTimeout(async () => {
//         const response = "Paraphrase text";

//         resolve(NextResponse.json({ aiPrompt: response }));
//       }, 3000);
//     });

//     return responsePromise;
//   } catch (error) {
//     console.error(error);
//   }
// }
