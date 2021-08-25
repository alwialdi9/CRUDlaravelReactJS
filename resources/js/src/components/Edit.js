import React, { useState, useEffect } from "react";
import AppContainer from "./AppContainer";
import api from "../api";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

const Edit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updatePost(
                {
                    title,
                    description,
                },
                id
            );
            history.push("/");
        } catch {
            alert("Failed to Edit Post");
        } finally {
            swal({
                title: "Success Edit Post!!",
                text: "You Edit data",
                icon: "info",
                button: false,
                timer: 1500,
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        api.getOnePost(id).then((res) => {
            const result = res.data;
            const post = result.data;
            setTitle(post.title);
            setDescription(post.description);
        });
    }, []);

    return (
        <AppContainer title="Edit Data">
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
                        onClick={onEditSubmit}
                        disabled={loading}
                    >
                        {loading ? "LOADING..." : "Edit"}
                    </button>
                </div>
            </form>
        </AppContainer>
    );
};

export default Edit;
