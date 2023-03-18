import Carousel from "../../components/carousel/Carousel";
import FirstBanner from "../../components/banners/FirstBanner";
import SecondBanner from "../../components/banners/SecondBanner";
import "./home.css";
import ForthBanner from "../../components/banners/ForthBanner";
import ThirdBanner from "../../components/banners/ThirdBanner";
import SaleBanner from "../../components/banners/SaleBanner";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 col-lg-9">
          <Carousel />
        </div>
        <div className="col col-lg-3 col-md-6 banners">
          <FirstBanner />
          <SecondBanner />
        </div>
        <div className="col-12 col-lg-9">
          <div className="row">
            <div className="col">
              <ThirdBanner />
            </div>
            <div className="col">
              <ForthBanner />
            </div>
          </div>
        </div>
        <div className="col col-lg-3 col-md-6 banners">
          <SaleBanner />
        </div>
      </div>
    </>
  );
};

export default Home;

<h2>
  Easy Shopping. <br /> No need to go to the <br /> shop anymore.
</h2>;
