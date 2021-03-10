package com.project.field.moss.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter @Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private Long id;

    @Column(name="goods_id")
	private String goodsId;
	
	
	@Column(name="goods_nm")
	private String goodsNm;
	
	
	@Column(name="mdl_code")
	private String mdlCode;
	
	@Column(name="mdl_nm")
	private String mdlNm;
	
	@Column(name="sale_price")
	private int salePrice;
	
	@Column(name="img_path1")
	private String imgPath1;
	
	@Column(name="grp_path")
	private String grpPath;
		
	@Column(name="colors")
	private String colors;
	
	@Column(name="category")
	private String category;

	@Column(name="ctg_rank")
	@ColumnDefault("0")
	private int ctgRank;
	
	@Column(name="review_grade")
	private double reviewGrade;
	
	@Column(name="review_count")
	private int reviewCount;
	
	@Column(name="goods_detail_url")
	private String goodsDetailUrl;
	
	@Column(name="usp_desc", columnDefinition="TEXT")
	private String uspDesc;
	
	@Column(name="goods_prc_no")
	private int goodsPrcNo;

}
