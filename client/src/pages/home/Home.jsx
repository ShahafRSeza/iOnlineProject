import Carousel from "../../components/carousel/Carousel";
import FirstBanner from "../../components/banners/FirstBanner";
import SecondBanner from "../../components/banners/SecondBanner";
import "./home.css";
import Sale from "../../components/sale/Sale";

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
        <div className="col">
          <Sale />
        </div>
      </div>
      <h2 className=" text-center my-5">
        Easy Shopping. <br /> No need to go to the <br /> shop anymore.
      </h2>
    </>
  );
};

export default Home;
