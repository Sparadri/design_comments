var TestModalInt = React.createClass({
  getInitialState() {
    return {
      modalIsOpen: this.props.isOpen,
      editorId: null
    };
  },
  componentWillReceiveProps(newProps){
    if (newProps.isOpen == true) {
      this.openModal();
    };
  },
  componentDidUpdate() {
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
    // this.state.modalIsOpen
  },
  handleSubmit: function(){
    var richText   = this.state.richText;
    var rawText    = this.state.rawText;
    var that       = this;
    var parentCommentKey = this.props.parentCommentKey;
    var parentCommentId = that.props.parentCommentId;
    $.ajax({
      type: 'POST',
      data: {comment: { content: richText, parent_comment_id: parentCommentId}},
      url: Routes.comments_path({format: 'json'}),
      success: function(data) {
        console.log(data);
        that.props.addComment(data, parentCommentKey);
        that.setState({
          focused: false
        });
        that.handleDiscardClick();
        console.log("added comment from module");
      }
    })
  },
  handleKeyUp: function(e) {
    var html      = this.state.textEditor;
    var editorId  = this.state.editorId;
    var richText  = this.state.textEditor.serialize()[editorId]["value"];
    var rawText   = richText.replace(/<[^>]*>/g, " ").replace(/\s\s+/g, ' ').replace("&nbsp;","");
    this.setState({richText: richText, rawText: rawText});
    console.log("rich >> "+richText);
    console.log("raw >> "+rawText);
  },
  instantiateEditor: function() {
    var editorId = "editor"+Math.round(Math.random()*10000);
    console.log("modal editor id >> " + editorId);
    var textEditor = new MediumEditor('.editor', {
      toolbar: {
        buttons: [
          {
            name: 'bold',
            contentDefault: '<i class="fa fa-bold"></i>',
            classList: ['medium-editor-custom']
          },
          {
            name: 'italic',
            contentDefault: '<i class="fa fa-italic"></i>',
            classList: ['medium-editor-custom']
          },
          {
            name: 'quote',
            contentDefault: '<i class="fa fa-quote-left"></i>',
            classList: ['medium-editor-custom', 'border-left']
          },
          {
            name: 'anchor',
            contentDefault: '<i class="fa fa-link"></i>',
            classList: ['medium-editor-custom']
          },
          {
            name: 'orderedlist',
            contentDefault: '<i class="fa fa-list-ol"></i>',
            classList: ['medium-editor-custom', 'border-left']
          },
          {
            name: 'unorderedlist',
            contentDefault: '<i class="fa fa-list-ul"></i>',
            classList: ['medium-editor-custom']
          }
        ]
      },
      anchorPreview: {
          /* These are the default options for anchor preview,
             if nothing is passed this is what it used */
          hideDelay: 500,
          previewValueSelector: 'a'
      },
      diffLeft: 0,
      diffTop: -10,
      firstButtonClass: 'medium-editor-button-first',
      lastButtonClass: 'medium-editor-button-last',
      standardizeSelectionStart: false,
      static: false,
      relativeContainer: null,
      placeholder: {
          text: 'Express your Opinion',
          hideOnClick: true
      }
    });
    this.setState({textEditor: textEditor, editorId: editorId});
  },
  handleContentClick: function() {
    if (this.state.editorId == null) {
      this.instantiateEditor();
    };
  },
  renderContent: function() {
    return {__html: this.props.currentComment};
  },
  renderModalContent: function() {
    var that = this;
    return(
      <div className="modal-review">
        <i className="close fa fa-times" onClick={this.closeModal}></i>
        <h3 className="">Review your post before it goes live!</h3>
        <div className="gray-divider"></div>
        <div
          id={this.state.editorId}
          className="modal-message-content editor"
          contentEditable="true"
          onClick={this.handleContentClick}
          onKeyUp={this.handleKeyUp}
          dangerouslySetInnerHTML={this.renderContent()}>
           </div>
        <div className="social-share">
          <div className="btn fb-share">
            Share on Facebook
          </div>
          <div className="btn twitr-share">
            Share on Twitter
          </div>
        </div>
        <div className="share-button full-width" >VALIDATE & SHARE</div>
      </div>
    )
  },
  render: function(){
    const modalStyling = {
      overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
      },
      content : {
        position                   : 'absolute',
        top                        : '40px',
        left                       : '25%',
        right                      : '25%',
        bottom                     : '40px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '20px'
      }
    };
    return(
      <div>
        <ReactModal
            isOpen          = {this.state.modalIsOpen}
            onRequestClose  = {this.closeModal}
            closeTimeoutMS  = {100}
            style           = {modalStyling} >
            {this.renderModalContent()}
        </ReactModal>
      </div>
    )
  }
});
