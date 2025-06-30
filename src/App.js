import "./App.css";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
function App() {
  return (
    <div
      style={{
        backgroundImage: `url(
            "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg"
          )`,
        backgroundColor: "#CBCBCB",
        backgroundSize: "cover", // makes the image cover the entire container
        backgroundRepeat: "no-repeat", // prevents tiling
        backgroundPosition: "center", // centers the image
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div
        style={{
          marginLeft: "5vh",
          marginRight: "5vh ",
          paddingBottom: "10vh",
        }}
      >
        <Products />
      </div>
    </div>
  );
}

export default App;
