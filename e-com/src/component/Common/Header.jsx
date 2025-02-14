import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
const Header = () => {
  return (
    <>
      <header>
        <div className="left">
          <div className="left-BrandName">NAVAS</div>
          <div className="left-categories">Shirts</div>
          <div className="left-categories">Trouser</div>
          <div className="left-categories">Jackets</div>
          <div className="left-categories">Accessories</div>
        </div>
        <div className="icons">
          <div className="icon">
            <CiHeart
              size="2rem"
              style={{
                backgroundColor: " #243647",
                borderRadius: "12px",
                padding: "0.3rem",
                color: "white",
              }}
            />
          </div>

          <div>
            <CiShoppingCart
              size="2rem"
              style={{
                backgroundColor: " #243647",
                borderRadius: "12px",
                padding: "0.3rem",
                color: "white",
              }}
            />
          </div>
          <div>
            <IoPerson
              size="2rem"
              style={{
                backgroundColor: " #243647",
                borderRadius: "12px",
                padding: "0.3rem",
                color: "white",
              }}
            />
          </div>
        </div>
      </header>
      <hr />
    </>
  );
};

export default Header;
