import { Typography } from '@mui/material';
import ProductGrid from "../components/ProductGrid";
import {products} from "../utils/testdata";
import FileUpload from "../components/FileUpload";
import React from "react";
import ProductCard from "../components/ProductCard";
import MultiImageCard from "../components/MultiImageCard";

const Fit = () => {
    const handleFileSelect = (file) => {
        // TODO: add functionality to take care of the file here
        console.log('Selected file:', file);
    };
    return (
        <>
            <ProductGrid cardComponent={MultiImageCard} products={products}/>
            <FileUpload onFilesSelect={handleFileSelect}/>
        </>
    );
};

export default Fit;
