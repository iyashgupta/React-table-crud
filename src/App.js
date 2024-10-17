import React, { useState, useEffect } from "react";
import RenderTable from "./Component/RenderTable";
import "./App.css"
import UpdatesUsersForm from "./Component/UpdatesUsersForm";
import AddUsers from "./Component/AddUsers";

// Regular expression to validate emails
const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const App = () => {
  // State for users, form inputs, and the current user being edited
  const [users, setUsers] = useState(
    () => JSON.parse(localStorage.getItem("users")) || []
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Save users to localStorage whenever the users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Add a new user
  const addUser = () => {
    if (!name) return alert("Name is required!");
    if (!validRegex.test(email)) return alert("Invalid email address!");

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      email,
    };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
  };

  // Show the update form with the user's current data
  const showUpdateForm = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setIsEditing(true);
      setEditName(user.name);
      setEditEmail(user.email);
      setCurrentUserId(user.id);
    }
  };

  // Update user information
  const updateUser = () => {
    if (!validRegex.test(editEmail)) return alert("Invalid email address!");

    setUsers(
      users.map((user) =>
        user.id === currentUserId
          ? { ...user, name: editName, email: editEmail }
          : user
      )
    );
    cancelUpdate();
  };

  // Cancel the update process
  const cancelUpdate = () => {
    setEditName("");
    setEditEmail("");
    setCurrentUserId(null);
    setIsEditing(false);
  };

  // Delete a user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    if (users.length === 1) cancelUpdate(); // If last user is deleted, close the update form
  };

  return (
    <div id="container">
      <h1>CRUD Operations</h1>

      {/* Input form for adding a new user */}
        <AddUsers name={name} setName={setName} addUser={addUser} setEmail={setEmail} email={email} />

      {/* Users Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            <RenderTable
              deleteUser={deleteUser}
              showUpdateForm={showUpdateForm}
              users={users}
            />
          }
        </tbody>
      </table>

      {/* Update Form */}
      {isEditing && (
                 <UpdatesUsersForm editName={editName} setEditName={setEditName} editEmail={editEmail} updateUser={updateUser} cancelUpdate={cancelUpdate} setEditEmail={setEditEmail} />
      )}
    </div>
  );
};

export default App;
