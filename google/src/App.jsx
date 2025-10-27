import React from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";

function App() {
  const [user, setUser] = React.useState(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error obteniendo datos del usuario:", err);
      }
    },
    onError: () => console.log("Error al iniciar sesión"),
  });

  const logout = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Autenticación con Google</h2>

      {!user ? (
        <button onClick={() => login()}>Iniciar sesión con Google</button>
      ) : (
        <div>
          <img src={user.picture} alt="user" style={{ borderRadius: "50%", width: "80px" }} />
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <button onClick={logout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}

export default App;