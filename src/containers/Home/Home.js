import React, { Component } from "react";
import classes from "./Home.module.css";
import Product from "../../component/Product/Product";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Home extends Component {
  state = {
    products: [
      {
        id: "12125488",
        title:
          "【2+1 Pack】Galaxy S20 Screen Protector and Camera Lens Screen protector, Compatible Fingerprint, Easy installation, Bubble Proof, Scratch Resistant, Full Coverage HD Clear Tempered Glass Screen Protector for Samsung S20",
        image:
          "https://m.media-amazon.com/images/I/61cJ0qr4NjL._AC_UL480_FMwebp_QL65_.jpg",
        rating: 4,
        price: 244.99,
      },
      {
        id: "87894566",
        title:
          'Selfie Ring Light for Laptop,Ring Light with Cell Phone Holder,USB Video Conference Lighting with Stand,6.3" Desk LED Remote Working for Laptop,Zoom Call Lighting,Distance Learning,Office,Makeup',
        image:
          "https://m.media-amazon.com/images/I/61HzWE82weL._AC_UL480_FMwebp_QL65_.jpg",
        rating: 3,
        price: 15.99,
      },
      {
        id: "54564685",
        title: "Phone Kickstand, Cellphone Stand, Angle Adjustable, Black",
        image:
          "https://m.media-amazon.com/images/I/71rRFI7HXeS._AC_UL480_FMwebp_QL65_.jpg",
        rating: 4,
        price: 9.99,
      },
      // {
      //   title:
      //     "Ailun Glass Screen Protector Compatible for iPhone 11/iPhone XR, 6.1 Inch 3 Pack Tempered Glass",
      //   image:
      //     "https://m.media-amazon.com/images/I/81MZ5D1wHpL._AC_UL480_FMwebp_QL65_.jpg",
      //   rating: 3,
      //   price: 7.98,
      // },
      // {
      //   title:
      //     "TOZO T6 True Wireless Earbuds Bluetooth Headphones Touch Control with Wireless Charging Case IPX8 Waterproof Stereo Earphones in-Ear Built-in Mic Headset Premium Deep Bass for Sport Black",
      //   image:
      //     "https://m.media-amazon.com/images/I/71gtHnQGfQL._AC_UL480_FMwebp_QL65_.jpg",
      //   rating: 4,
      //   price: 34.99,
      // },
      // {
      //   title:
      //     "TOZO T10 Bluetooth 5.0 Wireless Earbuds with Wireless Charging Case IPX8 Waterproof Stereo Headphones in Ear Built in Mic Headset Premium Sound with Deep Bass for Sport Black",
      //   image:
      //     "https://m.media-amazon.com/images/I/71kx6Gd-PmL._AC_UL480_FMwebp_QL65_.jpg",
      //   rating: 3,
      //   price: 29.99,
      // },
    ],
  };

  addItem = (item) => {
    this.props.onAddToBasket(item);
  };

  render() {
    const products = this.state.products.map((product, index) => {
      return (
        <Product
          key={product.title}
          rating={product.rating}
          price={product.price}
          title={product.title}
          image={product.image}
          addItem={() => this.addItem(product)}
        />
      );
    });

    return (
      <div className={classes.Home}>
        <div className={classes.Home__Container}>
          <img
            className={classes.Home__Image}
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          />

          <div className={classes.Home__Row}>{products}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToBasket: (item) => dispatch(actions.addToBasket(item)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
