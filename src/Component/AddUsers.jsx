import React from 'react'

const AddUsers = ({name,setName,addUser,setEmail,email}) => {
  return (
    <div id="input-container">
    <input
      type="text"
      value={name}
      id="name-input"
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter name"
    />
    <input
      type="email"
      value={email}
      id="email-input"
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter email"
    />
    <button onClick={addUser}>Add</button>
  </div>
  )
}

export default AddUsers