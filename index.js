require('waypoints/lib/noframework.waypoints');
require('waypoints/lib/shortcuts/inview');

var init = function() {
  console.log('Optimizing SVG elements');

  var points = [];
  var svgAnimations;
  var svgAnimationGroups = {};

  // Set the name of the hidden property and the change event for visibility
  var hidden, visibilityChange;

  if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    visibilityChange = 'mozvisibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  function resetSVGAnimation(svg) {
    svg.contentDocument.documentElement.setCurrentTime(0);
  }

  function pauseSVGGroup(groupname) {
    for (var member in svgAnimationGroups[groupname]) {
      pauseSVG(svgAnimationGroups[groupname][member]);
    }
  }

  function pauseSVG(svg) {
    // console.log("Pausing", svg);
    svg.contentDocument.documentElement.pauseAnimations();
  }

  function unpauseSVGGroup(groupname) {
    for (var member in svgAnimationGroups[groupname]) {
      unpauseSVG(svgAnimationGroups[groupname][member]);
    }
  }

  function unpauseSVG(svg) {
    svg.contentDocument.documentElement.unpauseAnimations();
  }

  function watchSVGLocation(svg) {
    const newLocation = new window.Waypoint.Inview({
      element: svg,
      enter: function(direction) {
        svg.dataset.svgInView = true;
        if (evaluateSVGGroup(svg)) {
          if (!evaluateGroupVisibilityEquality(svg)) {
            unpauseSVGGroup(svg.dataset.svgAnimGroup);
          }
        } else {
          unpauseSVG(svg);
        }
      },
      entered: function(direction) {},
      exit: function(direction) {},
      exited: function(direction) {
        svg.dataset.svgInView = false;
        if (evaluateSVGGroup(svg)) {
          if (evaluateGroupVisibilityEquality(svg)) {
            pauseSVGGroup(svg.dataset.svgAnimGroup);
          }
        } else {
          pauseSVG(svg);
        }
      }
    });

    points.push(newLocation);
  }

  function handleVisibilityChange(state) {
    if (document[hidden]) {
      for (var i = svgAnimations.length - 1; i >= 0; i--) {
        pauseSVG(svgAnimations[i]);
      }
    } else {
      refreshWaypoints();
    }
  }

  function placeInSVGGroup(svg) {
    var group = svg.dataset.svgAnimGroup;
    if (group !== undefined) {
      if (svgAnimationGroups[group] === undefined) {
        svgAnimationGroups[group] = [];
      }
      svgAnimationGroups[group].push(svg);
    }
  }

  function evaluateGroupVisibilityEquality(svg) {
    var currentState = svg.dataset.svgInView;
    var group = svgAnimationGroups[svg.dataset.svgAnimGroup];

    for (var member in group) {
      if (group[member].dataset.svgInView !== currentState) {
        return false;
      }
    }
    return true;
  }

  function evaluateSVGGroup(svg) {
    if (svg.dataset.svgAnimGroup !== undefined) {
      return true;
    }
    return false;
  }

  function refreshWaypoints() {
    window.scrollBy(0, 2 * window.Waypoint.viewportHeight());
    window.Waypoint.refreshAll();
    window.scrollBy(0, -2 * window.Waypoint.viewportHeight());
  }

  window.onload = function() {
    console.log('READY');
    var i, svg;

    svgAnimations = document.querySelectorAll('object[type="image/svg+xml"]');
    for (i = svgAnimations.length - 1; i >= 0; i--) {
      svg = svgAnimations[i];
      placeInSVGGroup(svg);
      watchSVGLocation(svg);
      pauseSVG(svg);
      resetSVGAnimation(svg);
    }
    refreshWaypoints();
  };

  // Old Browser Warning
  if (typeof document.addEventListener === 'undefined' || typeof document[hidden] === 'undefined') {
    console.log('This browser can not provide the document.hidden property that the SVG Animation CPU Optimization module needs.');
  } else {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }
};

init();
