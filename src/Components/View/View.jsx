import React, { useContext, useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { format } from 'date-fns';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postDetails } = useContext(PostContext);
  const { db } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (postDetails && postDetails.userId) {
        const { userId } = postDetails;
        try {
          const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
          const querySnapshot = await getDocs(userQuery);

          if (querySnapshot.empty) {
            console.log('No matching user found.');
            setUserDetails(null);
          } else {
            querySnapshot.forEach((doc) => {
              setUserDetails(doc.data());
            });
          }
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [postDetails, db]);

  // Log the createdAt value for debugging
  console.log('CreatedAt:', postDetails?.createdAt);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const formattedDate = postDetails?.createdAt
    ? format(new Date(postDetails.createdAt.seconds * 1000), 'dd/MM/yyyy') // Convert seconds to milliseconds
    : "Date not available";

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails?.imageUrl} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p className="price">&#x20B9; {postDetails?.price}</p>
          <span className="productName">{postDetails?.name}</span>
          <p className="category">{postDetails?.category}</p>
          <span className="createdDate">{formattedDate}</span>
        </div>
        <div className="contactDetails">
          <p className="sellerTitle">Seller details</p>
          <p className="sellerEmail">{userDetails?.email || "Email not available"}</p>
          <p className="sellerPhone">{userDetails?.phone || "Phone number not available"}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
