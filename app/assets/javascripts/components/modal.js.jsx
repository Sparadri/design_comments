var ModalInt = React.createClass({
  getInitialState() {
    return {
      modalIsOpen: this.props.isOpen,
      richText: this.props.richText,
      isEditorInstantiated: false,
      editorId: "modal-editor"
    };
  },
  componentWillReceiveProps(newProps){
    if (newProps.isOpen) { this.openModal() };
  },
  componentDidUpdate() {
  },
  openModal: function() {
    this.setState({modalIsOpen: true}, function() {
      this.instantiateEditor();
    }.bind(this));
  },
  closeModal: function() {
    this.setState({modalIsOpen: false, isEditorInstantiated: false});
    this.state.textEditor.destroy();
  },
  instantiateEditor: function() {
    var helper     = new Helper;
    var textEditor = helper.newMediumEditor();
    this.setState({textEditor: textEditor, isEditorInstantiated: true}, function(){
        this.textInput();
    }.bind(this));
  },
  textInput: function() {
    var html      = this.state.textEditor;
    var editorId  = this.state.editorId;
    var richText  = html.serialize()[editorId]["value"];
    var rawText   = richText.replace(/<[^>]*>/g, " ").replace(/\s\s+/g, ' ').replace("&nbsp;","");
    this.setState({richText: richText, rawText: rawText}, function(){
        console.log(this.state.richText)
    }.bind(this));
  },
  handleKeyUp: function(e) {
    if (!this.state.isEditorInstantiated) {
      this.instantiateEditor();
    } else {
      this.textInput();
    };
  },
  publishPost: function() {
      var richText         = this.state.richText;
      var parentCommentId  = this.props.parentCommentId;
      var parentCommentKey = this.props.parentCommentKey;
      var that             = this;
    $.ajax({
      type: 'POST',
      data: {comment: { content: richText, parent_comment_id: parentCommentId}},
      url: Routes.comments_path({format: 'json'}),
      success: function(data) {
        if (data[0] == "user not logged") {
          swal("Please login to comment!");
        } else {
          that.props.addComment(data, parentCommentKey);
          that.closeModal();
          console.log(data);
        };
      },
      error: function() {
        console.log("error!")
      }
    })

  },
  renderContent: function() {
    return {__html: this.props.richText};
  },
  renderModalContent: function() {
    var that = this;
    return(
      <div className="modal-review">
        <i className="close fa fa-times" onClick={this.closeModal}></i>
        <h3 className="">Review your post before it goes live!</h3>
        <div className="gray-divider"></div>
        <div
          className="modal-message-content editor"
          contentEditable="true"
          onClick={this.handleContentClick}
          onKeyUp={this.handleKeyUp}
          dangerouslySetInnerHTML={this.renderContent()}
          id="modal-editor" />
        <div className="social-share">
          <div className="btn fb-share">
            Share on Facebook
          </div>
          <div className="btn twitr-share">
            Share on Twitter
          </div>
        </div>
        <div className="share-button full-width" onClick={this.publishPost}>VALIDATE & SHARE</div>
      </div>
    )
  },
  render: function(){
    const modalStyling = {
      overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
      },
      content : {
        position                   : 'absolute',
        top                        : '40px',
        left                       : '5%',
        right                      : '5%',
        height                     : '80vh',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'
      }
    };
    return (
      <div>
        <ReactModal
            editorId        = {this.state.editorId}
            isOpen          = {this.state.modalIsOpen}
            onRequestClose  = {this.closeModal}
            closeTimeoutMS  = {100}
            style           = {modalStyling} >
            {this.renderModalContent()}
        </ReactModal>
      </div>
    )
  }
});
