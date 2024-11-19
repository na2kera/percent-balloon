export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-b from-blue-400 to-blue-600">
      {/* クイズ質問パネル */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full mb-8">
        <div className="flex items-center gap-4">
          <img
            src="/strawberry.jpg"
            alt="いちご"
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <div className="text-lg font-bold mb-2">20〜40代</div>
            <div className="text-xl">いちご狩りをしたことがある人は何%？</div>
          </div>
        </div>
      </div>

      {/* 投票結果バー */}
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl w-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-2xl font-bold">23%</div>
          <div
            className="flex-1 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"
            style={{ width: "23%" }}
          >
            <div className="h-full w-[1px] bg-blue-500"></div>
          </div>
          <div className="text-pink-500 font-bold">
            残り
            <br />
            100
          </div>
        </div>
      </div>
    </div>
  );
}
