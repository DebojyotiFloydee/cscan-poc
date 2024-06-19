"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addImage } from "./imageSlice";
import { Camera } from "react-camera-pro";
import { nanoid } from "@reduxjs/toolkit";

function SingleShot() {
  const camera = useRef(null);
  // const [image, setImage] = useState(null);

  const [counter, setCounter] = useState(0);
  const incrementCounter = () => setCounter(counter + 1);

  const dispatch = useDispatch();

  const addImageHandler = (img, counter) => {
    dispatch(addImage({ id: nanoid(), src: img, counter: counter }));
    incrementCounter();
  };

  return (
    <div>
      <div className="overlay"></div>
      <Camera ref={camera} aspectRatio={"cover"} facingMode="environment" />
      <div className="button-capture-wrapper">
        <button
          className="button button-capture"
          title="Capture"
          onClick={() => addImageHandler(camera.current.takePhoto(), counter)}
        >
          {counter}
        </button>
        <Link
          className="button button-finish"
          title="Finish"
          href={{ pathname: "/main/" }}
        >
          &nbsp;
        </Link>
      </div>
    </div>
  );
}

export default SingleShot;
