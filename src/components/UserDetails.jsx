import styles from './Auth.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function UserDetails() {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    useEffect(() => {
        fetchUserDetails();
    },[]);
        
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/auth/userDetails`, {
                withCredentials: true,
            });
            setUser(response.data.user);
        }
        catch (error) {
            console.log(error);
            alert("Failed to fetch user details. Please login again.");
            navigate('/login');
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${API_URL}/api/auth/logout`, {}, {
                withCredentials: true,
            });
            navigate('/login');
        }
        catch (error) {
            console.error('Logout failed:', error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authForm}>
                <h2 className={styles.authTitle}>User Details</h2>
                {user && (
                    <>
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {user.mobile}
                        </p>
                    </>
                )}
                <button className={styles.authButton} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}
export default UserDetails;