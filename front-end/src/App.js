
import SingleSwap from './Components/SingleSwap'
import SignatureHandler from './Components/SignatureHandler';
import SwapETHUSDC from './Components/SwapEthUdsc'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <SingleSwap/>
       <SignatureHandler/>
       <SwapETHUSDC/>
      </header>
    </div>
  );
}

export default App;
