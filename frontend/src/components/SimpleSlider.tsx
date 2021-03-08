import React from "react";
import Slider from "react-slick";
import Image from './Image';
import styles from '../styles/result.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// carousel
function SimpleSlider(props) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    useCSS: true
  };
  
  function url(str: string) { //  이미지 주소 return
    return 'https://www.samsung.com/sec/' + str;
  }

  function desc(str: string) {  //  상품 상세 \n 처리
    const arr = str.split('\n');
    return arr.map((desc, idx) => <div key={idx}>{desc}</div>)
  }

  //  추천 상품 리스트의 각 요소 mapping
  const products = props.product.map((pd, idx) => <div key={idx}>
    <a href={url(pd.goodsDetailUrl)}>
      <Image src={pd.imgPath1} />
    </a>
    <h4>{pd.goodsNm}</h4>
    <div className={styles.goodsDesc}>{desc(pd.uspDesc)}</div>
  </div>);

  return (
    <Slider {...settings}>
      {products}
    </Slider>
  );
}

export default SimpleSlider