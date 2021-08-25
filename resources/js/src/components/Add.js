import React, { useState } from "react";
import AppContainer from "./AppContainer";
import api from "../api";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const Add = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addPost({
                title,
                description,
            });
            history.push("/");
        } catch {
            alert("Failed to Add Post");
        } finally {
            swal({
                title: "Success Add Post!!",
                text: "You add data to Database!",
                icon: "success",
                button: false,
                timer: 1500,
            });
            setLoading(false);
        }
    };

    return (
        <AppContainer title="Add Data">
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={onAddSubmit}
                        disabled={loading}
                    >
                        {loading ? "LOADING..." : "Add"}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default Add;
