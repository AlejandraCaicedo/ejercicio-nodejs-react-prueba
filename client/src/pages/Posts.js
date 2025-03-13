import { useState, useEffect } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPost, setNewPost] = useState(""); // Estado para el input del nuevo post

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setPosts(data);
        } else {
          setError(data.message || "Error al obtener publicaciones");
        }
      } catch (error) {
        console.error("❌ Error al obtener publicaciones:", error);
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: newPost }),
      });

      const data = await response.json();
      if (response.ok) {
        setPosts([data, ...posts]);
        setNewPost("");
      } else {
        alert("Error al crear la publicación");
      }
    } catch (error) {
      console.error("❌ Error al crear publicación:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        );
      } else {
        console.error("Error al dar like");
      }
    } catch (error) {
      console.error("❌ Error al dar like:", error);
    }
  };

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Publicaciones</h2>

      {/* Formulario para crear una publicación */}
      <div style={{ marginBottom: "20px" }}>
        <textarea
          placeholder="Escribe tu publicación..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={3}
          style={{ width: "100%", padding: "10px" }}
        />
        <button onClick={handleCreatePost} style={{ marginTop: "10px" }}>
          Publicar
        </button>
      </div>

      {posts.length === 0 ? (
        <p>No hay publicaciones disponibles.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>
              <strong>{post.user.name}</strong>: {post.content}
            </p>
            <p>❤️ {post.likes} Likes</p>
            <button onClick={() => handleLike(post.id)}>Dar Like</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
