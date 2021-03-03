import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addPost ,showPosts} from "../actions/postAction";
import { Form, Button, notification, Collapse } from 'antd';

import 'froala-editor/js/plugins.pkgd.min.js'

import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'

import FroalaEditor from 'react-froala-wysiwyg'
const { Panel } = Collapse;


function Add(props) {
  const dispatch = useDispatch();
  const message = useSelector(state => state.post.notification);
  const post = props.location.state ? props.location.state.post : "";
  const id = post ? post._id : ""


    const [editorState, setEditorState] = useState({  });

    const handleModelChange = (editorState) => {
    setEditorState({ editorState });
  }

  const onSubmit = () => {
    const addDes = {
      id,
      description:JSON.stringify(editorState.editorState),
    };
    dispatch(addPost(addDes));
    window.location.reload(true);
  }

  useEffect(() => {
    if (message.type) {
      notification[message.type]({
        duration: 1,
        message: <span>{message.message}</span>
      });
    }
  }, [message])

  //for view
  const posts = useSelector(state => state.post.posts);




  useEffect(() => {
    if (message.type) {
      notification[message.type]({
        duration: 1,
        message: <span>{message.message}</span>
      });
    }
    dispatch(showPosts());
  }, [dispatch, message])


  

  return (
    <div justify="center">
    <div colSpan="12">
      <Form
        onFinish={onSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        
        <Form.Item
          label="Description"
          name="description"
        >
      
        <FroalaEditor
            editorState={editorState.editorState}
             model={editorState.editorState}
             onModelChange={handleModelChange} 
             tag="textarea"
              /> 


        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">Add post</Button>
        </div>
      </Form>
   
<hr />
<h1>Display</h1>
 <hr />
    {posts.length ?
      <Collapse accordion>
        {posts.map((post, index) => {
          return (
            <Panel header={post._id} key={index}>
              <div
                dangerouslySetInnerHTML={{ __html: (JSON.parse(post.description)) }} >
                </div>
            </Panel>
          )
        })}
      </Collapse>
      : <div>Post file to view</div>
    }
    </div>
    </div>
  )
}

export default Add;


