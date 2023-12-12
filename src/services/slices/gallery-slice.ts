import { createSlice } from "@reduxjs/toolkit";
import img1 from "../../assets/gallery-page/1.jpeg";
import img2 from "../../assets/gallery-page/2.jpeg";
import img3 from "../../assets/gallery-page/3.jpg";
import img4 from "../../assets/gallery-page/4.jpg";
import img5 from "../../assets/gallery-page/5.jpg";
import img6 from "../../assets/gallery-page/6.jpg";
import img7 from "../../assets/gallery-page/7.jpg";
import img8 from "../../assets/gallery-page/8.jpg";
import img9 from "../../assets/gallery-page/9.jpg";
import img10 from "../../assets/gallery-page/10.jpg";

interface IGalleryState {
  images: string[];
}

const initialState: IGalleryState = {
  images: [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
  ],
};

export const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
});
