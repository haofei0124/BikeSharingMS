import React from 'react';
import { Card, Modal, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// 导入样式
import draftjs from 'draftjs-to-html';

class RichText extends React.Component {
  state = {
    showRichText: false,
    editorState: '',
    contentState:''
  }

  onEditorStateChange = (editorState)=> {
    this.setState({
      editorState
    })
  }

  handelClearContent= ()=> {
    this.setState({
      editorState: ''
    })
  }

  handelGetText= ()=> {
    this.setState({
      showRichText: true
    })
  }

  onEditorChange=(contentState)=> {
    this.setState({
      contentState
    })
  }

  render() {
    const { editorState } = this.state;
    return(
      <div>
        <Card>
          <Button type="primary" onClick={this.handelClearContent} style={{marginRight: 10}}>Empty content</Button>
          <Button type="primary" onClick={this.handelGetText}>Get HTML text</Button>
        </Card>
        <Card title="Rich text editor">
            <Editor
              editorState={editorState}
              onContentStateChange={this.onEditorChange}
              onEditorStateChange={this.onEditorStateChange}
            />
        </Card>
        <Modal 
            title="Rich text"
            visible={this.state.showRichText}
            onCancel={()=> {
              this.setState({
                showRichText: false
              })
            }}
            footer={null}
        >
            {draftjs(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}
export default RichText;