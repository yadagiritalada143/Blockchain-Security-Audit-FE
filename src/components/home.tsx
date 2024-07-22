import GenerateBlocks from "./generate-block";
import Navbar from "./navbar";

const Home = () => {
  return (
    <div
      className="home-container background d-flex flex-column"
      style={{ height: "100vh" }}
    >
      <Navbar />
      <div className="flex-grow-1 d-flex">
        <GenerateBlocks />
      </div>
    </div>
  );
};

export default Home;
