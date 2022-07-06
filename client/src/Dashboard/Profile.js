import React, { useEffect, useState } from "react";
import { deltetData, getData, postData } from "../Fetch";
import moment from  'moment';
import { Navbar } from "../Header/Navbar";

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    getPosts(user._id);
  }, []);

  const getPosts = (id) => {
    setLoading(true);
    getData(`post/getUserPosts/${id}`, null, "GET")
      .then((data) => {
        setPosts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(posts);

  const addPost = () => {
    postData(
      "/post/create",
      {
        userId: user._id,
        subject,
        content,
      },
      "POST"
    )
      .then((data) => {
        setPosts([...posts, data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = (id) => {
    setLoading(true);
    deltetData(`/post/delete/${id}`, "DELETE")
      .then((data) => {
        let filtredData = posts.filter((post) => {
          return post._id != id;
        });
        setPosts(filtredData);

        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar user={user} />
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-7">
            <div class="card m-4 shadow-sm">
              <div class="card-header bg-white">
                <h3>Posts</h3>
              </div>
              <div class="card-body bg-light">
                <div class="card">
                  <div class="card-header">{user?.userName}</div>
                  <div class="card-body">
                    <form action="#" method="post">
                      <div class="">
                        <input
                          placeholder="subject"
                          name="subject"
                          onChange={(e) => {
                            setSubject(e.target.value);
                          }}
                        ></input>
                        <textarea
                          class="form-control"
                          name="content"
                          onChange={(e) => {
                            setContent(e.target.value);
                          }}
                          id="exampleInputPassword1"
                        />
                      </div>
                    </form>
                  </div>
                  <div class="card-footer">
                    <button
                      type="submit"
                      class="btn btn-primary"
                      onClick={() => {
                        addPost();
                      }}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
              {posts.map((post) => {
                return (
                  <div class="card-footer bg-white">
                    <div class="card">
                      <div class="card-header">
                        <div class="bg-light d-flex justify-content-between">
                          <div>
                            <b>{user?.userName}</b> <br />
                            <small>
                              date:{" "}
                              {moment(post.createdOn).format("DD/MM/YYYY")}
                            </small>
                          </div>
                          <div>
                            <i
                              class="fa fa-pencil"
                              style={{ fontSize: "24px" }}
                            ></i>
                            <i
                              onClick={()=>{
                                deletePost(post._id)
                              }}
                              class="fa fa-trash-o ms-1"
                              style={{ fontSize: "24px",cursor:"pointer" }}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        {post.subject} {post.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div class="col-md-5">
            <div class="card shadow-sm p-3 m-4">
              <h3>Who to follow </h3>
              <ul class="list-unstyled">
                <li class="ml-0 pl-0 mt-2 d-flex justify-content-between">
                  <div>
                    <i class="fa fa-user" style={{ fontSize: "24px" }}></i> xyz1
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Follow
                  </button>
                </li>
                <li class="ml-0 pl-0 mt-2 d-flex justify-content-between">
                  <div>
                    <i class="fa fa-user" style={{ fontSize: "24px" }}></i> xyz2
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Follow
                  </button>
                </li>
                <li class="ml-0 pl-0 mt-2 d-flex justify-content-between">
                  <div>
                    <i class="fa fa-user" style={{ fontSize: "24px" }}></i> xyz3
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Follow
                  </button>
                </li>
                <li class="ml-0 pl-0 mt-2 d-flex justify-content-between">
                  <div>
                    <i class="fa fa-user" style={{ fontSize: "24px" }}></i> xyz4
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Follow
                  </button>
                </li>
                <li class="ml-0 pl-0 mt-2 d-flex justify-content-between">
                  <div>
                    <i class="fa fa-user" style={{ fontSize: "24px" }}></i> xyz5
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Follow
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
