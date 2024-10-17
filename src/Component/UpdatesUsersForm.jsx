import React from 'react'

const UpdatesUsersForm = ({editName,setEditName,editEmail,updateUser,cancelUpdate,setEditEmail}) => {
  return (
    <div >
    <input
      type="text"
      value={editName}
       id="update-name-input"
      onChange={(e) => setEditName(e.target.value)}
    />
    <input
      type="email"
      value={editEmail}
      id="update-email-input"
      onChange={(e) => setEditEmail(e.target.value)}
    />
    <button onClick={updateUser}>Update</button>
    <button onClick={cancelUpdate}>Cancel</button>
  </div>
  )
}

export default UpdatesUsersForm