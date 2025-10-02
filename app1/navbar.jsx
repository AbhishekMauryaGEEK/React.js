// src/Navbar.jsx
const Navbar = () => {
  return (
    <nav style={{ background: '#333', color: '#fff', padding: '1rem' }}>
      <h2>MySite</h2>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', marginTop: '0.5rem' }}>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <li>Help</li>
        <li>Docs</li>
      </ul>
    </nav>
  )
}

export default Navbar