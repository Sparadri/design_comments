var App = React.createClass({
  render: function() {
    return (
      <div className="background-color">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-8 col-md-offset-2">
              <CreatePost />
              <MessagesList comments={this.props.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var CreatePost = React.createClass({
  render: function() {
    var textStyle = {
      width: '100%'
    };
    return (
      <div>
        <textArea style={textStyle}> </textArea>
      </div>
    );
  }
});

var MessagesList = React.createClass({
  render: function() {
    return (
      <div>
      { this.props.comments.map(function(comment, index){
        return (
          <div key={index} className="message-item-card">
            <MessageItem comment={comment.comment} user={comment.user} />
            <ReplyForm />
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
          isClicked: false,
          likes: this.props.likes,
          dislikes: this.props.dislikes,
          fb_share: this.props.fb_share
      };
  },
  handleSocialClick: function(topic){
    this.setState({
      isClicked: true
    });
  },
  render: function() {
    return (
      <div className="message-item-social">
        <div className="social-item" ref="likes">
          <i className="fa fa-thumbs-up"></i>
          <span> Like </span>
          <span> {this.state.likes}     </span>
        </div>
        <div className="social-item" ref="dislikes" onClick={this.handleSocialClick}>
          <i className="fa fa-thumbs-down"></i>
          <span> Dislike </span>
          <span> {this.state.dislikes}  </span>
        </div>
        <div className="social-item">
          <i className="fa fa-reply-all"></i>
          <span> Replies </span>
          <span> </span>
        </div>
        <div className="social-item">
          <i className="fa fa-share-alt"></i>
          <span> Share </span>
          <span> {this.state.fb_share}  </span>
        </div>
      </div>
    )
  }
});

var ReplyForm = React.createClass({
  render: function() {
    return (
      <div>
        ReplyForm
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
