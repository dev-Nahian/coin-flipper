import { useState } from "react";
import "./coin.css";
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"


export default function CoinFlip() {
  const [result, setResult] = useState(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipCount, setFlipCount] = useState(0)
  const [stats, setStats] = useState({ heads: 0, tails: 0 })

  const flipCoin = () => {
    if (isFlipping) return

    setIsFlipping(true)
    setResult(null)

    // Simulate flip duration
    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? "heads" : "tails"
      setResult(newResult)
      setIsFlipping(false)
      setFlipCount((prev) => prev + 1)
      setStats((prev) => ({
        ...prev,
        [newResult]: prev[newResult] + 1,
      }))
    }, 3000)
  }

  return (
    <div className="w-full max-w-md px-4">
      <Card className="p-8 bg-[#1a1a1a] border-[#2a2a2a] backdrop-blur-sm">
        <div className="text-center space-y-8">
          {/* Title */}
          <div>
            <h1 className="text-4xl font-bold text-[#f5f5f5] mb-2">Coin Flipper</h1>
            <p className="text-[#888888] text-sm">Click the button to flip the coin</p>
          </div>

          {/* Coin Container */}
          <div className="relative h-64 flex items-center justify-center">
            <div className={`coin-container ${isFlipping ? "flipping" : ""} ${result ? `show-${result}` : ""}`}>
              <div className="coin">
                <div className="coin-side coin-heads">
                  <div className="coin-inner">
                    <div className="coin-circle">
                      <span className="text-4xl font-bold text-[#ffd700]">H</span>
                    </div>
                  </div>
                </div>
                <div className="coin-side coin-tails">
                  <div className="coin-inner">
                    <div className="coin-circle">
                      <span className="text-4xl font-bold text-[#c0c0c0]">T</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Display */}
          {result && !isFlipping && (
            <div className="animate-fade-in">
              <p className="text-2xl font-semibold text-[#f5f5f5]">
                Result:{" "}
                <span className={result === "heads" ? "text-[#ffd700]" : "text-[#c0c0c0]"}>
                  {result.charAt(0).toUpperCase() + result.slice(1)}
                </span>
              </p>
            </div>
          )}

          {/* Flip Button */}
          <Button
            onClick={flipCoin}
            disabled={isFlipping}
            size="lg"
            className="w-full bg-[#ffd700] hover:bg-[#ffed4e] text-black font-semibold text-lg h-14 transition-all duration-200 disabled:opacity-50"
          >
            {isFlipping ? "Flipping..." : "Flip Coin"}
          </Button>

          {/* Statistics */}
          {flipCount > 0 && (
            <div className="pt-6 border-t border-[#2a2a2a] space-y-2">
              <p className="text-sm text-[#888888]">Statistics</p>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-[#888888]">Total Flips: </span>
                  <span className="text-[#f5f5f5] font-semibold">{flipCount}</span>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <div className="text-center">
                  <p className="text-[#ffd700] text-2xl font-bold">{stats.heads}</p>
                  <p className="text-xs text-[#888888]">Heads</p>
                </div>
                <div className="text-center">
                  <p className="text-[#c0c0c0] text-2xl font-bold">{stats.tails}</p>
                  <p className="text-xs text-[#888888]">Tails</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <style jsx>{`
        .coin-container {
          width: 200px;
          height: 200px;
          position: relative;
          perspective: 1000px;
        }

        .coin {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.1s;
        }

        .coin-side {
          width: 100%;
          height: 100%;
          position: absolute;
          backface-visibility: hidden;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coin-heads {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
          box-shadow: 0 10px 40px rgba(255, 215, 0, 0.3),
            inset 0 2px 10px rgba(255, 255, 255, 0.3);
        }

        .coin-tails {
          background: linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%);
          transform: rotateY(180deg);
          box-shadow: 0 10px 40px rgba(192, 192, 192, 0.3),
            inset 0 2px 10px rgba(255, 255, 255, 0.3);
        }

        .coin-inner {
          width: 90%;
          height: 90%;
          border-radius: 50%;
          border: 3px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coin-circle {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          border: 2px solid rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
        }

        .flipping .coin {
          animation: flip 3s ease-in-out;
        }

        .show-heads .coin {
          transform: rotateY(0deg);
        }

        .show-tails .coin {
          transform: rotateY(180deg);
        }

        @keyframes flip {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          100% {
            transform: rotateY(1800deg) rotateX(360deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
