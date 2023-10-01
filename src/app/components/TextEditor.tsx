"use client";
import React, { useState, useMemo } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import {
  modules,
  formats,
  stripHtmlTags,
  extractWordsAfterSlash,
} from "../utils/helper";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import { Loading } from "./Loading";
const icons = ReactQuill.Quill.import("ui/icons");

if (typeof document !== "undefined") {
  icons["paraphrasebtn"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
}
export default function TextEditor() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const OptimizedReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const suggest = stripHtmlTags(value);
      const promptToSend = extractWordsAfterSlash(suggest);
      console.log(promptToSend);
      if (promptToSend !== "" && isLoading === false) {
        setIsLoading(true);
        const { data } = await axios.post("/aiasist", {
          suggest: promptToSend,
        });
        const { aiPrompt } = data;
        const updatedValue = suggest.replace(/\/\w+/, `<p>${aiPrompt}</p>`);
        setValue(updatedValue);
        setIsLoading(false);
      }
    }
  };
  return (
    <div>
      <OptimizedReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        onKeyDown={handleKeyDown}
      />
      {isLoading && (
        <div className="absolute top-[50%]  flex w-full flex-col items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
}
