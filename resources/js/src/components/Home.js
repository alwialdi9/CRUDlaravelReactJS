import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppContainer from "./AppContainer";
import api from "../api";
import swal from "sweetalert";

const Home = () => {
    const [posts, setPosts] = useState(null);

    const fetchPosts = () => {
        api.getAllPosts().then((res) => {
            const result = res.data;
            setPosts(result.data);
        });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPosts = () => {
        if (!posts) {
            return (
                <tr>
                    <td colSpan="4" className="text-center">
                        Loading Data...
                    </td>
                </tr>
            );
        }

        if (posts.length === 0) {
            return (
                <tr>
                    <td colSpan="4" className="text-center">
                        There is No Data. Add one
                    </td>
                </tr>
            );
        }

        return posts.map((post, i) => (
            <tr key={i}>
                <td>{i + 1}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td className="text-center">
                    <Link
                        to={`/edit/${post.id}`}
                        className="btn btn-success mx-2 my-2"
                    >
                        Edit
                    </Link>
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => {
                            api.deletePost(post.id)
                                .then(fetchPosts)
                                .then(
                                    swal({
                                        title: "Success Delete Post!!",
                                        text:
                                            "You delete data with id : " +
                                            post.id,
                                        icon: "error",
                                        button: false,
                                        timer: 1500,
                                    })
                                )
                                .catch((err) => {
                                    alert(
                                        "failed to delete data id : ",
                                        post.id
                                    );
                                });
                        }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <AppContainer title="Laravel ReactJS - CRUD">
            <Link to="/add" className="btn btn-primary">
                Add Data
            </Link>

            <div className="table-responsive">
                <table className="table table-bordered mt-4">
                    <thead className="table-primary">
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{renderPosts()}</tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default Home;
