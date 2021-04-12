import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    "http://localhost:8000/blogs/" + id
  );
  const history = useHistory();
  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE",
    }).then(() => history.push("/"));
  };

  return (
    <div className="blog-details">
      {loading && <div>Loading...</div>}
      {error && <div>{error}...</div>}
      {data && (
        <article>
          <h2>{data.title}</h2>
          <p>Written by {data.body}</p>
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
