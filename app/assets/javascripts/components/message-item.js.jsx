var MessageItem = React.createClass({
  getInitialState() {
    return {
      currentLastReplyNumber: 1003
    };
  },
  handleViewMoreClick: function() {
    var currentLastReplyNumber = this.state.currentLastReplyNumber + 3;
    this.setState({currentLastReplyNumber: currentLastReplyNumber});
  },
  render: function() {
    return (
      <div>
        <MessageItemHeader
          commentKey     = {this.props.commentKey}
          deleteComment  = {this.props.deleteComment}
          comment        = {this.props.comment}
          created_at     = {this.props.comment.created_at}
          user           = {this.props.user}
          avatar_url     = {this.props.user.avatar_url}/>
        <MessageItemContent content={this.props.comment.content} />
        <MessageItemSocial
          commentId      = {this.props.comment.id}
          likeCount      = {this.props.votes.like_count}
          dislikeCount   = {this.props.votes.dislike_count}
          fbShareCount   = {this.props.comment.fb_share_count}
          isLiked        = {this.props.votes.is_liked}
          isDisliked     = {this.props.votes.is_disliked}
          replyCount     = {Object.keys(this.props.replies).length} />
        <MessageReplyList
          replies                 = {this.props.replies}
          handleViewMoreClick     = {this.handleViewMoreClick}
          currentLastReplyNumber  = {this.state.currentLastReplyNumber}  />
        <ReplyForm
          parentCommentKey= {this.props.commentKey}
          addComment      = {this.props.addComment}
          parentCommentId = {this.props.comment.id} />
      </div>
    );
  }
});

var MessageReplyList = React.createClass({
  getInitialState() {
    return {
      numberReplies: Object.keys(this.props.replies).length
    };
  },
  renderMessageReplies: function(key) {
    var replies                = this.props.replies;
    var currentReplyNumber     = 1000 - parseInt(key) + 1;
    var totalReplyNumber       = this.state.numberReplies;
    var currentLastReplyNumber = this.props.currentLastReplyNumber - 1000;
    var repliesToShow          = totalReplyNumber - currentLastReplyNumber;
    var canShowMore            = parseInt(key) == this.props.currentLastReplyNumber - 1;

    viewMoreReplies = classNames({
      "show-more" :  canShowMore,
      "hidden"    : !canShowMore
    });
    numberRepliesClass = classNames({
      "number-replies"    :  canShowMore
    });
    if (parseInt(key) < this.props.currentLastReplyNumber){
      return (
        <div key={key}>
          <div className={viewMoreReplies} onClick={this.props.handleViewMoreClick}>
            <div className={numberRepliesClass}>
              {repliesToShow}
            </div>
          </div>
           <MessageReplies
            votes   = {replies[key].votes}
            comment = {replies[key].comment}
            user    = {replies[key].user} />
        </div>
      )
    };
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
  renderContent: function() {
    return {__html: this.props.comment.content};
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
          <div className="reply-content-message" dangerouslySetInnerHTML={this.renderContent()}>
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
    var time        = moment.duration(timestamp, 'milliseconds').humanize()
    return time + " ago"
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
          commentKey     = {this.props.commentKey}
          deleteComment  = {this.props.deleteComment}
          messageId      = {this.props.comment.id}
          isEditable     = {this.props.comment.is_editable}/>
      </div>
    )
  }
});

var EditMessage = React.createClass({
  deleteComment: function(message) {
    var commentId  = this.props.messageId;
    var commentKey = this.props.commentKey;
    this.props.deleteComment(commentId, commentKey);
  },
  renderEdit: function() {
    if (this.props.isEditable) {
      return (
        <div onClick={this.deleteComment}>
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
  renderContent: function() {
    return {__html: this.props.content};
  },
  render: function() {
    return (
      <div className="message-item-content">
        <div dangerouslySetInnerHTML={this.renderContent()} />
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
  recordSocialChange: function(like, dislike) {
    var commentId = this.props.commentId;
    $.ajax({
      type: 'POST',
      data: {comment: {id: this.props.commentId, likeChange: like, dislikeChange: dislike}},
      url: Routes.like_comment_path({format: 'json'}),
      success: function(data) {
        console.log(data[0]);
      }
    });
  },
  handleSocial: function(type){
    var isLiked      = this.state.isLiked;
    var isDisliked   = this.state.isDisliked;
    var likeCount    = this.state.likeCount;
    var dislikeCount = this.state.dislikeCount;

    if (!isLiked && isDisliked && type == "like") {
      likeCount    += 1;
      dislikeCount -= 1;
      this.setState({
        isLiked     : !isLiked,
        likeCount   : likeCount,
        isDisliked  : !isDisliked,
        dislikeCount: dislikeCount
      });
      this.recordSocialChange(1, -1);
    } else if (isLiked && !isDisliked && type == "dislike") {
      likeCount    -= 1;
      dislikeCount += 1;
      this.setState({
        isLiked     : !isLiked,
        likeCount   : likeCount,
        isDisliked  : !isDisliked,
        dislikeCount: dislikeCount
      });
      this.recordSocialChange(-1, 1);
    } else if (!isDisliked && type == 'like') {
      isLiked ? forRecord = -1 : forRecord = 1;
      isLiked ? likeCount -= 1 : likeCount += 1;
      this.setState({
        isLiked: !isLiked,
        likeCount: likeCount
      });
      this.recordSocialChange(forRecord, 0);
    } else if (!isLiked && type == 'dislike') {
      isDisliked ? forRecord = -1 : forRecord = 1;
      isDisliked ? dislikeCount -= 1 : dislikeCount += 1;
      this.setState({
        isDisliked: !isDisliked,
        dislikeCount: dislikeCount
      });
      this.recordSocialChange(0, forRecord);
    } else {
      console.log("adrien")
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
          <div onClick={this.handleSocial.bind(this, "like")} className={likesClasses} ref="likes">
            <i className="fa fa-thumbs-up"></i>
            <span> Like </span>
            <span> {this.state.likeCount} </span>
          </div>
          <div onClick={this.handleSocial.bind(this, "dislike")} className={dislikesClasses} ref="dislikes" >
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
          parentCommentKey      = {this.props.parentCommentKey}
          addComment      = {this.props.addComment}
          parentCommentId = {this.props.parentCommentId} />
      </div>
    )
  }
});
