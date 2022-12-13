import React, { useEffect } from "react";
import { galleryService } from "../services/GalleryService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { imageService } from "../services/ImageService";
import Carousel from 'react-bootstrap/Carousel';
import Comments from '../components/Comments';


export default function SingleGallery() {
  const { galley_id } = useParams();
  const [gallery, setSingleGallery] = useState();
  const [singleGalleryImage, setSingleGalleryImage] = useState()
  const [index, setIndex] = useState(0);

  const handleGetGaller = async () => {
    const imageData = await imageService.get(galley_id)
    const data = await galleryService.get(galley_id)
    setSingleGallery(data.gallery)
    setSingleGalleryImage(imageData.image)
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    handleGetGaller();
  }, []);


  return (
    <div>
      <div>
        {gallery ?
          <div>
            <h1>{gallery.title}</h1>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {singleGalleryImage.map((slide, i) => {
                return (
                  <Carousel.Item
                    key={slide.id}>
                    <a href={slide.url}
                      target="_blank">
                      <img
                        className="d-block w-100"
                        src={slide.url}
                        alt="slider image"
                      /></a>
                  </Carousel.Item>
                )
              })}

            </Carousel>
            {/* {singleGalleryImage.map((image, index)=>
                  <img key={index} src={image.url}/>
                )} */}
            <p>Name: {gallery.user.name} Last name: {gallery.user.lastName}</p><br />
            <p>Created at: {gallery.created_at}</p>
          </div>
          : <p>Loading</p>}
      </div>
      <div>
        <Comments
        galley_id={galley_id}
        />
      </div>
    </div>
  )
}