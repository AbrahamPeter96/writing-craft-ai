"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
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
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestionTab, setShowSuggestionTab] = useState(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const OptimizedReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.key === "Tab") {
      setShowSuggestionTab(true);
      event.preventDefault();
      const suggest = stripHtmlTags(value);
      console.log(suggest);
      if (suggest !== "" && isLoading === false) {
        setIsLoading(true);
        const { data } = await axios.post("/aiasist", {
          suggest,
        });
        const { aiPrompt } = data;
        console.log(aiPrompt);
        const updatedValue = suggest.replace(/\/\w+/, `<p>${aiPrompt}</p>`);
        setValue(aiPrompt);
        console.log(updatedValue, "tag 991", value);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    onChangeHandler;
  }, [showSuggestionTab]);
  const onChangeHandler = (e: string) => {
    setValue(e);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setIsTyping(true);
    typingTimeoutRef.current = window.setTimeout(() => {
      setIsTyping(false);
      if (!showSuggestionTab) {
        setShowSuggestionTab(true);
        checkSuggestion();
      }
    }, 1000);
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  };

  const checkSuggestion = () => {
    console.log(":working", showSuggestionTab);

    if (!showSuggestionTab) {
      setValue(value + "continue with ai");
    } else {
      return;
    }
  };
  return (
    <>
      <OptimizedReactQuill
        theme="snow"
        value={value}
        onChange={onChangeHandler}
        modules={modules}
        formats={formats}
        onKeyDown={handleKeyDown}
      />
      {isLoading && (
        <div className="absolute top-[50%]  flex w-full flex-col items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
}
