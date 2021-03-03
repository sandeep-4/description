import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { addPost ,showPosts} from "../actions/postAction";
import { Row, Col, Form, Button, notification, Collapse,Empty } from 'antd';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';


const { Panel } = Collapse;



 

  //flora end

  function  add(props) {
  const dispatch = useDispatch();
  const message = useSelector(state => state.post.notification);
  const post = props.location.state ? props.location.state.post : "";
  const description = post ? post.description : ""
  const id = post ? post._id : ""

  const editorContent = post ?
    EditorState.createWithContent(convertFromRaw(JSON.parse(description))) :
    EditorState.createEmpty();
  const [editorState, setEditorState] = useState({ editorState: editorContent });
  const handleEditorChange = (editorState) => {
    setEditorState({ editorState });
  }

  //this method submits the inputs as it is in database
  const onSubmit = () => {
    const newPost = {
      id,
      description: JSON.stringify(convertToRaw(editorState.editorState.getCurrentContent())),
    };
    dispatch(addPost(newPost));
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
    <Row justify="center">
      <Col span="12">
        <Form
          onFinish={onSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          
          <Form.Item
            label="Description"
            name="description"
          >
          {  
          // <Editor
            //   editorState={editorState.editorState}
            //   onEditorStateChange={handleEditorChange}
            //   wrapperClassName="demo-wrapper"
            //   editorClassName="demo-editor"
            // />
          }

  

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
                  dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(post.description)) }} >
                </div>
              </Panel>
            )
          })}
        </Collapse>
        : <Empty />
      }
      </Col>
      </Row>
    

  );
}

export default Add;