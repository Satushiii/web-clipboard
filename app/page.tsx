"use client";

import { useState, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ClipboardApp() {
  const [sendText, setSendText] = useState("");
  const [receiveText, setReceiveText] = useState("");

  // Fetch text from Firebase
  useEffect(() => {
    const fetchText = async () => {
      const docRef = doc(db, "clipboard", "shared");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReceiveText(docSnap.data().content);
      }
    };
    fetchText();
  }, []);

  // Send text to Firebase
  const handleSend = async () => {
    const docRef = doc(db, "clipboard", "shared");
    await setDoc(docRef, { content: sendText });
    setSendText("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Web Clipboard</h1>

      {/* Send Box */}
      <div className="w-full max-w-md mb-4 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Send Text</h2>
        <textarea
          value={sendText}
          onChange={(e) => setSendText(e.target.value)}
          placeholder="Type here..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>

      {/* Receive Box */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Received Text</h2>
        <textarea
          value={receiveText}
          readOnly
          className="w-full p-2 border rounded bg-gray-200"
        />
      </div>
    </div>
  );
}
