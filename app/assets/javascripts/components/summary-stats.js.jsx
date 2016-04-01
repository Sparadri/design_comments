var SummaryStats = React.createClass({
  render: function() {
    return (
      <div className="discussion-stats">
        <div className="title">Discussion Statistics</div>
        <div className="stats">
            <div className="stat-item">
              <i className="fa fa-thumbs-up"></i>
              <span className="count">
                {this.props.global_stats.likes_count}
                <span className="text">likes</span>
              </span>
            </div>
            <div className="stat-item">
              <i className="fa fa-thumbs-down"></i>
              <span className="count">
                {this.props.global_stats.dislikes_count}
                <span className="text">dislikes</span>
              </span>
            </div>
            <div className="stat-item">
              <i className="fa fa-users"></i>
              <span className="count">
                {this.props.global_stats.people_count}
                <span className="text">people</span>
              </span>
            </div>
            <div className="stat-item">
              <i className="fa fa-reply-all"></i>
              <span className="count">
                {this.props.global_stats.replies_count}
                <span className="text">replies</span>
              </span>
            </div>
            <div className="stat-item">
              <i className="fa fa-comments"></i>
              <span className="count">
                {this.props.global_stats.comments_count}
                <span className="text">comments</span>
              </span>
            </div>
        </div>
      </div>
    )
  }
})


