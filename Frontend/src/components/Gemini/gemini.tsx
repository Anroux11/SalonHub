"use client";

import React, { useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { useStyles } from "@/app/employeeTechnician/gemini/style/styles"; // Adjust path accordingly

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API!;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GeminiImageAnalysis = () => {
  const { styles } = useStyles();

  const [prompt, setPrompt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const readImageAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string)?.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || !imageFile) return;

    setLoading(true);
    try {
      const base64Image = await readImageAsBase64(imageFile);

      const result = await ai.models.generateContent({
        model: "gemini-1.5-pro",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: imageFile.type,
                  data: base64Image,
                },
              },
            ],
          },
        ],
      });

      setResponseText(result.text ?? "No response text received.");
    } catch (error) {
      console.error(error);
      setResponseText("Error analyzing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.aiContainer}>
      <h2>Interact with AI</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {imagePreviewUrl && (
        <div>
          <img
            src={imagePreviewUrl}
            alt="Uploaded preview"
            className={styles.imagePreview}
          />
        </div>
      )}

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className={styles.promptInput}
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !imageFile}
        className={styles.analyzeButton}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {responseText && (
        <div className={styles.responseBox}>
          <h3>Gemini Analysis:</h3>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default GeminiImageAnalysis;
