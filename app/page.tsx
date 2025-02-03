"use client";

import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [text, setText] = useState("");
  const docRef = doc(db, "clipboard", "shared");

  useEffect(() => {
    async function fetchText() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setText(docSnap.data().content);
      }
    }
    fetchText();
  }, []);

  const handleSave = async () => {
    await setDoc(docRef, { content: text });
    toast.success("Text saved! Accessible on any device.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Web Clipboard</h1>
      <textarea
        className="w-full max-w-md h-40 p-2 border rounded-lg"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSave} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
        Save Text
      </button>
      <ToastContainer position="bottom-center" />
    </div>
  );
}
