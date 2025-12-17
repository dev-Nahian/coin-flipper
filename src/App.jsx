import CoinFlip from "./components/CoinFlip";
import Counter from "./components/Counter";

const App = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]">
        <CoinFlip />
      </div>
      {/* <Counter /> */}
    </>
  );
};

export default App;
