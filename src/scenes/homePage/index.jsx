import { Box } from "@mui/material";
import Navbar from "../navbar";
import Book from "../components/showAllBooks"
import AddBook from "../components/CreateBooks";
import {FlashMessageProvider} from "../../flashMessage";

const HomePage = () => {

    return (
        <Box>
            <Navbar />
            <Book/>
            <AddBook/>
            <FlashMessageProvider>
                <Book/>
            </FlashMessageProvider>
        </Box>
    );
};

export default HomePage;
