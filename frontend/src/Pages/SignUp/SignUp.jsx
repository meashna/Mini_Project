import React, { useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoPerson, IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RiLock2Fill } from "react-icons/ri";
import { MdOutlineAlternateEmail } from "react-icons/md";
import Swal from "sweetalert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaPhoneAlt } from "react-icons/fa";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phonenumber, setPhonenumber] = useState("");
  const [retypepassword, setRetypePassword] = useState("");
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    password: "",
    retypePassword: "",
  });

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.match(/[^0-9 ]/) && value.replace(/\D/g, "").length <= 10) {
      setPhonenumber(value);
    }
  };

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(prevProgress + diff, 100);
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (
      Inputs.password &&
      retypepassword &&
      Inputs.password !== retypepassword
    ) {
      setErrorMessages((prev) => ({
        ...prev,
        retypePassword: "Passwords do not match.",
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, retypePassword: "" }));
    }
  }, [Inputs.password, retypepassword]);

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrorMessages((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Inputs.email.trim() || !Inputs.password.trim()) {
      Swal({
        icon: "warning",
        title: "Please fill out all fields.",
        button: "Try Again",
      });
      return;
    }
    setLoading(true);
    setProgress(0);
    await axios
      .post("http://localhost:3000/api/v1/signup", Inputs)
      .then((response) => {
        if (response.data.message === "User added") {
          console.log(response.data._id);
          sessionStorage.setItem("id", response.data._id);
          localStorage.setItem("username", Inputs.username);
          console.log(Inputs.username);
          localStorage.setItem("usermail", Inputs.email);
          console.log(Inputs.email);
          setProgress(100);
          setTimeout(() => {
            navigate("/home");
          }, 500);
          Swal({
            icon: "success",
            title: "Registered Successfully.",
            button: "OK",
          });
        }
        setInputs({
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.response &&
          error.response.data.message === "User already exists"
        ) {
          Swal({
            icon: "error",
            title: "User already exists",
            button: "Try Again",
          });
          navigate("/signin");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className={styles.form_container}>
        {loading ? (
          <div className={styles.loader_container}>
            <CircularProgressbar
              value={progress}
              text={`${progress.toFixed(0)}%`}
              styles={{
                text: { fill: "#fff" },
                trail: { stroke: "#d6d6d6" },
                path: { stroke: "#458393", strokeLinecap: "round" },
              }}
            />
          </div>
        ) : (
          <div className={styles.loader_container} style={{ display: "none" }}>
            <CircularProgressbar
              value={progress}
              text={`${progress.toFixed(0)}%`}
            />
          </div>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.login_heading}>Register</h2>
          <div className={styles.form_control}>
            <input
              type="text"
              name="username"
              onChange={change}
              value={Inputs.username}
              placeholder="Enter your name"
              pattern="[A-Za-z ]+"
              required
            />
            <div className={styles.icon}>
              <IoPerson />
            </div>
          </div>
          <div className={styles.form_control}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={change}
              value={Inputs.email}
              required
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
            />
            <div className={styles.icon}>
              <MdOutlineAlternateEmail />
            </div>
          </div>
          <div className={styles.form_control}>
            <input
              placeholder="Phone no"
              type="tel"
              required
              pattern="\d{10}"
              title="Phone number must contain 10 digits."
              onChange={handlePhoneChange}
              value={phonenumber}
            />
            <div className={styles.icon}>
              <FaPhoneAlt />
            </div>
          </div>
          <div className={styles.form_control}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={change}
              value={Inputs.password}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.toggle_password}
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
          <div className={styles.form_control}>
            <input
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setRetypePassword(e.target.value)}
              value={retypepassword}
              required
            />
            <div className={styles.icon}>
              <RiLock2Fill />
            </div>
          </div>
          <button className={styles.login_btn} type="submit">
            Register
          </button>
          <p className={styles.reg_p}>
            Already have an account?
            <Link className={styles.reg_link} to="/signin">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
