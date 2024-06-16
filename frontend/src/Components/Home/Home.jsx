import React, { useContext, useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import authContext from "../Context/Context";

function Home() {
    const { userData, loading ,handleLogout } = useContext(authContext);

    const [arrival, setArrival] = useState(false);

    useEffect(()=>{
        if(userData){
          setArrival(true);
        }
    },[userData]);
    
    

    // const handleLogout = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:3000/api/auth/logout', {
    //             method: 'POST',
    //             credentials: 'include'
    //         });

    //         const data = await response.json();

    //         if (response.ok) {
    //             console.log(data.message);
    //             navigate('/login');
    //         } else {
    //             console.log(data.message);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container">
                <h2>Welcome {userData ? userData.name : "User"}!</h2>
                <div className="user-info">
                    <p>
                        <strong>Name:</strong> {arrival ? userData.name : "John Doe"}
                    </p>
                    <p>
                        <strong>Email:</strong> {arrival ? userData.email : "john.doe@example.com"}
                    </p>
                    <p>
                        <strong>Username:</strong> {arrival ? userData.username : "johndoe"}
                    </p>
                </div>
                <form action="/logout" method="post">
                    <button type="submit" onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </form>
            </div>
        </>
    );
}

export default Home;
