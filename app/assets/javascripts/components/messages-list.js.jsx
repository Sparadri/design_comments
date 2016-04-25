var MessagesList = React.createClass({
  getInitialState() {
    return {
      currentLastCommentNumber: 1005,
      comments: this.props.comments
    };
  },
  componentWillReceiveProps(newProps){
    this.setState({comments: newProps.comments})
  },
  deleteComment: function(commentId, commentKey) {
    var that = this;
    $.ajax({
      type: 'DELETE',
      data: {id: commentId},
      url: Routes.delete_comment_path(commentId, {format: 'json'}),
      success: function(data) {
        var comments = that.state.comments;
        delete comments[commentKey];
        that.setState({comments: comments})
        console.log("comment deleted");
      }
    })
  },
  handleViewMoreClick: function() {
    var currentLastCommentNumber = this.state.currentLastCommentNumber + 5;
    this.setState({currentLastCommentNumber: currentLastCommentNumber});
  },
  // decides whether message to be displayed is an ad or a message
  renderMessageItem: function(key){
    var comments = this.state.comments;
    if (comments[key]["type"] == "comment") {
      return (
        <div key={key} className="apop-card">
          <MessageItem
            openModal     = {this.props.openModal}
            commentKey    = {key}
            deleteComment = {this.deleteComment}
            votes         = {comments[key].votes}
            comment       = {comments[key].comment}
            user          = {comments[key].user}
            replies       = {comments[key].replies} />
        </div>
      )
    } else {
      return (
        <div key={key} className="apop-card">
          <AdItem
            advertiser  = {comments[key].advertiser}
            content     = {comments[key].content} />
        </div>
      )
    };
  },
  render: function() {
    var comments = this.state.comments;
    var ads      = this.props.adds;
    var adsCount = Object.keys(this.props.comments).length;
    var that     = this;
    return (
      <div>
        <div className="load-modal">
          <div className="sk-circle">
            <div className="sk-circle1 sk-child"></div>
            <div className="sk-circle2 sk-child"></div>
            <div className="sk-circle3 sk-child"></div>
            <div className="sk-circle4 sk-child"></div>
            <div className="sk-circle5 sk-child"></div>
            <div className="sk-circle6 sk-child"></div>
            <div className="sk-circle7 sk-child"></div>
            <div className="sk-circle8 sk-child"></div>
            <div className="sk-circle9 sk-child"></div>
            <div className="sk-circle10 sk-child"></div>
            <div className="sk-circle11 sk-child"></div>
            <div className="sk-circle12 sk-child"></div>
          </div>
        </div>
        {Object.keys(comments).map(this.renderMessageItem)}
      </div>
    );
  }
});
