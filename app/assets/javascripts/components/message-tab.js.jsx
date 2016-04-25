var MessageTab = React.createClass({
  getInitialState() {
    return {
      retrieveArticle: true,
      retrieveAll: false,
      retrieveMyActivity: false,
      retrieveMyGroups: false
    }
  },
  retrieveArticle: function() {
    // provides article in db
    this.props.retrieveArticle(1);
    this.setState({retrieveArticle: true, retrieveAll: false, retrieveMyActivity: false, retrieveMyGroups: false});
    $(".load-modal").css("display", "flex");
  },
  retrieveAll: function() {
    this.props.retrieveAll();
    this.setState({retrieveArticle: false, retrieveAll: true, retrieveMyActivity: false, retrieveMyGroups: false});
    $(".load-modal").css("display", "flex");
  },
  retrieveMyActivity: function() {
    this.props.retrieveMyActivity();
    this.setState({retrieveArticle: false, retrieveAll: false, retrieveMyActivity: true, retrieveMyGroups: false});
    $(".load-modal").css("display", "flex");
  },
  retrieveMyGroups: function() {
    this.props.retrieveMyActivity();
    this.setState({retrieveArticle: false, retrieveAll: false, retrieveMyActivity: false, retrieveMyGroups: true});
    $(".load-modal").css("display", "flex");
  },
  render: function() {
    retrieveArticle = classNames({
      "focused": this.state.retrieveArticle,
      "item": true
    });
    retrieveAll = classNames({
      "focused": this.state.retrieveAll,
      "item": true
    });
    retrieveMyActivity = classNames({
      "focused": this.state.retrieveMyActivity,
      "item": true
    });
    retrieveMyGroups = classNames({
      "focused": this.state.retrieveMyGroups,
      "item": true
    });
    return (
      <div className="tab-menu">
        <div className={retrieveArticle} onClick={this.retrieveArticle}>
          <span className="title"> Article Best </span>
          <i className="fa fa-bars"></i>
        </div>
        <div className={retrieveAll} onClick={this.retrieveAll}>
          <span className="title"> Website Best </span>
          <i className="fa fa-bars"></i>
        </div>
        <div className={retrieveMyActivity} onClick={this.retrieveMyActivity}>
          <span className="title"> My Interactions </span>
          <i className="fa fa-bars"></i>
        </div>
        <div className={retrieveMyGroups} onClick={this.retrieveMyGroups}>
          <span className="title"> My Groups </span>
          <i className="fa fa-bars"></i>
        </div>
      </div>
    )
  }
});
