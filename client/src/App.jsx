import "./App.css";
import MainPage from "./MainPage";

function App() {
  return (
    <div className=" w-full h-full bg-[url('/bg.jpg')] bg-cover ">
      {<MainPage />}
    </div>
  );
}

export default App;
