import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export default function Login({setUser}) {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    function handleLogin(e) {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch("/users/" + email, requestOptions)
        .then(res => {
            return res.json();
        }).then((data) => {
            if (data.length > 0) {
                console.log(data[0].display_name);
                setUser(data[0].display_name);
                navigate("/");
            } else {
                console.log(data);
                alert("No user with that email exists!");
            }
        })
        .catch((err) => console.error(err));
    }

    return <Form className="center-form">
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
                type="text"
                placeholder="Email"
                onInput={
                    (e) => {setEmail(e.target.value);
                }}/>
                <small className="form-text text-muted">
                    Don't have an account? Sign Up <Link to={"/sign-up"}>here</Link>
                </small>
        </Form.Group>
        <Button variant="primary" type="button" onClick={handleLogin}>Login</Button>
    </Form>
}
