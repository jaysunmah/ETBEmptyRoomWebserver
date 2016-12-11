Template.landing.onRendered(function() {
    console.log('wei');

});

Template.landing.events({
  'click #calibrateLeftButton' (event) {
    if (Session.get('mouseSelect') == 'left') {
      Session.set('mouseSelect', 'no_select');
    } else {
      Session.set('mouseSelect', 'left');
    }
  },
});

Template.landing.helpers({
  itemSelect: function () {
    if (Session.get('menuSelect')) {
      return Session.get('menuSelect') == 'selectArtifacts';
    }
    return true;
  },
});
