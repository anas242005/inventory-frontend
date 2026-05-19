export default function ProfilePage({ user }) {
  return (
    <div>
      <h2 className="mb-4">👤 Profile</h2>
      <div className="card p-4" style={{ maxWidth: '400px' }}>
        <div className="text-center mb-3">
          <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center"
            style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td className="fw-bold text-muted">Name</td>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">Email</td>
              <td>{user?.email}</td>
            </tr>
            <tr>
              <td className="fw-bold text-muted">Account</td>
              <td><span className="badge bg-success">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}