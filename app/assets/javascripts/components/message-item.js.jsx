var MessageItem = React.createClass({
  getInitialState() {
    return {
      currentLastReplyNumber: 1002,
      isHovered: false
    };
  },
  handleViewMoreClick: function() {
    var currentLastReplyNumber = this.state.currentLastReplyNumber + 2;
    this.setState({currentLastReplyNumber: currentLastReplyNumber});
  },
  onMouseOver: function() {
    this.setState({isHovered: true})
  },
  onMouseLeave: function() {
    this.setState({isHovered: false})
  },
  render: function() {
    return (
      <div onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
        <div className="message-item">
          <div className="header-content">
            <MessageItemHeader
              isHovered     = {this.state.isHovered}
              commentKey    = {this.props.commentKey}
              deleteComment = {this.props.deleteComment}
              comment       = {this.props.comment}
              created_at    = {this.props.comment.created_at}
              user          = {this.props.user}
              avatar_url    = {this.props.user.avatar_url} />
            <MessageItemContent
              content      = {this.props.comment.content}
              commentId    = {this.props.comment.id}
              likeCount    = {this.props.votes.like_count}
              dislikeCount = {this.props.votes.dislike_count}
              fbShareCount = {this.props.comment.fb_share_count}
              isLiked      = {this.props.votes.is_liked}
              isDisliked   = {this.props.votes.is_disliked}
              replyCount   = {Object.keys(this.props.replies).length} />
          </div>
          <MessageItemSocial
            isHovered     = {this.state.isHovered}
            commentId     = {this.props.comment.id}
            likeCount     = {this.props.votes.like_count}
            dislikeCount  = {this.props.votes.dislike_count}
            fbShareCount  = {this.props.comment.fb_share_count}
            isLiked       = {this.props.votes.is_liked}
            isDisliked    = {this.props.votes.is_disliked}
            replyCount    = {Object.keys(this.props.replies).length} />
        </div>
        <MessageReplyList
          replies                 = {this.props.replies}
          handleViewMoreClick     = {this.handleViewMoreClick}
          currentLastReplyNumber  = {this.state.currentLastReplyNumber} />
        <ReplyForm
          parentCommentKey = {this.props.commentKey}
          addComment       = {this.props.addComment}
          parentCommentId  = {this.props.comment.id} />
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
            commentId = {replies[key].comment.id}
            votes     = {replies[key].votes}
            comment   = {replies[key].comment}
            user      = {replies[key].user} />
        </div>
      )
    };
  },
  render: function() {
    messageReplyList = classNames({
      "message-reply-list": this.state.numberReplies > 0
    });
    return (
      <div className={messageReplyList}>
        {Object.keys(this.props.replies).map(this.renderMessageReplies)}
      </div>
    )
  }
});

var MessageReplies = React.createClass({
  getInitialState() {
    return {
        isLiked      : this.props.votes.is_liked,
        likeCount    : this.props.votes.like_count,
        isDisliked   : this.props.votes.is_disliked,
        dislikeCount : this.props.votes.dislike_count,
        fb_share     : this.props.comment.fb_share_count
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
    var that         = this;
    var isLiked      = this.state.isLiked;
    var isDisliked   = this.state.isDisliked;
    var likeCount    = this.state.likeCount;
    var dislikeCount = this.state.dislikeCount;
    var helper       = new Helper;
    this.setState(
      helper.handleSocial(that, type, isLiked, isDisliked, likeCount, dislikeCount)
    )
  },
  retrieveTime: function(date) {
    var helper       = new Helper;
    return(helper.retrieveTime(date));
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
            <div className="time"> {this.retrieveTime(this.props.comment.created_at)} </div>
          </div>
          <div className="reply-content-message" dangerouslySetInnerHTML={this.renderContent()}></div>
        </div>
        <div className="reply-social-items">
          <div onClick={this.handleSocial.bind(this, "like")} className={likesClasses} ref="likes">
            <i className="fa fa-thumbs-up"></i>
            <span> {this.state.likeCount} </span>
          </div>
          <div onClick={this.handleSocial.bind(this, "dislike")} className={dislikesClasses} ref="dislikes" >
            <i className="fa fa-thumbs-down"></i>
            <span> {this.state.dislikeCount} </span>
          </div>
        </div>
      </div>
    );
  }
});

var MessageItemHeader = React.createClass({
  retrieveTime: function(timestamp) {
    var helper       = new Helper;
    return(helper.retrieveTime(timestamp));
  },
  render: function() {
    return (
      <div className="message-item-header">
        <img className="avatar-md avatar-bordered avatar-square" src={this.props.avatar_url} />
        <div className="details">
          <div className="name"> {this.props.user.first_name}
            <EditMessage
              isHovered      = {this.props.isHovered}
              commentKey     = {this.props.commentKey}
              deleteComment  = {this.props.deleteComment}
              messageId      = {this.props.comment.id}
              isEditable     = {this.props.comment.is_editable}/>
          </div>
          <div className="time"> {this.retrieveTime(this.props.comment.created_at)} </div>
        </div>
      </div>
    )
  }
});

var EditMessage = React.createClass({
  getInitialState(){
    return {
      msgCtrlsVisible: false,
      isHovered: this.props.isHovered
    };
  },
  componentWillReceiveProps(nextProps) {
      var isHovered = nextProps.isHovered;
      this.setState({isHovered: isHovered})
  },
  deleteComment: function(message) {
    var commentId  = this.props.messageId;
    var commentKey = this.props.commentKey;
    this.props.deleteComment(commentId, commentKey);
  },
  renderEdit: function() {
    editMessage = classNames({
      "edit-message": this.state.isHovered,
      "fadeIn": this.state.isHovered,
      "hidden": !this.state.isHovered
    });
    if (this.props.isEditable) {
      return (
        <div className={editMessage}>
            <span className="hint hint--top hint--small hint--rounded hint--info hint--rounded" data-hint="Verified Commenters can leave comments without initial moderation. Verified status is earned based on a history of quality comments.">
          <div className="message-ctrl-item certified" >
              <i className="fa fa-check-circle"></i>
          </div>
            </span>
          <div className="message-ctrl-item trash" onClick={this.deleteComment}>
            <i className="fa fa-trash"></i>
          </div>
          <div className="message-ctrl-item share">
            <i className="fa fa-share-alt"></i>
          </div>
        </div>
      )
    } else {
      return (
        <div className={editMessage}>
          <div className="message-ctrl-item certified" >
            <span className="hint hint--top hint--medium hint--rounded hint--success hint--rounded" data-hint="Verified Commenters can leave comments without initial moderation. Verified status is earned based on a history of quality comments.">
              <i className="fa fa-check-circle"></i>
            </span>
          </div>
          <div className="message-ctrl-item ban">
            <span className="hint hint--top hint--medium hint--rounded hint--error hint--rounded" data-hint="Banned comments will be reviewed with dedication by the moderation team & removed in case the content is not relevant.">
              <i className="fa fa-ban"></i>
            </span>
          </div>
          <div className="message-ctrl-item share">
            <span className="hint hint--top hint--medium hint--rounded hint--info hint--rounded" data-hint="Share best comments on Facebook & spread the word :)">
              <i className="fa fa-share-alt"></i>
            </span>
          </div>
        </div>
      )
    };
  },
  render: function() {
    return (
      <div >
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
        <div className="message-text" dangerouslySetInnerHTML={this.renderContent()} />
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
        replyCount   : this.props.replyCount,
        isHovered    : this.props.isHovered
    };
  },
  componentWillReceiveProps(nextProps) {
      var isHovered = nextProps.isHovered;
      this.setState({isHovered: isHovered})
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
    var that         = this;
    var isLiked      = this.state.isLiked;
    var isDisliked   = this.state.isDisliked;
    var likeCount    = this.state.likeCount;
    var dislikeCount = this.state.dislikeCount;
    var helper       = new Helper;
    this.setState(
      helper.handleSocial(that, type, isLiked, isDisliked, likeCount, dislikeCount)
    )
  },
  render: function() {
    likesClasses = classNames({
      "social-item" : true,
      "darkened"    : this.state.isHovered && !this.state.isLiked,
      "is-liked"    : this.state.isLiked
    });
    dislikesClasses = classNames({
      "social-item" : true,
      "darkened"    : this.state.isHovered && !this.state.isDisliked,
      "is-disliked" : this.state.isDisliked
    });
    socialItemWrapper = classNames({
      "double-underlined": this.state.replyCount > 0,
      "social-item-wrapper": true
    });
    return (
      <div className="message-item-social">
        <div className={socialItemWrapper}>
            <div className="inside-interactions">
              <div onClick={this.handleSocial.bind(this, "like")} className={likesClasses} ref="likes">
                <i className="fa fa-thumbs-up"></i>
                <span> {this.state.likeCount} </span>
              </div>
              <div onClick={this.handleSocial.bind(this, "dislike")} className={dislikesClasses} ref="dislikes" >
                <i className="fa fa-thumbs-down"></i>
                <span> {this.state.dislikeCount} </span>
              </div>
            </div>
          </div>
      </div>
    )
  }
});

var ReplyForm = React.createClass({
  render: function() {
    return (
      <div className="reply-form">
        <ReplyPost
          parentCommentKey      = {this.props.parentCommentKey}
          addComment      = {this.props.addComment}
          parentCommentId = {this.props.parentCommentId} />
      </div>
    )
  }
});
