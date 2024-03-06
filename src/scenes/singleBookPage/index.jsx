import React from "react";
import {Box, useMediaQuery} from "@mui/material";
import ShowSingleBook from "../components/showSingleBook"
import Reviews from "../components/reviews"
const SingleBookPage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    return (
        <Box
            width="100%"
            display={isNonMobileScreens ? "flex" : "block"}
            justifyContent="space-between">
            <Box flexBasis={"70%"}>
                <ShowSingleBook/>
            </Box>
            <Box flexBasis={"40%"}>
                <Reviews/>
            </Box>
        </Box>
    );
};

export default SingleBookPage;
