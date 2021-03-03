import axios from "axios";
import { SHOW_ALL_POSTS, NOTIFICATION } from "./types";

export const addPost = (postData) => dispatch => {
  axios
    .post("http://localhost:5000/api/add", postData) 
    .then(res => {
      dispatch({
         type: NOTIFICATION,
          payload: res.data 
        });
      setTimeout(() =>
        dispatch({
           type: NOTIFICATION, 
           payload: {}
           })
        , 5000);
    })
    .catch(err => {
      dispatch({ 
        type: NOTIFICATION, payload: {
          message: "Error",
          type: "error"
        }
      })
    });
};

export const showPosts = () => dispatch => {
  axios
    .get("http://localhost:5000/api") 
    .then(res => {
      dispatch({ type: SHOW_ALL_POSTS, payload: res.data })
    })
    .catch(err => {
      dispatch({
        type: NOTIFICATION, payload: {
          message: "Error :"+err,
          type: "error"
        }
      })
    });
};
