import "./App.css";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
function App() {
  return (
    <>
      <Navbar />
      <div style={{ marginLeft: "5vh", marginRight: "5vh " }}>
        <Products />
      </div>
    </>
  );
}

export default App;
