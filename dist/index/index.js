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
	      var $__2 = newButton({
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
	          enable = $__2.enable,
	          disable = $__2.disable;
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
	        newBowlingBall({position: [0, 6.3]});
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
	    new dm.Delta('reposition-conveyor-belt-buttons', {}).replace('conveyorBeltButtonHeight', 2);
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
	    dm.select('left-goal', 'right-goal', 'right-shooting-cannon', 'left-turning-conveyor-belt', 'left-shooting-cannon', 'right-turning-conveyor-belt', 'second-right-turning-conveyor-belt');
	    dm.vp('addArtefacts', function addArtefacts() {})();
	    this.frame(0, 4, 12, 2);
	  });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTNiMjQ0ZjAyMGQxMjIxNjJmZWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3hGQSx1RUFBUywyREFBVSx5QkFBWSx3QkFBYyxJQUFHLFFBQUMsRUFBRyxRQUFNO0FBQ3pELGNBQVcsQ0FBQztBQUdSLFFBQUMsRUFBSSxJQUFJLFFBQU8sRUFBQyxDQUFDO0FBR2xCLFNBQUUsRUFBSSxJQUFJLEdBQUMsY0FBZSxDQUFDLFNBQVU7QUFLeEMsUUFBRyxJQUFJLE9BQU8sRUFBSSxLQUFHLENBQUM7QUFHbEIsYUFBSSxFQUFJLElBQUksR0FBQyxNQUFPLENBQUM7QUFDeEIsaUJBQVUsQ0FBRyxLQUFHO0FBQ2hCLGFBQU0sQ0FBRyxFQUFDLEVBQUcsRUFBQyxFQUFDLENBQUM7QUFDaEIsZ0JBQVMsQ0FBRyxJQUFJLEdBQUMsY0FBZSxFQUFDO0FBQUEsS0FDbEMsQ0FBQyxDQUFDO0FBQ0YsUUFBRyxT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b0JBQW1CLENBQUcsRUFBRSxRQUFPLENBQUcsRUFBQyx3QkFBdUIsQ0FBRyw2QkFBMkIsQ0FBQyxDQUFFLENBQUMsT0FBUSxDQUFDLGNBQWEsQ0FBRyxVQUFVO0FBQzNJLGdCQUFVLEVBQUMsU0FBQztBQUNYLFdBQUssTUFBSSxFQUFLLGFBQVksQ0FBQztBQUMxQixlQUFJLENBQUcscUJBQVEsR0FBaUI7QUFDaEMsa0JBQU8sQ0FBRyxFQUFDLEVBQUcsR0FBQztBQUNmLGVBQUksQ0FBRyxJQUFFO0FBQ1QsZ0JBQUssQ0FBRyxJQUFFO0FBQ1YsY0FBRyxDQUFHO0FBQUEsU0FDUCxDQUFDLE9BQUM7QUFDRixhQUFJLE9BQU8sRUFBSSxLQUFHLENBQUM7T0FDcEIsRUFBRyxLQUFHLENBQUMsQ0FBQztLQUNULENBQUMsUUFBUyxDQUFDLGNBQWEsQ0FBRyxNQUFJLENBQUMsQ0FBQztBQU9qQyxNQUFDLE9BQVEsQ0FDUCxXQUFVLENBR1YsYUFBVyxDQUNYLHdCQUFzQixDQUN0Qiw2QkFBMkIsQ0FFM0IsdUJBQXFCLENBQ3JCLDhCQUE0QixDQUk1QixxQ0FBbUMsQ0FFckMsQ0FBQztBQU1ELE1BQUMsR0FBSSxDQUFDLGNBQWEsQ0FBRyxTQUFTLGFBQVcsQ0FBRSxDQUFFLEdBQUMsQ0FBRSxFQUFDLENBQUM7QUFRbkQsUUFBRyxNQUFPLENBQUMsRUFBRyxHQUFHLEdBQUMsQ0FBRyxHQUFDLENBQUM7R0FFeEIsQ0FBQyxDQUFDO0FBRUgsRSw2Q0FBQSxFQUFFO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gd2luZG93W1wid2VicGFja0pzb25wXCJdO1xuIFx0d2luZG93W1wid2VicGFja0pzb25wXCJdID0gZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soY2h1bmtJZHMsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgY2FsbGJhY2tzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSlcbiBcdFx0XHRcdGNhbGxiYWNrcy5wdXNoLmFwcGx5KGNhbGxiYWNrcywgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKTtcbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHR9XG4gXHRcdGlmKHBhcmVudEpzb25wRnVuY3Rpb24pIHBhcmVudEpzb25wRnVuY3Rpb24oY2h1bmtJZHMsIG1vcmVNb2R1bGVzKTtcbiBcdFx0d2hpbGUoY2FsbGJhY2tzLmxlbmd0aClcbiBcdFx0XHRjYWxsYmFja3Muc2hpZnQoKS5jYWxsKG51bGwsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHR9O1xuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHQvLyBBcnJheSBtZWFucyBcImxvYWRpbmdcIiwgYXJyYXkgY29udGFpbnMgY2FsbGJhY2tzXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHQwOjBcbiBcdH07XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuIFx0Ly8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuIFx0Ly8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSBmdW5jdGlvbiByZXF1aXJlRW5zdXJlKGNodW5rSWQsIGNhbGxiYWNrKSB7XG4gXHRcdC8vIFwiMFwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPT09IDApXG4gXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwobnVsbCwgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gYW4gYXJyYXkgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRpZihpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gIT09IHVuZGVmaW5lZCkge1xuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXS5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG4gXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gW2NhbGxiYWNrXTtcbiBcdFx0XHR2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gXHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdHNjcmlwdC50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7XG4gXHRcdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuIFx0XHRcdHNjcmlwdC5hc3luYyA9IHRydWU7XG4gXHRcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuaW5kZXguanNcIjtcbiBcdFx0XHRoZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTNiMjQ0ZjAyMGQxMjIxNjJmZWJcbiAqKi8iLCJyZXF1aXJlKFsnanF1ZXJ5JywgJ2RlbHRhLWpzJywgJy4vaW5kZXguc2NzcyddLCAoJCwgRGVsdGFKcyk9PiB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHZhciBkbSA9IG5ldyBEZWx0YUpzKCk7XG5cblxuXHR2YXIgYXBwID0gbmV3IHAyLldlYkdMUmVuZGVyZXIoZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cdFx0LyogY2xvc2UgdGhlIGd1aSBjb250cm9scyAqL1xuXHRcdHRoaXMuZ3VpLmNsb3NlZCA9IHRydWU7XG5cblx0XHQvKiBjcmVhdGUgdGhlIHdvcmxkICovXG5cdFx0dmFyIHdvcmxkID0gbmV3IHAyLldvcmxkKHtcblx0XHRcdGRvUHJvZmlsaW5nOiB0cnVlLFxuXHRcdFx0Z3Jhdml0eTogWzAsIC0xMF0sXG5cdFx0XHRicm9hZHBoYXNlOiBuZXcgcDIuU0FQQnJvYWRwaGFzZSgpXG5cdFx0fSk7XG5cdFx0dGhpcy5zZXRXb3JsZCh3b3JsZCk7XG5cdFx0d29ybGQuaXNsYW5kU3BsaXQgPSB0cnVlO1xuXHRcdHdvcmxkLnNsZWVwTW9kZSA9IHAyLldvcmxkLklTTEFORF9TTEVFUElORztcblx0XHR3b3JsZC5zb2x2ZXIuaXRlcmF0aW9ucyA9IDIwO1xuXHRcdHdvcmxkLnNvbHZlci50b2xlcmFuY2UgPSAwLjAwMTtcblx0XHR3b3JsZC5zZXRHbG9iYWxTdGlmZm5lc3MoMWU0KTtcblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRcdC8qIHRoZSBjb250YWluZXIgZm9yIGFsbCBzcHJpdGVzICovXG5cdFx0dmFyIHNwcml0ZUNvbnRhaW5lciA9IG5ldyBQSVhJLkRpc3BsYXlPYmplY3RDb250YWluZXIoKTtcblx0XHR0aGlzLnN0YWdlLmFkZENoaWxkKHNwcml0ZUNvbnRhaW5lcik7XG5cdFx0ZnVuY3Rpb24gYWRkTmV3U3ByaXRlKHNwcml0ZSkge1xuXHRcdFx0c3ByaXRlQ29udGFpbmVyLmFkZENoaWxkKHNwcml0ZSk7XG5cdFx0XHRzcHJpdGVDb250YWluZXIuY2hpbGRyZW4uc29ydCgoYSwgYikgPT4gKGEuekluZGV4IDwgYi56SW5kZXggPyAtMSA6IChhLnpJbmRleCA9PT0gYi56SW5kZXggPyAwIDogMSkpKTtcblx0XHR9XG5cblx0XHQvKiBhdHRhY2hpbmcgYSBuZXcgc3ByaXRlIHRvIGEgYm9keSAqL1xuXHRcdGZ1bmN0aW9uIG5ld1Nwcml0ZSh7aW1hZ2UsIGJvZHksIHpJbmRleCwgc2NhbGUsIHRyYW5zbGF0ZSwgcm90YXRlfSkge1xuXHRcdFx0ekluZGV4ID0gekluZGV4IHx8IDA7XG5cdFx0XHRzY2FsZSA9IHNjYWxlIHx8IFsxLCAxXTtcblx0XHRcdHRyYW5zbGF0ZSA9IHRyYW5zbGF0ZSB8fCBbMCwgMF07XG5cdFx0XHRyb3RhdGUgPSByb3RhdGUgfHwgMDtcblxuXHRcdFx0Ym9keS5pbnZpc2libGUgPSB0cnVlO1xuXG5cdFx0XHR2YXIgc3ByaXRlID0gUElYSS5TcHJpdGUuZnJvbUltYWdlKGltYWdlKTtcblxuXHRcdFx0c3ByaXRlLnRleHR1cmUuYmFzZVRleHR1cmUuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkJywgKHtjb250ZW50OiB0ZXh0dXJlfSkgPT4ge1xuXHRcdFx0XHR2YXIgYWFiYiA9IGJvZHkuZ2V0QUFCQigpO1xuXHRcdFx0XHR2YXIgd2lkdGggPSBhYWJiLnVwcGVyQm91bmRbMF0gLSBhYWJiLmxvd2VyQm91bmRbMF07XG5cdFx0XHRcdHZhciBtYW5kYXRvcnlTY2FsZSA9IHdpZHRoIC8gdGV4dHVyZS53aWR0aDtcblx0XHRcdFx0dmFyIGhlaWdodCA9IG1hbmRhdG9yeVNjYWxlICogdGV4dHVyZS5oZWlnaHQ7XG5cblx0XHRcdFx0c3ByaXRlLndpZHRoID0gd2lkdGg7XG5cdFx0XHRcdHNwcml0ZS5oZWlnaHQgPSBoZWlnaHQ7XG5cblx0XHRcdFx0c3ByaXRlLnNjYWxlLnggPSBtYW5kYXRvcnlTY2FsZSAqIHNjYWxlWzBdO1xuXHRcdFx0XHRzcHJpdGUuc2NhbGUueSA9IC1tYW5kYXRvcnlTY2FsZSAqIHNjYWxlWzFdO1xuXHRcdFx0XHRzcHJpdGUuYW5jaG9yLnggPSB3aWR0aCAvIDI7XG5cdFx0XHRcdHNwcml0ZS5hbmNob3IueSA9IHdpZHRoIC8gMjtcblx0XHRcdFx0c3ByaXRlLnpJbmRleCA9IHpJbmRleDtcblx0XHRcdFx0YWRkTmV3U3ByaXRlKHNwcml0ZSk7XG5cblx0XHRcdFx0dmFyIG9uUG9zdFN0ZXAgPSAoKSA9PiB7XG5cdFx0XHRcdFx0aWYgKGJvZHkubWFzcyA9PT0gMCkgeyB3b3JsZC5vZmYoJ3Bvc3RTdGVwJywgb25Qb3N0U3RlcCkgfVxuXHRcdFx0XHRcdHNwcml0ZS5wb3NpdGlvbi54ID0gYm9keS5wb3NpdGlvblswXSArIHdpZHRoICogKHdpZHRoIC0gMSkgLyAyICsgdHJhbnNsYXRlWzBdO1xuXHRcdFx0XHRcdHNwcml0ZS5wb3NpdGlvbi55ID0gYm9keS5wb3NpdGlvblsxXSAtIHdpZHRoICogKHdpZHRoIC0gMSkgLyAyICsgdHJhbnNsYXRlWzFdO1xuXHRcdFx0XHRcdHNwcml0ZS5yb3RhdGlvbiA9IGJvZHkuYW5nbGUgKyByb3RhdGU7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHdvcmxkLm9uKCdwb3N0U3RlcCcsIG9uUG9zdFN0ZXApO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBzcHJpdGU7XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8qIGEgY2lyY2xlIHdpdGggYW4gaW1hZ2UgKi9cblx0XHRmdW5jdGlvbiBuZXdDaXJjbGUoe2ltYWdlLCByYWRpdXMsIG1hc3MsIHBvc2l0aW9uLCB6SW5kZXgsIHJvdGF0aW9uLCBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlU3ByaXRlLCBtYXRlcmlhbCwgaW52aXNpYmxlfSkge1xuXHRcdFx0cmFkaXVzID0gcmFkaXVzIHx8IDE7XG5cblx0XHRcdC8qIHRoZSBzaGFwZSAqL1xuXHRcdFx0dmFyIHNoYXBlID0gbmV3IHAyLkNpcmNsZShyYWRpdXMpO1xuXG5cdFx0XHQvKiBtYXRlcmlhbCAqL1xuXHRcdFx0c2hhcGUubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdFx0LyogdGhlIHAyIGJvZHksIHdoaWNoIGlzIG5vdCByZW5kZXJlZCBpZiB0aGVyZSBpcyBhbiBpbWFnZSAqL1xuXHRcdFx0dmFyIGJvZHkgPSBuZXcgcDIuQm9keSh7XG5cdFx0XHRcdG1hc3M6IG1hc3MgfHwgMCxcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uIHx8IFswLCAwXSxcblx0XHRcdFx0ZGFtcGluZzogMCxcblx0XHRcdFx0YW5ndWxhckRhbXBpbmc6IDAsXG5cdFx0XHRcdGFuZ2xlOiByb3RhdGlvbixcblx0XHRcdFx0aW52aXNpYmxlOiBpbnZpc2libGVcblx0XHRcdH0pO1xuXHRcdFx0Ym9keS5hZGRTaGFwZShzaGFwZSk7XG5cdFx0XHR3b3JsZC5hZGRCb2R5KGJvZHkpO1xuXG5cdFx0XHQvKiB0aGUgc3ByaXRlLCB3aGljaCBpcyByZW5kZXJlZCBpZiB0aGVyZSBpcyBhbiBpbWFnZSAqL1xuXHRcdFx0dmFyIHNwcml0ZSA9IGltYWdlICYmIG5ld1Nwcml0ZSh7IGltYWdlLCBib2R5LCB6SW5kZXgsIHNjYWxlOiBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlOiB0cmFuc2xhdGVTcHJpdGUgfSk7XG5cblx0XHRcdHJldHVybiB7IGJvZHksIHNwcml0ZSwgc2hhcGUsIG1hdGVyaWFsIH07XG5cblx0XHR9XG5cblxuXHRcdC8qIGEgcmVjdGFuZ2xlIHdpdGggYW4gaW1hZ2UgKi9cblx0XHRmdW5jdGlvbiBuZXdSZWN0YW5nbGUoe2ltYWdlLCB3aWR0aCwgaGVpZ2h0LCBtYXNzLCBwb3NpdGlvbiwgekluZGV4LCByb3RhdGlvbiwgc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZVNwcml0ZSwgbWF0ZXJpYWwsIGludmlzaWJsZX0pIHtcblx0XHRcdHdpZHRoID0gd2lkdGggfHwgMTtcblx0XHRcdGhlaWdodCA9IGhlaWdodCB8fCAxO1xuXG5cdFx0XHQvKiB0aGUgc2hhcGUgKi9cblx0XHRcdHZhciBzaGFwZSA9IG5ldyBwMi5SZWN0YW5nbGUod2lkdGgsIGhlaWdodCk7XG5cblx0XHRcdC8qIG1hdGVyaWFsICovXG5cdFx0XHRzaGFwZS5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0XHQvKiB0aGUgcDIgYm9keSwgd2hpY2ggaXMgbm90IHJlbmRlcmVkIGlmIHRoZXJlIGlzIGFuIGltYWdlICovXG5cdFx0XHR2YXIgYm9keSA9IG5ldyBwMi5Cb2R5KHtcblx0XHRcdFx0bWFzczogbWFzcyB8fCAwLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24gfHwgWzAsIDBdLFxuXHRcdFx0XHRhbmdsZTogcm90YXRpb24sXG5cdFx0XHRcdGludmlzaWJsZTogaW52aXNpYmxlXG5cdFx0XHR9KTtcblx0XHRcdGJvZHkuYWRkU2hhcGUoc2hhcGUpO1xuXHRcdFx0d29ybGQuYWRkQm9keShib2R5KTtcblxuXHRcdFx0LyogdGhlIHNwcml0ZSwgd2hpY2ggaXMgcmVuZGVyZWQgaWYgdGhlcmUgaXMgYW4gaW1hZ2UgKi9cblx0XHRcdHZhciBzcHJpdGUgPSBpbWFnZSAmJiBuZXdTcHJpdGUoeyBpbWFnZSwgYm9keSwgekluZGV4LCBzY2FsZTogc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZTogdHJhbnNsYXRlU3ByaXRlIH0pO1xuXG5cdFx0XHRyZXR1cm4geyBib2R5LCBzcHJpdGUsIHNoYXBlLCBtYXRlcmlhbCB9O1xuXHRcdH1cblxuXG5cdFx0LyogYSBjYXBzdWxlIHdpdGggYW4gaW1hZ2UgKi9cblx0XHRmdW5jdGlvbiBuZXdDYXBzdWxlKHtpbWFnZSwgbGVuZ3RoLCByYWRpdXMsIG1hc3MsIHBvc2l0aW9uLCB6SW5kZXgsIHJvdGF0aW9uLCBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlU3ByaXRlLCBtYXRlcmlhbCwgaW52aXNpYmxlfSkge1xuXHRcdFx0bGVuZ3RoID0gbGVuZ3RoIHx8IDE7XG5cdFx0XHRyYWRpdXMgPSByYWRpdXMgfHwgMC4xO1xuXG5cdFx0XHQvKiB0aGUgc2hhcGUgKi9cblx0XHRcdHZhciBzaGFwZSA9IG5ldyBwMi5DYXBzdWxlKGxlbmd0aCwgcmFkaXVzKTtcblxuXHRcdFx0LyogbWF0ZXJpYWwgKi9cblx0XHRcdHNoYXBlLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cblx0XHRcdC8qIHRoZSBwMiBib2R5LCB3aGljaCBpcyBub3QgcmVuZGVyZWQgaWYgdGhlcmUgaXMgYW4gaW1hZ2UgKi9cblx0XHRcdHZhciBib2R5ID0gbmV3IHAyLkJvZHkoe1xuXHRcdFx0XHRtYXNzOiBtYXNzIHx8IDAsXG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbiB8fCBbMCwgMF0sXG5cdFx0XHRcdGFuZ2xlOiByb3RhdGlvbixcblx0XHRcdFx0aW52aXNpYmxlOiBpbnZpc2libGVcblx0XHRcdH0pO1xuXHRcdFx0Ym9keS5hZGRTaGFwZShzaGFwZSk7XG5cdFx0XHR3b3JsZC5hZGRCb2R5KGJvZHkpO1xuXG5cdFx0XHQvKiB0aGUgc3ByaXRlLCB3aGljaCBpcyByZW5kZXJlZCBpZiB0aGVyZSBpcyBhbiBpbWFnZSAqL1xuXHRcdFx0dmFyIHNwcml0ZSA9IGltYWdlICYmIG5ld1Nwcml0ZSh7IGltYWdlLCBib2R5LCB6SW5kZXgsIHNjYWxlOiBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlOiB0cmFuc2xhdGVTcHJpdGUgfSk7XG5cblx0XHRcdHJldHVybiB7IGJvZHksIHNwcml0ZSwgc2hhcGUsIG1hdGVyaWFsIH07XG5cdFx0fVxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdC8qIGEgdG91Y2gtYWN0aXZhdGVkIGJ1dHRvbiAqL1xuXHRcdGZ1bmN0aW9uIG5ld0J1dHRvbih7cG9zaXRpb24sIG9uQWN0aXZhdGlvbiwgc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZVNwcml0ZSwgaW52aXNpYmxlLCByYWRpdXN9KSB7XG5cblx0XHRcdHZhciB7Ym9keSwgc3ByaXRlLCBtYXRlcmlhbCwgc2hhcGV9ID0gbmV3Q2lyY2xlKHtcblx0XHRcdFx0aW1hZ2U6IHJlcXVpcmUoJy4vaW1nL3JlZC1idXR0b24ucG5nJyksXG5cdFx0XHRcdHJhZGl1czogcmFkaXVzIHx8IDAuMyxcblx0XHRcdFx0bWFzczogMCxcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uLFxuXHRcdFx0XHRzY2FsZVNwcml0ZTogc2NhbGVTcHJpdGUsXG5cdFx0XHRcdHRyYW5zbGF0ZVNwcml0ZTogdHJhbnNsYXRlU3ByaXRlLFxuXHRcdFx0XHR6SW5kZXg6IC0xLFxuXHRcdFx0XHRpbnZpc2libGU6IGludmlzaWJsZVxuXHRcdFx0fSk7XG5cdFx0XHRzaGFwZS5zZW5zb3IgPSB0cnVlO1xuXG5cdFx0XHQvKiBwcmVsb2FkIHRoZSBncmVlbiBidXR0b24gdGV4dHVyZSAqL1xuXHRcdFx0dmFyIGdyZWVuQnV0dG9uVGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UocmVxdWlyZSgnLi9pbWcvZ3JlZW4tYnV0dG9uLnBuZycpKTtcblxuXHRcdFx0LyogdHJpZ2dlciBjYWxsYmFjayBvbiBiZWdpbiBjb250YWN0ICovXG5cdFx0XHR2YXIgZW5hYmxlZCA9IHRydWU7XG5cdFx0XHR3b3JsZC5vbihcImJlZ2luQ29udGFjdFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdFx0aWYgKChldmVudC5ib2R5QSA9PT0gYm9keSB8fCBldmVudC5ib2R5QiA9PT0gYm9keSkpIHtcblx0XHRcdFx0XHRpZiAoZW5hYmxlZCkge1xuXHRcdFx0XHRcdFx0c3ByaXRlLnNldFRleHR1cmUoZ3JlZW5CdXR0b25UZXh0dXJlKTtcblx0XHRcdFx0XHRcdG9uQWN0aXZhdGlvbihldmVudC5ib2R5QSA9PT0gYm9keSA/IGV2ZW50LmJvZHlCIDogZXZlbnQuYm9keUEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRmdW5jdGlvbiBlbmFibGUoKSB7IGVuYWJsZWQgPSB0cnVlIH1cblx0XHRcdGZ1bmN0aW9uIGRpc2FibGUoKSB7IGVuYWJsZWQgPSBmYWxzZSB9XG5cblx0XHRcdGVuYWJsZSgpO1xuXG5cblx0XHRcdHJldHVybiB7IGJvZHksIHNwcml0ZSwgbWF0ZXJpYWwsIHNoYXBlLCBlbmFibGUsIGRpc2FibGUgfTtcblxuXHRcdH1cblxuXG5cdFx0LyogYSB0dXJuLW9uLWFibGUgbGlnaHQgYnVsYiAqL1xuXHRcdHZhciBsaWdodEJ1bGJNYXRlcmlhbCA9IG5ldyBwMi5NYXRlcmlhbCgpO1xuXHRcdGZ1bmN0aW9uIG5ld0xpZ2h0QnVsYih7cG9zaXRpb24sIHdpZHRoLCBzY2FsZVNwcml0ZSwgdHJhbnNsYXRlU3ByaXRlfSkge1xuXHRcdFx0d2lkdGggPSB3aWR0aCB8fCAxO1xuXG5cdFx0XHR2YXIge2JvZHksIHNwcml0ZSwgbWF0ZXJpYWwsIHNoYXBlfSA9IG5ld1JlY3RhbmdsZSh7XG5cdFx0XHRcdGltYWdlOiByZXF1aXJlKCcuL2ltZy9saWdodGJ1bGItb2ZmLnBuZycpLFxuXHRcdFx0XHR3aWR0aDogd2lkdGgsXG5cdFx0XHRcdGhlaWdodDogd2lkdGggKiAoNDUwIC8gMjgwKSxcblx0XHRcdFx0c2NhbGVTcHJpdGU6IHNjYWxlU3ByaXRlLFxuXHRcdFx0XHR0cmFuc2xhdGVTcHJpdGU6IHRyYW5zbGF0ZVNwcml0ZSxcblx0XHRcdFx0bWFzczogMC4xLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24sXG5cdFx0XHRcdG1hdGVyaWFsOiBsaWdodEJ1bGJNYXRlcmlhbFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGxpZ2h0YnVsYiBhY3Rpb24hICovXG5cdFx0XHR2YXIgbGlnaHRCdWxiT25UZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZShyZXF1aXJlKCcuL2ltZy9saWdodGJ1bGItb24ucG5nJykpO1xuXHRcdFx0dmFyIHR1cm5PbiA9ICgpID0+IHsgc3ByaXRlLnNldFRleHR1cmUobGlnaHRCdWxiT25UZXh0dXJlKSB9O1xuXG5cdFx0XHRyZXR1cm4geyBzcHJpdGUsIGJvZHksIG1hdGVyaWFsLCBzaGFwZSwgdHVybk9uIH07XG5cdFx0fVxuXG5cblx0XHQvKiBib3dsaW5nIGJhbGwgbWF0ZXJpYWwqL1xuXHRcdHZhciBib3dsaW5nQmFsbE1hdGVyaWFsID0gbmV3IHAyLk1hdGVyaWFsKCk7XG5cblx0XHQvKiBhIGJvd2xpbmcgYmFsbCAqL1xuXHRcdGZ1bmN0aW9uIG5ld0Jvd2xpbmdCYWxsKHtwb3NpdGlvbiwgc2NhbGVTcHJpdGUsIHRyYW5zbGF0ZVNwcml0ZX0pIHtcblxuXHRcdFx0dmFyIEJPV0xJTkdfQkFMTF9SQURJVVMgPSAwLjU7XG5cblx0XHRcdHZhciBib3dsaW5nQmFsbCA9IG5ld0NpcmNsZSh7XG5cdFx0XHRcdGltYWdlOiByZXF1aXJlKFwiLi9pbWcvYm93bGluZy1iYWxsLnBuZ1wiKSxcblx0XHRcdFx0bWFzczogMSxcblx0XHRcdFx0cmFkaXVzOiBCT1dMSU5HX0JBTExfUkFESVVTLFxuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24sXG5cdFx0XHRcdHNjYWxlU3ByaXRlOiBzY2FsZVNwcml0ZSxcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiB0cmFuc2xhdGVTcHJpdGUsXG5cdFx0XHRcdG1hdGVyaWFsOiBib3dsaW5nQmFsbE1hdGVyaWFsXG5cdFx0XHR9KTtcblxuXHRcdFx0LyogYm93bGluZyBiYWxsIGFjdGlvbiEgKi9cblx0XHRcdGJvd2xpbmdCYWxsLmJvZHkuYWxsb3dTbGVlcCA9IGZhbHNlO1xuXG5cdFx0XHRyZXR1cm4gYm93bGluZ0JhbGw7XG5cblx0XHR9XG5cblxuXHRcdC8qIHRyYW1wb2xpbmUgbWF0ZXJpYWwgKi9cblx0XHR2YXIgdHJhbXBvbGluZU1hdGVyaWFsID0gbmV3IHAyLk1hdGVyaWFsKCk7XG5cdFx0d29ybGQuYWRkQ29udGFjdE1hdGVyaWFsKG5ldyBwMi5Db250YWN0TWF0ZXJpYWwoYm93bGluZ0JhbGxNYXRlcmlhbCwgdHJhbXBvbGluZU1hdGVyaWFsLCB7XG5cdFx0XHRyZXN0aXR1dGlvbjogMSxcblx0XHRcdHN0aWZmbmVzczogTnVtYmVyLk1BWF9WQUxVRSAvLyBXZSBuZWVkIGluZmluaXRlIHN0aWZmbmVzcyB0byBnZXQgZXhhY3QgcmVzdGl0dXRpb25cblx0XHR9KSk7XG5cblx0XHQvKiBhIHRyYW1wb2xpbmUgKi9cblx0XHRmdW5jdGlvbiBuZXdUcmFtcG9saW5lKHtwb3NpdGlvbiwgd2lkdGgsIHJvdGF0aW9uLCB0cmFuc2xhdGVTcHJpdGV9KSB7XG5cdFx0XHR3aWR0aCA9IHdpZHRoIHx8IDE7XG5cdFx0XHR0cmFuc2xhdGVTcHJpdGUgPSB0cmFuc2xhdGVTcHJpdGUgfHwgWzAsIDBdO1xuXG5cdFx0XHQvKiB0aGUgdHJhbXBvbGluZSAqL1xuXHRcdFx0dmFyIHRyYW1wb2xpbmUgPSBuZXdSZWN0YW5nbGUoe1xuXHRcdFx0XHRpbWFnZTogcmVxdWlyZSgnLi9pbWcvdHJhbXBvbGluZS5wbmcnKSxcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uIHx8IFswLCAwXSxcblx0XHRcdFx0cm90YXRpb246IHJvdGF0aW9uIHx8IDAsXG5cdFx0XHRcdHdpZHRoOiB3aWR0aCxcblx0XHRcdFx0aGVpZ2h0OiB3aWR0aCAqICgzOTcgLyA5MzApLFxuXHRcdFx0XHR0cmFuc2xhdGVTcHJpdGU6IFswICsgdHJhbnNsYXRlU3ByaXRlWzBdLCAwLjgzICsgdHJhbnNsYXRlU3ByaXRlWzFdXSxcblx0XHRcdFx0ekluZGV4OiAtMSxcblx0XHRcdFx0bWF0ZXJpYWw6IHRyYW1wb2xpbmVNYXRlcmlhbFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIHRyYW1wb2xpbmUgYWN0aW9uISAqL1xuXHRcdFx0dHJhbXBvbGluZS5ib2R5LmFsbG93U2xlZXAgPSBmYWxzZTtcblxuXHRcdFx0cmV0dXJuIHRyYW1wb2xpbmU7XG5cdFx0fVxuXG5cblx0XHQvKiBhIHR1cm4tb24tYWJsZSBjb252ZXlvciBiZWx0ICovXG5cdFx0ZnVuY3Rpb24gbmV3Q29udmV5b3JCZWx0KHtwb3NpdGlvbiwgbGVuZ3RoLCByYWRpdXMsIHRyYW5zbGF0ZVNwcml0ZSwgc3VyZmFjZVZlbG9jaXR5fSkge1xuXHRcdFx0bGVuZ3RoID0gbGVuZ3RoIHx8IDI7XG5cdFx0XHR0cmFuc2xhdGVTcHJpdGUgPSB0cmFuc2xhdGVTcHJpdGUgfHwgWzAsIDBdO1xuXG5cdFx0XHQvKiB0aGUgY29udmV5b3IgYmVsdCAqL1xuXHRcdFx0dmFyIGNvbnZleW9yQmVsdCA9IG5ld0NhcHN1bGUoe1xuXHRcdFx0XHRpbWFnZTogcmVxdWlyZSgnLi9pbWcvY29udmV5b3ItYmVsdC5wbmcnKSxcblx0XHRcdFx0cG9zaXRpb246IHBvc2l0aW9uIHx8IFswLCAwXSxcblx0XHRcdFx0bGVuZ3RoOiBsZW5ndGgsXG5cdFx0XHRcdHJhZGl1czogcmFkaXVzIHx8IDAuMTUsXG5cdFx0XHRcdHRyYW5zbGF0ZVNwcml0ZTogdHJhbnNsYXRlU3ByaXRlLFxuXHRcdFx0XHR6SW5kZXg6IC0xLFxuXHRcdFx0XHRtYXRlcmlhbDogbmV3IHAyLk1hdGVyaWFsKCkgLy8gb25lIG1hdGVyaWFsIGZvciBlYWNoIGJlbHQsIGZvciBjdXN0b21pemFibGUgc3VyZmFjZSB2ZWxvY2l0eVxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNvbnZleW9yIGJlbHQgYWN0aW9uISAqL1xuXHRcdFx0Y29udmV5b3JCZWx0LmJvZHkuYWxsb3dTbGVlcCA9IGZhbHNlO1xuXHRcdFx0Y29udmV5b3JCZWx0LnR1cm5PbiA9ICgpID0+IHtcblx0XHRcdFx0dmFyIGNvbnRhY3RNYXRlcmlhbCA9IG5ldyBwMi5Db250YWN0TWF0ZXJpYWwoYm93bGluZ0JhbGxNYXRlcmlhbCwgY29udmV5b3JCZWx0LnNoYXBlLm1hdGVyaWFsLCB7XG5cdFx0XHRcdFx0c3VyZmFjZVZlbG9jaXR5OiBzdXJmYWNlVmVsb2NpdHkgfHwgMSxcblx0XHRcdFx0XHRmcmljdGlvbjogMi4wXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR3b3JsZC5hZGRDb250YWN0TWF0ZXJpYWwoY29udGFjdE1hdGVyaWFsKTtcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBjb252ZXlvckJlbHQ7XG5cdFx0fVxuXG5cblx0XHQvKiBhIGNhbm5vbiAqL1xuXHRcdGZ1bmN0aW9uIG5ld0Nhbm5vbih7cG9zaXRpb24sIGxlZnRUb1JpZ2h0LCBmb3JjZX0pIHtcblx0XHRcdGlmICh0eXBlb2YgbGVmdFRvUmlnaHQgPT09ICd1bmRlZmluZWQnKSB7IGxlZnRUb1JpZ2h0ID0gdHJ1ZSB9XG5cdFx0XHRmb3JjZSA9IGZvcmNlIHx8IDYwMDtcblxuXHRcdFx0dmFyIGRpcmVjdGlvbiA9IChsZWZ0VG9SaWdodCA/IDEgOiAtMSk7XG5cblx0XHRcdC8qIHRoZSBjYW5ub24gc2hhcGVzICovXG5cdFx0XHR2YXIgYm90dG9tID0gbmV3IHAyLlJlY3RhbmdsZSgxLCAwLjIpO1xuXHRcdFx0dmFyIGxlZnQgPSBuZXcgcDIuUmVjdGFuZ2xlKDAuMiwgMS4yKTtcblx0XHRcdHZhciByaWdodCA9IG5ldyBwMi5SZWN0YW5nbGUoMC4yLCAxLjIpO1xuXG5cdFx0XHQvKiB0aGUgY2Fubm9uIGJvZHkgKi9cblx0XHRcdHZhciBib2R5ID0gbmV3IHAyLkJvZHkoe1xuXHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24gfHwgWzAsIDBdLFxuXHRcdFx0XHRhbmdsZTogLWRpcmVjdGlvbiAqIE1hdGguUEkgLyA0Ly8sXG5cdFx0XHRcdC8vaW52aXNpYmxlOiB0cnVlXG5cdFx0XHR9KTtcblx0XHRcdGJvZHkuYWRkU2hhcGUoYm90dG9tLCBbMCwgLTAuNl0pO1xuXHRcdFx0Ym9keS5hZGRTaGFwZShsZWZ0LCAgIFstMC42LCAtMC4xXSk7XG5cdFx0XHRib2R5LmFkZFNoYXBlKHJpZ2h0LCAgWzAuNiwgLTAuMV0pO1xuXHRcdFx0d29ybGQuYWRkQm9keShib2R5KTtcblxuXHRcdFx0LyogdGhlIHNwcml0ZSAqL1xuXHRcdFx0dmFyIHNwcml0ZSA9IG5ld1Nwcml0ZSh7XG5cdFx0XHRcdGJvZHksXG5cdFx0XHRcdGltYWdlOiByZXF1aXJlKCcuL2ltZy9jYW5ub24ucG5nJyksXG5cdFx0XHRcdHpJbmRleDogMTAsXG5cdFx0XHRcdHNjYWxlOiBbZGlyZWN0aW9uICogMS41LCAxLjVdLFxuXHRcdFx0XHR0cmFuc2xhdGU6IFtsZWZ0VG9SaWdodCA/IC0wLjA3IDogLTEuNDcsIC0wLjc0XSxcblx0XHRcdFx0cm90YXRlOiBkaXJlY3Rpb24gKiBNYXRoLlBJIC8gNFxuXHRcdFx0fSk7XG5cblx0XHRcdC8qIGNhbm5vbiBhY3Rpb24hICovXG5cdFx0XHRib2R5LmFsbG93U2xlZXAgPSBmYWxzZTtcblx0XHRcdHZhciB7ZW5hYmxlLCBkaXNhYmxlfSA9IG5ld0J1dHRvbih7XG5cdFx0XHRcdHBvc2l0aW9uOiBbcG9zaXRpb25bMF0gLSBkaXJlY3Rpb24gKiAwLjQsIHBvc2l0aW9uWzFdIC0gMC40XSxcblx0XHRcdFx0b25BY3RpdmF0aW9uKGNhbm5vbkJhbGwpIHtcblx0XHRcdFx0XHRkaXNhYmxlKCk7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRjYW5ub25CYWxsLnR5cGUgPSBwMi5Cb2R5LlNUQVRJQztcblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRjYW5ub25CYWxsLndha2VVcCgpO1xuXHRcdFx0XHRcdFx0XHRjYW5ub25CYWxsLnR5cGUgPSBwMi5Cb2R5LkRZTkFNSUM7XG5cdFx0XHRcdFx0XHRcdGNhbm5vbkJhbGwuZm9yY2UgPSBbZGlyZWN0aW9uICogZm9yY2UsIGZvcmNlXTtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0ZW5hYmxlKCk7XG5cdFx0XHRcdFx0XHRcdH0sIDEwMCk7XG5cdFx0XHRcdFx0XHR9LCAxMDAwKTtcblx0XHRcdFx0XHR9LCAxMDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHtib2R5LCBzcHJpdGV9O1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHQvKiBidXR0b24gKyBjb252ZXlvciBiZWx0ICovXG5cdFx0ZnVuY3Rpb24gbmV3Q29udmV5b3JCZWx0U3lzdGVtKHtjb252ZXlvckJlbHRQb3NpdGlvbiwgcmFkaXVzLCBsZW5ndGgsIHN1cmZhY2VWZWxvY2l0eSwgdHJhbnNsYXRlQ29udmV5b3JCZWx0U3ByaXRlLCBidXR0b25Qb3NpdGlvbiwgbG9jYWxCdXR0b25BbmNob3IsIGxvY2FsQ29udmV5b3JCZWx0QW5jaG9yfSkge1xuXHRcdFx0dmFyIHtib2R5OiBjb252ZXlvckJlbHQsIHR1cm5Pbn0gPSBuZXdDb252ZXlvckJlbHQoe1xuXHRcdFx0XHRwb3NpdGlvbjogY29udmV5b3JCZWx0UG9zaXRpb24sXG5cdFx0XHRcdHJhZGl1czogcmFkaXVzLFxuXHRcdFx0XHRsZW5ndGg6IGxlbmd0aCxcblx0XHRcdFx0c3VyZmFjZVZlbG9jaXR5OiBzdXJmYWNlVmVsb2NpdHksXG5cdFx0XHRcdHRyYW5zbGF0ZVNwcml0ZTogdHJhbnNsYXRlQ29udmV5b3JCZWx0U3ByaXRlLFxuXHRcdFx0XHR6SW5kZXg6IDk5OVxuXHRcdFx0fSk7XG5cblx0XHRcdHZhciB7Ym9keTogYnV0dG9ufSA9IG5ld0J1dHRvbih7XG5cdFx0XHRcdHBvc2l0aW9uOiBidXR0b25Qb3NpdGlvbixcblx0XHRcdFx0b25BY3RpdmF0aW9uKCkgeyB0dXJuT24oKSB9LFxuXHRcdFx0XHR6SW5kZXg6IDk5OVxuXHRcdFx0fSk7XG5cblx0XHRcdHdvcmxkLmFkZFNwcmluZyhuZXcgcDIuTGluZWFyU3ByaW5nKGJ1dHRvbiwgY29udmV5b3JCZWx0LCB7XG5cdFx0XHRcdHN0aWZmbmVzczogMTAsXG5cdFx0XHRcdHJlc3RMZW5ndGg6IDAuMyxcblx0XHRcdFx0bG9jYWxBbmNob3JBOiBsb2NhbEJ1dHRvbkFuY2hvcixcblx0XHRcdFx0bG9jYWxBbmNob3JCOiBsb2NhbENvbnZleW9yQmVsdEFuY2hvclxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXG5cdFx0LyogZ29hbDogYnV0dG9uICsgbGlnaHRidWxiICovXG5cdFx0ZnVuY3Rpb24gbmV3R29hbCh7cG9zaXRpb259KSB7XG5cdFx0XHR2YXIge2JvZHk6IGxpZ2h0QnVsYiwgdHVybk9ufSA9IG5ld0xpZ2h0QnVsYih7XG5cdFx0XHRcdHBvc2l0aW9uOiBbcG9zaXRpb25bMF0sIHBvc2l0aW9uWzFdIC0gMl0sXG5cdFx0XHRcdHdpZHRoOiAxLFxuXHRcdFx0XHRzY2FsZVNwcml0ZTogWzEsIC0xXVxuXHRcdFx0fSk7XG5cblx0XHRcdHZhciB7Ym9keTogYnV0dG9ufSA9IG5ld0J1dHRvbih7XG5cdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0XHRcdFx0cmFkaXVzOiAwLjMsXG5cdFx0XHRcdG9uQWN0aXZhdGlvbigpIHsgdHVybk9uKCkgfVxuXHRcdFx0fSk7XG5cblx0XHRcdHdvcmxkLmFkZFNwcmluZyhuZXcgcDIuTGluZWFyU3ByaW5nKGJ1dHRvbiwgbGlnaHRCdWxiLCB7XG5cdFx0XHRcdHJlc3RMZW5ndGg6IDAuMixcblx0XHRcdFx0c3RpZmZuZXNzOiA3LFxuXHRcdFx0XHRsb2NhbEFuY2hvckE6IFswLCAtMC4zXSxcblx0XHRcdFx0bG9jYWxBbmNob3JCOiBbMCwgKDQ1MCAvIDI4MCkgLyAyXVxuXHRcdFx0fSkpO1xuXHRcdH1cblxuXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ2luaXRpYWwtYm93bGluZy1iYWxsJywgeyBpZjogdHJ1ZSB9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmIChkbS52cCgnc3RhcnRNYWNoaW5lJywgdHJ1ZSkpIHtcblx0XHRcdFx0bmV3Qm93bGluZ0JhbGwoeyBwb3NpdGlvbjogWzAsIDYuM10gfSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRuZXcgZG0uRGVsdGEoJ2xlZnQtZ29hbCcsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0dvYWwoeyBwb3NpdGlvbjogWy00LCA1XSB9KTtcblx0XHR9KTtcblxuXHRcdG5ldyBkbS5EZWx0YSgncmlnaHQtZ29hbCcsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0dvYWwoeyBwb3NpdGlvbjogWzQsIDVdIH0pO1xuXHRcdH0pO1xuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ2xlZnQtZmFjaW5nLXRyYW1wb2xpbmUnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdUcmFtcG9saW5lKHtcblx0XHRcdFx0cG9zaXRpb246IFswLCAwLjhdLFxuXHRcdFx0XHR3aWR0aDogMixcblx0XHRcdFx0dHJhbnNsYXRlU3ByaXRlOiBbMC4xLCAwLjM1XSxcblx0XHRcdFx0cm90YXRpb246IDAuMjVcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cblxuXHRcdG5ldyBkbS5EZWx0YSgnbGVmdC10dXJuaW5nLWNvbnZleW9yLWJlbHQnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdDb252ZXlvckJlbHRTeXN0ZW0oe1xuXHRcdFx0XHRjb252ZXlvckJlbHRQb3NpdGlvbjogWy0zLCAwXSxcblx0XHRcdFx0bGVuZ3RoOiAyLFxuXHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IDIsXG5cdFx0XHRcdHRyYW5zbGF0ZUNvbnZleW9yQmVsdFNwcml0ZTogWzAsIDEuM10sXG5cdFx0XHRcdGJ1dHRvblBvc2l0aW9uOiBbLTAuNCwgZG0udnAoJ2NvbnZleW9yQmVsdEJ1dHRvbkhlaWdodCcsIDEpXSxcblx0XHRcdFx0bG9jYWxCdXR0b25BbmNob3I6IFstMC4yLCAtMC4yXSxcblx0XHRcdFx0bG9jYWxDb252ZXlvckJlbHRBbmNob3I6IFsxLCAwXVxuXHRcdFx0fSk7XG5cdFx0XHRuZXdCb3dsaW5nQmFsbCh7IHBvc2l0aW9uOiBbLTIuNSwgMC42XSB9KTtcblx0XHR9KTtcblx0XHRuZXcgZG0uRGVsdGEoJ3JpZ2h0LXNob290aW5nLWNhbm5vbicsIHt9KS5pbnNlcnQoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5ld0Nhbm5vbih7XG5cdFx0XHRcdGxlZnRUb1JpZ2h0OiB0cnVlLFxuXHRcdFx0XHRwb3NpdGlvbjogWy01LCAwXVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblxuXHRcdG5ldyBkbS5EZWx0YSgncmlnaHQtdHVybmluZy1jb252ZXlvci1iZWx0Jywge30pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bmV3Q29udmV5b3JCZWx0U3lzdGVtKHtcblx0XHRcdFx0Y29udmV5b3JCZWx0UG9zaXRpb246IFszLCAwXSxcblx0XHRcdFx0bGVuZ3RoOiAyLFxuXHRcdFx0XHRzdXJmYWNlVmVsb2NpdHk6IC0yLFxuXHRcdFx0XHR0cmFuc2xhdGVDb252ZXlvckJlbHRTcHJpdGU6IFswLCAxLjNdLFxuXHRcdFx0XHRidXR0b25Qb3NpdGlvbjogWzAuNCwgZG0udnAoJ2NvbnZleW9yQmVsdEJ1dHRvbkhlaWdodCcsIDEpXSxcblx0XHRcdFx0bG9jYWxCdXR0b25BbmNob3I6IFswLjIsIC0wLjJdLFxuXHRcdFx0XHRsb2NhbENvbnZleW9yQmVsdEFuY2hvcjogWy0xLCAwXVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoZG0udnAoJ3JpZ2h0U2l0dGluZ0Jvd2xpbmdCYWxsJywgdHJ1ZSkpIHtcblx0XHRcdFx0bmV3Qm93bGluZ0JhbGwoeyBwb3NpdGlvbjogWzIuNSwgMC42XSB9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRuZXcgZG0uRGVsdGEoJ2xlZnQtc2hvb3RpbmctY2Fubm9uJywge30pLmluc2VydCgnYWRkQXJ0ZWZhY3RzJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0bmV3Q2Fubm9uKHtcblx0XHRcdFx0bGVmdFRvUmlnaHQ6IGZhbHNlLFxuXHRcdFx0XHRwb3NpdGlvbjogWzUsIDBdXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ3JlcG9zaXRpb24tY29udmV5b3ItYmVsdC1idXR0b25zJywge30pLnJlcGxhY2UoJ2NvbnZleW9yQmVsdEJ1dHRvbkhlaWdodCcsIDIpO1xuXG5cblx0XHRuZXcgZG0uRGVsdGEoJ3NlY29uZC1yaWdodC10dXJuaW5nLWNvbnZleW9yLWJlbHQnLCB7fSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRuZXdDb252ZXlvckJlbHRTeXN0ZW0oe1xuXHRcdFx0XHRjb252ZXlvckJlbHRQb3NpdGlvbjogWzEsIDBdLFxuXHRcdFx0XHRsZW5ndGg6IDIsXG5cdFx0XHRcdHN1cmZhY2VWZWxvY2l0eTogLTIsXG5cdFx0XHRcdHRyYW5zbGF0ZUNvbnZleW9yQmVsdFNwcml0ZTogWzAsIDEuM10sXG5cdFx0XHRcdGJ1dHRvblBvc2l0aW9uOiBbMC40LCBkbS52cCgnY29udmV5b3JCZWx0QnV0dG9uSGVpZ2h0JywgMSldLFxuXHRcdFx0XHRsb2NhbEJ1dHRvbkFuY2hvcjogWy0wLjEsIC0wLjI4XSxcblx0XHRcdFx0bG9jYWxDb252ZXlvckJlbHRBbmNob3I6IFstMSwgMF1cblx0XHRcdH0pO1xuXHRcdH0pLnJlbW92ZSgncmlnaHRTaXR0aW5nQm93bGluZ0JhbGwnKTtcblxuXG5cblxuXHRcdG5ldyBkbS5EZWx0YSgnY29uZmxpY3QtaW5kaWNhdG9yJywgeyByZXNvbHZlczogWydsZWZ0LWZhY2luZy10cmFtcG9saW5lJywgJ2xlZnQtdHVybmluZy1jb252ZXlvci1iZWx0J10gfSkuaW5zZXJ0KCdhZGRBcnRlZmFjdHMnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dmFyIHtzaGFwZX0gPSBuZXdSZWN0YW5nbGUoe1xuXHRcdFx0XHRcdGltYWdlOiByZXF1aXJlKCcuL2ltZy9lcnJvci5wbmcnKSxcblx0XHRcdFx0XHRwb3NpdGlvbjogWzAsIDFdLFxuXHRcdFx0XHRcdHdpZHRoOiAyLjUsXG5cdFx0XHRcdFx0aGVpZ2h0OiAyLjUsXG5cdFx0XHRcdFx0bWFzczogMFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2hhcGUuc2Vuc29yID0gdHJ1ZTtcblx0XHRcdH0sIDUwMDApO1xuXHRcdH0pLnJlcGxhY2UoJ3N0YXJ0TWFjaGluZScsIGZhbHNlKTtcblxuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuXHRcdGRtLnNlbGVjdChcblx0XHRcdFx0J2xlZnQtZ29hbCcsXG5cdFx0XHRcdC8vJ2xlZnQtZmFjaW5nLXRyYW1wb2xpbmUnLFxuXG5cdFx0XHRcdCdyaWdodC1nb2FsJyxcblx0XHRcdFx0J3JpZ2h0LXNob290aW5nLWNhbm5vbicsXG5cdFx0XHRcdCdsZWZ0LXR1cm5pbmctY29udmV5b3ItYmVsdCcsXG5cblx0XHRcdFx0J2xlZnQtc2hvb3RpbmctY2Fubm9uJyxcblx0XHRcdFx0J3JpZ2h0LXR1cm5pbmctY29udmV5b3ItYmVsdCcsXG5cdFx0XHRcdC8vXG5cdFx0XHRcdC8vJ3JlcG9zaXRpb24tY29udmV5b3ItYmVsdC1idXR0b25zJywgIC8vIGZvciB0cmFtcG9saW5lIC8gY2Fubm9uIGNvbmZsaWN0XG5cdFx0XHRcdC8vXG5cdFx0XHRcdCdzZWNvbmQtcmlnaHQtdHVybmluZy1jb252ZXlvci1iZWx0JyAvLyBmb3IgYmFkIGZlYXR1cmUgaW50ZXJhY3Rpb25cblxuXHRcdCk7XG5cblxuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0ZG0udnAoJ2FkZEFydGVmYWN0cycsIGZ1bmN0aW9uIGFkZEFydGVmYWN0cygpIHt9KSgpO1xuXG5cblx0XHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdFx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRcdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG5cdFx0dGhpcy5mcmFtZSgwLCA0LCAxMiwgMik7XG5cblx0fSk7XG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXgvaW5kZXguanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJpbmRleC5qcyJ9