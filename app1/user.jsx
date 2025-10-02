function User() {
  return <h1>User Component</h1>;
}

export function Setting() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center",gap:20 }}>
      <h1>Home</h1>
      <h1>Contact</h1>
      <h1>Learn More</h1>
      <h1>Click Here</h1>
    </div>
  );
}

export function Navo() {
  return (
    <div>
      <h1>Learn More</h1>
      <h1>Click Here</h1>
    </div>
  );
}

export function Livo() {
  return (
    <div>
      <h1>Learn More</h1>
      <h1>Click Here</h1>
    </div>
  );
}
export function sum() {
  return (
    10+10
  )
}

export default User;