var TestCreatePost = React.createClass({
  getInitialState() {
      return {
        focused: false,
        comments: this.props.comments
      };
  },
  handleSubmit: function(){
    var richText   = this.state.richText;
    var rawText    = this.state.rawText;
    var that       = this;
    var parentCommentKey = this.props.parentCommentKey;
    var parentCommentId = that.props.parentCommentId;
    $.ajax({
      type: 'POST',
      data: {comment: { content: richText, parent_comment_id: parentCommentId}},
      url: Routes.comments_path({format: 'json'}),
      success: function(data) {
        console.log(data);
        that.props.addComment(data, parentCommentKey);
        that.setState({
          focused: false
        });
        that.handleDiscardClick();
        console.log("added comment");
      }
    })
  },
  handleKeyUp: function(e) {
    var html      = this.state.textEditor;
    var editorId  = this.state.editorId;
    var richText  = this.state.textEditor.serialize()[editorId]["value"];
    var rawText   = richText.replace(/<[^>]*>/g, " ").replace(/\s\s+/g, ' ').replace("&nbsp;","");
    this.setState({richText: richText, rawText: rawText});
    console.log("rich >> "+richText);
    console.log("raw >> "+rawText);
  },
  handleClick: function() {
    var editorId = "editor"+Math.round(Math.random()*10000);
    console.log(editorId);
    var textEditor = new MediumEditor('.editor', {
      toolbar: {
        buttons: [
          {
            name: 'bold',
            contentDefault: '<i class="fa fa-bold"></i>',
            classList: ['medium-editor-custom']
          },
          {
            name: 'italic',
            contentDefault: '<i class="fa fa-italic"></i>',
            classList: ['medium-editor-custom']
          },
          {
            name: 'quote',
            contentDefault: '<i class="fa fa-quote-left"></i>',
            classList: ['medium-editor-custom', 'border-left']
          },
          {
            name: 'anchor',
            contentDefault: '<i class="fa fa-link"></i>',
            classList: ['medium-editor-custom']
          },
          {
            name: 'orderedlist',
            contentDefault: '<i class="fa fa-list-ol"></i>',
            classList: ['medium-editor-custom', 'border-left']
          },
          {
            name: 'unorderedlist',
            contentDefault: '<i class="fa fa-list-ul"></i>',
            classList: ['medium-editor-custom']
          }
        ]
      },
      anchorPreview: {
          /* These are the default options for anchor preview,
             if nothing is passed this is what it used */
          hideDelay: 500,
          previewValueSelector: 'a'
      },
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: 'medium-editor-button-first',
      lastButtonClass: 'medium-editor-button-last',
      standardizeSelectionStart: false,
      static: false,
      relativeContainer: null,
      placeholder: {
          text: 'Express your Opinion',
          hideOnClick: true
      }
    });
    console.log(textEditor+' added');
    this.setState({
      focused: true,
      textEditor: textEditor,
      editorId: editorId
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


var TestReplyPost = React.createClass({
  getInitialState() {
      return {
        focused: false,
        comments: this.props.comments
      };
  },
  handleSubmit: function(){
    var richText   = this.state.richText;
    var rawText    = this.state.rawText;
    var that       = this;
    var parentCommentKey = this.props.parentCommentKey;
    var parentCommentId = that.props.parentCommentId;
    $.ajax({
      type: 'POST',
      data: {comment: { content: richText, parent_comment_id: parentCommentId}},
      url: Routes.comments_path({format: 'json'}),
      success: function(data) {
        console.log(data);
        that.props.addComment(data, parentCommentKey);
        that.setState({
          focused: false
        });
        that.handleDiscardClick();
        console.log("added comment");
      }
    })
  },
  getName: function() {
    var parentCommentKey = this.props.parentCommentKey;
    that.props.comments[parentCommentKey].
  },
  handleKeyUp: function(e) {
    var richText  = this.refs.replyPost.innerHTML;
    var rawText   = richText.replace(/<[^>]*>/g, " ").replace(/\s\s+/g, ' ').replace("&nbsp;","");
    this.setState({richText: richText, rawText: rawText});
    console.log("rich >> "+richText);
    console.log("raw >> "+rawText);
  },
  handleClick: function() {
    this.setState({ focused: true })
  },
  handleDiscardClick: function() {
    this.setState({ focused: false });
    this.refs.replyPost.innerHTML = '';
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
