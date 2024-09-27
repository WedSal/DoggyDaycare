import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CatalogPage.css';

export default function CatalogPage() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.jsonbin.io/v3/b/66ea6857e41b4d34e4325758');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Received data:', data);

        if (data && Array.isArray(data.record)) {
          setDogs(data.record);
        } else {
          throw new Error('Received data is not in the expected format');
        }
      } catch (e) {
        console.error('Error fetching data:', e);
        setError(e.message || 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="catalog-page loading">Loading...</div>;
  }

  if (error) {
    return <div className="catalog-page error-message">Error: {error}</div>;
  }

  return (
    <div className="catalog-page">
      <h1 className="catalog-title">All Dogs</h1>
      <div className="dog-list">
        {dogs.map((dog) => (
          <div key={dog.chipNumber} className="dog-item">
            <Link to={`/dog/${dog.chipNumber}`} className="dog-link">
              <img src={dog.img} alt={dog.name} className="dog-image" />
              <div className="dog-info">
                <h2 className="dog-name">{dog.name}</h2>
                <p className="dog-breed">Breed: {dog.breed}</p>
                <p className="dog-age">Age: {dog.age}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}