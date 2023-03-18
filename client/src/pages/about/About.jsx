import "./about.css";
const About = () => {
  return (
    <div className="aboutUs">
      <div className="section1">
        <h6>We're not just another e-commerce site</h6>
        <h1>
          we're so much <br /> <span>more than that.</span>
        </h1>
        <p className="opening">
          Whether you're an iPhone aficionado or a MacBook pro, we've got
          everything you need to keep you at the forefront of the tech game. So
          come on, and let us help you take a big ol' bite out of the tech
          world. You won't regret it - after all, <br />
          <span>an Apple a day keeps the tech troubles away!</span>
        </p>
        <img src="/images/appleproducts.jpeg" alt="products" width="100%" />
      </div>
      <div className="section2 d-flex justify-content-around flex-wrap gap-3 p-5">
        <div className="col-lg-3 col">
          <img
            src="https://www.apple.com/v/mac/mac-does-that/a/images/overview/icon_family_sharing__d4k08ub6ip0m_large_2x.png"
            width="20%"
            style={{ opacity: "0.6", margin: "10px" }}
          />
          <h2>Our Team</h2>
          <p>
            We pride ourselves on the quality of our team. Our handpicked
            employees are experts in all things Apple and are passionate about
            providing you with the best possible service.
          </p>
        </div>
        <div className="col-lg-3 col">
          <img
            src="https://www.apple.com/ac/globalfooter/8/en_US/assets/ac-buystrip/shipping/icon_large.svg"
            width="10%"
          />
          <h2>Our Products</h2>
          <p>
            We offer a comprehensive range of products, from the latest iPhones
            to the newest MacBooks, ensuring that you can stay up-to-date with
            the latest technology.
          </p>
        </div>
        <div className="col-lg-3 col">
          <img
            src="https://www.apple.com/ac/globalfooter/8/en_US/assets/ac-buystrip/help/icon_large.svg"
            width="14%"
          />
          <p>
            <h2>Our Community</h2>
            When you shop with us, you're not just buying a product, you're
            becoming part of a community of tech-savvy individuals who value the
            best of the best.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
