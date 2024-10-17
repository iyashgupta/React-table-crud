import { Fragment } from "react";

const RenderTable = ({showUpdateForm,deleteUser,users}) => {  

   return <Fragment>
    { users.map((user) => 
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button onClick={() => showUpdateForm(user.id)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </td>
      </tr>)}
   </Fragment>
}
export default RenderTable 