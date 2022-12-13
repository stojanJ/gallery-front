import React, { useState, useEffect } from "react";
import { galleryService } from "../services/GalleryService";
import { imageService } from "../services/ImageService";
import Pagination from '../components/Pagination';
import AllGalleries from '../components/AllGalleries';
import SearchBar from "../components/SearchBar";


export default function AllGalleryPage() {
    const [galleries, setGallerys] = useState([]);
    const [currentRecords, setCurrentRecords] = useState([]);
    const [images, setImages] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setrecordsPerPage] = useState(10);
    const [nPages, setNPages] = useState(0);
    const [initLoading, setInitLoading] = useState(true);

    const[user, setUser] = useState([]);


    const sendDataToParent = (data) => { 
        setCurrentRecords(data);
      };

      
    const handleGetGallers = async () => {
        const galleries = await galleryService.getAll();
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
        if(initLoading) {
            return;
        }
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const currentRecords2 = galleries.gallery.slice(indexOfFirstRecord, indexOfLastRecord);
        setNPages(Math.ceil(galleries.gallery.length / recordsPerPage));
        setCurrentRecords(currentRecords2);
    }, [currentPage]);




    return (
        <div>
            
           <SearchBar
            data={galleries}
            sendDataToParent={sendDataToParent} 
            />
            {images.length && currentRecords.length ?
           <div>
            <AllGalleries
             galleries={currentRecords}
             images = {images}
             />
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            /> </div>: <p>Loading</p>}
        </div>
    );
}