import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const { suggest } = await request.json();
  const url: string = "http://localhost:3001/paraphrasing";
  try {
    console.log(suggest);
    const res = await axios.post(url, { prompt: suggest });
    console.log(res);
  } catch (err) {}

  // const options = {
  //   method: "GET",
  //   url: "https://ai-writer1.p.rapidapi.com/text/",
  //   params: {
  //     text: suggest,
  //   },
  //   headers: {
  //     "Content-Type": "application/json",
  //     "X-RapidAPI-Key": process.env.RAPID_API_KEY,
  //     "X-RapidAPI-Host": process.env.RAPID_API_HOST,
  //   },
  // };

  // try {
  //   const rapidApiResponse = await axios.request(options);
  //   const { response } = rapidApiResponse.data;
  //   return NextResponse.json({ aiPrompt: response });
  // } catch (error) {
  //   console.error(error);
  // }
}

// For testing
// export async function POST(request: Request) {
//   const { suggest } = await request.json();

//   const options = {
//     method: "GET",
//     url: "https://ai-writer1.p.rapidapi.com/text/",
//     params: {
//       text: suggest,
//     },
//     headers: {
//       "Content-Type": "application/json",
//       "X-RapidAPI-Key": process.env.RAPID_API_KEY,
//       "X-RapidAPI-Host": process.env.RAPID_API_HOST,
//     },
//   };

//   try {
//     const responsePromise = new Promise((resolve) => {
//       setTimeout(async () => {
//         const response =
//           "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequa";

//         resolve(NextResponse.json({ aiPrompt: response }));
//       }, 3000);
//     });

//     return responsePromise;
//   } catch (error) {
//     console.error(error);
//   }
// }
