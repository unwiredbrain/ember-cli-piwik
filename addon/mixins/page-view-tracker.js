/* global _paq */
import Ember from 'ember';


export default Ember.Mixin.create({
  trackPiwikPageView: Ember.on('didTransition', function () {
    _paq.push([ 'trackPageView', Ember.get(this, 'url') ]);
  })
});
