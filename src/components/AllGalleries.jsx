import React from 'react'
import { Link } from "react-router-dom";

const AllGalleries = ({ galleries, images }) => {
    const resolt = images.find((gallery) => gallery.id === images.gallery_id)

    const galleryImg = galleries.map((gallery) => {
        const resolt = images.find((image) => gallery.id === image.gallery_id)
        return {
            ...gallery, url: resolt ? resolt.url : ""
        }
    })
    
    return (

        <ul>
            {galleryImg && galleryImg.map((gallery) =>
                <li key={gallery.id}><Link to={`/gallery/${gallery.id}`}>{gallery.title}</Link>
                    <img className='d-block w-100' src={gallery.url} />
                    Description:{gallery.description}
                    <br />Author:<Link to={`/author/${gallery.user.user_id}`} >{gallery.user.name}</Link> {gallery.user.lastName}
                    <br />Created at:{gallery.created_at}<br /></li>
            )}
        </ul>
    )
}
export default AllGalleries  
