import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/CreatePost.css";

export default function CreatePost({ user }) {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert("Please sign in to make a post!");
            navigate("/login");
        }
    }, [user])

    function makePost() {

    }

    function uploadFile(e) {
        setFile(e.target.files[0]);
    }

    return <Form className="post-form">
        <div className="create-post">
            <Form.Group className="mb-3">
                <img
                    src={ file? URL.createObjectURL(file) : null}
                    className="post-image"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <input
                    type="file"
                    accept="image/*"
                    onChange={uploadFile}/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Description"
                    onInput={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <div className="post-button-wrapper">
                <Button 
                    variant="primary" 
                    type="button" 
                    onClick={makePost}
                    className="post-button"
                    >Post
                </Button>
            </div>
        </div>
    </Form>
}
