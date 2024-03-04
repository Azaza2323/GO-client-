import { Box } from "@mui/material";
import Navbar from "../navbar";
import Book from "../components/showAllBooks"
import {useEffect, useState} from "react";
import  {jwtDecode}  from "jwt-decode";
const HomePage = () => {
    const [role, setRole] = useState("");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken)
            const role=decodedToken.role
            setRole(role)
        }
    }, [setRole]);
    return (
        <Box>
            <Navbar  role={role}/>
            <Book/>
        </Box>
    );
};

export default HomePage;
