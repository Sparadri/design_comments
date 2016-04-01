

var TestModalInt = React.createClass({
  getInitialState() {
    return {
      modalIsOpen: this.props.isOpen
    };
  },
  componentWillReceiveProps(newProps){
    if (newProps.isOpen == true) {
      this.openModal();
    };
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
    // this.state.modalIsOpen
  },
  handleContentClick: function() {
    var editorId = "editor"+Math.round(Math.random()*10000);
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
  },
  renderContent: function() {
    return {__html: this.props.currentComment};
  },
  renderModalContent: function() {
    return(
      <div className="modal-review">
        <i className="close fa fa-times" onClick={this.closeModal}></i>
        <h3 className="">Review your post before it goes live!</h3>
        <div className="gray-divider"></div>
        <div
          className="modal-message-content editor"
          contentEditable="true"
          onClick={this.handleContentClick()}
          dangerouslySetInnerHTML={this.renderContent()}
          id={this.state.editorId} />
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
    // return(
    //   <div>
    //     <ReactModal
    //         isOpen          = {this.state.modalIsOpen}
    //         onRequestClose  = {this.closeModal}
    //         closeTimeoutMS  = {100}
    //         style           = {modalStyling} >
    //         {this.renderModalContent()}
    //     </ReactModal>
    //   </div>
    // )
  }
});

