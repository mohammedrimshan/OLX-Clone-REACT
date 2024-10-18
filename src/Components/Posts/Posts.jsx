import React, { useContext, useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import "./Post.css";
import Heart from "../../assets/Heart";
import bikeimage from "../../assets/ktm.jpeg";
import { FirebaseContext } from "../../store/FirebaseContext";
import { PostContext } from "../../store/PostContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
function Posts() {
  const { db } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const allProducts = snapshot.docs.map((product) => {
          console.log(product.data());
          return {
            ...product.data(),
            id: product.id,
          };
        });
        
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, [db]);

  
  
  const handleClick = (product) => {
    setPostDetails(product); 
    navigate("/view");
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {products.map((product) => (
            <div
              className="card"
              onClick={() => handleClick(product)}
              key={product.id}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <p className="name">{product.name}</p>
                <h2 className="kilometer">{product.category}</h2>
              </div>
              <div className="date">
                <span>
                  {product.createdAt
                    ? format(
                        new Date(product.createdAt.seconds * 1000),
                        "dd/MM/yyyy"
                      )
                    : "Date not available"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src={bikeimage} alt="YAMAHA R15V3" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name">YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
