import Navigation from "./Navigation";
import TrainingProvider from "./components/TrainingContext";

function App() {
  return (
    <div>
      <TrainingProvider>
        <Navigation />
      </TrainingProvider>
    </div>
  );
}

export default App;
