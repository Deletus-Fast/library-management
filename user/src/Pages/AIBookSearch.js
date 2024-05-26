import React, { useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress'; // Import CircularProgress from Material-UI
import "./AIBookSearch.css";
import { Grid } from "@mui/material";

const AIBookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [searchResult1, setSearchResult1] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/AiSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: searchTerm }),
      });
      if (!response.ok) {
        throw new Error("Failed to summarize book");
      }
      const summary = await response.json();
      setSearchResult(summary);
    } catch (error) {
      console.error("Error summarizing book:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleRecommendation = async () => {
    setLoading1(true);
    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: searchTerm1 }),
      });
      if (!response.ok) {
        throw new Error("Failed to recommend books");
      }
      const summary = await response.json();
      setSearchResult1(summary);

    } catch (error) {
      console.error("Error recommending books:", error);
    } finally {
      setLoading1(false);
    }
  };

  return (
    <div className="ai-page">
    <Grid container spacing={2} columns={16}>
      <Grid item xs={8}>
        {/* <Item> */}
      <div className="ai-book-search">
        <h1>AI Book Search</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch} disabled={!searchTerm}>Search</button> {/* Disable button if searchTerm is empty */}
        </div>
        <div className="result-container">
          {loading ? (
            <div className="loader-container">
              <CircularProgress />
            </div>
          ) : (
            <p>{searchResult}</p>
          )}
        </div>
      </div>
      {/* </Item> */}
      
      </Grid>
      <Grid item xs={8}>
      {/* <Item> */}
      <div className="ai-book-search1">
        <h1>Get Recommendations</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Get Recommendations..."
            value={searchTerm1}
            onChange={(e) => setSearchTerm1(e.target.value)}
          />
          <button onClick={handleRecommendation} disabled={!searchTerm1}>Search</button> {/* Disable button if searchTerm is empty */}
        </div>
        <div className="result-container">
          {loading1 ? (
            <div className="loader-container">
              <CircularProgress />
            </div>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: searchResult1.replaceAll("<br>", "<br>") }}></p>
          )}
        </div>
      </div>
      {/* </Item> */}
      </Grid>
    </Grid>
    </div>
  );
};

export default AIBookSearch;
