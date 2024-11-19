"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingPercent, setRemainingPercent] = useState(100);
  const [selectedValue, setSelectedValue] = useState(50);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number>();
  const [animatingPercent, setAnimatingPercent] = useState(100);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const data = [
    {
      question: "いちご狩りをしたことがある人は何%？",
      answer: "23%",
    },
    {
      question: "すいませんけど吸いますって人は何%？",
      answer: "10%",
    },
    {
      question: "居酒屋で皿あーらいする人は何%？",
      answer: "60%",
    },
  ];

  // 差分を計算する関数を修正
  const calculateDifference = () => {
    const currentAnswer = parseInt(
      data[currentQuestionIndex].answer.replace("%", "")
    );
    const difference = Math.abs(selectedValue - currentAnswer);
    // 0未満にならないように制限
    const targetPercent = Math.max(0, remainingPercent - difference);

    // 残りパーセントのアニメーション
    const startValue = remainingPercent;
    const startTime = Date.now();
    const duration = 1000; // 1秒間

    const animatePercent = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const currentValue = Math.floor(
          startValue - (startValue - targetPercent) * progress
        );
        // アニメーション中も0未満にならないように制限
        setAnimatingPercent(Math.max(0, currentValue));
        requestAnimationFrame(animatePercent);
      } else {
        setAnimatingPercent(targetPercent);
        setRemainingPercent(targetPercent);
      }
    };

    requestAnimationFrame(animatePercent);
  };

  // アニメーション関数を追加
  const animateSlider = () => {
    if (!showAnswer) {
      const currentAnswer = parseInt(
        data[currentQuestionIndex].answer.replace("%", "")
      );
      const startTime = Date.now();
      const duration = 2000; // 2秒間

      const animate = () => {
        const elapsed = Date.now() - startTime;

        if (elapsed < duration - 500) {
          // ランダムな値を設定（アニメーション中）
          setSelectedValue(Math.floor(Math.random() * 101));
          animationRef.current = requestAnimationFrame(animate);
        } else if (elapsed < duration) {
          // 正解に近づける（最後の0.5秒）
          const progress = (elapsed - (duration - 500)) / 500;
          const value = Math.floor(
            selectedValue + (currentAnswer - selectedValue) * progress
          );
          setSelectedValue(value);
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // アニメーション終了
          setSelectedValue(currentAnswer);
          setIsAnimating(false);
          calculateDifference();
          setShowAnswer(true);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }
  };

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // handleNextQuestion を修正
  const handleNextQuestion = () => {
    if (!showAnswer && !isAnimating) {
      setUserAnswer(selectedValue);
      setIsAnimating(true);
      animateSlider();
    } else {
      if (currentQuestionIndex < data.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedValue(50);
        setShowAnswer(false);
        setUserAnswer(null);
      } else if (currentQuestionIndex === data.length - 1) {
        setShowResult(true);
      }
    }
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-400 to-blue-600">
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl w-full">
          <h2 className="text-2xl font-bold text-center mb-6">結果発表</h2>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              最終スコア
            </div>
            <div className="text-6xl font-bold text-pink-500">
              {remainingPercent}%
            </div>
          </div>
          <div className="text-center text-gray-600 mb-6">
            {remainingPercent >= 80 && "素晴らしい予想力です！"}
            {remainingPercent >= 50 &&
              remainingPercent < 80 &&
              "なかなかの予想力です！"}
            {remainingPercent < 50 && "もう少し頑張りましょう！"}
          </div>
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setRemainingPercent(100);
              setSelectedValue(50);
              setShowAnswer(false);
              setShowResult(false);
            }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            もう一度プレイ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-400 to-blue-600">
      {/* 残りのパーセントを表示（アニメーション値を使用） */}
      <div className="bg-white/90 rounded-lg p-4 shadow-md mb-4 text-center">
        <div className="text-gray-600 text-lg mb-1">残り</div>
        <div className="text-pink-500 font-bold text-4xl">
          {Math.max(0, Math.floor(animatingPercent))}%
        </div>
      </div>

      {/* クイズ質問パネル */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full mb-8">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-xl mb-2">
              {data[currentQuestionIndex].question}
            </div>
            {showAnswer && (
              <div className="text-lg font-bold text-blue-600">
                正解: {data[currentQuestionIndex].answer}
                <div className="text-red-500">
                  差:{" "}
                  {Math.abs(
                    userAnswer! -
                      parseInt(
                        data[currentQuestionIndex].answer.replace("%", "")
                      )
                  )}
                  %
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 投票結果バー */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-2xl font-bold">{selectedValue}%</div>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="100"
              value={selectedValue}
              onChange={(e) =>
                !isAnimating && setSelectedValue(parseInt(e.target.value))
              }
              disabled={isAnimating}
              className={`w-full h-8 rounded-full appearance-none bg-gradient-to-r from-yellow-400 to-red-500 cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-12
              [&::-webkit-slider-thumb]:w-4
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-blue-500
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg
              ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
            {/* ユーザーの回答マーカー */}
            {userAnswer !== null && (
              <div
                className="absolute top-0 w-1 h-8 bg-blue-500"
                style={{
                  left: `${userAnswer}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-bold text-blue-500">
                  {userAnswer}%
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleNextQuestion}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {currentQuestionIndex === data.length - 1 && showAnswer
            ? "終了"
            : showAnswer
            ? "次へ"
            : "回答する"}
        </button>
      </div>
    </div>
  );
}
