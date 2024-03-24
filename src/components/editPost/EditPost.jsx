import React, { useEffect, useState } from "react";
import Button from "../Button";
import { MdEdit } from "react-icons/md";
import "../addPost/addPost.scss";
import dataApi from "../../api/dataApi";

export default function EditPost({
  description,
  id,
  tags,
  title,
  tagsItem,
  setReload,
  reload,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [edit, setEdit] = useState({ description, id, title, tags: tagsItem });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const update = await dataApi.updatePost(id, edit);
    setReload(!reload);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name == "tags") {
      const updatedTags = [...edit.tags];
      const index = updatedTags.indexOf(value);
      index === -1 ? updatedTags.push(value) : updatedTags.splice(index, 1);
      setEdit((prevState) => ({
        ...prevState,
        [name]: updatedTags,
      }));
    } else {
      setEdit((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  return (
    <div>
      <span
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <MdEdit size={15} />
      </span>
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
                  onChange={handleChange}
                  value={edit.title}
                />
              </div>
              <div className="item-form">
                <label htmlFor="">Miêu tả</label>
                <textarea
                  type="text"
                  name="description"
                  onChange={handleChange}
                  value={edit.description}
                />
              </div>
              <div className="item-form ">
                <div>Tags</div>
                <div className="row">
                  {tags?.map((item, index) => (
                    <label htmlFor="" key={index} className="col-4">
                      <input
                        onChange={handleChange}
                        className="tags"
                        type="checkbox"
                        name="tags"
                        value={item}
                        checked={edit.tags.includes(item)}
                      />{" "}
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              <Button btnText={"Sửa"} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
