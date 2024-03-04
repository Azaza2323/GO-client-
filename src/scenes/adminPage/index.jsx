import { Box } from "@mui/material";
import Navbar from "../navbar";
import AddBook from "../components/createBooks";
import DeleteBook from "../components/deleteBook";
import {useEffect, useState} from "react";
import  {jwtDecode}  from "jwt-decode";
const AdminPage = () => {
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
            <AddBook/>
            <DeleteBook/>
        </Box>
    );
};

export default AdminPage;
