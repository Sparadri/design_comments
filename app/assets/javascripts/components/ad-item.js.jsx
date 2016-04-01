var AdItem = React.createClass({
  render: function() {
    return (
      <div>
        <AdItemHeader
          name        = {this.props.advertiser.name}
          avatar_url  = {this.props.advertiser.avatar_url}/>
          <AdItemContent content={this.props.content} />
      </div>
    );
  }
});

var AdItemHeader = React.createClass({
  render: function() {
    return (
      <div className="message-item-header">
        <img className="avatar-md avatar-bordered avatar-square" src={this.props.avatar_url} />
        <div className="details">
          <div className="name"> {this.props.name} </div>
          <div className="time"> Sponsored </div>
        </div>
      </div>
    )
  }
});

var AdItemContent = React.createClass({
  render: function() {
    return (
      <div className="message-item-content">
        {this.props.content.title}
        <div className="ad-item-content">
          <img src={this.props.content.picture} width="400px;"/>
        </div>
      </div>
    )
  }
});

