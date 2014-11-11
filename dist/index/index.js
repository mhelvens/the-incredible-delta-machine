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
	    function newSprite($__0) {
	      var $__1 = $__0,
	          image = $__1.image,
	          body = $__1.body,
	          zIndex = $__1.zIndex,
	          scale = $__1.scale,
	          translate = $__1.translate,
	          rotate = $__1.rotate;
	      zIndex = zIndex || 0;
	      scale = scale || [1, 1];
	      translate = translate || [0, 0];
	      rotate = rotate || 0;
	      body.invisible = true;
	      var sprite = PIXI.Sprite.fromImage(image);
	      sprite.texture.baseTexture.addEventListener('loaded', (function($__2) {
	        var texture = $__2.content;
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
	    function newCircle($__0) {
	      var $__1 = $__0,
	          image = $__1.image,
	          radius = $__1.radius,
	          mass = $__1.mass,
	          position = $__1.position,
	          zIndex = $__1.zIndex,
	          rotation = $__1.rotation,
	          scaleSprite = $__1.scaleSprite,
	          translateSprite = $__1.translateSprite,
	          material = $__1.material,
	          invisible = $__1.invisible;
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
	    function newRectangle($__0) {
	      var $__1 = $__0,
	          image = $__1.image,
	          width = $__1.width,
	          height = $__1.height,
	          mass = $__1.mass,
	          position = $__1.position,
	          zIndex = $__1.zIndex,
	          rotation = $__1.rotation,
	          scaleSprite = $__1.scaleSprite,
	          translateSprite = $__1.translateSprite,
	          material = $__1.material,
	          invisible = $__1.invisible;
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
	    function newCapsule($__0) {
	      var $__1 = $__0,
	          image = $__1.image,
	          length = $__1.length,
	          radius = $__1.radius,
	          mass = $__1.mass,
	          position = $__1.position,
	          zIndex = $__1.zIndex,
	          rotation = $__1.rotation,
	          scaleSprite = $__1.scaleSprite,
	          translateSprite = $__1.translateSprite,
	          material = $__1.material,
	          invisible = $__1.invisible;
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
	    function newButton($__0) {
	      var $__1 = $__0,
	          position = $__1.position,
	          onActivation = $__1.onActivation,
	          scaleSprite = $__1.scaleSprite,
	          translateSprite = $__1.translateSprite,
	          invisible = $__1.invisible,
	          radius = $__1.radius;
	      var $__2 = newCircle({
	        image: __webpack_require__(5),
	        radius: radius || 0.3,
	        mass: 0,
	        position: position,
	        scaleSprite: scaleSprite,
	        translateSprite: translateSprite,
	        zIndex: -1,
	        invisible: invisible
	      }),
	          body = $__2.body,
	          sprite = $__2.sprite,
	          material = $__2.material,
	          shape = $__2.shape;
	      shape.sensor = true;
	      var greenButtonTexture = PIXI.Texture.fromImage(__webpack_require__(6));
	      world.on("beginContact", (function(event) {
	        if ((event.bodyA === body || event.bodyB === body)) {
	          sprite.setTexture(greenButtonTexture);
	          onActivation(event.bodyA === body ? event.bodyB : event.bodyA);
	        }
	      }));
	      return {
	        body: body,
	        sprite: sprite,
	        material: material,
	        shape: shape
	      };
	    }
	    var lightBulbMaterial = new p2.Material();
	    function newLightBulb($__0) {
	      var $__1 = $__0,
	          position = $__1.position,
	          width = $__1.width,
	          scaleSprite = $__1.scaleSprite,
	          translateSprite = $__1.translateSprite;
	      width = width || 1;
	      var $__2 = newRectangle({
	        image: __webpack_require__(7),
	        width: width,
	        height: width * (450 / 280),
	        scaleSprite: scaleSprite,
	        translateSprite: translateSprite,
	        mass: 0.1,
	        position: position,
	        material: lightBulbMaterial
	      }),
	          body = $__2.body,
	          sprite = $__2.sprite,
	          material = $__2.material,
	          shape = $__2.shape;
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
	    function newBowlingBall($__0) {
	      var $__1 = $__0,
	          position = $__1.position,
	          scaleSprite = $__1.scaleSprite,
	          translateSprite = $__1.translateSprite;
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
	    function newTrampoline($__0) {
	      var $__1 = $__0,
	          position = $__1.position,
	          width = $__1.width,
	          rotation = $__1.rotation,
	          translateSprite = $__1.translateSprite;
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
	    function newConveyorBelt($__0) {
	      var $__1 = $__0,
	          position = $__1.position,
	          length = $__1.length,
	          radius = $__1.radius,
	          translateSprite = $__1.translateSprite,
	          surfaceVelocity = $__1.surfaceVelocity;
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
	    function newCannon($__0) {
	      var $__1 = $__0,
	          position = $__1.position,
	          leftToRight = $__1.leftToRight,
	          force = $__1.force;
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
	      newButton({
	        position: [position[0] - direction * 0.4, position[1] - 0.4],
	        onActivation: function(cannonBall) {
	          setTimeout((function() {
	            cannonBall.force = [direction * force, force];
	          }), 1000);
	        }
	      });
	      return {
	        body: body,
	        sprite: sprite
	      };
	    }
	    function newConveyorBeltSystem($__0) {
	      var $__1 = $__0,
	          conveyorBeltPosition = $__1.conveyorBeltPosition,
	          radius = $__1.radius,
	          length = $__1.length,
	          surfaceVelocity = $__1.surfaceVelocity,
	          translateConveyorBeltSprite = $__1.translateConveyorBeltSprite,
	          buttonPosition = $__1.buttonPosition,
	          localButtonAnchor = $__1.localButtonAnchor,
	          localConveyorBeltAnchor = $__1.localConveyorBeltAnchor;
	      var $__2 = newConveyorBelt({
	        position: conveyorBeltPosition,
	        radius: radius,
	        length: length,
	        surfaceVelocity: surfaceVelocity,
	        translateSprite: translateConveyorBeltSprite,
	        zIndex: 999
	      }),
	          conveyorBelt = $__2.body,
	          turnOn = $__2.turnOn;
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
	    function newGoal($__0) {
	      var position = $__0.position;
	      var $__2 = newLightBulb({
	        position: [position[0], position[1] - 2],
	        width: 1,
	        scaleSprite: [1, -1]
	      }),
	          lightBulb = $__2.body,
	          turnOn = $__2.turnOn;
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
	    new dm.Delta('initial-bowling-ball', {if: true}).insert('addArtefacts', function() {
	      if (dm.vp('startMachine', true)) {
	        setTimeout((function() {
	          newBowlingBall({position: [0, 6.3]});
	        }), 1000);
	      }
	    });
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
	        surfaceVelocity: 1.3,
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
	        surfaceVelocity: -1.3,
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
	    new dm.Delta('reposition-conveyor-belt-buttons', {}).replace('conveyorBeltButtonHeight', 2);
	    new dm.Delta('second-right-turning-conveyor-belt', {}).insert('addArtefacts', function() {
	      newConveyorBeltSystem({
	        conveyorBeltPosition: [1, 0],
	        length: 2,
	        surfaceVelocity: -1,
	        translateConveyorBeltSprite: [0, 1.3],
	        buttonPosition: [0.4, dm.vp('conveyorBeltButtonHeight', 1)],
	        localButtonAnchor: [-0.1, -0.28],
	        localConveyorBeltAnchor: [-1, 0]
	      });
	    }).remove('rightSittingBowlingBall');
	    new dm.Delta('conflict-indicator', {resolves: ['left-facing-trampoline', 'left-turning-conveyor-belt']}).insert('addArtefacts', function() {
	      setTimeout((function() {
	        var shape = newRectangle({
	          image: __webpack_require__(13),
	          position: [0, 1],
	          width: 2.5,
	          height: 2.5,
	          mass: 0
	        }).shape;
	        shape.sensor = true;
	      }), 5000);
	    }).replace('startMachine', false);
	    dm.select('left-goal', 'left-facing-trampoline');
	    dm.vp('addArtefacts', function addArtefacts() {})();
	    this.frame(0, 4, 12, 2);
	  });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzM3NDdjOWNmYzA4YmYzMjkxMGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3hGQSx1RUFBUywyREFBVSx5QkFBWSx3QkFBYyxJQUFHLFFBQUMsRUFBRyxRQUFNO0FBQ3pELGNBQVcsQ0FBQztBQUdSLFFBQUMsRUFBSSxJQUFJLFFBQU8sRUFBQyxDQUFDO0FBR2xCLFNBQUUsRUFBSSxJQUFJLEdBQUMsY0FBZSxDQUFDLFNBQVU7QUFLeEMsUUFBRyxJQUFJLE9BQU8sRUFBSSxLQUFHLENBQUM7QUFHbEIsYUFBSSxFQUFJLElBQUksR0FBQyxNQUFPLENBQUM7QUFDeEIsaUJBQVUsQ0FBRyxLQUFHO0FBQ2hCLGFBQU0sQ0FBRyxFQUFDLEVBQUcsRUFBQyxFQUFDLENBQUM7QUFDaEIsZ0JBQVMsQ0FBRyxJQUFJLEdBQUMsY0FBZSxFQUFDO0FBQUEsS0FDbEMsQ0FBQyxDQUFDO0FBQ0YsUUFBRyxT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QUksQ0FBQyxjQUFhLENBQUcsU0FBUyxhQUFXLENBQUUsQ0FBRSxHQUFDLENBQUUsRUFBQyxDQUFDO0FBUW5ELFFBQUcsTUFBTyxDQUFDLEVBQUcsR0FBRyxHQUFDLENBQUcsR0FBQyxDQUFDO0dBRXhCLENBQUMsQ0FBQztBQUVILEUsNkNBQUEsRUFBRTtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGNodW5rSWRzLCBtb3JlTW9kdWxlcykge1xuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcbiBcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pXG4gXHRcdFx0XHRjYWxsYmFja3MucHVzaC5hcHBseShjYWxsYmFja3MsIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSk7XG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcbiBcdFx0fVxuIFx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGNodW5rSWRzLCBtb3JlTW9kdWxlcyk7XG4gXHRcdHdoaWxlKGNhbGxiYWNrcy5sZW5ndGgpXG4gXHRcdFx0Y2FsbGJhY2tzLnNoaWZ0KCkuY2FsbChudWxsLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0fTtcblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3NcbiBcdC8vIFwiMFwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0Ly8gQXJyYXkgbWVhbnMgXCJsb2FkaW5nXCIsIGFycmF5IGNvbnRhaW5zIGNhbGxiYWNrc1xuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0MDowXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cbiBcdC8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbiBcdC8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lID0gZnVuY3Rpb24gcmVxdWlyZUVuc3VyZShjaHVua0lkLCBjYWxsYmFjaykge1xuIFx0XHQvLyBcIjBcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKVxuIFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIGFuIGFycmF5IG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cbiBcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWQpIHtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0ucHVzaChjYWxsYmFjayk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IFtjYWxsYmFja107XG4gXHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiBcdFx0XHRzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuIFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRzY3JpcHQuYXN5bmMgPSB0cnVlO1xuIFx0XHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLmluZGV4LmpzXCI7XG4gXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDMzNzQ3YzljZmMwOGJmMzI5MTBjXG4gKiovIiwicmVxdWlyZShbJ2pxdWVyeScsICdkZWx0YS1qcycsICcuL2luZGV4LnNjc3MnXSwgKCQsIERlbHRhSnMpPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgZG0gPSBuZXcgRGVsdGFKcygpO1xuXG5cblx0dmFyIGFwcCA9IG5ldyBwMi5XZWJHTFJlbmRlcmVyKGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdC8qIGNsb3NlIHRoZSBndWkgY29udHJvbHMgKi9cblx0XHR0aGlzLmd1aS5jbG9zZWQgPSB0cnVlO1xuXG5cdFx0LyogY3JlYXRlIHRoZSB3b3JsZCAqL1xuXHRcdHZhciB3b3JsZCA9IG5ldyBwMi5Xb3JsZCh7XG5cdFx0XHRkb1Byb2ZpbGluZzogdHJ1ZSxcblx0XHRcdGdyYXZpdHk6IFswLCAtMTBdLFxuXHRcdFx0YnJvYWRwaGFzZTogbmV3IHAyLlNBUEJyb2FkcGhhc2UoKVxuXHRcdH0pO1xuXHRcdHRoaXMuc2V0V29ybGQod29ybGQpO1xuXHRcdHdvcmxkLmlzbGFuZFNwbGl0ID0gdHJ1ZTtcblx0XHR3b3JsZC5zbGVlcE1vZGUgPSBwMi5Xb3JsZC5JU0xBTkRfU0xFRVBJTkc7XG5cdFx0d29ybGQuc29sdmVyLml0ZXJhdGlvbnMgPSAyMDtcblx0XHR3b3JsZC5zb2x2ZXIudG9sZXJhbmNlID0gMC4wMDE7XG5cdFx0d29ybGQuc2V0R2xvYmFsU3RpZmZuZXNzKDFlNCk7XG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0XHQvKiB0aGUgY29udGFpbmVyIGZvciBhbGwgc3ByaXRlcyAqL1xuXHRcdHZhciBzcHJpdGVDb250YWluZXIgPSBuZXcgUElYSS5EaXNwbGF5T2JqZWN0Q29udGFpbmVyKCk7XG5cdFx0dGhpcy5zdGFnZS5hZGRDaGlsZChzcHJpdGVDb250YWluZXIpO1xuXHRcdGZ1bmN0aW9uIGFkZE5ld1Nwcml0ZShzcHJpdGUpIHtcblx0XHRcdHNwcml0ZUNvbnRhaW5lci5hZGRDaGlsZChzcHJpdGUpO1xuXHRcdFx0c3ByaXRlQ29udGFpbmVyLmNoaWxkcmVuLnNvcnQoKGEsIGIpID0+IChhLnpJbmRleCA8IGIuekluZGV4ID8gLTEgOiAoYS56SW5kZXggPT09IGIuekluZGV4ID8gMCA6IDEpKSk7XG5cdFx0fVxuXG5cdFx0LyogYXR0YWNoaW5nIGEgbmV3IHNwcml0ZSB0byBhIGJvZHkgKi9cblx0XHRmdW5jdGlvbiBuZXdTcHJpdGUoe2ltYWdlLCBib2R5LCB6SW5kZXgsIHNjYWxlLCB0cmFuc2xhdGUsIHJvdGF0ZX0pIHtcblx0XHRcdHpJbmRleCA9IHpJbmRleCB8fCAwO1xuXHRcdFx0c2NhbGUgPSBzY2FsZSB8fCBbMSwgMV07XG5cdFx0XHR0cmFuc2xhdGUgPSB0cmFuc2xhdGUgfHwgWzAsIDBdO1xuXHRcdFx0cm90YXRlID0gcm90YXRlIHx8IDA7XG5cblx0XHRcdGJvZHkuaW52aXNpYmxlID0gdHJ1ZTtcblxuXHRcdFx0dmFyIHNwcml0ZSA9IFBJWEkuU3ByaXRlLmZyb21JbWFnZShpbWFnZSk7XG5cblx0XHRcdHNwcml0ZS50ZXh0dXJlLmJhc2VUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZCcsICh7Y29udGVudDogdGV4dHVyZX0pID0+IHtcblx0XHRcdFx0dmFyIGFhYmIgPSBib2R5LmdldEFBQkIoKTtcblx0XHRcdFx0dmFyIHdpZHRoID0gYWFiYi51cHBlckJvdW5kWzBdIC0gYWFiYi5sb3dlckJvdW5kWzBdO1xuXHRcdFx0XHR2YXIgbWFuZGF0b3J5U2NhbGUgPSB3aWR0aCAvIHRleHR1cmUud2lkdGg7XG5cdFx0XHRcdHZhciBoZWlnaHQgPSBtYW5kYXRvcnlTY2FsZSAqIHRleHR1cmUuaGVpZ2h0O1xuXG5cdFx0XHRcdHNwcml0ZS53aWR0aCA9IHdpZHRoO1xuXHRcdFx0XHRzcHJpdGUuaGVpZ2h0ID0gaGVpZ2h0O1xuXG5cdFx0XHRcdHNwcml0ZS5zY2FsZS54ID0gbWFuZGF0b3J5U2NhbGUgKiBzY2FsZVswXTtcblx0XHRcdFx0c3ByaXRlLnNjYWxlLnkgPSAtbWFuZGF0b3J5U2NhbGUgKiBzY2FsZVsxXTtcblx0XHRcdFx0c3ByaXRlLmFuY2hvci54ID0gd2lkdGggLyAyO1xuXHRcdFx0XHRzcHJpdGUuYW5jaG9yLnkgPSB3aWR0aCAvIDI7XG5cdFx0XHRcdHNwcml0ZS56SW5kZXggPSB6SW5kZXg7XG5cdFx0XHRcdGFkZE5ld1Nwcml0ZShzcHJpdGUpO1xuXG5cdFx0XHRcdHZhciBvblBvc3RTdGVwID0gKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChib2R5Lm1hc3MgPT09IDApIHsgd29ybGQub2ZmKCdwb3N0U3RlcCcsIG9uUG9zdFN0ZXApIH1cblx0XHRcdFx0XHRzcHJpdGUucG9zaXRpb24ueCA9IGJvZHkucG9zaXRpb25bMF0gKyB3aWR0aCAqICh3aWR0aCAtIDEpIC8gMiArIHRyYW5zbGF0ZVswXTtcblx0XHRcdFx0XHRzcHJpdGUucG9zaXRpb24ueSA9IGJvZHkucG9zaXRpb25bMV0gLSB3aWR0aCAqICh3aWR0aCAtIDEpIC8gMiArIHRyYW5zbGF0ZVsxXTtcblx0XHRcdFx0XHRzcHJpdGUucm90YXRpb24gPSBib2R5LmFuZ2xlICsgcm90YXRlO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHR3b3JsZC5vbigncG9zdFN0ZXAnLCBvblBvc3RTdGVwKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4gc3ByaXRlO1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHQvKiBhIGNpcmNsZSB3aXRoIGFuIGltYWdlICovXG5cdFx0ZnVuY3Rpb24gbmV3Q2lyY2xlKHtpbWFnZSwgcmFkaXVzLCBtYXNzLCBwb3NpdGlvbiwgekluZGV4LCByb3RhdGlvbiwgc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZVNwcml0ZSwgbWF0ZXJpYWwsIGludmlzaWJsZX0pIHtcblx0XHRcdHJhZGl1cyA9IHJhZGl1cyB8fCAxO1xuXG5cdFx0XHQvKiB0aGUgc2hhcGUgKi9cblx0XHRcdHZhciBzaGFwZSA9IG5ldyBwMi5DaXJjbGUocmFkaXVzKTtcblxuXHRcdFx0LyogbWF0ZXJpYWwgKi9cblx0XHRcdHNoYXBlLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cblx0XHRcdC8qIHRoZSBwMiBib2R5LCB3aGljaCBpcyBub3QgcmVuZGVyZWQgaWYgdGhlcmUgaXMgYW4gaW1hZ2UgKi9cblx0XHRcdHZhciBib2R5ID0gbmV3IHAyLkJvZHkoe1xuXHRcdFx0XHRtYXNzOiBtYXNzIHx8IDAsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbiB8fCBbMCwgMF0sXG5cdFx0XHRcdGRhbXBpbmc6IDAsXG5cdFx0XHRcdGFuZ3VsYXJEYW1waW5nOiAwLFxuXHRcdFx0XHRhbmdsZTogcm90YXRpb24sXG5cdFx0XHRcdGludmlzaWJsZTogaW52aXNpYmxlXG5cdFx0XHR9KTtcblx0XHRcdGJvZHkuYWRkU2hhcGUoc2hhcGUpO1xuXHRcdFx0d29ybGQuYWRkQm9keShib2R5KTtcblxuXHRcdFx0LyogdGhlIHNwcml0ZSwgd2hpY2ggaXMgcmVuZGVyZWQgaWYgdGhlcmUgaXMgYW4gaW1hZ2UgKi9cblx0XHRcdHZhciBzcHJpdGUgPSBpbWFnZSAmJiBuZXdTcHJpdGUoeyBpbWFnZSwgYm9keSwgekluZGV4LCBzY2FsZTogc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZTogdHJhbnNsYXRlU3ByaXRlIH0pO1xuXG5cdFx0XHRyZXR1cm4geyBib2R5LCBzcHJpdGUsIHNoYXBlLCBtYXRlcmlhbCB9O1xuXG5cdFx0fVxuXG5cblx0XHQvKiBhIHJlY3RhbmdsZSB3aXRoIGFuIGltYWdlICovXG5cdFx0ZnVuY3Rpb24gbmV3UmVjdGFuZ2xlKHtpbWFnZSwgd2lkdGgsIGhlaWdodCwgbWFzcywgcG9zaXRpb24sIHpJbmRleCwgcm90YXRpb24sIHNjYWxlU3ByaXRlLCB0cmFuc2xhdGVTcHJpdGUsIG1hdGVyaWFsLCBpbnZpc2libGV9KSB7XG5cdFx0XHR3aWR0aCA9IHdpZHRoIHx8IDE7XG5cdFx0XHRoZWlnaHQgPSBoZWlnaHQgfHwgMTtcblxuXHRcdFx0LyogdGhlIHNoYXBlICovXG5cdFx0XHR2YXIgc2hhcGUgPSBuZXcgcDIuUmVjdGFuZ2xlKHdpZHRoLCBoZWlnaHQpO1xuXG5cdFx0XHQvKiBtYXRlcmlhbCAqL1xuXHRcdFx0c2hhcGUubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdFx0LyogdGhlIHAyIGJvZHksIHdoaWNoIGlzIG5vdCByZW5kZXJlZCBpZiB0aGVyZSBpcyBhbiBpbWFnZSAqL1xuXHRcdFx0dmFyIGJvZHkgPSBuZXcgcDIuQm9keSh7XG5cdFx0XHRcdG1hc3M6IG1hc3MgfHwgMCxcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uIHx8IFswLCAwXSxcblx0XHRcdFx0YW5nbGU6IHJvdGF0aW9uLFxuXHRcdFx0XHRpbnZpc2libGU6IGludmlzaWJsZVxuXHRcdFx0fSk7XG5cdFx0XHRib2R5LmFkZFNoYXBlKHNoYXBlKTtcblx0XHRcdHdvcmxkLmFkZEJvZHkoYm9keSk7XG5cblx0XHRcdC8qIHRoZSBzcHJpdGUsIHdoaWNoIGlzIHJlbmRlcmVkIGlmIHRoZXJlIGlzIGFuIGltYWdlICovXG5cdFx0XHR2YXIgc3ByaXRlID0gaW1hZ2UgJiYgbmV3U3ByaXRlKHsgaW1hZ2UsIGJvZHksIHpJbmRleCwgc2NhbGU6IHNjYWxlU3ByaXRlLCB0cmFuc2xhdGU6IHRyYW5zbGF0ZVNwcml0ZSB9KTtcblxuXHRcdFx0cmV0dXJuIHsgYm9keSwgc3ByaXRlLCBzaGFwZSwgbWF0ZXJpYWwgfTtcblx0XHR9XG5cblxuXHRcdC8qIGEgY2Fwc3VsZSB3aXRoIGFuIGltYWdlICovXG5cdFx0ZnVuY3Rpb24gbmV3Q2Fwc3VsZSh7aW1hZ2UsIGxlbmd0aCwgcmFkaXVzLCBtYXNzLCBwb3NpdGlvbiwgekluZGV4LCByb3RhdGlvbiwgc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZVNwcml0ZSwgbWF0ZXJpYWwsIGludmlzaWJsZX0pIHtcblx0XHRcdGxlbmd0aCA9IGxlbmd0aCB8fCAxO1xuXHRcdFx0cmFkaXVzID0gcmFkaXVzIHx8IDAuMTtcblxuXHRcdFx0LyogdGhlIHNoYXBlICovXG5cdFx0XHR2YXIgc2hhcGUgPSBuZXcgcDIuQ2Fwc3VsZShsZW5ndGgsIHJhZGl1cyk7XG5cblx0XHRcdC8qIG1hdGVyaWFsICovXG5cdFx0XHRzaGFwZS5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0XHQvKiB0aGUgcDIgYm9keSwgd2hpY2ggaXMgbm90IHJlbmRlcmVkIGlmIHRoZXJlIGlzIGFuIGltYWdlICovXG5cdFx0XHR2YXIgYm9keSA9IG5ldyBwMi5Cb2R5KHtcblx0XHRcdFx0bWFzczogbWFzcyB8fCAwLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24gfHwgWzAsIDBdLFxuXHRcdFx0XHRhbmdsZTogcm90YXRpb24sXG5cdFx0XHRcdGludmlzaWJsZTogaW52aXNpYmxlXG5cdFx0XHR9KTtcblx0XHRcdGJvZHkuYWRkU2hhcGUoc2hhcGUpO1xuXHRcdFx0d29ybGQuYWRkQm9keShib2R5KTtcblxuXHRcdFx0LyogdGhlIHNwcml0ZSwgd2hpY2ggaXMgcmVuZGVyZWQgaWYgdGhlcmUgaXMgYW4gaW1hZ2UgKi9cblx0XHRcdHZhciBzcHJpdGUgPSBpbWFnZSAmJiBuZXdTcHJpdGUoeyBpbWFnZSwgYm9keSwgekluZGV4LCBzY2FsZTogc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZTogdHJhbnNsYXRlU3ByaXRlIH0pO1xuXG5cdFx0XHRyZXR1cm4geyBib2R5LCBzcHJpdGUsIHNoYXBlLCBtYXRlcmlhbCB9O1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHQvKiBhIHRvdWNoLWFjdGl2YXRlZCBidXR0b24gKi9cblx0XHRmdW5jdGlvbiBuZXdCdXR0b24oe3Bvc2l0aW9uLCBvbkFjdGl2YXRpb24sIHNjYWxlU3ByaXRlLCB0cmFuc2xhdGVTcHJpdGUsIGludmlzaWJsZSwgcmFkaXVzfSkge1xuXG5cdFx0XHR2YXIge2JvZHksIHNwcml0ZSwgbWF0ZXJpYWwsIHNoYXBlfSA9IG5ld0NpcmNsZSh7XG5cdFx0XHRcdGltYWdlOiByZXF1aXJlKCcuL2ltZy9yZWQtYnV0dG9uLnBuZycpLFxuXHRcdFx0XHRyYWRpdXM6IHJhZGl1cyB8fCAwLjMsXG5cdFx0XHRcdG1hc3M6IDAsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0XHRcdFx0c2NhbGVTcHJpdGU6IHNjYWxlU3ByaXRlLFxuXHRcdFx0XHR0cmFuc2xhdGVTcHJpdGU6IHRyYW5zbGF0ZVNwcml0ZSxcblx0XHRcdFx0ekluZGV4OiAtMSxcblx0XHRcdFx0aW52aXNpYmxlOiBpbnZpc2libGVcblx0XHRcdH0pO1xuXHRcdFx0c2hhcGUuc2Vuc29yID0gdHJ1ZTtcblxuXHRcdFx0LyogcHJlbG9hZCB0aGUgZ3JlZW4gYnV0dG9uIHRleHR1cmUgKi9cblx0XHRcdHZhciBncmVlbkJ1dHRvblRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUltYWdlKHJlcXVpcmUoJy4vaW1nL2dyZWVuLWJ1dHRvbi5wbmcnKSk7XG5cblx0XHRcdC8qIHRyaWdnZXIgY2FsbGJhY2sgb24gYmVnaW4gY29udGFjdCAqL1xuXHRcdFx0d29ybGQub24oXCJiZWdpbkNvbnRhY3RcIiwgKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGlmICgoZXZlbnQuYm9keUEgPT09IGJvZHkgfHwgZXZlbnQuYm9keUIgPT09IGJvZHkpKSB7XG5cdFx0XHRcdFx0c3ByaXRlLnNldFRleHR1cmUoZ3JlZW5CdXR0b25UZXh0dXJlKTtcblx0XHRcdFx0XHRvbkFjdGl2YXRpb24oZXZlbnQuYm9keUEgPT09IGJvZHkgPyBldmVudC5ib2R5QiA6IGV2ZW50LmJvZHlBKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiB7IGJvZHksIHNwcml0ZSwgbWF0ZXJpYWwsIHNoYXBlIH07XG5cblx0XHR9XG5cblxuXHRcdC8qIGEgdHVybi1vbi1hYmxlIGxpZ2h0IGJ1bGIgKi9cblx0XHR2YXIgbGlnaHRCdWxiTWF0ZXJpYWwgPSBuZXcgcDIuTWF0ZXJpYWwoKTtcblx0XHRmdW5jdGlvbiBuZXdMaWdodEJ1bGIoe3Bvc2l0aW9uLCB3aWR0aCwgc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZVNwcml0ZX0pIHtcblx0XHRcdHdpZHRoID0gd2lkdGggfHwgMTtcblxuXHRcdFx0dmFyIHtib2R5LCBzcHJpdGUsIG1hdGVyaWFsLCBzaGFwZX0gPSBuZXdSZWN0YW5nbGUoe1xuXHRcdFx0XHRpbWFnZTogcmVxdWlyZSgnLi9pbWcvbGlnaHRidWxiLW9mZi5wbmcnKSxcblx0XHRcdFx0d2lkdGg6IHdpZHRoLFxuXHRcdFx0XHRoZWlnaHQ6IHdpZHRoICogKDQ1MCAvIDI4MCksXG5cdFx0XHRcdHNjYWxlU3ByaXRlOiBzY2FsZVNwcml0ZSxcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiB0cmFuc2xhdGVTcHJpdGUsXG5cdFx0XHRcdG1hc3M6IDAuMSxcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uLFxuXHRcdFx0XHRtYXRlcmlhbDogbGlnaHRCdWxiTWF0ZXJpYWxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBsaWdodGJ1bGIgYWN0aW9uISAqL1xuXHRcdFx0dmFyIGxpZ2h0QnVsYk9uVGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UocmVxdWlyZSgnLi9pbWcvbGlnaHRidWxiLW9uLnBuZycpKTtcblx0XHRcdHZhciB0dXJuT24gPSAoKSA9PiB7IHNwcml0ZS5zZXRUZXh0dXJlKGxpZ2h0QnVsYk9uVGV4dHVyZSkgfTtcblxuXHRcdFx0cmV0dXJuIHsgc3ByaXRlLCBib2R5LCBtYXRlcmlhbCwgc2hhcGUsIHR1cm5PbiB9O1xuXHRcdH1cblxuXG5cdFx0LyogYm93bGluZyBiYWxsIG1hdGVyaWFsKi9cblx0XHR2YXIgYm93bGluZ0JhbGxNYXRlcmlhbCA9IG5ldyBwMi5NYXRlcmlhbCgpO1xuXG5cdFx0LyogYSBib3dsaW5nIGJhbGwgKi9cblx0XHRmdW5jdGlvbiBuZXdCb3dsaW5nQmFsbCh7cG9zaXRpb24sIHNjYWxlU3ByaXRlLCB0cmFuc2xhdGVTcHJpdGV9KSB7XG5cblx0XHRcdHZhciBCT1dMSU5HX0JBTExfUkFESVVTID0gMC41O1xuXG5cdFx0XHR2YXIgYm93bGluZ0JhbGwgPSBuZXdDaXJjbGUoe1xuXHRcdFx0XHRpbWFnZTogcmVxdWlyZShcIi4vaW1nL2Jvd2xpbmctYmFsbC5wbmdcIiksXG5cdFx0XHRcdG1hc3M6IDEsXG5cdFx0XHRcdHJhZGl1czogQk9XTElOR19CQUxMX1JBRElVUyxcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uLFxuXHRcdFx0XHRzY2FsZVNwcml0ZTogc2NhbGVTcHJpdGUsXG5cdFx0XHRcdHRyYW5zbGF0ZVNwcml0ZTogdHJhbnNsYXRlU3ByaXRlLFxuXHRcdFx0XHRtYXRlcmlhbDogYm93bGluZ0JhbGxNYXRlcmlhbFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGJvd2xpbmcgYmFsbCBhY3Rpb24hICovXG5cdFx0XHRib3dsaW5nQmFsbC5ib2R5LmFsbG93U2xlZXAgPSBmYWxzZTtcblxuXHRcdFx0cmV0dXJuIGJvd2xpbmdCYWxsO1xuXG5cdFx0fVxuXG5cblx0XHQvKiB0cmFtcG9saW5lIG1hdGVyaWFsICovXG5cdFx0dmFyIHRyYW1wb2xpbmVNYXRlcmlhbCA9IG5ldyBwMi5NYXRlcmlhbCgpO1xuXHRcdHdvcmxkLmFkZENvbnRhY3RNYXRlcmlhbChuZXcgcDIuQ29udGFjdE1hdGVyaWFsKGJvd2xpbmdCYWxsTWF0ZXJpYWwsIHRyYW1wb2xpbmVNYXRlcmlhbCwge1xuXHRcdFx0cmVzdGl0dXRpb246IDEsXG5cdFx0XHRzdGlmZm5lc3M6IE51bWJlci5NQVhfVkFMVUUgLy8gV2UgbmVlZCBpbmZpbml0ZSBzdGlmZm5lc3MgdG8gZ2V0IGV4YWN0IHJlc3RpdHV0aW9uXG5cdFx0fSkpO1xuXG5cdFx0LyogYSB0cmFtcG9saW5lICovXG5cdFx0ZnVuY3Rpb24gbmV3VHJhbXBvbGluZSh7cG9zaXRpb24sIHdpZHRoLCByb3RhdGlvbiwgdHJhbnNsYXRlU3ByaXRlfSkge1xuXHRcdFx0d2lkdGggPSB3aWR0aCB8fCAxO1xuXHRcdFx0dHJhbnNsYXRlU3ByaXRlID0gdHJhbnNsYXRlU3ByaXRlIHx8IFswLCAwXTtcblxuXHRcdFx0LyogdGhlIHRyYW1wb2xpbmUgKi9cblx0XHRcdHZhciB0cmFtcG9saW5lID0gbmV3UmVjdGFuZ2xlKHtcblx0XHRcdFx0aW1hZ2U6IHJlcXVpcmUoJy4vaW1nL3RyYW1wb2xpbmUucG5nJyksXG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbiB8fCBbMCwgMF0sXG5cdFx0XHRcdHJvdGF0aW9uOiByb3RhdGlvbiB8fCAwLFxuXHRcdFx0XHR3aWR0aDogd2lkdGgsXG5cdFx0XHRcdGhlaWdodDogd2lkdGggKiAoMzk3IC8gOTMwKSxcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiBbMCArIHRyYW5zbGF0ZVNwcml0ZVswXSwgMC44MyArIHRyYW5zbGF0ZVNwcml0ZVsxXV0sXG5cdFx0XHRcdHpJbmRleDogLTEsXG5cdFx0XHRcdG1hdGVyaWFsOiB0cmFtcG9saW5lTWF0ZXJpYWxcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiB0cmFtcG9saW5lIGFjdGlvbiEgKi9cblx0XHRcdHRyYW1wb2xpbmUuYm9keS5hbGxvd1NsZWVwID0gZmFsc2U7XG5cblx0XHRcdHJldHVybiB0cmFtcG9saW5lO1xuXHRcdH1cblxuXG5cdFx0LyogYSB0dXJuLW9uLWFibGUgY29udmV5b3IgYmVsdCAqL1xuXHRcdGZ1bmN0aW9uIG5ld0NvbnZleW9yQmVsdCh7cG9zaXRpb24sIGxlbmd0aCwgcmFkaXVzLCB0cmFuc2xhdGVTcHJpdGUsIHN1cmZhY2VWZWxvY2l0eX0pIHtcblx0XHRcdGxlbmd0aCA9IGxlbmd0aCB8fCAyO1xuXHRcdFx0dHJhbnNsYXRlU3ByaXRlID0gdHJhbnNsYXRlU3ByaXRlIHx8IFswLCAwXTtcblxuXHRcdFx0LyogdGhlIGNvbnZleW9yIGJlbHQgKi9cblx0XHRcdHZhciBjb252ZXlvckJlbHQgPSBuZXdDYXBzdWxlKHtcblx0XHRcdFx0aW1hZ2U6IHJlcXVpcmUoJy4vaW1nL2NvbnZleW9yLWJlbHQucG5nJyksXG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbiB8fCBbMCwgMF0sXG5cdFx0XHRcdGxlbmd0aDogbGVuZ3RoLFxuXHRcdFx0XHRyYWRpdXM6IHJhZGl1cyB8fCAwLjE1LFxuXHRcdFx0XHR0cmFuc2xhdGVTcHJpdGU6IHRyYW5zbGF0ZVNwcml0ZSxcblx0XHRcdFx0ekluZGV4OiAtMSxcblx0XHRcdFx0bWF0ZXJpYWw6IG5ldyBwMi5NYXRlcmlhbCgpIC8vIG9uZSBtYXRlcmlhbCBmb3IgZWFjaCBiZWx0LCBmb3IgY3VzdG9taXphYmxlIHN1cmZhY2UgdmVsb2NpdHlcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjb252ZXlvciBiZWx0IGFjdGlvbiEgKi9cblx0XHRcdGNvbnZleW9yQmVsdC5ib2R5LmFsbG93U2xlZXAgPSBmYWxzZTtcblx0XHRcdGNvbnZleW9yQmVsdC50dXJuT24gPSAoKSA9PiB7XG5cdFx0XHRcdHZhciBjb250YWN0TWF0ZXJpYWwgPSBuZXcgcDIuQ29udGFjdE1hdGVyaWFsKGJvd2xpbmdCYWxsTWF0ZXJpYWwsIGNvbnZleW9yQmVsdC5zaGFwZS5tYXRlcmlhbCwge1xuXHRcdFx0XHRcdHN1cmZhY2VWZWxvY2l0eTogc3VyZmFjZVZlbG9jaXR5IHx8IDEsXG5cdFx0XHRcdFx0ZnJpY3Rpb246IDIuMFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0d29ybGQuYWRkQ29udGFjdE1hdGVyaWFsKGNvbnRhY3RNYXRlcmlhbCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRyZXR1cm4gY29udmV5b3JCZWx0O1xuXHRcdH1cblxuXG5cdFx0LyogYSBjYW5ub24gKi9cblx0XHRmdW5jdGlvbiBuZXdDYW5ub24oe3Bvc2l0aW9uLCBsZWZ0VG9SaWdodCwgZm9yY2V9KSB7XG5cdFx0XHRpZiAodHlwZW9mIGxlZnRUb1JpZ2h0ID09PSAndW5kZWZpbmVkJykgeyBsZWZ0VG9SaWdodCA9IHRydWUgfVxuXHRcdFx0Zm9yY2UgPSBmb3JjZSB8fCA2MDA7XG5cblx0XHRcdHZhciBkaXJlY3Rpb24gPSAobGVmdFRvUmlnaHQgPyAxIDogLTEpO1xuXG5cdFx0XHQvKiB0aGUgY2Fubm9uIHNoYXBlcyAqL1xuXHRcdFx0dmFyIGJvdHRvbSA9IG5ldyBwMi5SZWN0YW5nbGUoMSwgMC4yKTtcblx0XHRcdHZhciBsZWZ0ID0gbmV3IHAyLlJlY3RhbmdsZSgwLjIsIDEuMik7XG5cdFx0XHR2YXIgcmlnaHQgPSBuZXcgcDIuUmVjdGFuZ2xlKDAuMiwgMS4yKTtcblxuXHRcdFx0LyogdGhlIGNhbm5vbiBib2R5ICovXG5cdFx0XHR2YXIgYm9keSA9IG5ldyBwMi5Cb2R5KHtcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uIHx8IFswLCAwXSxcblx0XHRcdFx0YW5nbGU6IC1kaXJlY3Rpb24gKiBNYXRoLlBJIC8gNC8vLFxuXHRcdFx0XHQvL2ludmlzaWJsZTogdHJ1ZVxuXHRcdFx0fSk7XG5cdFx0XHRib2R5LmFkZFNoYXBlKGJvdHRvbSwgWzAsIC0wLjZdKTtcblx0XHRcdGJvZHkuYWRkU2hhcGUobGVmdCwgICBbLTAuNiwgLTAuMV0pO1xuXHRcdFx0Ym9keS5hZGRTaGFwZShyaWdodCwgIFswLjYsIC0wLjFdKTtcblx0XHRcdHdvcmxkLmFkZEJvZHkoYm9keSk7XG5cblx0XHRcdC8qIHRoZSBzcHJpdGUgKi9cblx0XHRcdHZhciBzcHJpdGUgPSBuZXdTcHJpdGUoe1xuXHRcdFx0XHRib2R5LFxuXHRcdFx0XHRpbWFnZTogcmVxdWlyZSgnLi9pbWcvY2Fubm9uLnBuZycpLFxuXHRcdFx0XHR6SW5kZXg6IDEwLFxuXHRcdFx0XHRzY2FsZTogW2RpcmVjdGlvbiAqIDEuNSwgMS41XSxcblx0XHRcdFx0dHJhbnNsYXRlOiBbbGVmdFRvUmlnaHQgPyAtMC4wNyA6IC0xLjQ3LCAtMC43NF0sXG5cdFx0XHRcdHJvdGF0ZTogZGlyZWN0aW9uICogTWF0aC5QSSAvIDRcblx0XHRcdH0pO1xuXG5cdFx0XHQvKiBjYW5ub24gYWN0aW9uISAqL1xuXHRcdFx0Ym9keS5hbGxvd1NsZWVwID0gZmFsc2U7XG5cdFx0XHRuZXdCdXR0b24oe1xuXHRcdFx0XHRwb3NpdGlvbjogW3Bvc2l0aW9uWzBdIC0gZGlyZWN0aW9uICogMC40LCBwb3NpdGlvblsxXSAtIDAuNF0sXG5cdFx0XHRcdG9uQWN0aXZhdGlvbihjYW5ub25CYWxsKSB7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRjYW5ub25CYWxsLmZvcmNlID0gW2RpcmVjdGlvbiAqIGZvcmNlLCBmb3JjZV07XG5cdFx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0XHRyZXR1cm4ge2JvZHksIHNwcml0ZX07XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8qIGJ1dHRvbiArIGNvbnZleW9yIGJlbHQgKi9cblx0XHRmdW5jdGlvbiBuZXdDb252ZXlvckJlbHRTeXN0ZW0oe2NvbnZleW9yQmVsdFBvc2l0aW9uLCByYWRpdXMsIGxlbmd0aCwgc3VyZmFjZVZlbG9jaXR5LCB0cmFuc2xhdGVDb252ZXlvckJlbHRTcHJpdGUsIGJ1dHRvblBvc2l0aW9uLCBsb2NhbEJ1dHRvbkFuY2hvciwgbG9jYWxDb252ZXlvckJlbHRBbmNob3J9KSB7XG5cdFx0XHR2YXIge2JvZHk6IGNvbnZleW9yQmVsdCwgdHVybk9ufSA9IG5ld0NvbnZleW9yQmVsdCh7XG5cdFx0XHRcdHBvc2l0aW9uOiBjb252ZXlvckJlbHRQb3NpdGlvbixcblx0XHRcdFx0cmFkaXVzOiByYWRpdXMsXG5cdFx0XHRcdGxlbmd0aDogbGVuZ3RoLFxuXHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IHN1cmZhY2VWZWxvY2l0eSxcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiB0cmFuc2xhdGVDb252ZXlvckJlbHRTcHJpdGUsXG5cdFx0XHRcdHpJbmRleDogOTk5XG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHtib2R5OiBidXR0b259ID0gbmV3QnV0dG9uKHtcblx0XHRcdFx0cG9zaXRpb246IGJ1dHRvblBvc2l0aW9uLFxuXHRcdFx0XHRvbkFjdGl2YXRpb24oKSB7IHR1cm5PbigpIH0sXG5cdFx0XHRcdHpJbmRleDogOTk5XG5cdFx0XHR9KTtcblxuXHRcdFx0d29ybGQuYWRkU3ByaW5nKG5ldyBwMi5MaW5lYXJTcHJpbmcoYnV0dG9uLCBjb252ZXlvckJlbHQsIHtcblx0XHRcdFx0c3RpZmZuZXNzOiAxMCxcblx0XHRcdFx0cmVzdExlbmd0aDogMC4zLFxuXHRcdFx0XHRsb2NhbEFuY2hvckE6IGxvY2FsQnV0dG9uQW5jaG9yLFxuXHRcdFx0XHRsb2NhbEFuY2hvckI6IGxvY2FsQ29udmV5b3JCZWx0QW5jaG9yXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cblx0XHQvKiBnb2FsOiBidXR0b24gKyBsaWdodGJ1bGIgKi9cblx0XHRmdW5jdGlvbiBuZXdHb2FsKHtwb3NpdGlvbn0pIHtcblx0XHRcdHZhciB7Ym9keTogbGlnaHRCdWxiLCB0dXJuT259ID0gbmV3TGlnaHRCdWxiKHtcblx0XHRcdFx0cG9zaXRpb246IFtwb3NpdGlvblswXSwgcG9zaXRpb25bMV0gLSAyXSxcblx0XHRcdFx0d2lkdGg6IDEsXG5cdFx0XHRcdHNjYWxlU3ByaXRlOiBbMSwgLTFdXG5cdFx0XHR9KTtcblxuXHRcdFx0dmFyIHtib2R5OiBidXR0b259ID0gbmV3QnV0dG9uKHtcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uLFxuXHRcdFx0XHRyYWRpdXM6IDAuMyxcblx0XHRcdFx0b25BY3RpdmF0aW9uKCkgeyB0dXJuT24oKSB9XG5cdFx0XHR9KTtcblxuXHRcdFx0d29ybGQuYWRkU3ByaW5nKG5ldyBwMi5MaW5lYXJTcHJpbmcoYnV0dG9uLCBsaWdodEJ1bGIsIHtcblx0XHRcdFx0cmVzdExlbmd0aDogMC4yLFxuXHRcdFx0XHRzdGlmZm5lc3M6IDcsXG5cdFx0XHRcdGxvY2FsQW5jaG9yQTogWzAsIC0wLjNdLFxuXHRcdFx0XHRsb2NhbEFuY2hvckI6IFswLCAoNDUwIC8gMjgwKSAvIDJdXG5cdFx0XHR9KSk7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdG5ldyBkbS5EZWx0YSgnaW5pdGlhbC1ib3dsaW5nLWJhbGwnLCB7IGlmOiB0cnVlIH0pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGRtLnZwKCdzdGFydE1hY2hpbmUnLCB0cnVlKSkge1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRuZXdCb3dsaW5nQmFsbCh7IHBvc2l0aW9uOiBbMCwgNi4zXSB9KTtcblx0XHRcdFx0fSwgMTAwMCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRuZXcgZG0uRGVsdGEoJ2xlZnQtZ29hbCcsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0dvYWwoeyBwb3NpdGlvbjogWy00LCA1XSB9KTtcblx0XHR9KTtcblxuXHRcdG5ldyBkbS5EZWx0YSgncmlnaHQtZ29hbCcsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0dvYWwoeyBwb3NpdGlvbjogWzQsIDVdIH0pO1xuXHRcdH0pO1xuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ2xlZnQtZmFjaW5nLXRyYW1wb2xpbmUnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdUcmFtcG9saW5lKHtcblx0XHRcdFx0cG9zaXRpb246IFswLCAwLjhdLFxuXHRcdFx0XHR3aWR0aDogMixcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiBbMC4xLCAwLjM1XSxcblx0XHRcdFx0cm90YXRpb246IDAuMjVcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cblxuXHRcdG5ldyBkbS5EZWx0YSgnbGVmdC10dXJuaW5nLWNvbnZleW9yLWJlbHQnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdDb252ZXlvckJlbHRTeXN0ZW0oe1xuXHRcdFx0XHRjb252ZXlvckJlbHRQb3NpdGlvbjogWy0zLCAwXSxcblx0XHRcdFx0bGVuZ3RoOiAyLFxuXHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IDEuMyxcblx0XHRcdFx0dHJhbnNsYXRlQ29udmV5b3JCZWx0U3ByaXRlOiBbMCwgMS4zXSxcblx0XHRcdFx0YnV0dG9uUG9zaXRpb246IFstMC40LCBkbS52cCgnY29udmV5b3JCZWx0QnV0dG9uSGVpZ2h0JywgMSldLFxuXHRcdFx0XHRsb2NhbEJ1dHRvbkFuY2hvcjogWy0wLjIsIC0wLjJdLFxuXHRcdFx0XHRsb2NhbENvbnZleW9yQmVsdEFuY2hvcjogWzEsIDBdXG5cdFx0XHR9KTtcblx0XHRcdG5ld0Jvd2xpbmdCYWxsKHsgcG9zaXRpb246IFstMi41LCAwLjZdIH0pO1xuXHRcdH0pO1xuXHRcdG5ldyBkbS5EZWx0YSgncmlnaHQtc2hvb3RpbmctY2Fubm9uJywge30pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bmV3Q2Fubm9uKHtcblx0XHRcdFx0bGVmdFRvUmlnaHQ6IHRydWUsXG5cdFx0XHRcdHBvc2l0aW9uOiBbLTUsIDBdXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cdFx0bmV3IGRtLkRlbHRhKCdyaWdodC10dXJuaW5nLWNvbnZleW9yLWJlbHQnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdDb252ZXlvckJlbHRTeXN0ZW0oe1xuXHRcdFx0XHRjb252ZXlvckJlbHRQb3NpdGlvbjogWzMsIDBdLFxuXHRcdFx0XHRsZW5ndGg6IDIsXG5cdFx0XHRcdHN1cmZhY2VWZWxvY2l0eTogLTEuMyxcblx0XHRcdFx0dHJhbnNsYXRlQ29udmV5b3JCZWx0U3ByaXRlOiBbMCwgMS4zXSxcblx0XHRcdFx0YnV0dG9uUG9zaXRpb246IFswLjQsIGRtLnZwKCdjb252ZXlvckJlbHRCdXR0b25IZWlnaHQnLCAxKV0sXG5cdFx0XHRcdGxvY2FsQnV0dG9uQW5jaG9yOiBbMC4yLCAtMC4yXSxcblx0XHRcdFx0bG9jYWxDb252ZXlvckJlbHRBbmNob3I6IFstMSwgMF1cblx0XHRcdH0pO1xuXHRcdFx0aWYgKGRtLnZwKCdyaWdodFNpdHRpbmdCb3dsaW5nQmFsbCcsIHRydWUpKSB7XG5cdFx0XHRcdG5ld0Jvd2xpbmdCYWxsKHsgcG9zaXRpb246IFsyLjUsIDAuNl0gfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bmV3IGRtLkRlbHRhKCdsZWZ0LXNob290aW5nLWNhbm5vbicsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0Nhbm5vbih7XG5cdFx0XHRcdGxlZnRUb1JpZ2h0OiBmYWxzZSxcblx0XHRcdFx0cG9zaXRpb246IFs1LCAwXVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblxuXG5cdFx0bmV3IGRtLkRlbHRhKCdyZXBvc2l0aW9uLWNvbnZleW9yLWJlbHQtYnV0dG9ucycsIHt9KS5yZXBsYWNlKCdjb252ZXlvckJlbHRCdXR0b25IZWlnaHQnLCAyKTtcblxuXG5cdFx0bmV3IGRtLkRlbHRhKCdzZWNvbmQtcmlnaHQtdHVybmluZy1jb252ZXlvci1iZWx0Jywge30pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bmV3Q29udmV5b3JCZWx0U3lzdGVtKHtcblx0XHRcdFx0Y29udmV5b3JCZWx0UG9zaXRpb246IFsxLCAwXSxcblx0XHRcdFx0bGVuZ3RoOiAyLFxuXHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IC0xLFxuXHRcdFx0XHR0cmFuc2xhdGVDb252ZXlvckJlbHRTcHJpdGU6IFswLCAxLjNdLFxuXHRcdFx0XHRidXR0b25Qb3NpdGlvbjogWzAuNCwgZG0udnAoJ2NvbnZleW9yQmVsdEJ1dHRvbkhlaWdodCcsIDEpXSxcblx0XHRcdFx0bG9jYWxCdXR0b25BbmNob3I6IFstMC4xLCAtMC4yOF0sXG5cdFx0XHRcdGxvY2FsQ29udmV5b3JCZWx0QW5jaG9yOiBbLTEsIDBdXG5cdFx0XHR9KTtcblx0XHR9KS5yZW1vdmUoJ3JpZ2h0U2l0dGluZ0Jvd2xpbmdCYWxsJyk7XG5cblxuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ2NvbmZsaWN0LWluZGljYXRvcicsIHsgcmVzb2x2ZXM6IFsnbGVmdC1mYWNpbmctdHJhbXBvbGluZScsICdsZWZ0LXR1cm5pbmctY29udmV5b3ItYmVsdCddIH0pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdHZhciB7c2hhcGV9ID0gbmV3UmVjdGFuZ2xlKHtcblx0XHRcdFx0XHRpbWFnZTogcmVxdWlyZSgnLi9pbWcvZXJyb3IucG5nJyksXG5cdFx0XHRcdFx0cG9zaXRpb246IFswLCAxXSxcblx0XHRcdFx0XHR3aWR0aDogMi41LFxuXHRcdFx0XHRcdGhlaWdodDogMi41LFxuXHRcdFx0XHRcdG1hc3M6IDBcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNoYXBlLnNlbnNvciA9IHRydWU7XG5cdFx0XHR9LCA1MDAwKTtcblx0XHR9KS5yZXBsYWNlKCdzdGFydE1hY2hpbmUnLCBmYWxzZSk7XG5cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRkbS5zZWxlY3QoXG5cdFx0XHRcdCdsZWZ0LWdvYWwnLFxuXHRcdFx0XHQnbGVmdC1mYWNpbmctdHJhbXBvbGluZSdcblxuXHRcdFx0XHQvLydyaWdodC1nb2FsJyxcblx0XHRcdFx0Ly8ncmlnaHQtc2hvb3RpbmctY2Fubm9uJyxcblx0XHRcdFx0Ly8nbGVmdC10dXJuaW5nLWNvbnZleW9yLWJlbHQnXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vJ2xlZnQtc2hvb3RpbmctY2Fubm9uJyxcblx0XHRcdFx0Ly8ncmlnaHQtdHVybmluZy1jb252ZXlvci1iZWx0Jyxcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8ncmVwb3NpdGlvbi1jb252ZXlvci1iZWx0LWJ1dHRvbnMnLCAgLy8gZm9yIHRyYW1wb2xpbmUgLyBjYW5ub24gY29uZmxpY3Rcblx0XHRcdFx0Ly9cblx0XHRcdFx0Ly8nc2Vjb25kLXJpZ2h0LXR1cm5pbmctY29udmV5b3ItYmVsdCcgLy8gZm9yIGJhZCBmZWF0dXJlIGludGVyYWN0aW9uXG5cblx0XHQpO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdGRtLnZwKCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiBhZGRBcnRlZmFjdHMoKSB7fSkoKTtcblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdHRoaXMuZnJhbWUoMCwgNCwgMTIsIDIpO1xuXG5cdH0pO1xuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4L2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiaW5kZXguanMifQ==