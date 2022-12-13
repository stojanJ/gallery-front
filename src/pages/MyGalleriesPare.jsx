import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { galleryService } from "../services/GalleryService";
import { imageService } from "../services/ImageService";
import Pagination from '../components/Pagination';
import MyGalleries from '../components/AllGalleries';
import { authService } from "../services/AuthService";
import useAuth from "../hooks/useAuth";
import SearchBar from "../components/SearchBar";


export default function MyGallery() {
    let { userId } = useParams();
    const [galleries, setGallerys] = useState([]);
    const [currentRecords, setCurrentRecords] = useState([]);
    const [images, setImages] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setrecordsPerPage] = useState(10);
    const [nPages, setNPages] = useState(0);
    const [initLoading, setInitLoading] = useState(true);

    const { user, login } = useAuth();

    const handleGetGallers = async () => {
        const galleries = await galleryService.getGallerisByUserId(user.id);
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords2 = galleries.gallery.slice(indexOfFirstRecord, indexOfLastRecord);
        setNPages(Math.ceil(galleries.gallery.length / recordsPerPage));
        setCurrentRecords(currentRecords2);
        setGallerys(galleries);
        setInitLoading(false);
    };

    const handleGetImages = async () => {
        const images = await imageService.getAll();
        setImages(images.image);
    };

    useEffect(() => {
        handleGetGallers();
        handleGetImages();
    }, []);

    useEffect(() => {
        if (initLoading) {
            return;
        }
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords2 = galleries.gallery.slice(indexOfFirstRecord, indexOfLastRecord);
        setNPages(Math.ceil(galleries.gallery.length / recordsPerPage));
        setCurrentRecords(currentRecords2);
    }, [currentPage]);

    const sendDataToParent = (data) => { 
        setCurrentRecords(data);
    };


    return (
        <div>
            <SearchBar
                data={galleries}
                sendDataToParent={sendDataToParent}
            />
            {images.length && currentRecords.length ?
                <div><MyGalleries
                    galleries={currentRecords}
                    images={images}
                    user={user.id}
                />
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    /> </div> : <p>Loading</p>}
        </div>
    );
}