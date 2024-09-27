import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./DogDetails.css";

function DogDetails() {
    const { id } = useParams();
    const [dog, setDog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDog = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Received data:", data);

                if (data && Array.isArray(data.record)) {
                    const foundDog = data.record.find(d => d.chipNumber === id);
                    if (foundDog) {
                        setDog(foundDog);
                    } else {
                        throw new Error("Dog not found");
                    }
                } else {
                    throw new Error("Received data is not in the expected format");
                }
            } catch (e) {
                console.error("Error fetching dog details:", e);
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDog();
    }, [id]);

    if (isLoading) {
        return <div className="dog-details loading">Loading...</div>;
    }

    if (error) {
        return <div className="dog-details error">Error: {error}</div>;
    }

    if (!dog) {
        return <div className="dog-details not-found">Dog not found</div>;
    }

    return (
        <div className="dog-details">
            <div className="dog-details-content">
                <img src={dog.img} alt={dog.name} className="dog-image" />
                <div className="dog-info">
                    <h1 className="dog-name">{dog.name}</h1>
                    <p className="dog-breed">Breed: {dog.breed}</p>
                    <p className="dog-age">Age: {dog.age}</p>
                    <p className="dog-sex">Sex: {dog.sex}</p>
                    <p className="dog-chip-number">Chip Number: {dog.chipNumber}</p>
                    <p className="dog-owner">Owner: {dog.owner.name} {dog.owner.lastName}</p>
                    <p className="dog-owner-phone">Phone: {dog.owner.phoneNumber}</p>
                </div>
            </div>
            <Link to="/catalog" className="back-button">Back to Catalog</Link>
        </div>
    );
}

export default DogDetails;