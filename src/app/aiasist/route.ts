import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const { suggest } = await request.json();
  const options = {
    method: "POST",
    url: "http://localhost:3001/continuewriting",
    data: {
      prompt: suggest,
    },
  };

  try {
    const rapidApiResponse = await axios.request(options);

    console.log(rapidApiResponse.data.data);
    return NextResponse.json({ aiPrompt: rapidApiResponse.data.data });
  } catch (error) {
    console.error(error);
  }
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
