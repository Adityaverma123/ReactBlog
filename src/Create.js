import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("mario");
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const handleClick = (e) => {
    setLoading(true);
    e.preventDefault();
    const blog = { title, body, author };
    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setLoading(false);
      console.log("Blog Added");
      history.push("/");
    });
  };
  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleClick}>
        <label>Blog Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Body</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="joshi">joshi</option>
        </select>
        {!isLoading && <button>Add a blog</button>}
        {isLoading && <button disabled>Adding...</button>}
      </form>
    </div>
  );
};

export default Create;
