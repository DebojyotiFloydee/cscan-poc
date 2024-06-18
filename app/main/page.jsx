'use client'

import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearImages } from "../singleShot/imageSlice";
import Link from "next/link";

const Main = () => {
    const [isClient, setIsClient] = useState(false);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [locationError, setLocationError] = useState(null);

    const image = useSelector(state => state.image);

    const dispatch = useDispatch()

    const [images, setImages] = useState([]);

    const clearImage = () => { dispatch(clearImages()) }

    const baseUrlPost = "https://cardata.devinternal.carscan.ai/cardata/poc/upload";
    const baseUrlGet = 'https://cardata.devinternal.carscan.ai/cardata/poc/get-image/';

    // const client = axios.create({ baseUrl: baseUrl })

    // const postImages = (id, imgSrc) => {
    //     axios.post(baseUrlPost, [{ id: id, src: imgSrc, }]).then((data) => { console.log(data) })
    // }

    const uploadImages = () => {
        axios.post(baseUrlPost, images).then((res) => {
            console.log(res)
            if (res.status == 200) {
                axios.get(baseUrlGet + images[0].id).then((res) => {
                    console.log("1st image that was sent:" + res);
                })
            }
        })
    }

    useEffect(() => {
        setImages(image);
        setIsClient(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    handleLocationError(error);
                }
            );
        } else {
            setLocationError('Geolocation is not supported by this browser.');
        }


    }, []);

    const handleLocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setLocationError('User denied the request for Geolocation. Please enable location services in your device settings.');
                break;
            case error.POSITION_UNAVAILABLE:
                setLocationError('Location information is unavailable. Please check your device settings.');
                break;
            case error.TIMEOUT:
                setLocationError('The request to get user location timed out. Please try again.');
                break;
            case error.UNKNOWN_ERROR:
            default:
                setLocationError('An unknown error occurred while fetching location.');
                break;
        }
    };

    return (
        <div>
            {location.latitude && location.longitude && (
                <div className="locationContent">
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            {locationError && (
                <div className="errorMsg">
                    <p>Error: {locationError}</p>
                    {locationError.includes('denied') && (
                        <p>Please enable location services in your device settings.</p>
                    )}
                </div>
            )}

            <br />

            <Link className="button button-main" href={'/singleShot'}>Take Pictures</Link>
            <br />
            <br />
            <br />
            {(image.length > 0) && <button className="button" onClick={() => { clearImage() }}>Clear Images</button>}
            {(image.length > 0) && <button className="button" onClick={() => { uploadImages() }}>Upload Images</button>}
            {(image.length > 0) && <p className="mainPicturesText">Pictures:</p>}
            <div className="displayBox">
                {(images.map((img, index) => {
                    return (
                        <div className="img-wrapper">
                            <p className="img-text">{img.counter}</p>
                            < img key={img.id} src={img.src} alt="Photo Taken" />
                            {/* <button className="button" onClick={() => { postImages(img.id, img.src) }}>Upload</button> */}
                        </div>
                    )
                }))}
            </div>

        </div>
    );
}

export default Main;