import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../Button";
import dataApi from "../../api/dataApi";

export default function DeletePost({ id, setReload, reload }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const deletePost = await dataApi.deletePost(id);
    setIsOpen(false);
    setReload(!reload);
  };
  return (
    <div>
      <div>
        <span
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <FaRegTrashAlt size={15} />
        </span>

        <div className={`overlay ${isOpen ? "show" : ""}`}>
          <div className="popup">
            <div className="wrap-title">
              <h2>Bạn có chắc chắn muốn xóa không ?</h2>
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
                <div className="confirm">
                  <button
                    className="cancel"
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Hủy
                  </button>
                  <button className="delete">Xóa</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
