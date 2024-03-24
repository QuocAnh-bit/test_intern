import { client } from "../client";
import { getCookie } from "../utils/cookie";

const dataApi = {
  getPosts: async (filter) => {
    try {
      const token = getCookie("accessToken");
      const queryString = new URLSearchParams(filter).toString();
      const { data } = await client.get(`/posts?${queryString}`, token);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getTags: async () => {
    try {
      const token = getCookie("accessToken");
      const { data } = await client.get(`/posts/tags`, token);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  addPost: async (body) => {
    try {
      const token = getCookie("accessToken");
      const { data } = await client.post(`/posts`, body, token);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  updatePost: async (id, body) => {
    try {
      const token = getCookie("accessToken");
      const { data } = await client.patch(`/posts/${id}`, body, token);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  deletePost: async (postId) => {
    try {
      const token = getCookie("accessToken");
      console.log(token);
      const { data } = await client.delete(`/posts/${postId}`, token);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default dataApi;
