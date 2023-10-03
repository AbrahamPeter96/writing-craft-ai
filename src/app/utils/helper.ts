/** @format */

import axios from "axios";

export const extractWordsAfterSlash = (text: string) => {
  const regex = /\/([^<>\r\n]+)/;

  const match = text.match(regex);
  if (match && match[1]) {
    return match[1].trim();
  }
  return "";
};

export const stripHtmlTags = (html: string) => {
  const tmp: any =
    typeof document !== "undefined" ? document.createElement("DIV") : null;
  tmp.innerHTML = html;
  return tmp?.textContent || tmp?.innerHTML || "";
};

export const paraphrase = async (usertext: string) => {
  const text = stripHtmlTags(usertext);
  if (text !== "") {
    const { data } = await axios.post("/paraphrase", {
      textToParaphrase: text,
    });
    const { aiPrompt } = data;
    return aiPrompt;
  } else {
    alert("Please Enter some text");
    return "";
  }
};

export const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ header: [1, 2, 3, 4, 5, 6, true] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["paraphrasebtn"],
    ],
    handlers: {
      paraphrasebtn: async () => {
        const editor =
          typeof document !== "undefined"
            ? document.querySelector(".ql-editor")
            : null;
        const button: any =
          typeof document !== "undefined"
            ? (document.querySelector(".ql-paraphrasebtn") as HTMLButtonElement)
            : null;
        if (editor) {
          const content = editor.innerHTML;
          button.disabled = true;
          const paraphraseContent = await paraphrase(content);
          editor.innerHTML = paraphraseContent;
          console.log(editor.innerHTML);
          button.disabled = false;
        }
      },
    },
  },
};

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "font",
  "code-block",
  "direction",
  "color",
  "background",
  "script",
  "indent",
  "align",
  "paraphrasebtn",
];
