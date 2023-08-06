import { Button, NavLink } from 'reactstrap';
import { toast } from "react-toastify";
import { deleteUser } from "../services/user-service";
import React from "react"


const Admin = () => {
	const [userId, setUserId] = React.useState(0);

	const deleteButton = () => {
		// maile user-helper bata gareko tes ma authorization header patako xaina hola
		deleteUser(userId)
		.then(res => {
			console.log(res)
			toast.success("User is deleted");
		})
		.catch(error => {
			toast.error(error)
		})
	}
	return (
		<div>
			<h2>Admin</h2>
			<div>
				<h3>Delete User</h3>
				<div>
					<label>ID</label>
					<input type="number" value={userId} onChange={e=>setUserId(e.target.value)} />
				</div>
				<div>
					<Button color="danger" onClick={deleteButton}>Delete</Button>
				</div>
			</div>
			<Button color="primary">
				<NavLink href="/admin/category">Create Category</NavLink>
			</Button>
		</div>
	)
}

export default Admin;