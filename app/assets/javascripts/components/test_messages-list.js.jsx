var TestMessagesList = React.createClass({
  getInitialState() {
    return {
      currentLastCommentNumber: 1005,
      comments: this.props.comments
    };
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
  renderMessageItem: function(key){
    var comments = this.state.comments;
    if (comments[key]["type"] == "comment") {
      return (
        <div key={key} className="message-item-card">
          <TestMessageItem
            commentKey    = {key}
            deleteComment = {this.deleteComment}
            addComment    = {this.props.addComment}
            votes         = {comments[key].votes}
            comment       = {comments[key].comment}
            user          = {comments[key].user}
            replies       = {comments[key].replies} />
        </div>
      )
    } else {
      return (
        <div key={key} className="message-item-card">
          <TestAdItem
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
        {Object.keys(comments).map(this.renderMessageItem)}
      </div>
    );
  }
});

