require(['jquery', 'delta-js', './index.scss'], ($, DeltaJs)=> {
	'use strict';


	var dm = new DeltaJs();


	var app = new p2.WebGLRenderer(function () {

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/* close the gui controls */
		this.gui.closed = true;

		/* create the world */
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

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/* the container for all sprites */
		var spriteContainer = new PIXI.DisplayObjectContainer();
		this.stage.addChild(spriteContainer);
		function addNewSprite(sprite) {
			spriteContainer.addChild(sprite);
			spriteContainer.children.sort((a, b) => (a.zIndex < b.zIndex ? -1 : (a.zIndex === b.zIndex ? 0 : 1)));
		}

		/* attaching a new sprite to a body */
		function newSprite({image, body, zIndex, scale, translate, rotate}) {
			zIndex = zIndex || 0;
			scale = scale || [1, 1];
			translate = translate || [0, 0];
			rotate = rotate || 0;

			body.invisible = true;

			var sprite = PIXI.Sprite.fromImage(image);

			sprite.texture.baseTexture.addEventListener('loaded', ({content: texture}) => {
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

				var onPostStep = () => {
					if (body.mass === 0) { world.off('postStep', onPostStep) }
					sprite.position.x = body.position[0] + width * (width - 1) / 2 + translate[0];
					sprite.position.y = body.position[1] - width * (width - 1) / 2 + translate[1];
					sprite.rotation = body.angle + rotate;
				};
				world.on('postStep', onPostStep);
			});

			return sprite;
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		/* a circle with an image */
		function newCircle({image, radius, mass, position, zIndex, rotation, scaleSprite, translateSprite, material, invisible}) {
			radius = radius || 1;

			/* the shape */
			var shape = new p2.Circle(radius);

			/* material */
			shape.material = material;

			/* the p2 body, which is not rendered if there is an image */
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

			/* the sprite, which is rendered if there is an image */
			var sprite = image && newSprite({ image, body, zIndex, scale: scaleSprite, translate: translateSprite });

			return { body, sprite, shape, material };

		}


		/* a rectangle with an image */
		function newRectangle({image, width, height, mass, position, zIndex, rotation, scaleSprite, translateSprite, material, invisible}) {
			width = width || 1;
			height = height || 1;

			/* the shape */
			var shape = new p2.Rectangle(width, height);

			/* material */
			shape.material = material;

			/* the p2 body, which is not rendered if there is an image */
			var body = new p2.Body({
				mass: mass || 0,
				position: position || [0, 0],
				angle: rotation,
				invisible: invisible
			});
			body.addShape(shape);
			world.addBody(body);

			/* the sprite, which is rendered if there is an image */
			var sprite = image && newSprite({ image, body, zIndex, scale: scaleSprite, translate: translateSprite });

			return { body, sprite, shape, material };
		}


		/* a capsule with an image */
		function newCapsule({image, length, radius, mass, position, zIndex, rotation, scaleSprite, translateSprite, material, invisible}) {
			length = length || 1;
			radius = radius || 0.1;

			/* the shape */
			var shape = new p2.Capsule(length, radius);

			/* material */
			shape.material = material;

			/* the p2 body, which is not rendered if there is an image */
			var body = new p2.Body({
				mass: mass || 0,
				position: position || [0, 0],
				angle: rotation,
				invisible: invisible
			});
			body.addShape(shape);
			world.addBody(body);

			/* the sprite, which is rendered if there is an image */
			var sprite = image && newSprite({ image, body, zIndex, scale: scaleSprite, translate: translateSprite });

			return { body, sprite, shape, material };
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		/* a touch-activated button */
		function newButton({position, onActivation, scaleSprite, translateSprite, invisible, radius}) {

			var {body, sprite, material, shape} = newCircle({
				image: require('./img/red-button.png'),
				radius: radius || 0.3,
				mass: 0,
				position: position,
				scaleSprite: scaleSprite,
				translateSprite: translateSprite,
				zIndex: -1,
				invisible: invisible
			});
			shape.sensor = true;

			/* preload the green button texture */
			var greenButtonTexture = PIXI.Texture.fromImage(require('./img/green-button.png'));

			/* trigger callback on begin contact */
			var enabled = true;
			world.on("beginContact", (event) => {
				if ((event.bodyA === body || event.bodyB === body)) {
					if (enabled) {
						sprite.setTexture(greenButtonTexture);
						onActivation(event.bodyA === body ? event.bodyB : event.bodyA);
					}
				}
			});
			function enable() { enabled = true }
			function disable() { enabled = false }

			enable();


			return { body, sprite, material, shape, enable, disable };

		}


		/* a turn-on-able light bulb */
		var lightBulbMaterial = new p2.Material();
		function newLightBulb({position, width, scaleSprite, translateSprite}) {
			width = width || 1;

			var {body, sprite, material, shape} = newRectangle({
				image: require('./img/lightbulb-off.png'),
				width: width,
				height: width * (450 / 280),
				scaleSprite: scaleSprite,
				translateSprite: translateSprite,
				mass: 0.1,
				position: position,
				material: lightBulbMaterial
			});

			/* lightbulb action! */
			var lightBulbOnTexture = PIXI.Texture.fromImage(require('./img/lightbulb-on.png'));
			var turnOn = () => { sprite.setTexture(lightBulbOnTexture) };

			return { sprite, body, material, shape, turnOn };
		}


		/* bowling ball material*/
		var bowlingBallMaterial = new p2.Material();

		/* a bowling ball */
		function newBowlingBall({position, scaleSprite, translateSprite}) {

			var BOWLING_BALL_RADIUS = 0.5;

			var bowlingBall = newCircle({
				image: require("./img/bowling-ball.png"),
				mass: 1,
				radius: BOWLING_BALL_RADIUS,
				position: position,
				scaleSprite: scaleSprite,
				translateSprite: translateSprite,
				material: bowlingBallMaterial
			});

			/* bowling ball action! */
			bowlingBall.body.allowSleep = false;

			return bowlingBall;

		}


		/* trampoline material */
		var trampolineMaterial = new p2.Material();
		world.addContactMaterial(new p2.ContactMaterial(bowlingBallMaterial, trampolineMaterial, {
			restitution: 1,
			stiffness: Number.MAX_VALUE // We need infinite stiffness to get exact restitution
		}));

		/* a trampoline */
		function newTrampoline({position, width, rotation, translateSprite}) {
			width = width || 1;
			translateSprite = translateSprite || [0, 0];

			/* the trampoline */
			var trampoline = newRectangle({
				image: require('./img/trampoline.png'),
				position: position || [0, 0],
				rotation: rotation || 0,
				width: width,
				height: width * (397 / 930),
				translateSprite: [0 + translateSprite[0], 0.83 + translateSprite[1]],
				zIndex: -1,
				material: trampolineMaterial
			});

			/* trampoline action! */
			trampoline.body.allowSleep = false;

			return trampoline;
		}


		/* a turn-on-able conveyor belt */
		function newConveyorBelt({position, length, radius, translateSprite, surfaceVelocity}) {
			length = length || 2;
			translateSprite = translateSprite || [0, 0];

			/* the conveyor belt */
			var conveyorBelt = newCapsule({
				image: require('./img/conveyor-belt.png'),
				position: position || [0, 0],
				length: length,
				radius: radius || 0.15,
				translateSprite: translateSprite,
				zIndex: -1,
				material: new p2.Material() // one material for each belt, for customizable surface velocity
			});

			/* conveyor belt action! */
			conveyorBelt.body.allowSleep = false;
			conveyorBelt.turnOn = () => {
				var contactMaterial = new p2.ContactMaterial(bowlingBallMaterial, conveyorBelt.shape.material, {
					surfaceVelocity: surfaceVelocity || 1,
					friction: 2.0
				});
				world.addContactMaterial(contactMaterial);
			};

			return conveyorBelt;
		}


		/* a cannon */
		function newCannon({position, leftToRight, force}) {
			if (typeof leftToRight === 'undefined') { leftToRight = true }
			force = force || 600;

			var direction = (leftToRight ? 1 : -1);

			/* the cannon shapes */
			var bottom = new p2.Rectangle(1, 0.2);
			var left = new p2.Rectangle(0.2, 1.2);
			var right = new p2.Rectangle(0.2, 1.2);

			/* the cannon body */
			var body = new p2.Body({
				position: position || [0, 0],
				angle: -direction * Math.PI / 4//,
				//invisible: true
			});
			body.addShape(bottom, [0, -0.6]);
			body.addShape(left,   [-0.6, -0.1]);
			body.addShape(right,  [0.6, -0.1]);
			world.addBody(body);

			/* the sprite */
			var sprite = newSprite({
				body,
				image: require('./img/cannon.png'),
				zIndex: 10,
				scale: [direction * 1.5, 1.5],
				translate: [leftToRight ? -0.07 : -1.47, -0.74],
				rotate: direction * Math.PI / 4
			});

			/* cannon action! */
			body.allowSleep = false;
			var {enable, disable} = newButton({
				position: [position[0] - direction * 0.4, position[1] - 0.4],
				onActivation(cannonBall) {
					disable();
					setTimeout(() => {
						cannonBall.type = p2.Body.STATIC;
						setTimeout(() => {
							cannonBall.wakeUp();
							cannonBall.type = p2.Body.DYNAMIC;
							cannonBall.force = [direction * force, force];
							setTimeout(() => {
								enable();
							}, 100);
						}, 1000);
					}, 100);
				}
			});

			return {body, sprite};
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		/* button + conveyor belt */
		function newConveyorBeltSystem({conveyorBeltPosition, radius, length, surfaceVelocity, translateConveyorBeltSprite, buttonPosition, localButtonAnchor, localConveyorBeltAnchor}) {
			var {body: conveyorBelt, turnOn} = newConveyorBelt({
				position: conveyorBeltPosition,
				radius: radius,
				length: length,
				surfaceVelocity: surfaceVelocity,
				translateSprite: translateConveyorBeltSprite,
				zIndex: 999
			});

			var {body: button} = newButton({
				position: buttonPosition,
				onActivation() { turnOn() },
				zIndex: 999
			});

			world.addSpring(new p2.LinearSpring(button, conveyorBelt, {
				stiffness: 10,
				restLength: 0.3,
				localAnchorA: localButtonAnchor,
				localAnchorB: localConveyorBeltAnchor
			}));
		}


		/* goal: button + lightbulb */
		function newGoal({position}) {
			var {body: lightBulb, turnOn} = newLightBulb({
				position: [position[0], position[1] - 2],
				width: 1,
				scaleSprite: [1, -1]
			});

			var {body: button} = newButton({
				position: position,
				radius: 0.3,
				onActivation() { turnOn() }
			});

			world.addSpring(new p2.LinearSpring(button, lightBulb, {
				restLength: 0.2,
				stiffness: 7,
				localAnchorA: [0, -0.3],
				localAnchorB: [0, (450 / 280) / 2]
			}));
		}


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		new dm.Delta('initial-bowling-ball', { if: true }).insert('addArtefacts', function () {
			if (dm.vp('startMachine', true)) {
				var {body} = newBowlingBall({ position: [0, 6.3] });
				body.sleep();
				$('h1').click(() => {
					body.wakeUp();
				});
			}
		});

		new dm.Delta('left-goal', {}).insert('addArtefacts', function () {
			newGoal({ position: [-4, 5] });
		});

		new dm.Delta('right-goal', {}).insert('addArtefacts', function () {
			newGoal({ position: [4, 5] });
		});


		new dm.Delta('left-facing-trampoline', {}).insert('addArtefacts', function () {
			newTrampoline({
				position: [0, 0.8],
				width: 2,
				translateSprite: [0.1, 0.35],
				rotation: 0.25
			});
		});



		new dm.Delta('left-turning-conveyor-belt', {}).insert('addArtefacts', function () {
			newConveyorBeltSystem({
				conveyorBeltPosition: [-3, 0],
				length: 2,
				surfaceVelocity: 2,
				translateConveyorBeltSprite: [0, 1.3],
				buttonPosition: [-0.4, dm.vp('conveyorBeltButtonHeight', 1)],
				localButtonAnchor: [-0.2, -0.2],
				localConveyorBeltAnchor: [1, 0]
			});
			newBowlingBall({ position: [-2.5, 0.6] });
		});
		new dm.Delta('right-shooting-cannon', {}).insert('addArtefacts', function () {
			newCannon({
				leftToRight: true,
				position: [-5, 0]
			});
		});


		new dm.Delta('right-turning-conveyor-belt', {}).insert('addArtefacts', function () {
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
				newBowlingBall({ position: [2.5, 0.6] });
			}
		});
		new dm.Delta('left-shooting-cannon', {}).insert('addArtefacts', function () {
			newCannon({
				leftToRight: false,
				position: [5, 0]
			});
		});



		new dm.Delta('reposition-conveyor-belt-buttons', {}).replace('conveyorBeltButtonHeight', 2);


		new dm.Delta('second-right-turning-conveyor-belt', {}).insert('addArtefacts', function () {
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




		new dm.Delta('conflict-indicator', { resolves: ['left-facing-trampoline', 'left-turning-conveyor-belt'] }).insert('addArtefacts', function () {
			setTimeout(() => {
				var {shape} = newRectangle({
					image: require('./img/error.png'),
					position: [0, 1],
					width: 2.5,
					height: 2.5,
					mass: 0
				});
				shape.sensor = true;
			}, 5000);
		}).replace('startMachine', false);



		////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		window.start = () => {

			var selected = [];

			[
				'left-goal',
				'left-facing-trampoline',
				'right-goal',
				'right-shooting-cannon',
				'left-turning-conveyor-belt',
				'left-shooting-cannon',
				'right-turning-conveyor-belt',
				'reposition-conveyor-belt-buttons',
				'second-right-turning-conveyor-belt'].forEach((name) => {
						if ($('#' + name).prop('checked')) {
							selected.push(name);
						}
			});

			$('#controls').remove();


			dm.select.apply(dm, selected);


			////////////////////////////////////////////////////////////////////////////////////////////////////////////////


			dm.vp('addArtefacts', function addArtefacts() {})();


			////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////


			this.frame(0, 4, 12, 2);
		};



	});

});
