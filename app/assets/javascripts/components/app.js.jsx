var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var App = React.createClass({
  getInitialState() {
    return {
      comments: this.props.comments,
      modalIsOpen: false,
      newComment: {}
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
  openModal: function(richText, parentCommentKey, parentCommentId) {
      this.setState({
        newComment: {richText: richText, parentCommentKey: parentCommentKey, parentCommentId: parentCommentId},
        modalIsOpen: true
      }, function(){
        this.setState({modalIsOpen: false})
      })
  },
  closeModal: function(){
    this.setState({modalIsopen: false})
  },
  addComment: function(data, parentCommentKey){
    var comments  = this.state.comments;
    var keys      = Object.keys(comments).map(function(x){ return parseInt(x); });
    var new_key   = String(Math.min.apply(null, keys) - 1);

    var richText = data["comment"]["content"]

    if (parentCommentKey == null) {
      comments[new_key] = data;
    } else {
      var parentCommentKey  = parentCommentKey.toString();
      comments[parentCommentKey].replies[new_key] = data;
    };
    this.setState({comments: comments, newComment: {richText: ""}});
    debugger;
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
              openModal   = {this.openModal}
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
            closeModal      = {this.closeModal}
            parentCommentId = {this.state.newComment['parentCommentId']}
            richText        = {this.state.newComment['richText']}
            addComment      = {this.addComment}
            parentCommentKey= {this.state.newComment['parentCommentKey']}
            isOpen          = {this.state.modalIsOpen}   />
          <SummaryStats global_stats= {this.props.global_stats} />
          <CreatePost
            openModal       = {this.openModal}
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
