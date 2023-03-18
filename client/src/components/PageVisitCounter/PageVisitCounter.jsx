import React, { useState, useEffect } from "react";

function PageVisitCounter() {
  const [count, setCount] = useState(0);
  const id = window.location.pathname;

  useEffect(() => {
    const pageVisits = parseInt(localStorage.getItem(id)) || 0;
    localStorage.setItem(id, pageVisits + 1);
    setCount(pageVisits + 1);
  }, [id]);

  return (
    <div>
      {count > 1 ? (
        <span>You saw this product {count} times</span>
      ) : (
        <span className="text-success">
          It's the first time You watch this Product
        </span>
      )}
    </div>
  );
}

export default PageVisitCounter;
