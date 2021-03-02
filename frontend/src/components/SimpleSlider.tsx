import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'

interface SliderProps {
    product: string[]
}

const SimpleSlider: React.FC<SliderProps> = ({ product }) => {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
      }
    const products = product.map((src, idx) => <div><Image src={src} alt="" width="100" height="100" key={idx}/></div>)
    return (
      <Slider {...settings}>
        {products}
      </Slider>
    );
}

export default SimpleSlider