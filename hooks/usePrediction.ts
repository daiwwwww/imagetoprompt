import { useEffect, useState } from "react";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function usePrediction() {
  const [prediction, setPrediction] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleSubmit = async (params: any) => {
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...params,
      }),
    });
    let prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }

    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(2000);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return {
    prediction,
    error,
    handleSubmit
  }
}