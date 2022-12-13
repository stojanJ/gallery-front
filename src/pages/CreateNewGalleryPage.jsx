import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from 'react-bootstrap/Button';

import { galleryService } from "../services/GalleryService";
import { imageService } from "../services/ImageService";

export default function CreateNewGalleryPage() {
    const history = useHistory();
    const { user } = useAuth();
    const { id } = useParams();
    const [urlList, setUrlList] = useState([{
        gallery_id: id,
        url: '',
    }]);
    const [newGallery, setNewGallery] = useState({
        title: '',
        description: '',
        user_id: user.id,
    });
    const [newUrl, setNewUrl] = useState({
        gallery_id: id,
        url: '',
    });

    const handleUrlChanges = (obj) => {

        urlList[obj.index].url = obj.url;
        setUrlList([...urlList])
    }

    const handleRemoveUrl = (urlIndex) => {
        setUrlList([
            ...urlList.slice(0, urlIndex),
            ...urlList.slice(urlIndex + 1),
        ]);
    };

    const handleMoveUrlToTop = (urlIndex) => {
        setUrlList([
            urlList[urlIndex],
            ...urlList.slice(0, urlIndex),
            ...urlList.slice(urlIndex + 1),
        ]);
    };
    const handleMoveUrlUp = (urlIndex) => {
        setUrlList([
            ...urlList.slice(0, urlIndex - 1),
            urlList[urlIndex],
            urlList[urlIndex - 1],
            ...urlList.slice(urlIndex + 1),
        ]);
    };
    const handleMoveUrlDown = (urlIndex) => {
        setUrlList([
            ...urlList.slice(0, urlIndex),
            urlList[urlIndex + 1],
            urlList[urlIndex],
            ...urlList.slice(urlIndex + 2),
        ]);
    };

    const handleAddUrl = (e) => {
        e.preventDefault();

        urlList.push({
            gallery_id: id,
            url: ''
        })
        setUrlList([
            ...urlList]
        )
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await galleryService.add(newGallery);
        const dataForSubmit = urlList.map(urlObject => {
           return  {
            gallery_id: data.gallery.id,
            url: urlObject.url
           }
        })
        const image = await imageService.add(dataForSubmit);

        setNewGallery(data);
        setNewUrl(image);
        history.push('/');
    };

    return (
        <div>
            <form onSubmit={e => e.preventDefault()} >
                <label>Title:
                    <input
                        required
                        type="text"
                        aria-label="title"
                        minLength='2'
                        value={newGallery.title}
                        onChange={({ target }) =>
                            setNewGallery({ ...newGallery, title: target.value })
                        }
                    ></input></label>
                <label>Description:
                    <input
                        required
                        type="text"
                        aria-label="text"
                        maxLength='1000'
                        value={newGallery.description}
                        onChange={({ target }) =>
                            setNewGallery({ ...newGallery, description: target.value })
                        }
                    ></input></label>
                {urlList.map((urls, index) => (
                    <label key={index}>Image:
                        <input
                            type="text"
                            aria-label="url"
                            accept=".png, .jpg, .jpeg"
                            value={urls.url}
                            onChange={({ target }) =>
                            handleUrlChanges({ index, url: target.value })
                            }></input>
                        <Button onClick={handleAddUrl}>
                            Add another URL
                        </Button>
                        {index > 0 ? <Button onClick={() => handleRemoveUrl(index)}>
                            Remove
                        </Button> : ''}
                        {index > 0 ? <Button onClick={() => handleMoveUrlToTop(index)}>
                            ON TOP
                        </Button>:""}
                        {index > 0 ?<Button onClick={() => handleMoveUrlUp(index)}>
                            Move Up
                        </Button>:""}
                        {index > 0 ? <Button onClick={() => handleMoveUrlDown(index)}>
                            Move Down
                        </Button>:""}
                    </label>

                ))}
            </form>
            <Button onClick={handleSubmit} >Submit</Button>

        </div>
    )
}