import { useState, useEffect } from "react";
import "./App.scss";

interface User {
	Company: string;
	Email: string;
	FirstNameLastName: string;
	ID: string;
	JobTitle: string;
	Phone: string;
}

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [page, setPage] = useState(0);

	useEffect(() => {
		setLoading(true);
		fetch(
			`https://give-me-users-forever.vercel.app/api/users/${page * 10}/next`
		)
			.then((response) => response.json())
			.then((data) => {
				setUsers(data.users.slice(0, 10) as User[]);
				setLoading(false);
				setError("");
			})
			.catch((error) => {
				setError("Error fetching users");
				setLoading(false);
			});
	}, [page]);

	const handlePrevClick = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const handleNextClick = () => {
		setPage(page + 1);
	};
	return (
		<div className='container'>
			<h1 className='title'>User List</h1>
			<div className='page'>
				Page: <b>{page + 1}</b>
			</div>
			{loading && <p>Loading...</p>}
			{error && <p>{error}</p>}
			{!loading && !error && (
				<>
					<div className='users'>
						<div className='users-container'>
							<table className='table'>
								<thead>
									<tr>
										<th className='thead'>Name</th>
										<th className='thead'>Email</th>
										<th className='thead'>Company</th>
										<th className='thead'>Job Title</th>
										<th className='thead'>Phone</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className='space'></div>
										</td>
									</tr>
									{users.map((user) => (
										<tr className='user' key={user.ID}>
											<td>
												<div className='tdata'>{user.FirstNameLastName}</div>
											</td>
											<td>
												<div className='tdata'>{user.Email}</div>
											</td>
											<td>
												<div className='tdata'>{user.Company}</div>
											</td>
											<td>
												<div className='tdata'>{user.JobTitle}</div>
											</td>
											<td>
												<div className='tdata'>{user.Phone}</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
					<div className='button-container'>
						<button onClick={handlePrevClick} disabled={page === 0}>
							Previous
						</button>
						<button onClick={handleNextClick}>Next</button>
					</div>
				</>
			)}
		</div>
	);
}

export default App;
