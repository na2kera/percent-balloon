"use client";
import { useState } from "react";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingPercent, setRemainingPercent] = useState(100);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState(50);
  const data = [
    {
      question: "いちご狩りをしたことがある人は何%？",
      answer: "23%",
    },
    {
      question: "すいませんけど吸います人は何%？",
      answer: "10%",
    },
    {
      question: "居酒屋で皿あーらいする人は何%？",
      answer: "60%",
    },
  ];

  const calculateDifference = () => {
    const currentAnswer = parseInt(data[currentQuestionIndex].answer);
    const difference = Math.abs(selectedValue - currentAnswer);
    setRemainingPercent((prev) => prev - difference);
  };

  const handleNextQuestion = () => {
    calculateDifference();
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedValue(50);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-400 to-blue-600">
      {/* 残りのパーセントを表示 */}
      <div className="text-pink-500 font-bold whitespace-nowrap">
        残り
        <br />
        {remainingPercent}%
      </div>

      {/* クイズ質問パネル */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full mb-8">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-lg font-bold mb-2">
              {data[currentQuestionIndex].answer}
            </div>
            <div className="text-xl">{data[currentQuestionIndex].question}</div>
          </div>
        </div>
      </div>

      {/* 投票結果バー */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-2xl font-bold">{selectedValue}%</div>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={selectedValue}
              onChange={(e) => setSelectedValue(parseInt(e.target.value))}
              className="w-full h-8 rounded-full appearance-none bg-gradient-to-r from-yellow-400 to-red-500 cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-12
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-blue-500
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>
          <div className="text-pink-500 font-bold whitespace-nowrap">
            残り
            <br />
            {100 - selectedValue}%
          </div>
        </div>

        <button
          onClick={handleNextQuestion}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          disabled={currentQuestionIndex === data.length - 1}
        >
          {currentQuestionIndex === data.length - 1 ? "終了" : "回答する"}
        </button>
      </div>
    </div>
  );
}
