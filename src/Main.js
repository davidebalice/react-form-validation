import { useState, useEffect } from "react";
import reactLogo from "../src/assets/react.png";
import logo from "../src/assets/logo.png";

function Main() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [color, setColor] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [sended, setSended] = useState(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);

    setErrors((prevErrors) => ({
      ...prevErrors,
      username:
        formData.username.length < 8 ? "Username must be 8 letters long" : "",
      email: !emailRegex.test(formData.email) ? "Email is not valid" : "",
      password:
        formData.password.length < 8 ? "Password should be 8 letters long" : "",
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords didn't match"
          : formData.confirmPassword === ""
          ? "Confirm Password is required"
          : "",
    }));

    setColor((prevColor) => ({
      ...prevColor,
      username: formData.username.length < 8 ? "red" : "green",
      email: !emailRegex.test(formData.email) ? "red" : "green",
      password: formData.password.length < 8 ? "red" : "green",
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "red"
          : formData.confirmPassword === ""
          ? "red"
          : "green",
    }));
  }

  useEffect(() => {
    const hasErrors = Object.values(errors).some((error) => !!error);

    if (!hasErrors && submitted) {
      console.log("submit");
      setSended(true);
    }
  }, [errors]);

  return (
    <>
      <div className="card">
        <div className="card-image">
          <div className="info">
            <div>
              <img src={reactLogo} alt="react logo" class="react-logo" />
              <p className="text">Simple form validator in React</p>
            </div>
            <div>
              <p>
                <a
                  href="https://www.davidebalice.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  www.davidebalice.dev
                </a>
              </p>
            </div>
          </div>
        </div>
        {submitted && sended ? (
          <div className="sended">Form submitted</div>
        ) : (
          <form>
            <img src={logo} alt="db logo" class="db-logo" />
            <input
              type="text"
              placeholder="Name"
              style={{ borderColor: color.username }}
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />

            <p className="error">{errors.username}</p>

            <input
              type="text"
              placeholder="Email"
              style={{ borderColor: color.email }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <p className="error">{errors.email}</p>

            <input
              type="password"
              placeholder="Password"
              style={{ borderColor: color.password }}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <p className="error">{errors.password}</p>

            <input
              type="password"
              placeholder="Confirm Password"
              style={{ borderColor: color.confirmPassword }}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <p className="error">{errors.confirmPassword}</p>

            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Main;
