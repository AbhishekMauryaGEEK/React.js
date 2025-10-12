import React from "react";
import { useFormStatus } from "react-dom";
// Server action function that will handle the form submission
async function submitAction(formData) {
  // Simulating a delay for form submission (e.g., network request)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Form submitted", Object.fromEntries(formData));
}
const Heading=()=>{
  return(
      <div>
          <h2 style={{color:"green"}}>successfully logged in....</h2>
      </div>
  )
}
function SubmitButton() {
     // useFormStatus must be used inside a component rendered within a form
const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
    
  );
}
function Form() {
  return (
    <form action={submitAction}>
      <input name="username" type="text" placeholder="Username" required />
      <br /> <br />
      <input name="email" type="email" placeholder="Email" required />
      <br /> <br />
      <SubmitButton />
    </form>
  );
}
export default function App() {
  return (
    <div>
      <h1>Example: useFormStatus in React</h1>
      <Form />
    </div>
  );
}
