var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var TestApp = React.createClass({
  mixins : [LinkedStateMixin],
  getInitialState() {
    return {
      comments: this.props.comments,
      modalIsOpen: false
    };
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
      },
      error: function() {
        console.log("error!")
      }
    })
  },
  retrieveBestArticle: function() {
    var that = this;
    $.ajax({
      type: 'POST',
      data: {},
      url: Routes.best_article_path({format: 'json'}),
      success: function(data) {
        console.log(data);
        that.setState({ comments: data });
      },
      error: function() {
        console.log("error!")
      }
    })
  },
  addComment: function(data, parentCommentKey){
    var comments  = this.state.comments;
    var keys      = Object.keys(comments).map(function(x){ return parseInt(x); });
    var new_key   = String(Math.min.apply(null, keys) - 1);
    var user      = this.props.current_user;

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
  render: function() {
    return (
      <div className="background-color test">
              <ReactCSSTransitionGroup
                transitionName    = "messagesList"
                transitionAppear  = {true}
                transitionAppearTimeout={500}>
                <TestModalInt
                  isOpen          = {this.state.modalIsOpen}
                  currentComment  = {this.state.currentComment} />
                <TestSummaryStats global_stats= {this.props.global_stats} />
                <TestCreatePost
                  parentCommentId = {null}
                  currentComment  = {this.state.currentComment}
                  addComment      = {this.addComment} />
                <TestMessageTab
                  retrieveMyActivity  = {this.retrieveMyActivity}
                  retrieveBestArticle = {this.retrieveBestArticle}/>
                <TestMessagesList
                  addComment  = {this.addComment}
                  ads         = {this.state.ads}
                  comments    = {this.state.comments} />
              </ReactCSSTransitionGroup>
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
