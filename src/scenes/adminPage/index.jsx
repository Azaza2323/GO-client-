import { Box } from "@mui/material";
import AddBook from "../components/createBooks";
import DeleteBook from "../components/deleteBook";
const AdminPage = () => {
    return (
        <Box>
            <AddBook/>
            <DeleteBook/>
        </Box>
    );
};

export default AdminPage;
