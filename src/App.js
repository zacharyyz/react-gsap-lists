import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";
import { TweenLite, Power3 } from "gsap";

const List = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 8px 8px 8px 16px;
  background: #f1f1f1;
  padding: 16px;
  border-radius: 5px;

  h1 {
    font-size: 16px;
  }

  h2 {
    font-size: 12px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  let listRef = useRef([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
      setPosts(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, []);

  useEffect(() => {
    TweenLite.from(listRef.current, 0.4, {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      ease: Power3.easeOut,
      delay: 0.4
    });
  }, [loading]);

  return (
    <div className="App">
      {loading ? (
        <Container>Loading...</Container>
      ) : (
        <>
          {posts.map((post, i) => (
            <List ref={el => (listRef.current[i] = el)} key={post.id}>
              <h1>{post.name}</h1>
              <h2>{post.email}</h2>
            </List>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
