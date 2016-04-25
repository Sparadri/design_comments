var CreatePost = React.createClass({
  getInitialState() {
      return {
        focused: false,
        comments: this.props.comments
      };
  },
  handleSubmit: function(){
    // this.state.textEditor.destroy();
    var richText   = this.state.richText;
    var rawText    = this.state.rawText;
    var that       = this;
    var parentCommentKey = this.props.parentCommentKey;
    var parentCommentId = that.props.parentCommentId;
    this.props.openModal(richText, parentCommentKey, parentCommentId);
    that.handleDiscardClick();
    this.setState({focused: false});
  },
  handleKeyUp: function(e) {
    var html      = this.state.textEditor;
    var editorId  = this.state.editorId;
    var richText  = this.state.textEditor.serialize()[editorId]["value"];
    var rawText   = richText.replace(/<[^>]*>/g, " ").replace(/\s\s+/g, ' ').replace("&nbsp;","");
    this.setState({richText: richText, rawText: rawText});
  },
  handleClick: function() {
    var editorId = "editor"+Math.round(Math.random()*10000);
    var helper = new Helper;
    var textEditor = helper.newMediumEditor();
    this.setState({
      focused: true,
      textEditor: textEditor,
      editorId: editorId,
      richText: "",
      rawText: ""
    })
  },
  handleDiscardClick: function() {
    this.setState({
      focused: false    // NOT WORKING???
    });
    this.refs.createPost.innerHTML = '';
  },
  render: function() {
    AddPostClasses = classNames({
      "create-post" : !this.state.focused,
      "hidden"      :  this.state.focused
    });
    CreatePostClasses = classNames({
      "create-post" : this.state.focused,
      "hidden"      : !this.state.focused
    });
    textareaClasses = classNames({
      "text-area" : true,
      "text-area" : true,
      "editor"  : true,
      "focused"   : this.state.focused
    });
    shareButton = classNames({
      "share-button": true,
    });
    discardButton = classNames({
      "discard-message": true,
    });
    createPostControls = classNames({
      "create-post-controls": true,
      "hidden": !this.state.focused
    });
    // maxlength
    // minlength
    // placeholder
    // required (boolean)
    // spellcheck (boolean)
    return (
      <div>
        <div className={AddPostClasses} onClick={this.handleClick} >
          Express Your Opinion...
        </div>
        <div className={CreatePostClasses}>
          <div
            id={this.state.editorId}
            className={textareaClasses}
            ref="createPost"
            onKeyUp={this.handleKeyUp}>
        </div>
          <div className={createPostControls}>
            <div id="post-toolbar">
              <div dataAction="bold" className="toolbar-item medium-editor-button-active">
                <i className="fa fa-bold"></i>
              </div>
              <div className="toolbar-item ql-italic">
                <i className="fa fa-italic"></i>
              </div>
              <div className="toolbar-item ql-underline">
                <i className="fa fa-underline"></i>
              </div>
              <span className="separator"></span>
              <div className="toolbar-item ql-list">
                <i className="fa fa-list-ol"></i>
              </div>
              <div className="toolbar-item ql-bullet">
                <i className="fa fa-list-ul"></i>
              </div>
              <span className="separator"></span>
              <div className="toolbar-item ql-link">
                <i className="fa fa-link"></i>
              </div>
              <div className="toolbar-item ql-image">
                <i className="fa fa-picture-o"></i>
              </div>
            </div>
            <div className="left-toolbar">
            <div className={discardButton} onClick={this.handleDiscardClick}>
              <i className="fa fa-trash"></i>
            </div>
            <div className={shareButton} onClick={this.handleSubmit}> Share now </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


var ReplyPost = React.createClass({
  getInitialState() {
      return {
        focused: false,
        comments: this.props.comments
      };
  },
  handleSubmit: function(){
    // this.state.textEditor.destroy();
    var richText   = this.state.richText;
    var rawText    = this.state.rawText;
    var that       = this;
    var parentCommentKey = this.props.parentCommentKey;
    var parentCommentId = that.props.parentCommentId;
    this.props.openModal(richText, parentCommentKey, parentCommentId);
    that.handleDiscardClick();
    this.setState({focused: false});
  },
  getName: function() {
    var parentCommentKey = this.props.parentCommentKey;
    that.props.comments[parentCommentKey];
  },
  handleKeyUp: function(e) {
    var html      = this.state.textEditor;
    var editorId  = this.state.editorId;
    var richText  = this.state.textEditor.serialize()[editorId]["value"];
    var rawText   = richText.replace(/<[^>]*>/g, " ").replace(/\s\s+/g, ' ').replace("&nbsp;","");
    this.setState({richText: richText, rawText: rawText});
  },
  handleClick: function() {
    var editorId = "editor"+Math.round(Math.random()*10000);
    var helper = new Helper;
    var textEditor = helper.newMediumEditor();
    this.setState({
      focused: true,
      textEditor: textEditor,
      editorId: editorId,
      richText: "",
      rawText: ""
    })
  },
  handleDiscardClick: function() {
    this.setState({
      focused: false    // NOT WORKING???
    });
  },
  render: function() {
    AddPostClasses = classNames({
      "create-post" : !this.state.focused,
      "hidden"      :  this.state.focused
    });
    CreatePostClasses = classNames({
      "create-post" : this.state.focused,
      "hidden"      : !this.state.focused
    });
    textareaClasses = classNames({
      "text-area" : true,
      "text-area" : true,
      "editor"  : true,
      "focused"   : this.state.focused
    });
    shareButton = classNames({
      "share-button": true,
    });
    discardButton = classNames({
      "discard-message": true,
    });
    createPostControls = classNames({
      "reply-post-controls": true,
      "hidden": !this.state.focused
    });
    // maxlength
    // minlength
    // placeholder
    // required (boolean)
    // spellcheck (boolean)
    return (
      <div>
        <div className={AddPostClasses} onClick={this.handleClick} >
          Reply to {}
        </div>
        <div className={CreatePostClasses}>
          <div
            id={this.state.editorId}
            contentEditable={true}
            className={textareaClasses}
            ref="replyPost"
            onKeyUp={this.handleKeyUp}>
        </div>
          <div className={createPostControls}>
            <div className="left-toolbar">
            <div className={discardButton} onClick={this.handleDiscardClick}>
              <i className="fa fa-trash"></i>
            </div>
            <div className={shareButton} onClick={this.handleSubmit}> Share now </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
