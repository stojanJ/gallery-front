import React from 'react'

const AllGalleries = ({ galleries, images , userId }) => {
    const resolt =images.find((gallery)=>gallery.id === images.gallery_id);

    const galleryImg = galleries.map((gallery)=>{
        const resolt =images.find((image)=>gallery.id === image.gallery_id && gallery.user_id === userId)
        return{
            ...gallery, url: resolt ? resolt.url : ""
        } 
    } )
    return (

        <ul>
            {galleryImg && galleryImg.map((gallery) =>
                <li key={gallery.id}>{gallery.title}
                   <img src={gallery.url}/>
                    {gallery.description}</li>
            )}
        </ul>
    )
}

export default AllGalleries  
