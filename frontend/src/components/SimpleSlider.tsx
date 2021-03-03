import React from "react";
import Slider from "react-slick";
import Image from './Image';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SliderProps {
  product: [{
    id: 0,
    goodsId: '',
    goodsNm: '',
    mdlCode: '',
    mdlNm: '',
    salePrice: 0,
    imgPath1: '',
    grpPath: '',
    colors: '',
    category: '',
    ctgRank: 1,
    reviewGrade: 5,
    reviewCount: 1,
    goodsDetailUrl: '',
    uspDesc: '',
    goodsPrcNo: 0
  }]
}

const SimpleSlider: React.FC<SliderProps> = ({ product }) => {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      useCSS: true
      }
  const products = product.map((pd, idx) => <Image key={idx} src={pd.imgPath1}/>)
    return (
      <Slider {...settings}>
        {products}
      </Slider>
    );
}

export default SimpleSlider