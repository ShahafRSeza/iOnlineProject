import "./banners.css";

const SaleBanner = () => {
  return (
    <div className="container saleBanner">
      <div className="d-flex mx-2 mt-2">
        <div>
          <p className="saleprice">FINAL SALE</p>
          <h1 className="saleTitle">25% OFF</h1>
          <p>
            Coupon <strong>Sale25</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SaleBanner;
