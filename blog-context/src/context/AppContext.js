import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";

// Creating Context
export const AppContext = createContext();

export default function AppContextProvider({ children }) {

    // Creating All The States Which We Need To Use

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

//   Functions Needed For Website 
//   This Function Is For Fetching Blogposts

  async function fetchBlogPosts(page = 1) {
    setLoading(true);
    let url = `${baseUrl}?page=${page}`;
    console.log("printing the final URL");
    console.log(url);
    try {
      const result = await fetch(url);
      const data = await result.json();
      console.log(data);
      setPage(data.page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log("Error in fetching data");
      setPage(1);
      setPosts([]);
      setTotalPages(null);
    }
    setLoading(false);
  }

//   Handling Page Change 
  function handlePageChange(page) {
    setPage(page);
    fetchBlogPosts(page);
  }

  const value = {
    posts,
    setPosts,
    loading,
    setLoading,
    page,
    setPage,
    totalPages,
    setTotalPages,
    fetchBlogPosts,
    handlePageChange,
  };

//   Returning The Context i.e. Providing Values
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
