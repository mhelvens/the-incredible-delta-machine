/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".index.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(1), __webpack_require__(14), __webpack_require__(2)]; (function($, DeltaJs) {
	  'use strict';
	  var dm = new DeltaJs();
	  var app = new p2.WebGLRenderer(function() {
	    var $__0 = this;
	    this.gui.closed = true;
	    var world = new p2.World({
	      doProfiling: true,
	      gravity: [0, -10],
	      broadphase: new p2.SAPBroadphase()
	    });
	    this.setWorld(world);
	    world.islandSplit = true;
	    world.sleepMode = p2.World.ISLAND_SLEEPING;
	    world.solver.iterations = 20;
	    world.solver.tolerance = 0.001;
	    world.setGlobalStiffness(1e4);
	    var spriteContainer = new PIXI.DisplayObjectContainer();
	    this.stage.addChild(spriteContainer);
	    function addNewSprite(sprite) {
	      spriteContainer.addChild(sprite);
	      spriteContainer.children.sort((function(a, b) {
	        return (a.zIndex < b.zIndex ? -1 : (a.zIndex === b.zIndex ? 0 : 1));
	      }));
	    }
	    function newSprite($__1) {
	      var $__2 = $__1,
	          image = $__2.image,
	          body = $__2.body,
	          zIndex = $__2.zIndex,
	          scale = $__2.scale,
	          translate = $__2.translate,
	          rotate = $__2.rotate;
	      zIndex = zIndex || 0;
	      scale = scale || [1, 1];
	      translate = translate || [0, 0];
	      rotate = rotate || 0;
	      body.invisible = true;
	      var sprite = PIXI.Sprite.fromImage(image);
	      sprite.texture.baseTexture.addEventListener('loaded', (function($__3) {
	        var texture = $__3.content;
	        var aabb = body.getAABB();
	        var width = aabb.upperBound[0] - aabb.lowerBound[0];
	        var mandatoryScale = width / texture.width;
	        var height = mandatoryScale * texture.height;
	        sprite.width = width;
	        sprite.height = height;
	        sprite.scale.x = mandatoryScale * scale[0];
	        sprite.scale.y = -mandatoryScale * scale[1];
	        sprite.anchor.x = width / 2;
	        sprite.anchor.y = width / 2;
	        sprite.zIndex = zIndex;
	        addNewSprite(sprite);
	        var onPostStep = (function() {
	          if (body.mass === 0) {
	            world.off('postStep', onPostStep);
	          }
	          sprite.position.x = body.position[0] + width * (width - 1) / 2 + translate[0];
	          sprite.position.y = body.position[1] - width * (width - 1) / 2 + translate[1];
	          sprite.rotation = body.angle + rotate;
	        });
	        world.on('postStep', onPostStep);
	      }));
	      return sprite;
	    }
	    function newCircle($__1) {
	      var $__2 = $__1,
	          image = $__2.image,
	          radius = $__2.radius,
	          mass = $__2.mass,
	          position = $__2.position,
	          zIndex = $__2.zIndex,
	          rotation = $__2.rotation,
	          scaleSprite = $__2.scaleSprite,
	          translateSprite = $__2.translateSprite,
	          material = $__2.material,
	          invisible = $__2.invisible;
	      radius = radius || 1;
	      var shape = new p2.Circle(radius);
	      shape.material = material;
	      var body = new p2.Body({
	        mass: mass || 0,
	        position: position || [0, 0],
	        damping: 0,
	        angularDamping: 0,
	        angle: rotation,
	        invisible: invisible
	      });
	      body.addShape(shape);
	      world.addBody(body);
	      var sprite = image && newSprite({
	        image: image,
	        body: body,
	        zIndex: zIndex,
	        scale: scaleSprite,
	        translate: translateSprite
	      });
	      return {
	        body: body,
	        sprite: sprite,
	        shape: shape,
	        material: material
	      };
	    }
	    function newRectangle($__1) {
	      var $__2 = $__1,
	          image = $__2.image,
	          width = $__2.width,
	          height = $__2.height,
	          mass = $__2.mass,
	          position = $__2.position,
	          zIndex = $__2.zIndex,
	          rotation = $__2.rotation,
	          scaleSprite = $__2.scaleSprite,
	          translateSprite = $__2.translateSprite,
	          material = $__2.material,
	          invisible = $__2.invisible;
	      width = width || 1;
	      height = height || 1;
	      var shape = new p2.Rectangle(width, height);
	      shape.material = material;
	      var body = new p2.Body({
	        mass: mass || 0,
	        position: position || [0, 0],
	        angle: rotation,
	        invisible: invisible
	      });
	      body.addShape(shape);
	      world.addBody(body);
	      var sprite = image && newSprite({
	        image: image,
	        body: body,
	        zIndex: zIndex,
	        scale: scaleSprite,
	        translate: translateSprite
	      });
	      return {
	        body: body,
	        sprite: sprite,
	        shape: shape,
	        material: material
	      };
	    }
	    function newCapsule($__1) {
	      var $__2 = $__1,
	          image = $__2.image,
	          length = $__2.length,
	          radius = $__2.radius,
	          mass = $__2.mass,
	          position = $__2.position,
	          zIndex = $__2.zIndex,
	          rotation = $__2.rotation,
	          scaleSprite = $__2.scaleSprite,
	          translateSprite = $__2.translateSprite,
	          material = $__2.material,
	          invisible = $__2.invisible;
	      length = length || 1;
	      radius = radius || 0.1;
	      var shape = new p2.Capsule(length, radius);
	      shape.material = material;
	      var body = new p2.Body({
	        mass: mass || 0,
	        position: position || [0, 0],
	        angle: rotation,
	        invisible: invisible
	      });
	      body.addShape(shape);
	      world.addBody(body);
	      var sprite = image && newSprite({
	        image: image,
	        body: body,
	        zIndex: zIndex,
	        scale: scaleSprite,
	        translate: translateSprite
	      });
	      return {
	        body: body,
	        sprite: sprite,
	        shape: shape,
	        material: material
	      };
	    }
	    function newButton($__1) {
	      var $__2 = $__1,
	          position = $__2.position,
	          onActivation = $__2.onActivation,
	          scaleSprite = $__2.scaleSprite,
	          translateSprite = $__2.translateSprite,
	          invisible = $__2.invisible,
	          radius = $__2.radius;
	      var $__3 = newCircle({
	        image: __webpack_require__(5),
	        radius: radius || 0.3,
	        mass: 0,
	        position: position,
	        scaleSprite: scaleSprite,
	        translateSprite: translateSprite,
	        zIndex: -1,
	        invisible: invisible
	      }),
	          body = $__3.body,
	          sprite = $__3.sprite,
	          material = $__3.material,
	          shape = $__3.shape;
	      shape.sensor = true;
	      var greenButtonTexture = PIXI.Texture.fromImage(__webpack_require__(6));
	      var enabled = true;
	      world.on("beginContact", (function(event) {
	        if ((event.bodyA === body || event.bodyB === body)) {
	          if (enabled) {
	            sprite.setTexture(greenButtonTexture);
	            onActivation(event.bodyA === body ? event.bodyB : event.bodyA);
	          }
	        }
	      }));
	      function enable() {
	        enabled = true;
	      }
	      function disable() {
	        enabled = false;
	      }
	      enable();
	      return {
	        body: body,
	        sprite: sprite,
	        material: material,
	        shape: shape,
	        enable: enable,
	        disable: disable
	      };
	    }
	    var lightBulbMaterial = new p2.Material();
	    function newLightBulb($__1) {
	      var $__2 = $__1,
	          position = $__2.position,
	          width = $__2.width,
	          scaleSprite = $__2.scaleSprite,
	          translateSprite = $__2.translateSprite;
	      width = width || 1;
	      var $__3 = newRectangle({
	        image: __webpack_require__(7),
	        width: width,
	        height: width * (450 / 280),
	        scaleSprite: scaleSprite,
	        translateSprite: translateSprite,
	        mass: 0.1,
	        position: position,
	        material: lightBulbMaterial
	      }),
	          body = $__3.body,
	          sprite = $__3.sprite,
	          material = $__3.material,
	          shape = $__3.shape;
	      var lightBulbOnTexture = PIXI.Texture.fromImage(__webpack_require__(8));
	      var turnOn = (function() {
	        sprite.setTexture(lightBulbOnTexture);
	      });
	      return {
	        sprite: sprite,
	        body: body,
	        material: material,
	        shape: shape,
	        turnOn: turnOn
	      };
	    }
	    var bowlingBallMaterial = new p2.Material();
	    function newBowlingBall($__1) {
	      var $__2 = $__1,
	          position = $__2.position,
	          scaleSprite = $__2.scaleSprite,
	          translateSprite = $__2.translateSprite;
	      var BOWLING_BALL_RADIUS = 0.5;
	      var bowlingBall = newCircle({
	        image: __webpack_require__(9),
	        mass: 1,
	        radius: BOWLING_BALL_RADIUS,
	        position: position,
	        scaleSprite: scaleSprite,
	        translateSprite: translateSprite,
	        material: bowlingBallMaterial
	      });
	      bowlingBall.body.allowSleep = false;
	      return bowlingBall;
	    }
	    var trampolineMaterial = new p2.Material();
	    world.addContactMaterial(new p2.ContactMaterial(bowlingBallMaterial, trampolineMaterial, {
	      restitution: 1,
	      stiffness: Number.MAX_VALUE
	    }));
	    function newTrampoline($__1) {
	      var $__2 = $__1,
	          position = $__2.position,
	          width = $__2.width,
	          rotation = $__2.rotation,
	          translateSprite = $__2.translateSprite;
	      width = width || 1;
	      translateSprite = translateSprite || [0, 0];
	      var trampoline = newRectangle({
	        image: __webpack_require__(10),
	        position: position || [0, 0],
	        rotation: rotation || 0,
	        width: width,
	        height: width * (397 / 930),
	        translateSprite: [0 + translateSprite[0], 0.83 + translateSprite[1]],
	        zIndex: -1,
	        material: trampolineMaterial
	      });
	      trampoline.body.allowSleep = false;
	      return trampoline;
	    }
	    function newConveyorBelt($__1) {
	      var $__2 = $__1,
	          position = $__2.position,
	          length = $__2.length,
	          radius = $__2.radius,
	          translateSprite = $__2.translateSprite,
	          surfaceVelocity = $__2.surfaceVelocity;
	      length = length || 2;
	      translateSprite = translateSprite || [0, 0];
	      var conveyorBelt = newCapsule({
	        image: __webpack_require__(11),
	        position: position || [0, 0],
	        length: length,
	        radius: radius || 0.15,
	        translateSprite: translateSprite,
	        zIndex: -1,
	        material: new p2.Material()
	      });
	      conveyorBelt.body.allowSleep = false;
	      conveyorBelt.turnOn = (function() {
	        var contactMaterial = new p2.ContactMaterial(bowlingBallMaterial, conveyorBelt.shape.material, {
	          surfaceVelocity: surfaceVelocity || 1,
	          friction: 2.0
	        });
	        world.addContactMaterial(contactMaterial);
	      });
	      return conveyorBelt;
	    }
	    function newCannon($__1) {
	      var $__2 = $__1,
	          position = $__2.position,
	          leftToRight = $__2.leftToRight,
	          force = $__2.force;
	      if (typeof leftToRight === 'undefined') {
	        leftToRight = true;
	      }
	      force = force || 600;
	      var direction = (leftToRight ? 1 : -1);
	      var bottom = new p2.Rectangle(1, 0.2);
	      var left = new p2.Rectangle(0.2, 1.2);
	      var right = new p2.Rectangle(0.2, 1.2);
	      var body = new p2.Body({
	        position: position || [0, 0],
	        angle: -direction * Math.PI / 4
	      });
	      body.addShape(bottom, [0, -0.6]);
	      body.addShape(left, [-0.6, -0.1]);
	      body.addShape(right, [0.6, -0.1]);
	      world.addBody(body);
	      var sprite = newSprite({
	        body: body,
	        image: __webpack_require__(12),
	        zIndex: 10,
	        scale: [direction * 1.5, 1.5],
	        translate: [leftToRight ? -0.07 : -1.47, -0.74],
	        rotate: direction * Math.PI / 4
	      });
	      body.allowSleep = false;
	      var $__3 = newButton({
	        position: [position[0] - direction * 0.4, position[1] - 0.4],
	        onActivation: function(cannonBall) {
	          disable();
	          setTimeout((function() {
	            cannonBall.type = p2.Body.STATIC;
	            setTimeout((function() {
	              cannonBall.wakeUp();
	              cannonBall.type = p2.Body.DYNAMIC;
	              cannonBall.force = [direction * force, force];
	              setTimeout((function() {
	                enable();
	              }), 100);
	            }), 1000);
	          }), 100);
	        }
	      }),
	          enable = $__3.enable,
	          disable = $__3.disable;
	      return {
	        body: body,
	        sprite: sprite
	      };
	    }
	    function newConveyorBeltSystem($__1) {
	      var $__2 = $__1,
	          conveyorBeltPosition = $__2.conveyorBeltPosition,
	          radius = $__2.radius,
	          length = $__2.length,
	          surfaceVelocity = $__2.surfaceVelocity,
	          translateConveyorBeltSprite = $__2.translateConveyorBeltSprite,
	          buttonPosition = $__2.buttonPosition,
	          localButtonAnchor = $__2.localButtonAnchor,
	          localConveyorBeltAnchor = $__2.localConveyorBeltAnchor;
	      var $__3 = newConveyorBelt({
	        position: conveyorBeltPosition,
	        radius: radius,
	        length: length,
	        surfaceVelocity: surfaceVelocity,
	        translateSprite: translateConveyorBeltSprite,
	        zIndex: 999
	      }),
	          conveyorBelt = $__3.body,
	          turnOn = $__3.turnOn;
	      var button = newButton({
	        position: buttonPosition,
	        onActivation: function() {
	          turnOn();
	        },
	        zIndex: 999
	      }).body;
	      world.addSpring(new p2.LinearSpring(button, conveyorBelt, {
	        stiffness: 10,
	        restLength: 0.3,
	        localAnchorA: localButtonAnchor,
	        localAnchorB: localConveyorBeltAnchor
	      }));
	    }
	    function newGoal($__1) {
	      var position = $__1.position;
	      var $__3 = newLightBulb({
	        position: [position[0], position[1] - 2],
	        width: 1,
	        scaleSprite: [1, -1]
	      }),
	          lightBulb = $__3.body,
	          turnOn = $__3.turnOn;
	      var button = newButton({
	        position: position,
	        radius: 0.3,
	        onActivation: function() {
	          turnOn();
	        }
	      }).body;
	      world.addSpring(new p2.LinearSpring(button, lightBulb, {
	        restLength: 0.2,
	        stiffness: 7,
	        localAnchorA: [0, -0.3],
	        localAnchorB: [0, (450 / 280) / 2]
	      }));
	    }
	    new dm.Delta('left-goal', {}).insert('addArtefacts', function() {
	      newGoal({position: [-4, 5]});
	    });
	    new dm.Delta('right-goal', {}).insert('addArtefacts', function() {
	      newGoal({position: [4, 5]});
	    });
	    new dm.Delta('left-facing-trampoline', {}).insert('addArtefacts', function() {
	      newTrampoline({
	        position: [0, 0.8],
	        width: 2,
	        translateSprite: [0.1, 0.35],
	        rotation: 0.25
	      });
	    });
	    new dm.Delta('left-turning-conveyor-belt', {}).insert('addArtefacts', function() {
	      newConveyorBeltSystem({
	        conveyorBeltPosition: [-3, 0],
	        length: 2,
	        surfaceVelocity: 2,
	        translateConveyorBeltSprite: [0, 1.3],
	        buttonPosition: [-0.4, dm.vp('conveyorBeltButtonHeight', 1)],
	        localButtonAnchor: [-0.2, -0.2],
	        localConveyorBeltAnchor: [1, 0]
	      });
	      newBowlingBall({position: [-2.5, 0.6]});
	    });
	    new dm.Delta('right-shooting-cannon', {}).insert('addArtefacts', function() {
	      newCannon({
	        leftToRight: true,
	        position: [-5, 0]
	      });
	    });
	    new dm.Delta('right-turning-conveyor-belt', {}).insert('addArtefacts', function() {
	      newConveyorBeltSystem({
	        conveyorBeltPosition: [3, 0],
	        length: 2,
	        surfaceVelocity: -2,
	        translateConveyorBeltSprite: [0, 1.3],
	        buttonPosition: [0.4, dm.vp('conveyorBeltButtonHeight', 1)],
	        localButtonAnchor: [0.2, -0.2],
	        localConveyorBeltAnchor: [-1, 0]
	      });
	      if (dm.vp('rightSittingBowlingBall', true)) {
	        newBowlingBall({position: [2.5, 0.6]});
	      }
	    });
	    new dm.Delta('left-shooting-cannon', {}).insert('addArtefacts', function() {
	      newCannon({
	        leftToRight: false,
	        position: [5, 0]
	      });
	    });
	    new dm.Delta('conflict-indicator', {resolves: ['left-facing-trampoline', 'left-turning-conveyor-belt']}).insert('addArtefacts', function() {
	      if (!conflictResolved) {
	        startMachine = false;
	        setTimeout((function() {
	          var shape = newRectangle({
	            image: __webpack_require__(13),
	            position: [0, 1],
	            width: 2.5,
	            height: 2.5,
	            mass: 0
	          }).shape;
	          shape.sensor = true;
	        }), 3000);
	      }
	    });
	    var conflictResolved = false;
	    new dm.Delta('reposition-conveyor-belt-buttons', {}).prepend('addArtefacts', function() {
	      conflictResolved = true;
	    }).replace('conveyorBeltButtonHeight', 2);
	    new dm.Delta('second-right-turning-conveyor-belt', {}).insert('addArtefacts', function() {
	      newConveyorBeltSystem({
	        conveyorBeltPosition: [1, 0],
	        length: 2,
	        surfaceVelocity: -2,
	        translateConveyorBeltSprite: [0, 1.3],
	        buttonPosition: [0.4, dm.vp('conveyorBeltButtonHeight', 1)],
	        localButtonAnchor: [-0.1, -0.28],
	        localConveyorBeltAnchor: [-1, 0]
	      });
	    }).remove('rightSittingBowlingBall');
	    var startMachine = true;
	    new dm.Delta('initial-bowling-ball', {if: true}).append('addArtefacts', function() {
	      if (startMachine) {
	        var body = newBowlingBall({position: [0, 6.3]}).body;
	        body.sleep();
	        $('h1').click((function() {
	          body.wakeUp();
	        }));
	      }
	    });
	    window.start = (function() {
	      var selected = [];
	      ['left-goal', 'left-facing-trampoline', 'right-goal', 'right-shooting-cannon', 'left-turning-conveyor-belt', 'left-shooting-cannon', 'right-turning-conveyor-belt', 'reposition-conveyor-belt-buttons', 'second-right-turning-conveyor-belt'].forEach((function(name) {
	        if ($('#' + name).prop('checked')) {
	          selected.push(name);
	        }
	      }));
	      $('#controls').remove();
	      dm.select.apply(dm, selected);
	      dm.vp('addArtefacts', function addArtefacts() {})();
	      $__0.frame(0, 4, 12, 2);
	    });
	  });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjVkZTBiOTk3MDVmN2QyY2ZhNmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3hGQSx1RUFBUywyREFBVSx5QkFBWSx3QkFBYyxJQUFHLFFBQUMsRUFBRyxRQUFNO0FBQ3pELGNBQVcsQ0FBQztBQUdSLFFBQUMsRUFBSSxJQUFJLFFBQU8sRUFBQyxDQUFDO0FBR2xCLFNBQUUsRUFBSSxJQUFJLEdBQUMsY0FBZSxDQUFDLFNBQVU7O0FBS3hDLFFBQUcsSUFBSSxPQUFPLEVBQUksS0FBRyxDQUFDO0FBR2xCLGFBQUksRUFBSSxJQUFJLEdBQUMsTUFBTyxDQUFDO0FBQ3hCLGlCQUFVLENBQUcsS0FBRztBQUNoQixhQUFNLENBQUcsRUFBQyxFQUFHLEVBQUMsRUFBQyxDQUFDO0FBQ2hCLGdCQUFTLENBQUcsSUFBSSxHQUFDLGNBQWUsRUFBQztBQUFBLEtBQ2xDLENBQUMsQ0FBQztBQUNGLFFBQUcs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QkFBTyxLQUFNLENBQUMsSUFBRyxDQUFDLENBQUM7U0FDcEI7QUFBQSxPQUNILEVBQUMsQ0FBQztBQUVGLE9BQUMsQ0FBQyxXQUFVLENBQUMsT0FBUSxFQUFDLENBQUM7QUFHdkIsUUFBQyxPQUFPLE1BQU8sQ0FBQyxFQUFDLENBQUcsU0FBTyxDQUFDLENBQUM7QUFNN0IsUUFBQyxHQUFJLENBQUMsY0FBYSxDQUFHLFNBQVMsYUFBVyxDQUFFLENBQUUsR0FBQyxDQUFFLEVBQUMsQ0FBQztBQVFuRCxnQkFBVSxDQUFDLEVBQUcsR0FBRyxHQUFDLENBQUcsR0FBQyxDQUFDO0tBQ3hCLEVBQUM7R0FJRixDQUFDLENBQUM7QUFFSCxFLDZDQUFBLEVBQUU7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSBmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhjaHVua0lkcywgbW9yZU1vZHVsZXMpIHtcbiBcdFx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG4gXHRcdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuIFx0XHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwLCBjYWxsYmFja3MgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKVxuIFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2guYXBwbHkoY2FsbGJhY2tzLCBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pO1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihjaHVua0lkcywgbW9yZU1vZHVsZXMpO1xuIFx0XHR3aGlsZShjYWxsYmFja3MubGVuZ3RoKVxuIFx0XHRcdGNhbGxiYWNrcy5zaGlmdCgpLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdH07XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyBcIjBcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbiBcdC8vIEFycmF5IG1lYW5zIFwibG9hZGluZ1wiLCBhcnJheSBjb250YWlucyBjYWxsYmFja3NcbiBcdHZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG4gXHRcdDA6MFxuIFx0fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCwgY2FsbGJhY2spIHtcbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMClcbiBcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBhbiBhcnJheSBtZWFucyBcImN1cnJlbnRseSBsb2FkaW5nXCIuXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkKSB7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdLnB1c2goY2FsbGJhY2spO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdC8vIHN0YXJ0IGNodW5rIGxvYWRpbmdcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbY2FsbGJhY2tdO1xuIFx0XHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiBcdFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gXHRcdFx0c2NyaXB0LnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JztcbiBcdFx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG4gXHRcdFx0c2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiBcdFx0XHRzY3JpcHQuc3JjID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGNodW5rSWQgKyBcIi5pbmRleC5qc1wiO1xuIFx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiNWRlMGI5OTcwNWY3ZDJjZmE2ZlxuICoqLyIsInJlcXVpcmUoWydqcXVlcnknLCAnZGVsdGEtanMnLCAnLi9pbmRleC5zY3NzJ10sICgkLCBEZWx0YUpzKT0+IHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIGRtID0gbmV3IERlbHRhSnMoKTtcblxuXG5cdHZhciBhcHAgPSBuZXcgcDIuV2ViR0xSZW5kZXJlcihmdW5jdGlvbiAoKSB7XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvKiBjbG9zZSB0aGUgZ3VpIGNvbnRyb2xzICovXG5cdFx0dGhpcy5ndWkuY2xvc2VkID0gdHJ1ZTtcblxuXHRcdC8qIGNyZWF0ZSB0aGUgd29ybGQgKi9cblx0XHR2YXIgd29ybGQgPSBuZXcgcDIuV29ybGQoe1xuXHRcdFx0ZG9Qcm9maWxpbmc6IHRydWUsXG5cdFx0XHRncmF2aXR5OiBbMCwgLTEwXSxcblx0XHRcdGJyb2FkcGhhc2U6IG5ldyBwMi5TQVBCcm9hZHBoYXNlKClcblx0XHR9KTtcblx0XHR0aGlzLnNldFdvcmxkKHdvcmxkKTtcblx0XHR3b3JsZC5pc2xhbmRTcGxpdCA9IHRydWU7XG5cdFx0d29ybGQuc2xlZXBNb2RlID0gcDIuV29ybGQuSVNMQU5EX1NMRUVQSU5HO1xuXHRcdHdvcmxkLnNvbHZlci5pdGVyYXRpb25zID0gMjA7XG5cdFx0d29ybGQuc29sdmVyLnRvbGVyYW5jZSA9IDAuMDAxO1xuXHRcdHdvcmxkLnNldEdsb2JhbFN0aWZmbmVzcygxZTQpO1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0LyogdGhlIGNvbnRhaW5lciBmb3IgYWxsIHNwcml0ZXMgKi9cblx0XHR2YXIgc3ByaXRlQ29udGFpbmVyID0gbmV3IFBJWEkuRGlzcGxheU9iamVjdENvbnRhaW5lcigpO1xuXHRcdHRoaXMuc3RhZ2UuYWRkQ2hpbGQoc3ByaXRlQ29udGFpbmVyKTtcblx0XHRmdW5jdGlvbiBhZGROZXdTcHJpdGUoc3ByaXRlKSB7XG5cdFx0XHRzcHJpdGVDb250YWluZXIuYWRkQ2hpbGQoc3ByaXRlKTtcblx0XHRcdHNwcml0ZUNvbnRhaW5lci5jaGlsZHJlbi5zb3J0KChhLCBiKSA9PiAoYS56SW5kZXggPCBiLnpJbmRleCA/IC0xIDogKGEuekluZGV4ID09PSBiLnpJbmRleCA/IDAgOiAxKSkpO1xuXHRcdH1cblxuXHRcdC8qIGF0dGFjaGluZyBhIG5ldyBzcHJpdGUgdG8gYSBib2R5ICovXG5cdFx0ZnVuY3Rpb24gbmV3U3ByaXRlKHtpbWFnZSwgYm9keSwgekluZGV4LCBzY2FsZSwgdHJhbnNsYXRlLCByb3RhdGV9KSB7XG5cdFx0XHR6SW5kZXggPSB6SW5kZXggfHwgMDtcblx0XHRcdHNjYWxlID0gc2NhbGUgfHwgWzEsIDFdO1xuXHRcdFx0dHJhbnNsYXRlID0gdHJhbnNsYXRlIHx8IFswLCAwXTtcblx0XHRcdHJvdGF0ZSA9IHJvdGF0ZSB8fCAwO1xuXG5cdFx0XHRib2R5LmludmlzaWJsZSA9IHRydWU7XG5cblx0XHRcdHZhciBzcHJpdGUgPSBQSVhJLlNwcml0ZS5mcm9tSW1hZ2UoaW1hZ2UpO1xuXG5cdFx0XHRzcHJpdGUudGV4dHVyZS5iYXNlVGV4dHVyZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWQnLCAoe2NvbnRlbnQ6IHRleHR1cmV9KSA9PiB7XG5cdFx0XHRcdHZhciBhYWJiID0gYm9keS5nZXRBQUJCKCk7XG5cdFx0XHRcdHZhciB3aWR0aCA9IGFhYmIudXBwZXJCb3VuZFswXSAtIGFhYmIubG93ZXJCb3VuZFswXTtcblx0XHRcdFx0dmFyIG1hbmRhdG9yeVNjYWxlID0gd2lkdGggLyB0ZXh0dXJlLndpZHRoO1xuXHRcdFx0XHR2YXIgaGVpZ2h0ID0gbWFuZGF0b3J5U2NhbGUgKiB0ZXh0dXJlLmhlaWdodDtcblxuXHRcdFx0XHRzcHJpdGUud2lkdGggPSB3aWR0aDtcblx0XHRcdFx0c3ByaXRlLmhlaWdodCA9IGhlaWdodDtcblxuXHRcdFx0XHRzcHJpdGUuc2NhbGUueCA9IG1hbmRhdG9yeVNjYWxlICogc2NhbGVbMF07XG5cdFx0XHRcdHNwcml0ZS5zY2FsZS55ID0gLW1hbmRhdG9yeVNjYWxlICogc2NhbGVbMV07XG5cdFx0XHRcdHNwcml0ZS5hbmNob3IueCA9IHdpZHRoIC8gMjtcblx0XHRcdFx0c3ByaXRlLmFuY2hvci55ID0gd2lkdGggLyAyO1xuXHRcdFx0XHRzcHJpdGUuekluZGV4ID0gekluZGV4O1xuXHRcdFx0XHRhZGROZXdTcHJpdGUoc3ByaXRlKTtcblxuXHRcdFx0XHR2YXIgb25Qb3N0U3RlcCA9ICgpID0+IHtcblx0XHRcdFx0XHRpZiAoYm9keS5tYXNzID09PSAwKSB7IHdvcmxkLm9mZigncG9zdFN0ZXAnLCBvblBvc3RTdGVwKSB9XG5cdFx0XHRcdFx0c3ByaXRlLnBvc2l0aW9uLnggPSBib2R5LnBvc2l0aW9uWzBdICsgd2lkdGggKiAod2lkdGggLSAxKSAvIDIgKyB0cmFuc2xhdGVbMF07XG5cdFx0XHRcdFx0c3ByaXRlLnBvc2l0aW9uLnkgPSBib2R5LnBvc2l0aW9uWzFdIC0gd2lkdGggKiAod2lkdGggLSAxKSAvIDIgKyB0cmFuc2xhdGVbMV07XG5cdFx0XHRcdFx0c3ByaXRlLnJvdGF0aW9uID0gYm9keS5hbmdsZSArIHJvdGF0ZTtcblx0XHRcdFx0fTtcblx0XHRcdFx0d29ybGQub24oJ3Bvc3RTdGVwJywgb25Qb3N0U3RlcCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHNwcml0ZTtcblx0XHR9XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0LyogYSBjaXJjbGUgd2l0aCBhbiBpbWFnZSAqL1xuXHRcdGZ1bmN0aW9uIG5ld0NpcmNsZSh7aW1hZ2UsIHJhZGl1cywgbWFzcywgcG9zaXRpb24sIHpJbmRleCwgcm90YXRpb24sIHNjYWxlU3ByaXRlLCB0cmFuc2xhdGVTcHJpdGUsIG1hdGVyaWFsLCBpbnZpc2libGV9KSB7XG5cdFx0XHRyYWRpdXMgPSByYWRpdXMgfHwgMTtcblxuXHRcdFx0LyogdGhlIHNoYXBlICovXG5cdFx0XHR2YXIgc2hhcGUgPSBuZXcgcDIuQ2lyY2xlKHJhZGl1cyk7XG5cblx0XHRcdC8qIG1hdGVyaWFsICovXG5cdFx0XHRzaGFwZS5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0XHQvKiB0aGUgcDIgYm9keSwgd2hpY2ggaXMgbm90IHJlbmRlcmVkIGlmIHRoZXJlIGlzIGFuIGltYWdlICovXG5cdFx0XHR2YXIgYm9keSA9IG5ldyBwMi5Cb2R5KHtcblx0XHRcdFx0bWFzczogbWFzcyB8fCAwLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24gfHwgWzAsIDBdLFxuXHRcdFx0XHRkYW1waW5nOiAwLFxuXHRcdFx0XHRhbmd1bGFyRGFtcGluZzogMCxcblx0XHRcdFx0YW5nbGU6IHJvdGF0aW9uLFxuXHRcdFx0XHRpbnZpc2libGU6IGludmlzaWJsZVxuXHRcdFx0fSk7XG5cdFx0XHRib2R5LmFkZFNoYXBlKHNoYXBlKTtcblx0XHRcdHdvcmxkLmFkZEJvZHkoYm9keSk7XG5cblx0XHRcdC8qIHRoZSBzcHJpdGUsIHdoaWNoIGlzIHJlbmRlcmVkIGlmIHRoZXJlIGlzIGFuIGltYWdlICovXG5cdFx0XHR2YXIgc3ByaXRlID0gaW1hZ2UgJiYgbmV3U3ByaXRlKHsgaW1hZ2UsIGJvZHksIHpJbmRleCwgc2NhbGU6IHNjYWxlU3ByaXRlLCB0cmFuc2xhdGU6IHRyYW5zbGF0ZVNwcml0ZSB9KTtcblxuXHRcdFx0cmV0dXJuIHsgYm9keSwgc3ByaXRlLCBzaGFwZSwgbWF0ZXJpYWwgfTtcblxuXHRcdH1cblxuXG5cdFx0LyogYSByZWN0YW5nbGUgd2l0aCBhbiBpbWFnZSAqL1xuXHRcdGZ1bmN0aW9uIG5ld1JlY3RhbmdsZSh7aW1hZ2UsIHdpZHRoLCBoZWlnaHQsIG1hc3MsIHBvc2l0aW9uLCB6SW5kZXgsIHJvdGF0aW9uLCBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlU3ByaXRlLCBtYXRlcmlhbCwgaW52aXNpYmxlfSkge1xuXHRcdFx0d2lkdGggPSB3aWR0aCB8fCAxO1xuXHRcdFx0aGVpZ2h0ID0gaGVpZ2h0IHx8IDE7XG5cblx0XHRcdC8qIHRoZSBzaGFwZSAqL1xuXHRcdFx0dmFyIHNoYXBlID0gbmV3IHAyLlJlY3RhbmdsZSh3aWR0aCwgaGVpZ2h0KTtcblxuXHRcdFx0LyogbWF0ZXJpYWwgKi9cblx0XHRcdHNoYXBlLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cblx0XHRcdC8qIHRoZSBwMiBib2R5LCB3aGljaCBpcyBub3QgcmVuZGVyZWQgaWYgdGhlcmUgaXMgYW4gaW1hZ2UgKi9cblx0XHRcdHZhciBib2R5ID0gbmV3IHAyLkJvZHkoe1xuXHRcdFx0XHRtYXNzOiBtYXNzIHx8IDAsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbiB8fCBbMCwgMF0sXG5cdFx0XHRcdGFuZ2xlOiByb3RhdGlvbixcblx0XHRcdFx0aW52aXNpYmxlOiBpbnZpc2libGVcblx0XHRcdH0pO1xuXHRcdFx0Ym9keS5hZGRTaGFwZShzaGFwZSk7XG5cdFx0XHR3b3JsZC5hZGRCb2R5KGJvZHkpO1xuXG5cdFx0XHQvKiB0aGUgc3ByaXRlLCB3aGljaCBpcyByZW5kZXJlZCBpZiB0aGVyZSBpcyBhbiBpbWFnZSAqL1xuXHRcdFx0dmFyIHNwcml0ZSA9IGltYWdlICYmIG5ld1Nwcml0ZSh7IGltYWdlLCBib2R5LCB6SW5kZXgsIHNjYWxlOiBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlOiB0cmFuc2xhdGVTcHJpdGUgfSk7XG5cblx0XHRcdHJldHVybiB7IGJvZHksIHNwcml0ZSwgc2hhcGUsIG1hdGVyaWFsIH07XG5cdFx0fVxuXG5cblx0XHQvKiBhIGNhcHN1bGUgd2l0aCBhbiBpbWFnZSAqL1xuXHRcdGZ1bmN0aW9uIG5ld0NhcHN1bGUoe2ltYWdlLCBsZW5ndGgsIHJhZGl1cywgbWFzcywgcG9zaXRpb24sIHpJbmRleCwgcm90YXRpb24sIHNjYWxlU3ByaXRlLCB0cmFuc2xhdGVTcHJpdGUsIG1hdGVyaWFsLCBpbnZpc2libGV9KSB7XG5cdFx0XHRsZW5ndGggPSBsZW5ndGggfHwgMTtcblx0XHRcdHJhZGl1cyA9IHJhZGl1cyB8fCAwLjE7XG5cblx0XHRcdC8qIHRoZSBzaGFwZSAqL1xuXHRcdFx0dmFyIHNoYXBlID0gbmV3IHAyLkNhcHN1bGUobGVuZ3RoLCByYWRpdXMpO1xuXG5cdFx0XHQvKiBtYXRlcmlhbCAqL1xuXHRcdFx0c2hhcGUubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdFx0LyogdGhlIHAyIGJvZHksIHdoaWNoIGlzIG5vdCByZW5kZXJlZCBpZiB0aGVyZSBpcyBhbiBpbWFnZSAqL1xuXHRcdFx0dmFyIGJvZHkgPSBuZXcgcDIuQm9keSh7XG5cdFx0XHRcdG1hc3M6IG1hc3MgfHwgMCxcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uIHx8IFswLCAwXSxcblx0XHRcdFx0YW5nbGU6IHJvdGF0aW9uLFxuXHRcdFx0XHRpbnZpc2libGU6IGludmlzaWJsZVxuXHRcdFx0fSk7XG5cdFx0XHRib2R5LmFkZFNoYXBlKHNoYXBlKTtcblx0XHRcdHdvcmxkLmFkZEJvZHkoYm9keSk7XG5cblx0XHRcdC8qIHRoZSBzcHJpdGUsIHdoaWNoIGlzIHJlbmRlcmVkIGlmIHRoZXJlIGlzIGFuIGltYWdlICovXG5cdFx0XHR2YXIgc3ByaXRlID0gaW1hZ2UgJiYgbmV3U3ByaXRlKHsgaW1hZ2UsIGJvZHksIHpJbmRleCwgc2NhbGU6IHNjYWxlU3ByaXRlLCB0cmFuc2xhdGU6IHRyYW5zbGF0ZVNwcml0ZSB9KTtcblxuXHRcdFx0cmV0dXJuIHsgYm9keSwgc3ByaXRlLCBzaGFwZSwgbWF0ZXJpYWwgfTtcblx0XHR9XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0LyogYSB0b3VjaC1hY3RpdmF0ZWQgYnV0dG9uICovXG5cdFx0ZnVuY3Rpb24gbmV3QnV0dG9uKHtwb3NpdGlvbiwgb25BY3RpdmF0aW9uLCBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlU3ByaXRlLCBpbnZpc2libGUsIHJhZGl1c30pIHtcblxuXHRcdFx0dmFyIHtib2R5LCBzcHJpdGUsIG1hdGVyaWFsLCBzaGFwZX0gPSBuZXdDaXJjbGUoe1xuXHRcdFx0XHRpbWFnZTogcmVxdWlyZSgnLi9pbWcvcmVkLWJ1dHRvbi5wbmcnKSxcblx0XHRcdFx0cmFkaXVzOiByYWRpdXMgfHwgMC4zLFxuXHRcdFx0XHRtYXNzOiAwLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24sXG5cdFx0XHRcdHNjYWxlU3ByaXRlOiBzY2FsZVNwcml0ZSxcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiB0cmFuc2xhdGVTcHJpdGUsXG5cdFx0XHRcdHpJbmRleDogLTEsXG5cdFx0XHRcdGludmlzaWJsZTogaW52aXNpYmxlXG5cdFx0XHR9KTtcblx0XHRcdHNoYXBlLnNlbnNvciA9IHRydWU7XG5cblx0XHRcdC8qIHByZWxvYWQgdGhlIGdyZWVuIGJ1dHRvbiB0ZXh0dXJlICovXG5cdFx0XHR2YXIgZ3JlZW5CdXR0b25UZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZShyZXF1aXJlKCcuL2ltZy9ncmVlbi1idXR0b24ucG5nJykpO1xuXG5cdFx0XHQvKiB0cmlnZ2VyIGNhbGxiYWNrIG9uIGJlZ2luIGNvbnRhY3QgKi9cblx0XHRcdHZhciBlbmFibGVkID0gdHJ1ZTtcblx0XHRcdHdvcmxkLm9uKFwiYmVnaW5Db250YWN0XCIsIChldmVudCkgPT4ge1xuXHRcdFx0XHRpZiAoKGV2ZW50LmJvZHlBID09PSBib2R5IHx8IGV2ZW50LmJvZHlCID09PSBib2R5KSkge1xuXHRcdFx0XHRcdGlmIChlbmFibGVkKSB7XG5cdFx0XHRcdFx0XHRzcHJpdGUuc2V0VGV4dHVyZShncmVlbkJ1dHRvblRleHR1cmUpO1xuXHRcdFx0XHRcdFx0b25BY3RpdmF0aW9uKGV2ZW50LmJvZHlBID09PSBib2R5ID8gZXZlbnQuYm9keUIgOiBldmVudC5ib2R5QSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGZ1bmN0aW9uIGVuYWJsZSgpIHsgZW5hYmxlZCA9IHRydWUgfVxuXHRcdFx0ZnVuY3Rpb24gZGlzYWJsZSgpIHsgZW5hYmxlZCA9IGZhbHNlIH1cblxuXHRcdFx0ZW5hYmxlKCk7XG5cblxuXHRcdFx0cmV0dXJuIHsgYm9keSwgc3ByaXRlLCBtYXRlcmlhbCwgc2hhcGUsIGVuYWJsZSwgZGlzYWJsZSB9O1xuXG5cdFx0fVxuXG5cblx0XHQvKiBhIHR1cm4tb24tYWJsZSBsaWdodCBidWxiICovXG5cdFx0dmFyIGxpZ2h0QnVsYk1hdGVyaWFsID0gbmV3IHAyLk1hdGVyaWFsKCk7XG5cdFx0ZnVuY3Rpb24gbmV3TGlnaHRCdWxiKHtwb3NpdGlvbiwgd2lkdGgsIHNjYWxlU3ByaXRlLCB0cmFuc2xhdGVTcHJpdGV9KSB7XG5cdFx0XHR3aWR0aCA9IHdpZHRoIHx8IDE7XG5cblx0XHRcdHZhciB7Ym9keSwgc3ByaXRlLCBtYXRlcmlhbCwgc2hhcGV9ID0gbmV3UmVjdGFuZ2xlKHtcblx0XHRcdFx0aW1hZ2U6IHJlcXVpcmUoJy4vaW1nL2xpZ2h0YnVsYi1vZmYucG5nJyksXG5cdFx0XHRcdHdpZHRoOiB3aWR0aCxcblx0XHRcdFx0aGVpZ2h0OiB3aWR0aCAqICg0NTAgLyAyODApLFxuXHRcdFx0XHRzY2FsZVNwcml0ZTogc2NhbGVTcHJpdGUsXG5cdFx0XHRcdHRyYW5zbGF0ZVNwcml0ZTogdHJhbnNsYXRlU3ByaXRlLFxuXHRcdFx0XHRtYXNzOiAwLjEsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0XHRcdFx0bWF0ZXJpYWw6IGxpZ2h0QnVsYk1hdGVyaWFsXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogbGlnaHRidWxiIGFjdGlvbiEgKi9cblx0XHRcdHZhciBsaWdodEJ1bGJPblRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUltYWdlKHJlcXVpcmUoJy4vaW1nL2xpZ2h0YnVsYi1vbi5wbmcnKSk7XG5cdFx0XHR2YXIgdHVybk9uID0gKCkgPT4geyBzcHJpdGUuc2V0VGV4dHVyZShsaWdodEJ1bGJPblRleHR1cmUpIH07XG5cblx0XHRcdHJldHVybiB7IHNwcml0ZSwgYm9keSwgbWF0ZXJpYWwsIHNoYXBlLCB0dXJuT24gfTtcblx0XHR9XG5cblxuXHRcdC8qIGJvd2xpbmcgYmFsbCBtYXRlcmlhbCovXG5cdFx0dmFyIGJvd2xpbmdCYWxsTWF0ZXJpYWwgPSBuZXcgcDIuTWF0ZXJpYWwoKTtcblxuXHRcdC8qIGEgYm93bGluZyBiYWxsICovXG5cdFx0ZnVuY3Rpb24gbmV3Qm93bGluZ0JhbGwoe3Bvc2l0aW9uLCBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlU3ByaXRlfSkge1xuXG5cdFx0XHR2YXIgQk9XTElOR19CQUxMX1JBRElVUyA9IDAuNTtcblxuXHRcdFx0dmFyIGJvd2xpbmdCYWxsID0gbmV3Q2lyY2xlKHtcblx0XHRcdFx0aW1hZ2U6IHJlcXVpcmUoXCIuL2ltZy9ib3dsaW5nLWJhbGwucG5nXCIpLFxuXHRcdFx0XHRtYXNzOiAxLFxuXHRcdFx0XHRyYWRpdXM6IEJPV0xJTkdfQkFMTF9SQURJVVMsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0XHRcdFx0c2NhbGVTcHJpdGU6IHNjYWxlU3ByaXRlLFxuXHRcdFx0XHR0cmFuc2xhdGVTcHJpdGU6IHRyYW5zbGF0ZVNwcml0ZSxcblx0XHRcdFx0bWF0ZXJpYWw6IGJvd2xpbmdCYWxsTWF0ZXJpYWxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBib3dsaW5nIGJhbGwgYWN0aW9uISAqL1xuXHRcdFx0Ym93bGluZ0JhbGwuYm9keS5hbGxvd1NsZWVwID0gZmFsc2U7XG5cblx0XHRcdHJldHVybiBib3dsaW5nQmFsbDtcblxuXHRcdH1cblxuXG5cdFx0LyogdHJhbXBvbGluZSBtYXRlcmlhbCAqL1xuXHRcdHZhciB0cmFtcG9saW5lTWF0ZXJpYWwgPSBuZXcgcDIuTWF0ZXJpYWwoKTtcblx0XHR3b3JsZC5hZGRDb250YWN0TWF0ZXJpYWwobmV3IHAyLkNvbnRhY3RNYXRlcmlhbChib3dsaW5nQmFsbE1hdGVyaWFsLCB0cmFtcG9saW5lTWF0ZXJpYWwsIHtcblx0XHRcdHJlc3RpdHV0aW9uOiAxLFxuXHRcdFx0c3RpZmZuZXNzOiBOdW1iZXIuTUFYX1ZBTFVFIC8vIFdlIG5lZWQgaW5maW5pdGUgc3RpZmZuZXNzIHRvIGdldCBleGFjdCByZXN0aXR1dGlvblxuXHRcdH0pKTtcblxuXHRcdC8qIGEgdHJhbXBvbGluZSAqL1xuXHRcdGZ1bmN0aW9uIG5ld1RyYW1wb2xpbmUoe3Bvc2l0aW9uLCB3aWR0aCwgcm90YXRpb24sIHRyYW5zbGF0ZVNwcml0ZX0pIHtcblx0XHRcdHdpZHRoID0gd2lkdGggfHwgMTtcblx0XHRcdHRyYW5zbGF0ZVNwcml0ZSA9IHRyYW5zbGF0ZVNwcml0ZSB8fCBbMCwgMF07XG5cblx0XHRcdC8qIHRoZSB0cmFtcG9saW5lICovXG5cdFx0XHR2YXIgdHJhbXBvbGluZSA9IG5ld1JlY3RhbmdsZSh7XG5cdFx0XHRcdGltYWdlOiByZXF1aXJlKCcuL2ltZy90cmFtcG9saW5lLnBuZycpLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24gfHwgWzAsIDBdLFxuXHRcdFx0XHRyb3RhdGlvbjogcm90YXRpb24gfHwgMCxcblx0XHRcdFx0d2lkdGg6IHdpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHdpZHRoICogKDM5NyAvIDkzMCksXG5cdFx0XHRcdHRyYW5zbGF0ZVNwcml0ZTogWzAgKyB0cmFuc2xhdGVTcHJpdGVbMF0sIDAuODMgKyB0cmFuc2xhdGVTcHJpdGVbMV1dLFxuXHRcdFx0XHR6SW5kZXg6IC0xLFxuXHRcdFx0XHRtYXRlcmlhbDogdHJhbXBvbGluZU1hdGVyaWFsXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogdHJhbXBvbGluZSBhY3Rpb24hICovXG5cdFx0XHR0cmFtcG9saW5lLmJvZHkuYWxsb3dTbGVlcCA9IGZhbHNlO1xuXG5cdFx0XHRyZXR1cm4gdHJhbXBvbGluZTtcblx0XHR9XG5cblxuXHRcdC8qIGEgdHVybi1vbi1hYmxlIGNvbnZleW9yIGJlbHQgKi9cblx0XHRmdW5jdGlvbiBuZXdDb252ZXlvckJlbHQoe3Bvc2l0aW9uLCBsZW5ndGgsIHJhZGl1cywgdHJhbnNsYXRlU3ByaXRlLCBzdXJmYWNlVmVsb2NpdHl9KSB7XG5cdFx0XHRsZW5ndGggPSBsZW5ndGggfHwgMjtcblx0XHRcdHRyYW5zbGF0ZVNwcml0ZSA9IHRyYW5zbGF0ZVNwcml0ZSB8fCBbMCwgMF07XG5cblx0XHRcdC8qIHRoZSBjb252ZXlvciBiZWx0ICovXG5cdFx0XHR2YXIgY29udmV5b3JCZWx0ID0gbmV3Q2Fwc3VsZSh7XG5cdFx0XHRcdGltYWdlOiByZXF1aXJlKCcuL2ltZy9jb252ZXlvci1iZWx0LnBuZycpLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24gfHwgWzAsIDBdLFxuXHRcdFx0XHRsZW5ndGg6IGxlbmd0aCxcblx0XHRcdFx0cmFkaXVzOiByYWRpdXMgfHwgMC4xNSxcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiB0cmFuc2xhdGVTcHJpdGUsXG5cdFx0XHRcdHpJbmRleDogLTEsXG5cdFx0XHRcdG1hdGVyaWFsOiBuZXcgcDIuTWF0ZXJpYWwoKSAvLyBvbmUgbWF0ZXJpYWwgZm9yIGVhY2ggYmVsdCwgZm9yIGN1c3RvbWl6YWJsZSBzdXJmYWNlIHZlbG9jaXR5XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY29udmV5b3IgYmVsdCBhY3Rpb24hICovXG5cdFx0XHRjb252ZXlvckJlbHQuYm9keS5hbGxvd1NsZWVwID0gZmFsc2U7XG5cdFx0XHRjb252ZXlvckJlbHQudHVybk9uID0gKCkgPT4ge1xuXHRcdFx0XHR2YXIgY29udGFjdE1hdGVyaWFsID0gbmV3IHAyLkNvbnRhY3RNYXRlcmlhbChib3dsaW5nQmFsbE1hdGVyaWFsLCBjb252ZXlvckJlbHQuc2hhcGUubWF0ZXJpYWwsIHtcblx0XHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IHN1cmZhY2VWZWxvY2l0eSB8fCAxLFxuXHRcdFx0XHRcdGZyaWN0aW9uOiAyLjBcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHdvcmxkLmFkZENvbnRhY3RNYXRlcmlhbChjb250YWN0TWF0ZXJpYWwpO1xuXHRcdFx0fTtcblxuXHRcdFx0cmV0dXJuIGNvbnZleW9yQmVsdDtcblx0XHR9XG5cblxuXHRcdC8qIGEgY2Fubm9uICovXG5cdFx0ZnVuY3Rpb24gbmV3Q2Fubm9uKHtwb3NpdGlvbiwgbGVmdFRvUmlnaHQsIGZvcmNlfSkge1xuXHRcdFx0aWYgKHR5cGVvZiBsZWZ0VG9SaWdodCA9PT0gJ3VuZGVmaW5lZCcpIHsgbGVmdFRvUmlnaHQgPSB0cnVlIH1cblx0XHRcdGZvcmNlID0gZm9yY2UgfHwgNjAwO1xuXG5cdFx0XHR2YXIgZGlyZWN0aW9uID0gKGxlZnRUb1JpZ2h0ID8gMSA6IC0xKTtcblxuXHRcdFx0LyogdGhlIGNhbm5vbiBzaGFwZXMgKi9cblx0XHRcdHZhciBib3R0b20gPSBuZXcgcDIuUmVjdGFuZ2xlKDEsIDAuMik7XG5cdFx0XHR2YXIgbGVmdCA9IG5ldyBwMi5SZWN0YW5nbGUoMC4yLCAxLjIpO1xuXHRcdFx0dmFyIHJpZ2h0ID0gbmV3IHAyLlJlY3RhbmdsZSgwLjIsIDEuMik7XG5cblx0XHRcdC8qIHRoZSBjYW5ub24gYm9keSAqL1xuXHRcdFx0dmFyIGJvZHkgPSBuZXcgcDIuQm9keSh7XG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbiB8fCBbMCwgMF0sXG5cdFx0XHRcdGFuZ2xlOiAtZGlyZWN0aW9uICogTWF0aC5QSSAvIDQvLyxcblx0XHRcdFx0Ly9pbnZpc2libGU6IHRydWVcblx0XHRcdH0pO1xuXHRcdFx0Ym9keS5hZGRTaGFwZShib3R0b20sIFswLCAtMC42XSk7XG5cdFx0XHRib2R5LmFkZFNoYXBlKGxlZnQsICAgWy0wLjYsIC0wLjFdKTtcblx0XHRcdGJvZHkuYWRkU2hhcGUocmlnaHQsICBbMC42LCAtMC4xXSk7XG5cdFx0XHR3b3JsZC5hZGRCb2R5KGJvZHkpO1xuXG5cdFx0XHQvKiB0aGUgc3ByaXRlICovXG5cdFx0XHR2YXIgc3ByaXRlID0gbmV3U3ByaXRlKHtcblx0XHRcdFx0Ym9keSxcblx0XHRcdFx0aW1hZ2U6IHJlcXVpcmUoJy4vaW1nL2Nhbm5vbi5wbmcnKSxcblx0XHRcdFx0ekluZGV4OiAxMCxcblx0XHRcdFx0c2NhbGU6IFtkaXJlY3Rpb24gKiAxLjUsIDEuNV0sXG5cdFx0XHRcdHRyYW5zbGF0ZTogW2xlZnRUb1JpZ2h0ID8gLTAuMDcgOiAtMS40NywgLTAuNzRdLFxuXHRcdFx0XHRyb3RhdGU6IGRpcmVjdGlvbiAqIE1hdGguUEkgLyA0XG5cdFx0XHR9KTtcblxuXHRcdFx0LyogY2Fubm9uIGFjdGlvbiEgKi9cblx0XHRcdGJvZHkuYWxsb3dTbGVlcCA9IGZhbHNlO1xuXHRcdFx0dmFyIHtlbmFibGUsIGRpc2FibGV9ID0gbmV3QnV0dG9uKHtcblx0XHRcdFx0cG9zaXRpb246IFtwb3NpdGlvblswXSAtIGRpcmVjdGlvbiAqIDAuNCwgcG9zaXRpb25bMV0gLSAwLjRdLFxuXHRcdFx0XHRvbkFjdGl2YXRpb24oY2Fubm9uQmFsbCkge1xuXHRcdFx0XHRcdGRpc2FibGUoKTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdGNhbm5vbkJhbGwudHlwZSA9IHAyLkJvZHkuU1RBVElDO1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGNhbm5vbkJhbGwud2FrZVVwKCk7XG5cdFx0XHRcdFx0XHRcdGNhbm5vbkJhbGwudHlwZSA9IHAyLkJvZHkuRFlOQU1JQztcblx0XHRcdFx0XHRcdFx0Y2Fubm9uQmFsbC5mb3JjZSA9IFtkaXJlY3Rpb24gKiBmb3JjZSwgZm9yY2VdO1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRlbmFibGUoKTtcblx0XHRcdFx0XHRcdFx0fSwgMTAwKTtcblx0XHRcdFx0XHRcdH0sIDEwMDApO1xuXHRcdFx0XHRcdH0sIDEwMCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4ge2JvZHksIHNwcml0ZX07XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8qIGJ1dHRvbiArIGNvbnZleW9yIGJlbHQgKi9cblx0XHRmdW5jdGlvbiBuZXdDb252ZXlvckJlbHRTeXN0ZW0oe2NvbnZleW9yQmVsdFBvc2l0aW9uLCByYWRpdXMsIGxlbmd0aCwgc3VyZmFjZVZlbG9jaXR5LCB0cmFuc2xhdGVDb252ZXlvckJlbHRTcHJpdGUsIGJ1dHRvblBvc2l0aW9uLCBsb2NhbEJ1dHRvbkFuY2hvciwgbG9jYWxDb252ZXlvckJlbHRBbmNob3J9KSB7XG5cdFx0XHR2YXIge2JvZHk6IGNvbnZleW9yQmVsdCwgdHVybk9ufSA9IG5ld0NvbnZleW9yQmVsdCh7XG5cdFx0XHRcdHBvc2l0aW9uOiBjb252ZXlvckJlbHRQb3NpdGlvbixcblx0XHRcdFx0cmFkaXVzOiByYWRpdXMsXG5cdFx0XHRcdGxlbmd0aDogbGVuZ3RoLFxuXHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IHN1cmZhY2VWZWxvY2l0eSxcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiB0cmFuc2xhdGVDb252ZXlvckJlbHRTcHJpdGUsXG5cdFx0XHRcdHpJbmRleDogOTk5XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHtib2R5OiBidXR0b259ID0gbmV3QnV0dG9uKHtcblx0XHRcdFx0cG9zaXRpb246IGJ1dHRvblBvc2l0aW9uLFxuXHRcdFx0XHRvbkFjdGl2YXRpb24oKSB7IHR1cm5PbigpIH0sXG5cdFx0XHRcdHpJbmRleDogOTk5XG5cdFx0XHR9KTtcblxuXHRcdFx0d29ybGQuYWRkU3ByaW5nKG5ldyBwMi5MaW5lYXJTcHJpbmcoYnV0dG9uLCBjb252ZXlvckJlbHQsIHtcblx0XHRcdFx0c3RpZmZuZXNzOiAxMCxcblx0XHRcdFx0cmVzdExlbmd0aDogMC4zLFxuXHRcdFx0XHRsb2NhbEFuY2hvckE6IGxvY2FsQnV0dG9uQW5jaG9yLFxuXHRcdFx0XHRsb2NhbEFuY2hvckI6IGxvY2FsQ29udmV5b3JCZWx0QW5jaG9yXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cblx0XHQvKiBnb2FsOiBidXR0b24gKyBsaWdodGJ1bGIgKi9cblx0XHRmdW5jdGlvbiBuZXdHb2FsKHtwb3NpdGlvbn0pIHtcblx0XHRcdHZhciB7Ym9keTogbGlnaHRCdWxiLCB0dXJuT259ID0gbmV3TGlnaHRCdWxiKHtcblx0XHRcdFx0cG9zaXRpb246IFtwb3NpdGlvblswXSwgcG9zaXRpb25bMV0gLSAyXSxcblx0XHRcdFx0d2lkdGg6IDEsXG5cdFx0XHRcdHNjYWxlU3ByaXRlOiBbMSwgLTFdXG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHtib2R5OiBidXR0b259ID0gbmV3QnV0dG9uKHtcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uLFxuXHRcdFx0XHRyYWRpdXM6IDAuMyxcblx0XHRcdFx0b25BY3RpdmF0aW9uKCkgeyB0dXJuT24oKSB9XG5cdFx0XHR9KTtcblxuXHRcdFx0d29ybGQuYWRkU3ByaW5nKG5ldyBwMi5MaW5lYXJTcHJpbmcoYnV0dG9uLCBsaWdodEJ1bGIsIHtcblx0XHRcdFx0cmVzdExlbmd0aDogMC4yLFxuXHRcdFx0XHRzdGlmZm5lc3M6IDcsXG5cdFx0XHRcdGxvY2FsQW5jaG9yQTogWzAsIC0wLjNdLFxuXHRcdFx0XHRsb2NhbEFuY2hvckI6IFswLCAoNDUwIC8gMjgwKSAvIDJdXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ2xlZnQtZ29hbCcsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0dvYWwoeyBwb3NpdGlvbjogWy00LCA1XSB9KTtcblx0XHR9KTtcblxuXHRcdG5ldyBkbS5EZWx0YSgncmlnaHQtZ29hbCcsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0dvYWwoeyBwb3NpdGlvbjogWzQsIDVdIH0pO1xuXHRcdH0pO1xuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ2xlZnQtZmFjaW5nLXRyYW1wb2xpbmUnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdUcmFtcG9saW5lKHtcblx0XHRcdFx0cG9zaXRpb246IFswLCAwLjhdLFxuXHRcdFx0XHR3aWR0aDogMixcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiBbMC4xLCAwLjM1XSxcblx0XHRcdFx0cm90YXRpb246IDAuMjVcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cblxuXHRcdG5ldyBkbS5EZWx0YSgnbGVmdC10dXJuaW5nLWNvbnZleW9yLWJlbHQnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdDb252ZXlvckJlbHRTeXN0ZW0oe1xuXHRcdFx0XHRjb252ZXlvckJlbHRQb3NpdGlvbjogWy0zLCAwXSxcblx0XHRcdFx0bGVuZ3RoOiAyLFxuXHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IDIsXG5cdFx0XHRcdHRyYW5zbGF0ZUNvbnZleW9yQmVsdFNwcml0ZTogWzAsIDEuM10sXG5cdFx0XHRcdGJ1dHRvblBvc2l0aW9uOiBbLTAuNCwgZG0udnAoJ2NvbnZleW9yQmVsdEJ1dHRvbkhlaWdodCcsIDEpXSxcblx0XHRcdFx0bG9jYWxCdXR0b25BbmNob3I6IFstMC4yLCAtMC4yXSxcblx0XHRcdFx0bG9jYWxDb252ZXlvckJlbHRBbmNob3I6IFsxLCAwXVxuXHRcdFx0fSk7XG5cdFx0XHRuZXdCb3dsaW5nQmFsbCh7IHBvc2l0aW9uOiBbLTIuNSwgMC42XSB9KTtcblx0XHR9KTtcblx0XHRuZXcgZG0uRGVsdGEoJ3JpZ2h0LXNob290aW5nLWNhbm5vbicsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0Nhbm5vbih7XG5cdFx0XHRcdGxlZnRUb1JpZ2h0OiB0cnVlLFxuXHRcdFx0XHRwb3NpdGlvbjogWy01LCAwXVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblxuXHRcdG5ldyBkbS5EZWx0YSgncmlnaHQtdHVybmluZy1jb252ZXlvci1iZWx0Jywge30pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bmV3Q29udmV5b3JCZWx0U3lzdGVtKHtcblx0XHRcdFx0Y29udmV5b3JCZWx0UG9zaXRpb246IFszLCAwXSxcblx0XHRcdFx0bGVuZ3RoOiAyLFxuXHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IC0yLFxuXHRcdFx0XHR0cmFuc2xhdGVDb252ZXlvckJlbHRTcHJpdGU6IFswLCAxLjNdLFxuXHRcdFx0XHRidXR0b25Qb3NpdGlvbjogWzAuNCwgZG0udnAoJ2NvbnZleW9yQmVsdEJ1dHRvbkhlaWdodCcsIDEpXSxcblx0XHRcdFx0bG9jYWxCdXR0b25BbmNob3I6IFswLjIsIC0wLjJdLFxuXHRcdFx0XHRsb2NhbENvbnZleW9yQmVsdEFuY2hvcjogWy0xLCAwXVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZG0udnAoJ3JpZ2h0U2l0dGluZ0Jvd2xpbmdCYWxsJywgdHJ1ZSkpIHtcblx0XHRcdFx0bmV3Qm93bGluZ0JhbGwoeyBwb3NpdGlvbjogWzIuNSwgMC42XSB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRuZXcgZG0uRGVsdGEoJ2xlZnQtc2hvb3RpbmctY2Fubm9uJywge30pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bmV3Q2Fubm9uKHtcblx0XHRcdFx0bGVmdFRvUmlnaHQ6IGZhbHNlLFxuXHRcdFx0XHRwb3NpdGlvbjogWzUsIDBdXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ2NvbmZsaWN0LWluZGljYXRvcicsIHsgcmVzb2x2ZXM6IFsnbGVmdC1mYWNpbmctdHJhbXBvbGluZScsICdsZWZ0LXR1cm5pbmctY29udmV5b3ItYmVsdCddIH0pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFjb25mbGljdFJlc29sdmVkKSB7XG5cdFx0XHRcdHN0YXJ0TWFjaGluZSA9IGZhbHNlO1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdHZhciB7c2hhcGV9ID0gbmV3UmVjdGFuZ2xlKHtcblx0XHRcdFx0XHRcdFx0aW1hZ2U6IHJlcXVpcmUoJy4vaW1nL2Vycm9yLnBuZycpLFxuXHRcdFx0XHRcdFx0XHRwb3NpdGlvbjogWzAsIDFdLFxuXHRcdFx0XHRcdFx0XHR3aWR0aDogMi41LFxuXHRcdFx0XHRcdFx0XHRoZWlnaHQ6IDIuNSxcblx0XHRcdFx0XHRcdFx0bWFzczogMFxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRzaGFwZS5zZW5zb3IgPSB0cnVlO1xuXHRcdFx0XHR9LCAzMDAwKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0dmFyIGNvbmZsaWN0UmVzb2x2ZWQgPSBmYWxzZTtcblx0XHRuZXcgZG0uRGVsdGEoJ3JlcG9zaXRpb24tY29udmV5b3ItYmVsdC1idXR0b25zJywge30pLnByZXBlbmQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGNvbmZsaWN0UmVzb2x2ZWQgPSB0cnVlO1xuXHRcdH0pLnJlcGxhY2UoJ2NvbnZleW9yQmVsdEJ1dHRvbkhlaWdodCcsIDIpO1xuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ3NlY29uZC1yaWdodC10dXJuaW5nLWNvbnZleW9yLWJlbHQnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdDb252ZXlvckJlbHRTeXN0ZW0oe1xuXHRcdFx0XHRjb252ZXlvckJlbHRQb3NpdGlvbjogWzEsIDBdLFxuXHRcdFx0XHRsZW5ndGg6IDIsXG5cdFx0XHRcdHN1cmZhY2VWZWxvY2l0eTogLTIsXG5cdFx0XHRcdHRyYW5zbGF0ZUNvbnZleW9yQmVsdFNwcml0ZTogWzAsIDEuM10sXG5cdFx0XHRcdGJ1dHRvblBvc2l0aW9uOiBbMC40LCBkbS52cCgnY29udmV5b3JCZWx0QnV0dG9uSGVpZ2h0JywgMSldLFxuXHRcdFx0XHRsb2NhbEJ1dHRvbkFuY2hvcjogWy0wLjEsIC0wLjI4XSxcblx0XHRcdFx0bG9jYWxDb252ZXlvckJlbHRBbmNob3I6IFstMSwgMF1cblx0XHRcdH0pO1xuXHRcdH0pLnJlbW92ZSgncmlnaHRTaXR0aW5nQm93bGluZ0JhbGwnKTtcblxuXG5cdFx0Lyogc3RhcnQgbWFjaGluZSAqL1xuXHRcdHZhciBzdGFydE1hY2hpbmUgPSB0cnVlO1xuXHRcdG5ldyBkbS5EZWx0YSgnaW5pdGlhbC1ib3dsaW5nLWJhbGwnLCB7IGlmOiB0cnVlIH0pLmFwcGVuZCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHN0YXJ0TWFjaGluZSkge1xuXHRcdFx0XHR2YXIge2JvZHl9ID0gbmV3Qm93bGluZ0JhbGwoeyBwb3NpdGlvbjogWzAsIDYuM10gfSk7XG5cdFx0XHRcdGJvZHkuc2xlZXAoKTtcblx0XHRcdFx0JCgnaDEnKS5jbGljaygoKSA9PiB7XG5cdFx0XHRcdFx0Ym9keS53YWtlVXAoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0d2luZG93LnN0YXJ0ID0gKCkgPT4ge1xuXG5cdFx0XHR2YXIgc2VsZWN0ZWQgPSBbXTtcblxuXHRcdFx0W1xuXHRcdFx0XHQnbGVmdC1nb2FsJyxcblx0XHRcdFx0J2xlZnQtZmFjaW5nLXRyYW1wb2xpbmUnLFxuXHRcdFx0XHQncmlnaHQtZ29hbCcsXG5cdFx0XHRcdCdyaWdodC1zaG9vdGluZy1jYW5ub24nLFxuXHRcdFx0XHQnbGVmdC10dXJuaW5nLWNvbnZleW9yLWJlbHQnLFxuXHRcdFx0XHQnbGVmdC1zaG9vdGluZy1jYW5ub24nLFxuXHRcdFx0XHQncmlnaHQtdHVybmluZy1jb252ZXlvci1iZWx0Jyxcblx0XHRcdFx0J3JlcG9zaXRpb24tY29udmV5b3ItYmVsdC1idXR0b25zJyxcblx0XHRcdFx0J3NlY29uZC1yaWdodC10dXJuaW5nLWNvbnZleW9yLWJlbHQnXS5mb3JFYWNoKChuYW1lKSA9PiB7XG5cdFx0XHRcdFx0XHRpZiAoJCgnIycgKyBuYW1lKS5wcm9wKCdjaGVja2VkJykpIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWQucHVzaChuYW1lKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHQkKCcjY29udHJvbHMnKS5yZW1vdmUoKTtcblxuXG5cdFx0XHRkbS5zZWxlY3QuYXBwbHkoZG0sIHNlbGVjdGVkKTtcblxuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdFx0ZG0udnAoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uIGFkZEFydGVmYWN0cygpIHt9KSgpO1xuXG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0XHR0aGlzLmZyYW1lKDAsIDQsIDEyLCAyKTtcblx0XHR9O1xuXG5cblxuXHR9KTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC9pbmRleC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImluZGV4LmpzIn0=