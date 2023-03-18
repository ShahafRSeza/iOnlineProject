import "./about.css";
import { FiGithub, FiFacebook, FiLinkedin, FiMail } from "react-icons/fi";

const About = () => {
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleClick = () => {
    window.location.href = `mailto:shahafrseza@example.com?subject=Hello%20there&`;
  };

  return (
    <>
      <div className="aboutUs">
        <div className="section1">
          <h6>We're not just another e-commerce site</h6>
          <h1>
            we're so much <br /> <span>more than that.</span>
          </h1>
          <p className="opening">
            Whether you're an iPhone aficionado or a MacBook pro, we've got
            everything you need to keep you at the forefront of the tech game.
            So come on, and let us help you take a big ol' bite out of the tech
            world. You won't regret it - after all, <br />
            <span>an Apple a day keeps the tech troubles away!</span>
          </p>
          <img src="/images/appleproducts.jpeg" alt="products" width="100%" />
          <div className="mouse"></div>
        </div>
        <div className="section2 d-flex justify-content-between flex-wrap mb-5">
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
              We offer a comprehensive range of products, from the latest
              iPhones to the newest MacBooks, ensuring that you can stay
              up-to-date with the latest technology.
            </p>
          </div>
          <div className="col-lg-3 col">
            <img
              src="https://www.apple.com/ac/globalfooter/8/en_US/assets/ac-buystrip/help/icon_large.svg"
              width="14%"
            />
            <h2>Our Community</h2>
            <p>
              When you shop with us, you're not just buying a product, you're
              becoming part of a community of tech-savvy individuals who value
              the best of the best.
            </p>
          </div>
        </div>
      </div>
      <div className="row aboutMe gap-3">
        <div className="me col">
          <h2>About Me</h2>
          <p className="px-3">
            <span>
              Hello there! My name is Shahaf Seza, and I'm a Fullstack Web
              Development graduate from HackerU college.
            </span>
            I'm truly passionate about creating visually stunning web
            applications from scratch, and it's this very passion that led me to
            fall in love with coding. The thrill of turning a blank page into a
            breathtaking application is pure bliss for me, and I hope you'll
            enjoy my project just as much as I do. As a developer, I have a
            particular fondness for frontend frameworks such as React, but I'm
            also specialized in advanced frameworks like Angular, Node.js, and
            MongoDB.
          </p>
          <div className="socials d-flex gap-4 my-3">
            <FiGithub
              className="social"
              onClick={() => openInNewTab("https://github.com/ShahafRSeza")}
            />
            <FiFacebook
              className="social"
              onClick={() =>
                openInNewTab("https://www.facebook.com/ShahafSeza/")
              }
            />
            <FiLinkedin
              className="social"
              onClick={() =>
                openInNewTab("https://www.linkedin.com/in/shahafseza/")
              }
            />
            <FiMail className="social" onClick={() => handleClick()} />
          </div>
          <img
            src="/images/AvatarOnMac.png"
            alt="Avatar"
            className="avatarOnMac"
          />
        </div>

        <div className="col-lg-8 col-12">
          <div className="whyProject">
            <h2>
              The
              <img
                src="/images/lightbulb.png"
                alt="lightbulb"
                className="lightbulb"
              />
              Of This Project
            </h2>
            <p className="px-4 pb-3">
              As a fan of Apple's products (who own almost every device they
              have released) I admire Apple's ability to create clean and
              sophisticated designs that merge seamlessly with their coding.
              Their attention to detail is something I try to emulate in my own
              work. That's why, for my{" "}
              <strong>final web-development project</strong>, I've decided to
              channel my love for Apple into creating an e-commerce store that
              showcases the company's products in the best possible light. I'm
              excited to dive deep into my skills and showcase my abilities to
              bring this project to life.
            </p>
          </div>
          <div className="whyProject">
            <img src="/images/hifive.png" alt="HiFive" className="hiFive" />
            <h2>About This Project</h2>
            <p className="px-4 pb-3">
              <strong>
                This full-stack single-application website was built using
                MongoDB, Express, React, and Node.js (MERN).
              </strong>
              <br />
              <strong>Frontend stack:</strong> React, Bootstrap, Tostify,
              Formik, Yup and JWT Decode.
              <br />
              <strong>Backend stack:</strong> Node.js, Express, Bcrypt, Joi,
              JsonWebToken, Lodash, Axios, MongoDB and Mongoose.
              <br />
              <br />
              This website is packed with user-friendly features like
              sign-in/Login, cart management and product search by filters.
              Plus, customers can apply an optional coupon code to receive a 25%
              discount. As the admin, I have complete control to do C.R.U.D
              Operations and showcase all the store products in a beautiful way.
              I implemented a secure user authentication system, custom API
              service, Protected Routes (Guards), and Database Analysis to
              ensure reliable access to the website.
              <br />
              This project showcases my full-stack web development skills and
              also providing an elegant design and exceptional user experience
              for shopping Apple products.
              <br />
              <strong>Thanks for watching. Hope you liked it.</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
