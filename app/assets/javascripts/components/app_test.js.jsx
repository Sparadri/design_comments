var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var AppTest = React.createClass({
  mixins : [LinkedStateMixin],
  getInitialState() {
    return {
      comments: this.props.comments,
      modalIsOpen: false,
      currentComment: "hello"
    };
  },
  addComment: function(data){
    var comments  = this.state.comments;
    var id        = data.id;
    var user      = this.props.current_user;
    var parent    = data.parent_comment_id;
    var parentId  = data.parent_comment_id;
    if (parent == null) {
      comments[id] = {comment: data, user: user, replies: {}, votes: {}};
    } else {
      comments[parentId].replies[id] = {comment: data, user: user, votes:{}, replies: {}};
    };
    this.setState({
      comments: comments,
      modalIsOpen: true
    });
  },
  render: function() {
    return (
      <div className="background-color">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-8 col-md-offset-2">
              <ModalInt
                isOpen          = {this.state.modalIsOpen}
                currentComment  = {this.state.currentComment}
                valueLink       = {this.props.valueLink} />
              <CreatePost
                parentCommentId = {null}
                valueLink       = {this.linkState('currentComment')}
                addComment      = {this.addComment} />
              <ReactCSSTransitionGroup
                transitionName    = "messagesList"
                transitionAppear  = {true}
                transitionAppearTimeout={500}>
                <MessagesList
                  addComment  = {this.addComment}
                  comments    = {this.state.comments} />
              </ReactCSSTransitionGroup>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ModalInt = React.createClass({
  getInitialState() {
    return {
      modalIsOpen: this.props.isOpen
    };
  },
  componentWillReceiveProps(newProps){
    if (newProps.isOpen == true) {
      this.openModal();
    };
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
    // this.state.modalIsOpen
  },
  renderModalContent: function() {
    return(
      <div className="modal-review">
        <i className="close fa fa-times" onClick={this.closeModal}></i>
        <h3 className="">Review your post before it goes live!</h3>
        <div className="gray-divider"></div>
        <div className="modal-message-content">{this.state.currentComment}</div>
        <div className="share-button full-width" >VALIDATE & SHARE</div>
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
        left                       : '25%',
        right                      : '25%',
        bottom                     : '40px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'
      }
    };
    return(
      <div>
        <ReactModal
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

var CreatePost = React.createClass({
  getInitialState() {
      return {
        focused: false,
        comments: this.props.comments
      };
  },
  handleSubmit: function(){
    // careful, getText() to be replaced by getHTML()
    var html = this.state.quill.getText();
    var that = this;
    $.ajax({
      type: 'POST',
      data: {comment: { content: html, parent_comment_id: that.props.parentCommentId }},
      url: Routes.comments_path({format: 'json'}),
      success: function(data) {
        that.props.addComment(data);
        that.setState({
          focused: false
        });
        that.handleDiscardClick();
        console.log("added comment");
      }
    })
  },
  handleKeyUp: function(e) {
    var text = this.state.quill.getText();
    var keyPressed = e.which;
    this.setState({currentComment: text})
    console.log(keyPressed);
    console.log(this.state.currentComment);
  },
  handleClick: function() {
    var editorId = "#"+this.refs.createPost.id
    var quill = new Quill(editorId);
    quill.addModule('toolbar', { container: '#post-toolbar' });
    console.log(quill+' added');
    this.setState({
      focused: true,
      quill: quill
    })
  },
  handleDiscardClick: function() {
    this.setState({
      focused: false    // NOT WORKING???
    });
    this.state.quill.setContents([]);
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
            id={"editor"+Math.round(Math.random()*10000)}
            placeholder="Express Your Opinion..."
            className={textareaClasses}
            ref="createPost"
            onKeyUp={this.handleKeyUp}>
        </div>
          <div className={createPostControls}>
            <div id="post-toolbar">
              <div className="toolbar-item ql-bold">
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

var MessagesList = React.createClass({
  renderMessageItem: function(key){
    var comments = this.props.comments;
    return (
      <div key={key} className="message-item-card">
        <MessageItem
          addComment= {this.props.addComment}
          votes     = {comments[key].votes}
          comment   = {comments[key].comment}
          user      = {comments[key].user}
          replies   = {comments[key].replies || {}}/>
      </div>
    )
  },
  render: function() {
    return (
      <div>
        {Object.keys(this.props.comments).map(this.renderMessageItem)}
      </div>
    );
  }
});

var MessageItem = React.createClass({
  render: function() {
    return (
      <div>
        <MessageItemHeader
          comment     = {this.props.comment}
          created_at  = {this.props.comment.created_at}
          user        = {this.props.user}
          avatar_url  = {this.props.user.avatar_url}/>
        <MessageItemContent content={this.props.comment.content} />
        <MessageItemSocial
          likeCount      = {this.props.votes.like_count}
          dislikeCount   = {this.props.votes.dislike_count}
          fbShareCount   = {this.props.comment.fb_share_count}
          isLiked        = {this.props.votes.is_liked}
          isDisliked     = {this.props.votes.is_disliked}
          replyCount     = {Object.keys(this.props.replies).length} />
        <MessageReplyList replies={this.props.replies}/>
        <ReplyForm
          addComment      = {this.props.addComment}
          parentCommentId = {this.props.comment.id} />
      </div>
    );
  }
});

var MessageReplyList = React.createClass({
  renderMessageReplies: function(key) {
    var replies = this.props.replies;
    return (
      <div key={key}>
         <MessageReplies
          votes   = {replies[key].votes}
          comment = {replies[key].comment}
          user    = {replies[key].user} />
      </div>
    )
  },
  render: function() {
    ReplyListTopBorder = classNames({
      "reply-list-top-border": Object.keys(this.props.replies).length > 0
    });
    return (
      <div>
        <div className={ReplyListTopBorder}></div>
        {Object.keys(this.props.replies).map(this.renderMessageReplies)}
      </div>
    )
  }
});

var MessageReplies = React.createClass({
  getInitialState() {
    return {
        isLiked   : this.props.votes.is_liked,
        likes     : this.props.votes.like_count,
        isDisliked: this.props.votes.is_disliked,
        dislikes  : this.props.votes.dislike_count,
        fb_share  : this.props.comment.fb_share_count
    };
  },
  handleLike: function(){
    if (this.state.isLiked == false && this.state.isDisliked == true) {
      this.setState({
        isLiked   : true,
        likes     : this.state.likes + 1,
        isDisliked: false,
        dislikes  : this.state.dislikes - 1
      });
    } else if (this.state.isLiked == false) {
      this.setState({
        isLiked: true,
        likes: this.state.likes + 1
      });
    } else {
      this.setState({
        isLiked: false,
        likes: this.state.likes - 1
      });
    }
  },
  handleDislike: function(){
    if (this.state.isDisliked == false && this.state.isLiked == true) {
      this.setState({
        isDisliked  : true,
        dislikes    : this.state.dislikes + 1,
        isLiked     : false,
        likes       : this.state.likes - 1
      });
    } else if (this.state.isDisliked == false) {
      this.setState({
        isDisliked: true,
        dislikes: this.state.dislikes + 1
      });
    } else {
      this.setState({
        isDisliked: false,
        dislikes: this.state.dislikes - 1
      });
    }
  },
  computeTime: function(timestamp) {
    var nbHours = moment(timestamp).startOf("hour").fromNow();
    if (nbHours < 1) {                      // less than 1 hr ago
      return ((moment().minutes(timestamp) - moment().minutes())+" ago")
    } else if (nbHours < 12) {              // less than 12 hrs ago
      return ( moment().startOf('day').fromNow() )
    } else if (nbHours < 48) {              // less than 48 hrs ago
      return ( moment(timestamp).calendar )
    } else if (nbHours < 336) {             // less than 2 weeks ago
      return ( moment(timestamp).format('LL') )
    } else {
      return ( moment(timestamp).format('LL') )
    };
  },
  render: function() {
    likesClasses = classNames({
      "reply-social-item": true,
      "is-liked": this.state.isLiked
    });
    dislikesClasses = classNames({
      "reply-social-item": true,
      "is-disliked": this.state.isDisliked
    });
    return (
      <div className="reply-item-header">
        <img className="avatar-xs avatar-bordered avatar-circle" src={this.props.user.avatar_url} />
        <div className="reply-content">
          <div className="details">
            <div className="name"> {this.props.user.first_name} </div>
            <div className="time"> {this.computeTime(this.props.created_at)} </div>
          </div>
          <div className="reply-content-message">
            {this.props.comment.content}
          </div>
        </div>
        <div className="reply-social-items">
          <div onClick={this.handleLike} className={likesClasses} ref="likes">
            <i className="fa fa-thumbs-up"></i>
            <span> {this.state.likes} </span>
          </div>
          <div onClick={this.handleDislike} className={dislikesClasses} ref="dislikes" >
            <i className="fa fa-thumbs-down"></i>
            <span> {this.state.dislikes} </span>
          </div>
        </div>
      </div>
    );
  }
});

var MessageItemHeader = React.createClass({
  computeTime: function(timestamp) {
    var nbHours = moment(timestamp).startOf("hour").fromNow();
    if (nbHours < 1) {                      // less than 1 hr ago
      return ((moment().minutes(timestamp) - moment().minutes())+" ago")
    } else if (nbHours < 12) {              // less than 12 hrs ago
      return ( moment().startOf('day').fromNow() )
    } else if (nbHours < 48) {              // less than 48 hrs ago
      return ( moment(timestamp).calendar )
    } else if (nbHours < 336) {             // less than 2 weeks ago
      return ( moment(timestamp).format('LL') )
    } else {
      return ( moment(timestamp).format('LL') )
    };
  },
  render: function() {
    return (
      <div className="message-item-header">
        <img className="avatar-md avatar-bordered avatar-square" src={this.props.avatar_url} />
        <div className="details">
          <div className="name"> {this.props.user.first_name} </div>
          <div className="time"> {this.computeTime(this.props.created_at)} </div>
        </div>
        <EditMessage
          messageId   = {this.props.comment.id}
          isEditable  = {this.props.comment.is_editable}/>
      </div>
    )
  }
});

var EditMessage = React.createClass({
  renderEdit: function() {
    if (this.props.isEditable) {
      return (
        <div>
          <i className="fa fa-trash"></i>
        </div>
      )
    } else {
      return (
        <div>
          <i className="fa fa-ban"></i>
        </div>
      )
    };
  },
  render: function() {
    return (
      <div className="edit-message">
        {this.renderEdit()}
      </div>
    )
  }
});

var MessageItemContent = React.createClass({
  render: function() {
    return (
      <div className="message-item-content">
        {this.props.content}
      </div>
    )
  }
});

var MessageItemSocial = React.createClass({
  getInitialState() {
    return {
        isLiked      : this.props.isLiked,
        likeCount    : this.props.likeCount,
        isDisliked   : this.props.isDisliked,
        dislikeCount : this.props.dislikeCount,
        fbShareCount : this.props.fbShareCount,
        replyCount   : this.props.replyCount
    };
  },
  handleLike: function(){
    if (this.state.isLiked == false && this.state.isDisliked == true) {
      this.setState({
        isLiked   : true,
        likeCount     : this.state.likeCount + 1,
        isDisliked: false,
        dislikeCount  : this.state.dislikeCount - 1
      });
    } else if (this.state.isLiked == false) {
      this.setState({
        isLiked: true,
        likeCount: this.state.likeCount + 1
      });
    } else {
      this.setState({
        isLiked: false,
        likeCount: this.state.likeCount - 1
      });
    }
  },
  handleDislike: function(){
    if (this.state.isDisliked == false && this.state.isLiked == true) {
      this.setState({
        isDisliked    : true,
        dislikeCount  : this.state.dislikeCount + 1,
        isLiked       : false,
        likeCount     : this.state.likeCount - 1
      });
    } else if (this.state.isDisliked == false) {
      this.setState({
        isDisliked  : true,
        dislikeCount: this.state.dislikeCount + 1
      });
    } else {
      this.setState({
        isDisliked  : false,
        dislikeCount: this.state.dislikeCount - 1
      });
    }
  },
  render: function() {
    likesClasses = classNames({
      "social-item" : true,
      "is-liked"    : this.state.isLiked
    });
    dislikesClasses = classNames({
      "social-item" : true,
      "is-disliked" : this.state.isDisliked
    });
    return (
      <div className="message-item-social">
        <div className="inside-interactions">
          <div onClick={this.handleLike} className={likesClasses} ref="likes">
            <i className="fa fa-thumbs-up"></i>
            <span> Like </span>
            <span> {this.state.likeCount} </span>
          </div>
          <div onClick={this.handleDislike} className={dislikesClasses} ref="dislikes" >
            <i className="fa fa-thumbs-down"></i>
            <span> Dislike </span>
            <span> {this.state.dislikeCount} </span>
          </div>
        </div>
        <div className="social-item">
          <i className="fa fa-reply-all"></i>
          <span> Replies </span>
          <span> {this.state.replyCount} </span>
        </div>
        <div className="social-item">
          <i className="fa fa-share-alt"></i>
          <span> Share </span>
          <span> {this.state.fbShareCount} </span>
        </div>
      </div>
    )
  }
});

var ReplyForm = React.createClass({
  render: function() {
    return (
      <div className="reply-form">
        <CreatePost
          addComment={this.props.addComment}
          parentCommentId={this.props.parentCommentId} />
      </div>
    )
  }
});


// App
  // CreatePost
    // PostForm
    // PostReview
  // MessagesList
    // MessageItem
      // Social
      // ReplyForm
        // PostForm
        // PostReview
