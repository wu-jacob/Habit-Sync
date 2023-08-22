import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/CreateHabit.css";

export default function CreateHabit({ user }) {
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert("Please sign in to make a habit!");
            navigate("/login");
        }
    }, [user])

    function makeHabit() {
        uploadImage();
        uploadData();
    }

    function uploadImage() {
        let imageId = uuidv4();
        let blob = file.slice(0, file.size, "image/jpeg");
        let newFile = new File([blob], `${imageId}_post.jpeg`, { type: "image/jpeg" });
        let formData = new FormData();
        formData.append("imgfile", newFile);
        fetch("/upload", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.text())
    }

    function uploadFile(e) {
        setFile(e.target.files[0]);
    }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
      }

    function uploadData() {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: description,
            }),
        };
        fetch("/habits", requestOptions)
            .then(res => {
                return res
            })
    }

    return <Form className="habit-form">
        <div className="create-habit">
            <Form.Group className="mb-3">
                <img
                    src={ file? URL.createObjectURL(file) : null}
                    className="habit-image"
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <input
                    type="file"
                    accept="image/jpeg"
                    onChange={uploadFile}/>
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Description"
                    onInput={(e) => setDescription(e.target.value)}/>
            </Form.Group>
            <div className="habit-button-wrapper">
                <Button 
                    variant="primary" 
                    type="button" 
                    onClick={makeHabit}
                    className="create-habit-button"
                    >Post
                </Button>
            </div>
        </div>
    </Form>
}
