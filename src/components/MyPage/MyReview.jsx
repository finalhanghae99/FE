import React, { useState, useEffect, useRef } from "react";

import { instance } from "../../api/axiosApi";
import { BoxHeader, BoxMoreLink, BoxName, ItemBox } from "../elements/ItemBox";

import { AiOutlineHeart } from "react-icons/ai";
import styled from "styled-components";

import testImg from "../../img/test_camp_img.jpg"
import ReviewElement from "./ReviewElement";

function MyReview() {
  const [review, serReview] = useState(null);
  const fetchReview = async () => {
    try {
      const { data } = await instance.get(`myReview`);
      serReview(data);
    } catch (error) { console.log(error); }
  };
  useEffect(() => {
    fetchReview();
  }, [])

  const starRender = (score) => {
    let stars = "";
    for (let i = 0; i < score; i++) {
      stars += "★";
    }
    stars = stars.padEnd(5, '☆')
    return stars;
  };



  const imgArr = [testImg, testImg, testImg, testImg, testImg]
  const imgArr2 = [testImg, testImg, testImg]


  return (
    <ItemBox>
      {review?.map((v) => {
        return (
          <ReviewElement key={v.id} review={v} />
        )
      })}
    </ItemBox>
  )
}

export default MyReview;