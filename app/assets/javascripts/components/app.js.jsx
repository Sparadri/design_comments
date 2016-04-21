var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var App = React.createClass({
  getInitialState() {
    return {
      comments: this.props.comments,
      modalIsOpen: false
    };
  },
  componentDidMount() {
    this.retrieveArticle(1);
  },
  retrieveMyActivity: function() {
    var that = this;
    $.ajax({
      type: 'POST',
      data: {},
      url: Routes.my_activity_path({format: 'json'}),
      success: function(data) {
        console.log(data);
        that.setState({ comments: data });
        setTimeout(function(){ $(".load-modal").css("display", "none") }, 1000);
      },
      error: function() {
        console.log("error!")
      }
    })
  },
  retrieveAll: function() {
    var that = this;
    $.ajax({
      type: 'POST',
      url: Routes.all_path({format: 'json'}),
      success: function(data) {
        console.log(data);
        that.setState({ comments: data });
        setTimeout(function(){ $(".load-modal").css("display", "none") }, 1000);
      },
      error: function() {
        console.log("error!")
      }
    })
  },
  retrieveArticle: function(articleId) {
    var that = this;
    $.ajax({
      type: 'POST',
      data: {article_id: articleId},
      url: Routes.article_path(articleId, {format: 'json'}),
      success: function(data) {
        console.log(data);
        that.setState({ comments: data });
        setTimeout(function(){ $(".load-modal").css("display", "none") }, 1000);
      },
      error: function() {
        console.log("error!")
      }
    })
  },
  addComment: function(data, parentCommentKey){
    console.log(data);
    var comments  = this.state.comments;
    var keys      = Object.keys(comments).map(function(x){ return parseInt(x); });
    var new_key   = String(Math.min.apply(null, keys) - 1);

    var currentComment = data["comment"]["content"]

    if (parentCommentKey == null) {
      comments[new_key] = data;
    } else {
      var parentCommentKey  = parentCommentKey.toString();
      comments[parentCommentKey].replies[new_key] = data;
    };
    this.setState({
      comments: comments,
      modalIsOpen: true,
      currentComment: currentComment
    });
  },
  renderMessageList: function() {
    var numberComments = Object.keys(this.state.comments).length;
    if (numberComments == 0) {
      return (
        <div className="empty-list">
          <i className="fa fa-sign-in" aria-hidden="true"></i>
          <span>Please login to join the discussion & contribute to the debate!</span>
        </div>
      )
    } else {
      return (
        <ReactCSSTransitionGroup
          transitionName    = "messagesList"
          transitionAppear  = {true}
          transitionAppearTimeout={200}>
          <div className="message-list">
            <MessagesList
              addComment  = {this.addComment}
              ads         = {this.state.ads}
              comments    = {this.state.comments} />
          </div>
        </ReactCSSTransitionGroup>
      )
    };
  },
  render: function() {
    return (
      <div>
          <ModalInt
            isOpen          = {this.state.modalIsOpen}
            currentComment  = {this.state.currentComment} />
          <SummaryStats global_stats= {this.props.global_stats} />
          <CreatePost
            parentCommentId = {null}
            currentComment  = {this.state.currentComment}
            addComment      = {this.addComment} />
          <MessageTab
            retrieveMyActivity  = {this.retrieveMyActivity}
            retrieveAll         = {this.retrieveAll}
            retrieveArticle     = {this.retrieveArticle}/>
          {this.renderMessageList()}
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
