import React from "react";
import Slider from "react-slick";
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
      slidesToScroll: 1
      }
    const products = product.map((pd, idx) => <div key={idx}><img src={pd.imgPath1} alt="" width="300" height="300" />
    </div>)
    return (
      <Slider {...settings}>
        {products}
      </Slider>
    );
}

export default SimpleSlider