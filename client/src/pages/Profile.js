import { useState, useEffect } from "react";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/users/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.message || "Error al obtener el perfil");
        }
      } catch (error) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>
        <strong>Nombre:</strong> {userData?.name}
      </p>
      <p>
        <strong>Email:</strong> {userData?.email}
      </p>
    </div>
  );
}

export default Profile;
