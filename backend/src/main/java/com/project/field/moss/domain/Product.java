package com.project.field.moss.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class Product {
	@Id
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
		
	@Column(name="goods_opt_str")
	private String goodsOptStr;

	@Column(name="ctg_rank")
	private int ctgRank;
	
	@Column(name="review_grade")
	private double reviewGrade;
	
	@Column(name="review_count")
	private int reviewCount;
	
	@Column(name="goods_detail_url")
	private String goodsDetailUrl;
	
	@Column(name="usp_desc")
	private String uspDesc;
	
	@Column(name="goods_prc_no")
	private int goodsPrcNo;

}
