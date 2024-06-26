import React, { useState } from "react";
import "../addPost/addPost.scss";
import Button from "../Button";
import dataApi from "../../api/dataApi";
export default function AddPost({
  tags,
  addNew,
  setAddNew,
  setReload,
  reload,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(addNew);
    const addPost = await dataApi.addPost(addNew);
    setIsOpen(false);
    setReload(!reload);
    setAddNew({
      title: "",
      description: "",
      tags: [],
    });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "tags") {
      const updatedTags = [...addNew.tags];
      const index = updatedTags.indexOf(value);
      index === -1 ? updatedTags.push(value) : updatedTags.splice(index, 1);
      setAddNew((prevState) => ({
        ...prevState,
        [name]: updatedTags,
      }));
    } else {
      setAddNew((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="btn-style"
      >
        {" "}
        Add new
      </button>
      <div className={`overlay ${isOpen ? "show" : ""}`}>
        <div className="popup">
          <div className="wrap-title">
            <h2>Thêm post</h2>
            <button
              className="close"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              &times;
            </button>
          </div>
          <div className="content">
            <form action="" onSubmit={handleSubmit}>
              <div className="item-form">
                <label htmlFor="">Tiêu đề</label>
                <input
                  type="text"
                  name="title"
                  value={addNew.title}
                  onChange={handleChange}
                />
              </div>
              <div className="item-form">
                <label htmlFor="">Miêu tả</label>
                <textarea
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={addNew.description}
                />
              </div>
              <div className="item-form ">
                <div>Tags</div>
                <div className="row">
                  {tags?.map((item, index) => (
                    <label htmlFor="" key={index} className="col-4">
                      <input
                        className="tags"
                        type="checkbox"
                        name="tags"
                        value={item}
                        onChange={handleChange}
                      />{" "}
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              <Button btnText={"Thêm mới"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
