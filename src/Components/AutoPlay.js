import React, { Component } from "react";
import Slider from "react-slick";
import imageOne from "../Asset/one.png";
import imageTwo from "../Asset/two.png";
import imageThree from "../Asset/three.png";
import imageFive from "../Asset/five.png";
import imageFour from "../Asset/four.jpg";
import './AutoPlay.css';

export default class AutoPlay extends Component {

  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="autoplay_wrapper">
        <Slider {...settings}>
          <div className="image_div">
            <img src={imageOne} alt="" />
          </div>
          <div className="image_div">
          <img src={imageTwo} alt="" />
          </div>
          <div className="image_div">
          <img src={imageThree} alt="" />
          </div>
          <div className="image_div">
          <img src={imageFour} alt="" />
          </div>
          <div className="image_div">
          <img src={imageFive} alt="" />
          </div>
        </Slider>
      </div>
    );
  }
}