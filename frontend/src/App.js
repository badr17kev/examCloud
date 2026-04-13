import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // NEW: State to control if the form is visible or hidden
  const [showForm, setShowForm] = useState(false);

  // Fetch the list of users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Load users when the page first loads
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', { name, email });
      setName('');
      setEmail('');
      setShowForm(false); // NEW: Hide the form automatically after adding
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers(); // Refresh the list
      if (selectedUser && selectedUser._id === id) setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User Management System</h1>

      {/* NEW: Bouton pour afficher/masquer le formulaire */}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{ marginBottom: '20px', padding: '10px', cursor: 'pointer' }}
      >
        {showForm ? 'Annuler' : 'Ajouter un utilisateur'}
      </button>

      <br />

      {/* Formulaire d'ajout (Only shows if showForm is true) */}
      {showForm && (
        <form onSubmit={handleAddUser} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button type="submit" style={{ padding: '5px 10px' }}>Sauvegarder</button>
        </form>
      )}

      {/* Liste des utilisateurs */}
      <h2>Liste des utilisateurs</h2>
      <ul>
        {users.map(user => (
          <li key={user._id} style={{ marginBottom: '10px' }}>
            {user.name} - {user.email}
            <button onClick={() => setSelectedUser(user)} style={{ marginLeft: '15px', marginRight: '5px' }}>
              Détails
            </button>
            <button onClick={() => handleDelete(user._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      {/* Modal/Espace Détails */}
      {selectedUser && (
        <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
          <h3>Détails de l'utilisateur</h3>
          <p><strong>ID:</strong> {selectedUser._id}</p>
          <p><strong>Nom:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <button onClick={() => setSelectedUser(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
}

export default App;