import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");

    function createAccount(e) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                display_name: displayName,
            }),
        };
        fetch("/users", requestOptions)
            .then(res => {
                return res
            }).then((data) => console.log(data))
            .catch((err) => console.error(err));
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    }
    function updateDisplayName(e) {
        setDisplayName(e.target.value);
    }

    return (
        <Form classname="center-form">
            <Form.Group class="mb-4">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email" onInput={updateEmail} />
            </Form.Group>
            <Form.Group class="mb-4">
                <Form.Label>Display Name</Form.Label>
                <Form.Control type="text" placeholder="Display Name" onInput={updateDisplayName} />
            </Form.Group>
            <Button variant="primary" type="button" onClick={createAccount}>Create Account</Button>
        </Form>
    );
}