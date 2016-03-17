var App = React.createClass({
  render: function() {
    return (
      <div className="background-color">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-8 col-md-offset-2">
              <CreatePost />
              <MessagesList comments={this.props.comments}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
var CreatePost = React.createClass({
  getInitialState() {
      return {
        focused: false
      };
  },
  handleKeyUp: function(e) {
    var text = this.state.quill.getText();
    var keyPressed = e.which;
    console.log(keyPressed);
    console.log(text)
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
      "create-post": !this.state.focused,
      "hidden": this.state.focused
    });
    CreatePostClasses = classNames({
      "create-post": this.state.focused,
      "hidden": !this.state.focused
    });
    textareaClasses = classNames({
      "text-area": true,
      "focused": this.state.focused
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
            <div className={discardButton} onClick={this.handleDiscardClick}><i className="fa fa-trash"></i></div>
            <div className={shareButton}> Share now </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var MessagesList = React.createClass({
  render: function() {
    return (
      <div>
      { this.props.comments.map(function(comment, index) {
        return (
          <div key={index} className="message-item-card">
            <MessageItem comment={comment.comment.content} user={comment.comment.user} replies={comment.comment.replies}/>
          </div>
        )
      })}
      </div>
    );
  }
});

var MessageItem = React.createClass({
  render: function() {
    return (
      <div>
        <MessageItemHeader avatar_url={this.props.user.avatar_url} created_at={this.props.comment.created_at} user={this.props.user}/>
        <MessageItemContent content={this.props.comment.content} />
        <MessageItemSocial likes={this.props.comment.like_count} dislikes={this.props.comment.dislike_count} fb_share={this.props.comment.fb_share_count} />
        <MessageReplyList replies={this.props.replies}/>
        <ReplyForm />
      </div>
    );
  }
});

var MessageReplyList = React.createClass({
  render: function() {
    return (
      <div>
        <div className="reply-list-top-border"></div>
        { this.props.replies.map(function(reply, index) {
          return (
            <div key={index}>
             <MessageReplies comment={reply.content} user={reply.user} />
            </div>
          )
        })}
      </div>
    )
  }
});

var MessageReplies = React.createClass({
  getInitialState() {
    return {
        isLiked: false,
        likes: this.props.comment.like_count,
        isDisliked: false,
        dislikes: this.props.comment.dislike_count,
        fb_share: this.props.comment.fb_share_count
    };
  },
  handleLike: function(){
    if (this.state.isLiked == false && this.state.isDisliked == true) {
      this.setState({
        isLiked: true,
        likes: this.state.likes + 1,
        isDisliked: false,
        dislikes: this.state.dislikes - 1
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
        isDisliked: true,
        dislikes: this.state.dislikes + 1,
        isLiked: false,
        likes: this.state.likes - 1
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
        isLiked: false,
        likes: this.props.likes,
        isDisliked: false,
        dislikes: this.props.dislikes,
        fb_share: this.props.fb_share
    };
  },
  handleLike: function(){
    if (this.state.isLiked == false && this.state.isDisliked == true) {
      this.setState({
        isLiked: true,
        likes: this.state.likes + 1,
        isDisliked: false,
        dislikes: this.state.dislikes - 1
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
        isDisliked: true,
        dislikes: this.state.dislikes + 1,
        isLiked: false,
        likes: this.state.likes - 1
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
  render: function() {
    likesClasses = classNames({
      "social-item": true,
      "is-liked": this.state.isLiked
    });
    dislikesClasses = classNames({
      "social-item": true,
      "is-disliked": this.state.isDisliked
    });
    return (
      <div className="message-item-social">
        <div className="inside-interactions">
          <div onClick={this.handleLike} className={likesClasses} ref="likes">
            <i className="fa fa-thumbs-up"></i>
            <span> Like </span>
            <span> {this.state.likes} </span>
          </div>
          <div onClick={this.handleDislike} className={dislikesClasses} ref="dislikes" >
            <i className="fa fa-thumbs-down"></i>
            <span> Dislike </span>
            <span> {this.state.dislikes} </span>
          </div>
        </div>
        <div className="social-item">
          <i className="fa fa-reply-all"></i>
          <span> Replies </span>
          <span> </span>
        </div>
        <div className="social-item">
          <i className="fa fa-share-alt"></i>
          <span> Share </span>
          <span> {this.state.fb_share} </span>
        </div>
      </div>
    )
  }
});

var ReplyForm = React.createClass({
  render: function() {
    return (
      <div className="reply-form">
        <CreatePost />
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
