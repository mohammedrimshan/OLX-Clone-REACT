import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { addDoc, collection } from "firebase/firestore"; 
import { storage } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { db } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        
        await uploadBytes(imageRef, image);
 
        const url = await getDownloadURL(imageRef);
        console.log('Image uploaded successfully:', url);

        await addDoc(collection(db, 'products'), {
          name,
          category,
          price,
          imageUrl: url,
          userId: user.uid, 
          createdAt: new Date(),
        });
        alert("Product added successfully");
        navigate('/');
        setLoading(false);
      } else {
        console.error("Please select an image to upload");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error uploading image and saving product:', error);
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="auth-container">
        <h2 className="auth-message">You must be signed in to add a product.</h2>
        <a href="/login" className="auth-link">Login Page</a>
      </div>
    );
  }
  

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="Name"
        />
        <br />
        <label htmlFor="category">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          name="category"
        />
        <br />
        <label htmlFor="price">Price</label>
        <br />
        <input
          className="input"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          name="Price"
        />
        <br />

        <br />
        {image && (
          <img alt="Preview" width="200px" height="200px" src={URL.createObjectURL(image)} />
        )}
        <br />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <br />
        <button onClick={handleSubmit} className="uploadBtn" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload and Submit'}
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
