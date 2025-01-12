import React from "react";
import emailjs from 'emailjs-com';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Typography, IconButton } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const AdminEventList: React.FC = () => {

    interface FormData {
        to_email: string;
        to_name: string;
        message: string;
        event_name: string;
        [key: string]: string;
    }

    const sendEmail = (formData: FormData) => {
        // Sending email via EmailJS
        emailjs
            .send(
                'service_0pi2w93', // Replace with your service ID from EmailJS
                'template_0yk24sa', // Replace with your template ID from EmailJS
                formData, // This is the data passed to the email template
                'dSYlCn8kygvjVYSzJ' // Replace with your user ID from EmailJS
            )
            .then(
                (result) => {
                    console.log('Email sent successfully:', result.text);
                    alert('Email sent successfully!');
                },
                (error) => {
                    console.error('Error sending email:', error.text);
                    alert('Failed to send email.');
                }
            );
    };


    interface Column {
        id: 'name' | 'email' | 'decision';
        label: string;
        minWidth?: number;
        align?: 'right' | 'left' | 'center';
    }

    const columns: readonly Column[] = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'decision', label: 'Decision', minWidth: 170, align: 'center' },
    ];

    interface Data {
        name: string;
        email: string;
        decision: null;
    }

    function createData(name: string, email: string): Data {
        return { name, email, decision: null };
    }

    const rows = [
        createData('Tharun', 'tharun.m1807@gmail.com'),
        createData('Bharath Kumar', 'tbharathkd007@gmail.com'),
        createData('Alice Johnson', 'alice.johnson@example.com'),
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChange = (row: Data, msg: string) => {
        sendEmail({to_email: row.email, to_name: row.name, message: msg, event_name: 'Vanakkam Chennai 2025'})
    };

    return (
        <div style={{ height: "100vh", backgroundColor: "#1E1E1E" }}>
            <div style={{ backgroundColor: "#1875D2", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ color: "white" }}>Northeastern Club Hub - Admin</p>
                <div style={{ display: "flex", gap: "8px", color: "white" }}>
                    <EventIcon />
                    <NotificationsIcon />
                    <AccountCircleIcon />
                </div>
            </div>
            <div style={{ padding: "10px", color: "white", marginTop: "3rem" }}>
                <Typography variant="h5" gutterBottom>Vanakkam Chennai 2025 </Typography>
                <div style={{ marginTop: "3rem", backgroundColor: "transparent" }}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 600, backgroundColor: "#121212" }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                                backgroundColor: "#1E1E1E", // Slightly lighter than the table background
                                                color: "#FFFFFF",
                                                fontWeight: "bold",
                                                borderBottom: "2px solid #333333", // Optional separator for header
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}
                                                sx={{
                                                    "&:nth-of-type(odd)": { backgroundColor: "#1A1A1A" },
                                                    "&:nth-of-type(even)": { backgroundColor: "#1E1E1E" },
                                                    "&:hover": { backgroundColor: "#292929" }, // Highlighted on hover
                                                    color: "#FFFFFF", // Text color
                                                }}
                                            >
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ color: "#FFFFFF", borderBottom: "1px solid #333333" }}
                                                        >
                                                            {column.id === "decision" ? (
                                                                <div>
                                                                    <IconButton
                                                                        style={{ color: "green" }}
                                                                        onClick={() => handleChange(row,"Congratulations, You have been accepted to attend this event")}
                                                                    >
                                                                        <CheckCircleIcon />
                                                                    </IconButton>
                                                                    <IconButton
                                                                        style={{ color: "red" }}
                                                                        onClick={() => handleChange(row,"Sorry, You have been rejected to attend this event")}
                                                                    >
                                                                        <CancelIcon />
                                                                    </IconButton>
                                                                </div>
                                                            ) : (
                                                                value
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            sx={{
                                backgroundColor: "#121212", // Match table background
                                color: "#FFFFFF", // White text for dark background
                                "& .MuiTablePagination-toolbar": {
                                    backgroundColor: "#1E1E1E", // Slightly lighter gray
                                },
                                "& .MuiTablePagination-select": {
                                    color: "#FFFFFF", // Dropdown text
                                },
                                "& .MuiTablePagination-selectIcon": {
                                    color: "#FFFFFF", // Dropdown arrow
                                },
                                "& .MuiTablePagination-actions": {
                                    color: "#FFFFFF", // Pagination arrows
                                },
                                "& .Mui-disabled": {
                                    color: "#555555", // Disabled button color
                                },
                            }}
                    />
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default AdminEventList;