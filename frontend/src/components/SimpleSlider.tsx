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
    if (str == null)
      return <div></div>;
    const arr = str.split('\n');
    return arr.map((desc, idx) => <div key={idx}>{desc}</div>);
  }

  //  추천 상품 리스트의 각 요소 mapping
  const products = props.product.map((pd, idx) =>
    <div key={idx}>
      <button className={styles.imgBtn} title='클릭 시 상품 페이지로 이동합니다.'
        onClick={() => window.open(url(pd.goods_detail_url), '_blank')}>
        <Image src={pd.img_path1} />
      </button>
      <h4>{pd.goods_nm}</h4>
      <div className={styles.goodsDesc}>{desc(pd.usp_desc)}</div>
    </div>
  );

  return (
    <Slider {...settings}>
      {products}
    </Slider>
  );
}

export default SimpleSlider