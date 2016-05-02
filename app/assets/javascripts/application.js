//= require jquery
//= require jquery_ujs
//= require quill
//= require bootstrap-sprockets
//= require react
//= require react_ujs
//= require react-dom
//= require react-libraries
//= require moment
//= require sweet-alert
//= require medium-editor
//= require components
//= require share-button
//= require_tree .

function Helper () {
  this.newMediumEditor = function() {
    return (
      new MediumEditor('.editor', {
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
      })
    )
  };

  this.handleSocial = function(that, type, isLiked, isDisliked, likeCount, dislikeCount) {
    if (!isLiked && isDisliked && type == "like") {
      likeCount    += 1;
      dislikeCount -= 1;
      that.recordSocialChange(1, -1);
      return({
        isLiked     : !isLiked,
        likeCount   : likeCount,
        isDisliked  : !isDisliked,
        dislikeCount: dislikeCount
      });
    } else if (isLiked && !isDisliked && type == "dislike") {
      likeCount    -= 1;
      dislikeCount += 1;
      that.recordSocialChange(-1, 1);
      return({
        isLiked     : !isLiked,
        likeCount   : likeCount,
        isDisliked  : !isDisliked,
        dislikeCount: dislikeCount
      });
    } else if (!isDisliked && type == 'like') {
      isLiked ? forRecord = -1 : forRecord = 1;
      isLiked ? likeCount -= 1 : likeCount += 1;
      that.recordSocialChange(forRecord, 0);
      return({
        isLiked: !isLiked,
        likeCount: likeCount
      });
    } else if (!isLiked && type == 'dislike') {
      isDisliked ? forRecord = -1 : forRecord = 1;
      isDisliked ? dislikeCount -= 1 : dislikeCount += 1;
      that.recordSocialChange(0, forRecord);
      return({
        isDisliked: !isDisliked,
        dislikeCount: dislikeCount
      });
    } else {
      console.log("error")
    }
  };

  this.retrieveTime = function(date){
    var jDate     = new Date(date);
    var timestamp = jDate.getTime();
    var diffMs    = Date.now() - timestamp;
    var nbHours   = Math.round(Math.abs(diffMs) / 36e5);
    var nbMinutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    if (nbHours < 1) {                      // less than 1 hr ago
      return ("less than "+Math.round(((diffMs % 86400000) % 3600000) / 60000 + 2)+" minutes ago")
    } else if (nbHours < 12) {              // less tùhan 12 hrs ago
      return ( moment(timestamp).startOf('day').fromNow() )
    } else if (nbHours < 48) {              // less than 48 hrs ago
      return ( moment(timestamp).calendar() )
    } else if (nbHours < 336) {
      return ( moment(timestamp).format('LL') )
    } else {
      return ( moment(timestamp).format('LL') )
    };
  };



}



//
