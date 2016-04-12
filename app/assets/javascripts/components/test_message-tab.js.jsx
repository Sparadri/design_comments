var TestMessageTab = React.createClass({
  render: function() {
    return (
      <div className="tab-menu">
        <div className="item focused" onClick={this.props.retrieveBestArticle}>
          <span className="title"> Article Best </span>
          <i className="fa fa-bars"></i>
        </div>
        <div className="item">
          <span className="title"> Website Best </span>
          <i className="fa fa-bars"></i>
        </div>
        <div className="item" onClick={this.props.retrieveMyActivity}>
          <span className="title"> My Interactions </span>
          <i className="fa fa-bars"></i>
        </div>
        <div className="item">
          <span className="title"> My Groups </span>
          <i className="fa fa-bars"></i>
        </div>
      </div>
    )
  }
});
