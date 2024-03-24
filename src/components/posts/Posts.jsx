// import React from "react";

import DeletePost from "../delete/DeletePost";

import { useEffect, useState } from "react";
import "../posts/posts.scss";
import dataApi from "../../api/dataApi";
import Pagination from "../pagination/Pagination";
import FilterForm from "../filterForm/FilterForm";
import TagsForm from "../tagsForm/TagsForm";
import AddPost from "../addPost/AddPost";
import EditPost from "../editPost/editPost";
export default function Posts() {
  const [addNew, setAddNew] = useState({
    title: "",
    description: "",
    tags: [],
  });
  const [reload, setReload] = useState(false);
  const [post, setPosts] = useState(null);
  const [tags, setTags] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filter, setFilter] = useState({
    tags: "",
    page: 1,
    title: "",
  });

  useEffect(() => {
    const getPosts = async (filter) => {
      const posts = await dataApi.getPosts(filter);
      setPosts(posts.posts);
      setLoading(false);
      delete posts.posts;
      setPagination({ ...posts });
    };
    const getTags = async () => {
      const tags = await dataApi.getTags();
      console.log(tags);
      setTags(tags);
    };
    getTags();
    getPosts(filter);
  }, [filter, reload]);

  const handlePageChange = (newPage) => {
    setFilter({ ...filter, page: newPage });
  };

  const handleFilter = (value) => {
    setFilter({ ...filter, page: 1, title: value.searchTitle });
  };
  const handleTagsChange = (value) => {
    setFilter({ tags: value });
  };
  return (
    <div className="container">
      <div className="control">
        <AddPost
          tags={tags}
          addNew={addNew}
          setAddNew={setAddNew}
          setReload={setReload}
          reload={reload}
        />
        <div className="filter">
          <FilterForm onSubmit={handleFilter} />
          <TagsForm onSubmit={handleTagsChange} tags={tags} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Tag</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            post?.map(({ description, id, tags: tagsItem, title }, index) => (
              <tr key={index}>
                <td data-label="Id">{id}</td>
                <td data-label="Title">{title}</td>
                <td data-label="Description">{description}</td>
                <td data-label="Tags">{tagsItem?.join(", ")}</td>
                <td data-label="Actions">
                  <span>
                    <DeletePost id={id} reload={reload} setReload={setReload} />
                  </span>
                  <span>
                    <EditPost
                      description={description}
                      id={id}
                      tags={tags}
                      tagsItem={tagsItem}
                      title={title}
                      setReload={setReload}
                      reload={reload}
                    />
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
}
