import LesftSection from "../../components/LeftSection/LesftSection";
import useMedia from "../../hooks/useMedia";
const img = require("../../assets/girl-and-pet.png") as string;

const Home = () => {
  const { isMobile, isTablet } = useMedia();

  return (
    <main className="home container">
      <LesftSection />
      {!isMobile && !isTablet && (
        <section className="home__right">
          <div className="home__right-thumb">
            <img src={img} alt="pic" width={775} height={900}></img>
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
