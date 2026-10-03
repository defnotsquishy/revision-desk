import { C as e, S as t, T as n, _ as r, a as i, b as a, c as o, d as s, f as c, g as l, h as u, i as d, l as f, m as p, n as m, o as h, p as g, r as _, s as v, t as y, u as b, v as x, w as S, x as C, y as w } from "./three-CCXjyONT.js";
import { t as T } from "./physics-BQeHJ3Lv.js";
//#region fracture/characters/vector.ts
function E(e) {
	for (let t of e) t.well && Object.freeze(t.well), Object.freeze(t);
	return Object.freeze(e);
}
var D = E([
	{
		key: "ability1",
		name: "Gravity Strike",
		description: "A weighty close-range punch. Commit to the wind-up, then drive your target back.",
		cooldown: 8,
		damage: 18,
		range: 3.6,
		radius: 1.4,
		cone: .65,
		knockback: 8,
		stun: .45,
		ragdoll: 0,
		startup: .18,
		recovery: .5,
		shape: "cone",
		breaksBlock: !1
	},
	{
		key: "ability2",
		name: "Repulse",
		description: "A directional force burst. Catch opponents in front of you and launch them away.",
		cooldown: 12,
		damage: 13,
		range: 7.5,
		radius: 3,
		cone: .74,
		knockback: 15,
		stun: .2,
		ragdoll: .7,
		startup: .23,
		recovery: .58,
		shape: "cone",
		breaksBlock: !1
	},
	{
		key: "ability3",
		name: "Gravity Well",
		description: "Place a brief gravity field ahead of you. Its pulses pull nearby opponents toward the centre.",
		cooldown: 16,
		damage: 2,
		range: 5,
		radius: 4.6,
		cone: Math.PI,
		knockback: 0,
		stun: .12,
		ragdoll: 0,
		startup: .3,
		recovery: .6,
		shape: "well",
		breaksBlock: !1,
		well: {
			radius: 4.6,
			duration: 3.5,
			pull: 10,
			interval: .5
		}
	},
	{
		key: "ability4",
		name: "Zero Point",
		description: "Collapse the space around you into a heavy close-range burst. Breaks a frontal guard.",
		cooldown: 20,
		damage: 26,
		range: 4.4,
		radius: 4.4,
		cone: Math.PI,
		knockback: 18,
		stun: .25,
		ragdoll: 1.1,
		startup: .38,
		recovery: .8,
		shape: "radial",
		breaksBlock: !0
	}
]), O = E([
	{
		key: "ability1",
		name: "Orbit Breaker",
		description: "A compressed force strike with a longer reach and a sharp upward launch.",
		cooldown: 6,
		damage: 23,
		range: 4.5,
		radius: 2,
		cone: .7,
		knockback: 12,
		stun: .35,
		ragdoll: .55,
		startup: .16,
		recovery: .48,
		shape: "cone",
		breaksBlock: !1
	},
	{
		key: "ability2",
		name: "Tidal Force",
		description: "A broad directional wave that pushes opponents out of your space.",
		cooldown: 9,
		damage: 19,
		range: 9,
		radius: 4,
		cone: .85,
		knockback: 19,
		stun: .25,
		ragdoll: .95,
		startup: .2,
		recovery: .55,
		shape: "cone",
		breaksBlock: !1
	},
	{
		key: "ability3",
		name: "Singularity Well",
		description: "A wider, stronger gravity field. Keep your opponents in its pulses, then follow up.",
		cooldown: 13,
		damage: 3,
		range: 6,
		radius: 6,
		cone: Math.PI,
		knockback: 0,
		stun: .15,
		ragdoll: 0,
		startup: .28,
		recovery: .56,
		shape: "well",
		breaksBlock: !1,
		well: {
			radius: 6,
			duration: 4,
			pull: 13,
			interval: .5
		}
	},
	{
		key: "ability4",
		name: "Event Horizon",
		description: "Release a heavy radial blast. A powerful guard-breaker, but the wind-up leaves you exposed.",
		cooldown: 16,
		damage: 32,
		range: 5.5,
		radius: 5.5,
		cone: Math.PI,
		knockback: 22,
		stun: .3,
		ragdoll: 1.3,
		startup: .42,
		recovery: .88,
		shape: "radial",
		breaksBlock: !0
	}
]), k = Object.freeze({
	name: "VECTOR",
	title: "Directional force",
	description: "Control the fight with momentum, gravity and precise movement.",
	abilities: D,
	awakenedAbilities: O,
	special: Object.freeze({
		name: "Vector Shift",
		cooldown: 10,
		speed: 30,
		duration: .16
	}),
	dash: Object.freeze({
		cooldown: 2.2,
		speed: 22,
		duration: .18
	}),
	awakening: Object.freeze({
		name: "Absolute Direction",
		duration: 20,
		transformation: .75,
		dealtGain: 1.1,
		receivedGain: 1.4
	})
}), A = Object.freeze([
	{
		damage: 6,
		startup: .09,
		recovery: .25,
		next: .27,
		knockback: 1.4,
		stun: .23,
		ragdoll: 0
	},
	{
		damage: 6,
		startup: .1,
		recovery: .25,
		next: .27,
		knockback: 1.4,
		stun: .23,
		ragdoll: 0
	},
	{
		damage: 7,
		startup: .12,
		recovery: .28,
		next: .3,
		knockback: 1.8,
		stun: .27,
		ragdoll: 0
	},
	{
		damage: 10,
		startup: .16,
		recovery: .54,
		next: .78,
		knockback: 11.5,
		stun: .25,
		ragdoll: .85
	}
].map((e) => Object.freeze(e)));
function j(e) {
	return e ? O : D;
}
function M(e, t) {
	return j(t).find((t) => t.key === e);
}
//#endregion
//#region fracture/abilities/hitboxes.ts
function N(e, t) {
	let n = t.position.x - e.origin.x, r = t.position.z - e.origin.z, i = Math.hypot(n, r);
	return t.health <= 0 || Math.abs(t.position.y - e.origin.y) > 2.5 || i > e.range + .45 ? !1 : e.shape === "radial" || i < .05 || (Math.sin(e.yaw) * n + Math.cos(e.yaw) * r) / i >= Math.cos(e.cone);
}
function P(e, t) {
	if (e.state !== "blocking") return !1;
	let n = t.x - e.position.x, r = t.z - e.position.z, i = Math.hypot(n, r);
	return i < .01 || (Math.sin(e.yaw) * n + Math.cos(e.yaw) * r) / i >= Math.cos(Math.PI / 3);
}
function F(e, t, n) {
	let r = t.x - e.x, i = t.z - e.z, a = Math.hypot(r, i);
	return a > .001 ? {
		x: r / a,
		y: 0,
		z: i / a
	} : {
		x: Math.sin(n),
		y: 0,
		z: Math.cos(n)
	};
}
//#endregion
//#region fracture/combat/simulation.ts
var I = () => ({
	x: 0,
	y: 0,
	z: 0
}), L = (e) => ({ ...e }), R = (e, t, n) => Math.max(t, Math.min(n, e)), z = /* @__PURE__ */ new Set([
	"stunned",
	"ragdolled",
	"awakening",
	"attacking",
	"dashing"
]);
function B(e, t, n) {
	return {
		id: e,
		position: L(t),
		velocity: I(),
		yaw: n,
		health: 100,
		maxHealth: 100,
		state: "idle",
		stateUntil: 0,
		grounded: !0,
		combo: 0,
		comboUntil: 0,
		nextAttack: 0,
		cooldowns: {},
		awakening: 0,
		awakenedUntil: 0,
		attackSerial: 0
	};
}
var V = class {
	player = B("player", {
		x: 0,
		y: 0,
		z: 7
	}, Math.PI);
	dummies = [B("dummy-1", {
		x: 0,
		y: 0,
		z: 2
	}, 0), B("dummy-2", {
		x: 7,
		y: 0,
		z: -5
	}, Math.PI)];
	props = [
		{
			id: "crate-1",
			position: {
				x: -5,
				y: .7,
				z: 3
			},
			size: {
				x: 1.4,
				y: 1.4,
				z: 1.4
			},
			health: 28,
			maxHealth: 28,
			respawnAt: 0
		},
		{
			id: "crate-2",
			position: {
				x: -6.7,
				y: .7,
				z: 3
			},
			size: {
				x: 1.4,
				y: 1.4,
				z: 1.4
			},
			health: 28,
			maxHealth: 28,
			respawnAt: 0
		},
		{
			id: "barrier-1",
			position: {
				x: 6,
				y: 1.1,
				z: 3
			},
			size: {
				x: 3,
				y: 2.2,
				z: .55
			},
			health: 42,
			maxHealth: 42,
			respawnAt: 0
		}
	];
	now = 0;
	stats = {
		damage: 0,
		comboDamage: 0,
		hits: 0,
		dps: 0
	};
	events = [];
	externalPhysics = /* @__PURE__ */ new Set();
	impacts = [];
	wells = [];
	input = {
		moveX: 0,
		moveZ: 0,
		yaw: Math.PI,
		sprint: !1,
		block: !1,
		actions: []
	};
	firstHit = -1;
	lastHit = -1;
	playerRespawnAt = 0;
	dummyRespawns = /* @__PURE__ */ new Map();
	spawnPoints = new Map(this.dummies.map((e) => [e.id, L(e.position)]));
	tick(e, t) {
		if (!Number.isFinite(e) || e < 0) return;
		this.input = t, Number.isFinite(t.yaw) && (this.player.yaw = t.yaw), this.setBlock(t.block);
		for (let e of t.actions) this.act(e);
		let n = Math.min(e, 2);
		for (; n > 1e-9;) {
			let e = Math.min(n, 1 / 120);
			this.now += e, this.step(e), n -= e;
		}
	}
	act(e) {
		let t = this.player;
		if (t.health <= 0 || z.has(t.state) || t.state === "blocking") return !1;
		if (e === "jump") return t.grounded ? (t.grounded = !1, t.velocity.y = 8.5, t.state = "jumping", t.stateUntil = 0, !0) : !1;
		if (e === "dash" || e === "special") {
			let n = e === "dash" ? k.dash : k.special;
			if ((t.cooldowns[e] ?? 0) > this.now) return !1;
			let r = this.moveDirection();
			return t.velocity.x = r.x * n.speed, t.velocity.z = r.z * n.speed, t.state = "dashing", t.stateUntil = this.now + n.duration, t.cooldowns[e] = this.now + n.cooldown, this.emit({
				type: "dash",
				position: L(t.position),
				attackerId: t.id,
				strength: n.speed,
				ability: e === "special" ? k.special.name : "Dash"
			}), !0;
		}
		if (e === "awaken") {
			if (t.awakening < 100 || t.awakenedUntil > this.now || !t.grounded) return !1;
			t.awakening = 0, t.awakenedUntil = this.now + k.awakening.transformation + k.awakening.duration, t.state = "awakening", t.stateUntil = this.now + k.awakening.transformation;
			for (let e of [
				"ability1",
				"ability2",
				"ability3",
				"ability4"
			]) t.cooldowns[e] = this.now;
			return this.emit({
				type: "awake",
				position: L(t.position),
				attackerId: t.id,
				ability: k.awakening.name,
				strength: k.awakening.duration
			}), !0;
		}
		if (e === "m1") return this.melee();
		let n = M(e, t.awakenedUntil > this.now);
		return !n || (t.cooldowns[n.key] ?? 0) > this.now ? !1 : (t.cooldowns[n.key] = this.now + n.cooldown, t.combo = 0, t.comboUntil = 0, this.beginImpact({
			name: n.name,
			damage: n.damage,
			range: n.range,
			cone: n.cone,
			knockback: n.knockback,
			stun: n.stun,
			ragdoll: n.ragdoll,
			breaksBlock: n.breaksBlock,
			shape: n.shape,
			config: n
		}, n.startup, n.recovery), !0);
	}
	setBlock(e) {
		let t = this.player;
		e && t.health > 0 && t.grounded && !z.has(t.state) ? (t.state = "blocking", t.stateUntil = Infinity) : !e && t.state === "blocking" && (t.state = t.grounded ? "idle" : "jumping", t.stateUntil = 0);
	}
	takeEvents() {
		let e = this.events;
		return this.events = [], e;
	}
	resetTraining() {
		let e = this.now, t = B("player", {
			x: 0,
			y: 0,
			z: 7
		}, Math.PI);
		Object.assign(this.player, t);
		for (let e of this.dummies) Object.assign(e, B(e.id, this.spawnPoints.get(e.id) ?? {
			x: 0,
			y: 0,
			z: 2
		}, e.id === "dummy-1" ? 0 : Math.PI));
		for (let e of this.props) e.health = e.maxHealth, e.respawnAt = 0;
		this.impacts = [], this.wells = [], this.dummyRespawns.clear(), this.playerRespawnAt = 0, this.externalPhysics.clear(), this.firstHit = -1, this.lastHit = -1, Object.assign(this.stats, {
			damage: 0,
			comboDamage: 0,
			hits: 0,
			dps: 0
		}), this.now = e, this.events = [{
			type: "respawn",
			position: L(this.player.position),
			targetId: this.player.id
		}];
	}
	debugHeal() {
		this.player.health = this.player.maxHealth;
	}
	debugAwaken() {
		this.player.awakenedUntil <= this.now && (this.player.awakening = 100);
	}
	debugSpawnDummy(e) {
		let t = e && [
			e.x,
			e.y,
			e.z
		].every(Number.isFinite) ? {
			x: R(e.x, -22, 22),
			y: Math.max(0, e.y),
			z: R(e.z, -22, 22)
		} : {
			x: this.player.position.x + Math.sin(this.player.yaw) * 4,
			y: 0,
			z: this.player.position.z + Math.cos(this.player.yaw) * 4
		}, n = B(`dummy-${this.dummies.length + 1}`, t, this.player.yaw + Math.PI);
		return this.dummies.push(n), this.spawnPoints.set(n.id, L(t)), this.emit({
			type: "respawn",
			position: L(t),
			targetId: n.id
		}), n;
	}
	receiveDamage(e, t, n = 0, r = 0, i = .3, a = !1) {
		let o = this.player;
		if (!Number.isFinite(e) || e <= 0 || ![
			t.x,
			t.y,
			t.z,
			n,
			r,
			i
		].every(Number.isFinite) || o.health <= 0 || o.state === "awakening" || o.state === "dashing") return !1;
		let s = P(o, t) && !a, c = Math.min(o.health, Math.min(e, 100) * (s ? .12 : 1));
		if (o.health = Math.max(0, o.health - c), o.awakenedUntil <= this.now && (o.awakening = R(o.awakening + c * k.awakening.receivedGain, 0, 100)), !s) {
			o.attackSerial += 1;
			let e = F(t, o.position, o.yaw);
			o.velocity.x = e.x * R(n, 0, 30), o.velocity.z = e.z * R(n, 0, 30), r > 0 && (o.velocity.y = 5, o.grounded = !1), o.state = r > 0 ? "ragdolled" : "stunned", o.stateUntil = this.now + R(Math.max(r, i), .05, 3);
		}
		return this.emit({
			type: s ? "block" : "hit",
			position: L(o.position),
			targetId: o.id,
			attackerId: "opponent",
			damage: c,
			strength: n
		}), o.health === 0 && (o.state = "ragdolled", o.stateUntil = Infinity, this.playerRespawnAt = this.now + 3), !0;
	}
	emit(e) {
		this.events.length >= 256 && this.events.shift(), this.events.push(e);
	}
	moveDirection() {
		let e = Number.isFinite(this.input.moveX) ? this.input.moveX : 0, t = Number.isFinite(this.input.moveZ) ? this.input.moveZ : 0, n = Math.hypot(e, t);
		return n > .05 ? {
			x: e / n,
			y: 0,
			z: t / n
		} : {
			x: Math.sin(this.player.yaw),
			y: 0,
			z: Math.cos(this.player.yaw)
		};
	}
	melee() {
		let e = this.player;
		if (e.nextAttack > this.now) return !1;
		(e.comboUntil <= this.now || e.combo >= 4) && (e.combo = 0, this.stats.comboDamage = 0), e.combo += 1;
		let t = A[e.combo - 1];
		return t ? (e.comboUntil = this.now + 1.05, e.nextAttack = this.now + t.next, this.beginImpact({
			name: `M1 ${e.combo}`,
			damage: t.damage,
			range: 3,
			cone: .85,
			knockback: t.knockback,
			stun: t.stun,
			ragdoll: t.ragdoll,
			breaksBlock: e.combo === 4,
			shape: "cone"
		}, t.startup, t.recovery), !0) : !1;
	}
	beginImpact(e, t, n) {
		this.player.attackSerial += 1, this.player.state = "attacking", this.player.stateUntil = this.now + n, this.player.velocity.x = 0, this.player.velocity.z = 0, this.impacts.push({
			...e,
			at: this.now + t,
			serial: this.player.attackSerial,
			yaw: this.player.yaw
		}), this.emit({
			type: "attack",
			position: L(this.player.position),
			attackerId: this.player.id,
			ability: e.name,
			strength: e.damage
		});
	}
	step(e) {
		let t = this.player;
		this.playerRespawnAt > 0 && this.playerRespawnAt <= this.now && (Object.assign(t, B("player", {
			x: 0,
			y: 0,
			z: 7
		}, Math.PI)), this.playerRespawnAt = 0, this.impacts = [], this.emit({
			type: "respawn",
			position: L(t.position),
			targetId: t.id
		})), t.awakenedUntil > 0 && t.awakenedUntil <= this.now && (t.awakenedUntil = 0), this.recover(t), t.comboUntil > 0 && t.comboUntil <= this.now && (t.combo = 0, t.comboUntil = 0, this.stats.comboDamage = 0), t.state === "jumping" && t.grounded && (t.state = "idle"), (t.state === "idle" || t.state === "running") && (t.state = Math.hypot(this.input.moveX, this.input.moveZ) > .05 ? "running" : "idle"), this.input.block && this.setBlock(!0);
		let n = this.impacts.filter((e) => e.at <= this.now + 1e-8);
		this.impacts = this.impacts.filter((e) => e.at > this.now + 1e-8);
		for (let e of n) e.serial !== t.attackSerial || t.health <= 0 || t.state === "stunned" || t.state === "ragdolled" || this.resolveImpact(e);
		this.stepWells(e);
		for (let t of this.dummies) {
			let n = this.dummyRespawns.get(t.id);
			n !== void 0 && this.now >= n && (Object.assign(t, B(t.id, this.spawnPoints.get(t.id) ?? {
				x: 0,
				y: 0,
				z: 2
			}, t.id === "dummy-1" ? 0 : Math.PI)), this.dummyRespawns.delete(t.id), this.externalPhysics.delete(t.id), this.emit({
				type: "respawn",
				position: L(t.position),
				targetId: t.id
			})), this.recover(t), this.externalPhysics.has(t.id) || this.integrateDummy(t, e);
		}
		for (let e of this.props) e.health <= 0 && e.respawnAt <= this.now && (e.health = e.maxHealth, e.respawnAt = 0, this.emit({
			type: "respawn",
			position: L(e.position),
			targetId: e.id
		}));
		this.firstHit >= 0 && (this.stats.dps = this.stats.damage / Math.max(1, this.now - this.firstHit)), this.lastHit >= 0 && this.now - this.lastHit > 1.5 && t.combo === 0 && (this.stats.comboDamage = 0);
	}
	recover(e) {
		if (!(e.health <= 0 || e.state === "blocking" || e.stateUntil > this.now) && z.has(e.state)) {
			let t = e.state === "dashing";
			e.state = e.grounded ? "idle" : "jumping", e.stateUntil = 0, t && (e.velocity.x = 0, e.velocity.z = 0);
		}
	}
	resolveImpact(e) {
		let t = L(this.player.position);
		if (e.shape === "well" && e.config?.well) {
			t.x += Math.sin(e.yaw) * e.range, t.z += Math.cos(e.yaw) * e.range, t.y = 0, this.wells.push({
				origin: t,
				config: e.config,
				ends: this.now + e.config.well.duration,
				next: this.now
			}), this.emit({
				type: "well",
				position: L(t),
				attackerId: this.player.id,
				ability: e.name,
				strength: e.config.well.radius
			});
			return;
		}
		let n = {
			origin: t,
			yaw: e.yaw,
			range: e.range,
			cone: e.cone,
			shape: e.shape === "radial" ? "radial" : "cone"
		};
		for (let r of this.dummies) N(n, r) && this.damage(r, e, t);
		if (e.knockback >= 7) for (let t of this.props) {
			if (t.health <= 0) continue;
			let r = B(t.id, {
				x: t.position.x,
				y: 0,
				z: t.position.z
			}, 0);
			N({
				...n,
				range: n.range + Math.max(t.size.x, t.size.z) * .5
			}, r) && (t.health = Math.max(0, t.health - e.damage * 1.5), t.health === 0 && (t.respawnAt = this.now + 12, this.emit({
				type: "break",
				position: L(t.position),
				attackerId: this.player.id,
				targetId: t.id,
				strength: e.knockback,
				ability: e.name
			})));
		}
	}
	damage(e, t, n) {
		if (e.health <= 0 || e.state === "awakening" || e.state === "dashing") return;
		let r = P(e, n) && !t.breaksBlock, i = Math.min(e.health, r ? t.damage * .12 : t.damage);
		if (e.health = Math.max(0, e.health - i), r) this.emit({
			type: "block",
			position: L(e.position),
			targetId: e.id,
			attackerId: this.player.id,
			damage: i,
			ability: t.name
		});
		else {
			let r = F(n, e.position, t.yaw);
			if (e.velocity.x = r.x * t.knockback, e.velocity.z = r.z * t.knockback, t.ragdoll > 0 && (e.velocity.y = 4.2 + t.knockback * .12, e.grounded = !1), e.state !== "ragdolled" || e.stateUntil <= this.now || t.ragdoll > 0) {
				let n = Number.isFinite(e.stateUntil) ? e.stateUntil : 0;
				e.state = t.ragdoll > 0 ? "ragdolled" : "stunned", e.stateUntil = Math.max(n, this.now + Math.max(t.ragdoll, t.stun));
			}
			this.emit({
				type: "hit",
				position: L(e.position),
				targetId: e.id,
				attackerId: this.player.id,
				damage: i,
				strength: t.knockback,
				ability: t.name
			});
		}
		this.recordDamage(i), e.health === 0 && (e.state = "ragdolled", e.stateUntil = Infinity, this.dummyRespawns.set(e.id, this.now + 3));
	}
	recordDamage(e) {
		this.firstHit < 0 && (this.firstHit = this.now), (this.lastHit < 0 || this.now - this.lastHit > 1.5) && (this.stats.comboDamage = 0), this.lastHit = this.now, this.stats.damage += e, this.stats.comboDamage += e, this.stats.hits += 1, this.player.awakenedUntil <= this.now && (this.player.awakening = R(this.player.awakening + e * k.awakening.dealtGain, 0, 100));
	}
	stepWells(e) {
		this.wells = this.wells.filter((e) => e.ends > this.now);
		for (let t of this.wells) {
			let n = t.config.well;
			if (n) {
				for (let r of this.dummies) {
					if (r.health <= 0 || Math.abs(r.position.y - t.origin.y) > 3) continue;
					let i = Math.hypot(r.position.x - t.origin.x, r.position.z - t.origin.z);
					if (i > n.radius || i < .1) continue;
					let a = F(r.position, t.origin, 0);
					r.velocity.x += a.x * n.pull * e, r.velocity.z += a.z * n.pull * e;
				}
				if (t.next <= this.now) {
					t.next += n.interval;
					let e = {
						at: this.now,
						serial: this.player.attackSerial,
						yaw: 0,
						name: t.config.name,
						damage: t.config.damage,
						range: n.radius,
						cone: Math.PI,
						knockback: 0,
						stun: t.config.stun,
						ragdoll: 0,
						breaksBlock: !1,
						shape: "radial"
					};
					for (let r of this.dummies) if (N({
						origin: t.origin,
						yaw: 0,
						range: n.radius,
						cone: Math.PI,
						shape: "radial"
					}, r)) {
						let n = L(r.velocity);
						this.damage(r, e, t.origin), r.velocity.x = n.x, r.velocity.z = n.z;
					}
				}
			}
		}
	}
	integrateDummy(e, t) {
		e.velocity.y -= e.grounded ? 0 : 20 * t, e.position.x = R(e.position.x + e.velocity.x * t, -23, 23), e.position.z = R(e.position.z + e.velocity.z * t, -23, 23), e.position.y = Math.max(0, e.position.y + e.velocity.y * t), e.position.y <= 0 && (e.grounded = !0, e.velocity.y = 0, e.state === "jumping" && (e.state = "idle"));
		let n = Math.exp(-(e.grounded ? 8 : 1.5) * t);
		e.velocity.x *= n, e.velocity.z *= n;
	}
}, H = {
	Space: "jump",
	KeyQ: "dash",
	KeyR: "special",
	KeyG: "awaken",
	Digit1: "ability1",
	Digit2: "ability2",
	Digit3: "ability3",
	Digit4: "ability4"
}, U = class {
	canvas;
	onPause;
	onGesture;
	keys = /* @__PURE__ */ new Set();
	queued = [];
	dragging = !1;
	previousX = 0;
	previousY = 0;
	active = !0;
	listeners = new AbortController();
	lockRequested = !1;
	yaw = Math.PI;
	pitch = .28;
	sensitivity = 1;
	constructor(e, t, n) {
		this.canvas = e, this.onPause = t, this.onGesture = n, e.tabIndex = 0, e.setAttribute("aria-label", "FRACTURE arena. Click to capture mouse; Escape opens menu.");
		let r = this.listeners.signal;
		e.addEventListener("pointerdown", this.pointerDown, { signal: r }), window.addEventListener("pointerup", this.pointerUp, { signal: r }), window.addEventListener("pointermove", this.pointerMove, { signal: r }), window.addEventListener("keydown", this.keyDown, { signal: r }), window.addEventListener("keyup", this.keyUp, { signal: r }), window.addEventListener("blur", this.blur, { signal: r }), document.addEventListener("pointerlockchange", this.lockChange, { signal: r }), e.addEventListener("contextmenu", (e) => e.preventDefault(), { signal: r });
	}
	ownsInput() {
		return this.active && (document.pointerLockElement === this.canvas || document.activeElement === this.canvas);
	}
	pointerDown = (e) => {
		this.active && (this.canvas.focus({ preventScroll: !0 }), this.onGesture(), e.button === 0 && this.queued.push("m1"), e.button === 2 && (this.dragging = !0, this.previousX = e.clientX, this.previousY = e.clientY), e.button === 0 && document.pointerLockElement !== this.canvas && this.requestLock(), e.preventDefault());
	};
	pointerUp = () => {
		this.dragging = !1;
	};
	pointerMove = (e) => {
		if (!this.active) return;
		let t = 0, n = 0;
		document.pointerLockElement === this.canvas ? (t = e.movementX, n = e.movementY) : this.dragging && this.ownsInput() && (t = e.clientX - this.previousX, n = e.clientY - this.previousY, this.previousX = e.clientX, this.previousY = e.clientY), this.yaw -= t * .0025 * this.sensitivity, this.pitch = Math.max(-.2, Math.min(1.05, this.pitch + n * .0025 * this.sensitivity));
	};
	keyDown = (e) => {
		if (this.ownsInput()) {
			if (e.code === "Escape") {
				e.preventDefault(), this.pause(), this.onPause();
				return;
			}
			(H[e.code] || [
				"KeyW",
				"KeyA",
				"KeyS",
				"KeyD",
				"KeyF",
				"ShiftLeft",
				"ShiftRight"
			].includes(e.code)) && (e.preventDefault(), this.onGesture(), this.keys.add(e.code), !e.repeat && H[e.code] && this.queued.push(H[e.code]));
		}
	};
	keyUp = (e) => {
		this.keys.delete(e.code);
	};
	blur = () => {
		this.active && (this.pause(), this.onPause());
	};
	lockChange = () => {
		document.pointerLockElement === this.canvas ? this.lockRequested = !0 : this.lockRequested && this.active && (this.lockRequested = !1, this.pause(), this.onPause());
	};
	requestLock() {
		try {
			let e = this.canvas.requestPointerLock();
			e && typeof e.catch == "function" && e.catch(() => {});
		} catch {}
	}
	frame() {
		this.ownsInput() || (this.keys.clear(), this.queued.length = 0);
		let e = +!!this.keys.has("KeyW") - !!this.keys.has("KeyS"), t = +!!this.keys.has("KeyD") - !!this.keys.has("KeyA"), n = Math.hypot(e, t) || 1;
		return {
			moveX: (Math.sin(this.yaw) * e - Math.cos(this.yaw) * t) / n,
			moveZ: (Math.cos(this.yaw) * e + Math.sin(this.yaw) * t) / n,
			yaw: this.yaw,
			sprint: this.keys.has("ShiftLeft") || this.keys.has("ShiftRight"),
			block: this.keys.has("KeyF"),
			actions: this.queued.splice(0)
		};
	}
	pause() {
		this.active = !1, this.keys.clear(), this.queued.length = 0, this.dragging = !1, document.pointerLockElement === this.canvas && document.exitPointerLock();
	}
	resume() {
		this.active = !0, this.canvas.focus({ preventScroll: !0 }), this.onGesture(), this.requestLock();
	}
	dispose() {
		this.pause(), this.listeners.abort();
	}
}, W = class {
	root = new o();
	body = new o();
	parts = [];
	leftArm = new o();
	rightArm = new o();
	leftLeg = new o();
	rightLeg = new o();
	torso = new o();
	geometries = [];
	materials = [];
	phase = 0;
	attackStarted = -10;
	lastAttack = -1;
	colour;
	glow;
	marker;
	baseColour;
	constructor(e, t = !1) {
		this.baseColour = t ? 13011807 : 4609645, this.colour = new g({
			color: t ? 13011807 : 4609645,
			roughness: .6,
			metalness: .18
		});
		let r = new g({
			color: t ? 3945776 : 1910325,
			roughness: .7
		});
		this.glow = new g({
			color: t ? 16763283 : 8846307,
			emissive: t ? 10182190 : 4768940,
			emissiveIntensity: .65
		}), this.materials.push(this.colour, r, this.glow), this.body.add(this.torso, this.leftArm, this.rightArm, this.leftLeg, this.rightLeg), this.root.add(this.body), this.torso.position.y = 1.15, this.part("torso", this.torso, new n(0, 0, 0), new n(.66, .67, .4), this.colour, new n(0, 1.15, 0)), this.part("head", this.torso, new n(0, .57, 0), new n(.4, .43, .39), r, new n(0, 1.72, 0));
		let i = this.mesh(new m(.32, .055, .04), this.glow);
		i.position.set(0, .62, .205), this.torso.add(i);
		let o = this.mesh(new u(.12), this.glow);
		o.scale.z = .4, o.position.set(0, .04, .225), this.torso.add(o), this.leftArm.position.set(-.46, 1.43, 0), this.rightArm.position.set(.46, 1.43, 0), this.part("armLeft", this.leftArm, new n(0, -.28, 0), new n(.24, .68, .27), this.colour, new n(-.46, 1.15, 0)), this.part("armRight", this.rightArm, new n(0, -.28, 0), new n(.24, .68, .27), this.colour, new n(.46, 1.15, 0)), this.leftLeg.position.set(-.19, .78, 0), this.rightLeg.position.set(.19, .78, 0), this.part("legLeft", this.leftLeg, new n(0, -.36, 0), new n(.28, .76, .3), r, new n(-.19, .42, 0)), this.part("legRight", this.rightLeg, new n(0, -.36, 0), new n(.28, .76, .3), r, new n(.19, .42, 0));
		let s = this.mesh(new a(.55, .62, 24), new c({
			color: t ? 16038025 : 6801593,
			transparent: !0,
			opacity: .6,
			side: 2,
			depthWrite: !1
		}));
		this.materials.push(s.material), s.rotation.x = -Math.PI / 2, s.position.y = .035, this.root.add(s), this.marker = s, e.add(this.root);
	}
	mesh(e, t) {
		this.geometries.push(e);
		let n = new s(e, t);
		return n.castShadow = !0, n.receiveShadow = !0, n;
	}
	part(e, t, n, r, i, a) {
		let o = this.mesh(new m(r.x, r.y, r.z), i);
		o.position.copy(n), t.add(o), this.parts.push({
			name: e,
			mesh: o,
			offset: a,
			size: r
		});
	}
	update(e, t, n, r) {
		this.root.position.set(e.position.x, e.position.y, e.position.z), this.root.rotation.y = e.yaw, this.body.visible = !r && e.health > 0, this.marker.visible = e.health > 0;
		let i = e.awakenedUntil > n;
		this.glow.emissiveIntensity = i ? 2.1 : .65, this.colour.color.setHex(i ? 6713733 : this.baseColour), this.phase += t * (e.state === "running" ? 15 : 4);
		let a = e.state === "running" ? Math.sin(this.phase) * .65 : 0, o = !e.grounded;
		this.leftLeg.rotation.x = o ? -.45 : a, this.rightLeg.rotation.x = o ? .45 : -a, this.leftArm.rotation.set(-a * .7, 0, .08), this.rightArm.rotation.set(a * .7, 0, -.08), this.torso.rotation.set(0, 0, 0), this.body.position.y = e.state === "running" ? Math.abs(Math.sin(this.phase)) * .035 : Math.sin(n * 2) * .01, e.attackSerial !== this.lastAttack && (this.attackStarted = n, this.lastAttack = e.attackSerial);
		let s = n - this.attackStarted;
		if (s < .4 && e.attackSerial > 0) {
			let t = Math.sin(Math.min(1, s / .28) * Math.PI), n = e.combo % 2 ? this.rightArm : this.leftArm;
			n.rotation.x = -t * 1.7, this.torso.rotation.y = t * (e.combo % 2 ? -.32 : .32);
		}
		e.state === "blocking" && (this.leftArm.rotation.x = this.rightArm.rotation.x = -1.65, this.leftArm.rotation.z = -.3, this.rightArm.rotation.z = .3), e.state === "dashing" && (this.torso.rotation.x = .22, this.leftArm.rotation.x = this.rightArm.rotation.x = .6), e.state === "awakening" && (this.leftArm.rotation.z = -1, this.rightArm.rotation.z = 1, this.body.position.y = Math.sin(n * 20) * .03), e.state === "stunned" && (this.torso.rotation.x = -.25), e.state === "ragdolled" && !r && (this.torso.rotation.x = -.4, this.body.position.y -= .25);
	}
	dispose() {
		this.root.removeFromParent(), this.geometries.forEach((e) => e.dispose()), this.materials.forEach((e) => e.dispose());
	}
}, G = 65551, K = 131073, q = 262145, J = .935, Y = class {
	world = new T.World({
		x: 0,
		y: -24,
		z: 0
	});
	playerBody;
	playerCollider;
	controller;
	vertical = 0;
	lastState = "idle";
	desired = {
		x: 0,
		y: 0,
		z: 0
	};
	constructor(e) {
		this.playerBody = this.world.createRigidBody(T.RigidBodyDesc.kinematicPositionBased().setTranslation(e.x, e.y + J, e.z)), this.playerCollider = this.world.createCollider(T.ColliderDesc.capsule(.56, .35).setCollisionGroups(K), this.playerBody), this.controller = this.world.createCharacterController(.025), this.controller.setNormalNudgeFactor(.01), this.controller.enableAutostep(.4, .25, !1), this.controller.enableSnapToGround(.4), this.controller.setMaxSlopeClimbAngle(Math.PI / 4), this.controller.setMinSlopeSlideAngle(Math.PI / 3);
	}
	box(e, t) {
		return this.world.createCollider(T.ColliderDesc.cuboid(t.x / 2, t.y / 2, t.z / 2).setTranslation(e.x, e.y, e.z).setCollisionGroups(G));
	}
	move(e, t, n) {
		let r = this.playerBody.translation(), i = [
			"stunned",
			"ragdolled",
			"awakening"
		].includes(e.state), a = e.state === "blocking" ? 2.2 : e.state === "attacking" ? 1.1 : t.sprint ? 9.5 : 6;
		e.velocity.y > this.vertical && !e.grounded && (this.vertical = e.velocity.y), e.grounded && e.velocity.y > 1 && (this.vertical = e.velocity.y), this.vertical -= 24 * n;
		let o = e.state === "dashing" || e.state === "stunned" || e.state === "ragdolled";
		this.desired.x = (o ? e.velocity.x : i ? 0 : t.moveX * a) * n, this.desired.z = (o ? e.velocity.z : i ? 0 : t.moveZ * a) * n, this.desired.y = this.vertical * n, e.state !== "dashing" && this.lastState === "dashing" && (e.velocity.x = e.velocity.z = 0), this.controller.computeColliderMovement(this.playerCollider, this.desired, T.QueryFilterFlags.EXCLUDE_SENSORS, K);
		let s = this.controller.computedMovement();
		this.playerBody.setNextKinematicTranslation({
			x: r.x + s.x,
			y: r.y + s.y,
			z: r.z + s.z
		}), e.grounded = this.controller.computedGrounded(), e.grounded && this.vertical < 0 ? this.vertical = -.2 : this.vertical > 0 && s.y < this.desired.y - .001 && (this.vertical = 0), e.velocity.y = this.vertical, this.lastState = e.state;
	}
	step(e, t, n = !0) {
		if (this.world.timestep = e, this.world.step(), !n) return;
		let r = this.playerBody.translation();
		t.position.x = r.x, t.position.y = r.y - J, t.position.z = r.z, r.y < -10 && this.reset(t);
	}
	align(e) {
		let t = {
			x: e.position.x,
			y: e.position.y + J,
			z: e.position.z
		};
		this.playerBody.setTranslation(t, !0), this.playerBody.setNextKinematicTranslation(t), this.vertical = e.velocity.y;
	}
	reset(e) {
		this.playerBody.setTranslation({
			x: 0,
			y: J,
			z: 7
		}, !0), this.playerBody.setNextKinematicTranslation({
			x: 0,
			y: J,
			z: 7
		}), e.position.x = 0, e.position.y = 0, e.position.z = 7, e.velocity.x = e.velocity.y = e.velocity.z = this.vertical = 0, e.grounded = !0;
	}
	dispose() {
		this.world.free();
	}
}, X = class {
	parts = [];
	group = new o();
	yawRotation = new x();
	joints = [];
	physics;
	constructor(e, t, r, i) {
		this.physics = e, this.yawRotation.setFromAxisAngle(new n(0, 1, 0), i.yaw);
		for (let t of r.parts) {
			let n = t.offset.clone().applyQuaternion(this.yawRotation), r = T.RigidBodyDesc.dynamic().setTranslation(i.position.x + n.x, i.position.y + n.y, i.position.z + n.z).setRotation(this.yawRotation).setLinearDamping(.8).setAngularDamping(1.5).setCcdEnabled(!0).setLinvel(i.velocity.x, Math.max(2, i.velocity.y), i.velocity.z), a = e.world.createRigidBody(r);
			e.world.createCollider(T.ColliderDesc.cuboid(t.size.x / 2, t.size.y / 2, t.size.z / 2).setCollisionGroups(q).setDensity(t.name === "torso" ? 6 : 2).setFriction(.8), a), a.setAngvel({
				x: 1.2,
				y: .4,
				z: t.name.includes("Left") ? 1 : -1
			}, !0);
			let o = new s(t.mesh.geometry, t.mesh.material);
			o.castShadow = !0, this.group.add(o), this.parts.push({
				name: t.name,
				body: a,
				mesh: o
			});
		}
		let a = this.parts[0].body, o = {
			head: [[
				0,
				.35,
				0
			], [
				0,
				-.22,
				0
			]],
			armLeft: [[
				-.39,
				.28,
				0
			], [
				.07,
				.28,
				0
			]],
			armRight: [[
				.39,
				.28,
				0
			], [
				-.07,
				.28,
				0
			]],
			legLeft: [[
				-.19,
				-.36,
				0
			], [
				0,
				.37,
				0
			]],
			legRight: [[
				.19,
				-.36,
				0
			], [
				0,
				.37,
				0
			]]
		};
		for (let t of this.parts.slice(1)) {
			let [n, r] = o[t.name], i = T.JointData.spherical({
				x: n[0],
				y: n[1],
				z: n[2]
			}, {
				x: r[0],
				y: r[1],
				z: r[2]
			});
			this.joints.push(e.world.createImpulseJoint(i, a, t.body, !0));
		}
		t.add(this.group), this.update(i);
	}
	update(e) {
		for (let e of this.parts) {
			let t = e.body.translation(), n = e.body.rotation();
			e.mesh.position.set(t.x, t.y, t.z), e.mesh.quaternion.set(n.x, n.y, n.z, n.w);
		}
		let t = this.parts[0].body, n = t.translation(), r = t.linvel();
		e.position.x = n.x, e.position.y = Math.max(0, n.y - 1.15), e.position.z = n.z, e.velocity.x = r.x, e.velocity.y = r.y, e.velocity.z = r.z;
	}
	dispose() {
		this.group.removeFromParent(), this.joints.forEach((e) => this.physics.world.removeImpulseJoint(e, !0)), this.parts.forEach((e) => this.physics.world.removeRigidBody(e.body)), this.parts.length = 0;
	}
}, Z = class {
	group = new o();
	walls = [];
	props = [];
	sunlight = new i(16769973, 3.5);
	materials = [];
	geometries = [];
	textures = [];
	constructor(e, t, n) {
		e.background = new d(1253941), e.fog = new v(1253941, 38, 105);
		let r = this.material(5397609), i = this.material(2371389), a = this.material(7569293), o = this.material(1647153), s = this.material(13350810), c = new g({
			color: 8909790,
			emissive: 4505256,
			emissiveIntensity: .55,
			roughness: .4
		});
		this.materials.push(c), this.box({
			x: 0,
			y: -.15,
			z: 0
		}, {
			x: 64,
			y: .3,
			z: 64
		}, i, t, !0), this.box({
			x: 0,
			y: .015,
			z: 0
		}, {
			x: 20,
			y: .03,
			z: 20
		}, r), this.box({
			x: 21,
			y: .2,
			z: 0
		}, {
			x: 7,
			y: .4,
			z: 15
		}, a, t, !0);
		for (let e = -8; e <= 8; e += 4) this.box({
			x: 13,
			y: .021,
			z: e
		}, {
			x: .08,
			y: .02,
			z: 1.7
		}, s);
		for (let e = -24; e <= 24; e += 6) this.box({
			x: e,
			y: .018,
			z: -12
		}, {
			x: 2.2,
			y: .02,
			z: .08
		}, s), this.box({
			x: e,
			y: .018,
			z: 12
		}, {
			x: 2.2,
			y: .02,
			z: .08
		}, s);
		let l = [
			[
				-21,
				-20,
				8,
				13,
				9
			],
			[
				-10,
				-23,
				7,
				17,
				5
			],
			[
				2,
				-24,
				10,
				9,
				5
			],
			[
				16,
				-22,
				10,
				15,
				7
			],
			[
				-23,
				-5,
				8,
				11,
				9
			],
			[
				-23,
				11,
				8,
				7,
				11
			],
			[
				-16,
				24,
				10,
				12,
				7
			],
			[
				1,
				25,
				15,
				10,
				6
			],
			[
				20,
				23,
				9,
				15,
				8
			],
			[
				27,
				1,
				5,
				13,
				13
			]
		], u = this.geometry(new m(.6, .95, .04)), h = new g({
			color: 15256992,
			emissive: 9993804,
			emissiveIntensity: .5,
			roughness: .35
		});
		this.materials.push(h);
		let _ = [], y = new p();
		l.forEach(([e, n, i, s, c], l) => {
			this.box({
				x: e,
				y: s / 2,
				z: n
			}, {
				x: i,
				y: s,
				z: c
			}, l % 2 ? r : o, t, !0), this.box({
				x: e,
				y: s + .18,
				z: n
			}, {
				x: i + .4,
				y: .36,
				z: c + .4
			}, a);
			for (let t = 2; t < s - 1; t += 2.2) for (let r = -i / 2 + 1.1; r < i / 2 - .4; r += 1.7) y.position.set(e + r, t, n + c / 2 + .04), y.updateMatrix(), _.push(y.matrix.clone());
		});
		let x = new b(u, h, _.length);
		_.forEach((e, t) => x.setMatrixAt(t, e)), x.instanceMatrix.needsUpdate = !0, this.group.add(x);
		for (let e of [-12, 12]) for (let n of [-10, 10]) this.box({
			x: e,
			y: 2.25,
			z: n
		}, {
			x: .14,
			y: 4.5,
			z: .14
		}, o, t, !0), this.box({
			x: e,
			y: 4.25,
			z: n
		}, {
			x: .8,
			y: .15,
			z: .35
		}, c);
		for (let e = 0; e < 2; e++) this.box({
			x: 17.2 + e * .35,
			y: (e + 1) * .1,
			z: 0
		}, {
			x: .35,
			y: (e + 1) * .2,
			z: 3.5
		}, a, t, !0);
		this.box({
			x: -12,
			y: .45,
			z: 0
		}, {
			x: 1.2,
			y: .9,
			z: 7
		}, a, t, !0), this.box({
			x: 0,
			y: .55,
			z: -15
		}, {
			x: 9,
			y: 1.1,
			z: .8
		}, r, t, !0);
		for (let e of n) {
			let n = this.box(e.position, e.size, this.material(7891798)), r = t.box(e.position, e.size);
			this.props.push({
				mesh: n,
				collider: r,
				prop: e,
				wasBroken: !1
			}), this.walls.push(n);
			let i = this.box({
				x: e.position.x,
				y: e.position.y + e.size.y * .28,
				z: e.position.z
			}, {
				x: e.size.x + .02,
				y: .08,
				z: e.size.z + .02
			}, o);
			n.add(i), i.position.sub(n.position);
		}
		this.sign("VECTOR / TRAINING", {
			x: -5.5,
			y: .05,
			z: 7.5
		}, 4.4, 1.2, !0), this.sign("FRACTURE", {
			x: 2,
			y: 7.2,
			z: -21.43
		}, 5.8, 1.3, !1), this.sign("CITY 01 — FORCE YARD", {
			x: 20.5,
			y: .43,
			z: 5
		}, 4.4, 1.1, !0);
		let S = new f(13166591, 3158855, 2.6);
		this.sunlight.position.set(-12, 28, 18), this.sunlight.castShadow = !0, this.sunlight.shadow.mapSize.set(1024, 1024), this.sunlight.shadow.camera.left = this.sunlight.shadow.camera.bottom = -30, this.sunlight.shadow.camera.right = this.sunlight.shadow.camera.top = 30, this.sunlight.shadow.camera.near = .5, this.sunlight.shadow.camera.far = 85, this.sunlight.shadow.bias = -4e-4, this.group.add(S, this.sunlight, this.sunlight.target), e.add(this.group), e.updateMatrixWorld(!0);
	}
	geometry(e) {
		return this.geometries.push(e), e;
	}
	material(e) {
		let t = new g({
			color: e,
			roughness: .88,
			metalness: .08
		});
		return this.materials.push(t), t;
	}
	box(e, t, n, r, i = !1) {
		let a = new s(this.geometry(new m(t.x, t.y, t.z)), n);
		return a.position.set(e.x, e.y, e.z), a.castShadow = !0, a.receiveShadow = !0, this.group.add(a), r && i && (r.box(e, t), this.walls.push(a)), a;
	}
	sign(e, t, n, i, a) {
		let o = document.createElement("canvas");
		o.width = 768, o.height = 180;
		let l = o.getContext("2d");
		if (!l) return;
		l.fillStyle = "#a5d3cc", l.font = "700 48px system-ui, sans-serif", l.textAlign = "center", l.textBaseline = "middle", l.fillText(e, 384, 90, 720);
		let u = new _(o);
		u.colorSpace = C, this.textures.push(u);
		let d = new c({
			map: u,
			transparent: !0,
			depthWrite: !1
		});
		this.materials.push(d);
		let f = new s(this.geometry(new r(n, i)), d);
		f.position.set(t.x, t.y, t.z), a && (f.rotation.x = -Math.PI / 2), this.group.add(f);
	}
	syncProps() {
		for (let e of this.props) {
			let t = e.prop.health <= 0;
			e.collider.setEnabled(!t), e.mesh.visible = !t, e.wasBroken = t;
		}
	}
	settings(e) {
		this.sunlight.castShadow = e.shadows;
		let t = e.preset === "ultra" ? 2048 : e.preset === "low" ? 512 : 1024;
		this.sunlight.shadow.mapSize.x !== t && (this.sunlight.shadow.map?.dispose(), this.sunlight.shadow.map = null, this.sunlight.shadow.mapSize.set(t, t));
	}
	dispose() {
		this.group.removeFromParent(), this.geometries.forEach((e) => e.dispose()), this.materials.forEach((e) => e.dispose()), this.textures.forEach((e) => e.dispose()), this.sunlight.shadow.dispose();
	}
}, ee = class {
	camera = new l(58, 1, .1, 160);
	target = new n(0, 1.35, 7);
	desired = new n();
	direction = new n();
	ray = new w();
	shakePower = 0;
	initialized = !1;
	impact(e) {
		this.shakePower = Math.min(.18, this.shakePower + e * .012);
	}
	update(e, t, n, r, i, a) {
		this.target.set(e.x, e.y + 1.35, e.z), this.desired.set(-Math.sin(t) * Math.cos(n) * 5.6, Math.sin(n) * 5.6 + .6, -Math.cos(t) * Math.cos(n) * 5.6).add(this.target), this.direction.copy(this.desired).sub(this.target);
		let o = this.direction.length();
		this.direction.normalize(), this.ray.set(this.target, this.direction), this.ray.far = o;
		let s = this.ray.intersectObjects(i, !1)[0];
		s && this.desired.copy(this.target).addScaledVector(this.direction, Math.max(.65, s.distance - .28)), this.initialized ? this.camera.position.lerp(this.desired, 1 - Math.exp(-24 * r)) : (this.camera.position.copy(this.desired), this.initialized = !0), this.shakePower *= Math.exp(-18 * r), a && this.shakePower > .002 && (this.camera.position.x += (Math.random() - .5) * this.shakePower, this.camera.position.y += (Math.random() - .5) * this.shakePower), this.camera.lookAt(this.target);
	}
	resize(e, t) {
		this.camera.aspect = e / Math.max(1, t), this.camera.updateProjectionMatrix();
	}
}, te = class {
	scene;
	particles = Array.from({ length: 96 }, () => ({
		life: 0,
		total: 1,
		x: 0,
		y: 0,
		z: 0,
		vx: 0,
		vy: 0,
		vz: 0,
		size: 0
	}));
	particleGeometry = new m(1, 1, 1);
	particleMaterial = new c({
		color: 10743255,
		transparent: !0,
		opacity: .85
	});
	mesh = new b(this.particleGeometry, this.particleMaterial, 96);
	matrix = new p();
	cursor = 0;
	ringGeometry = new a(.85, 1, 32);
	rings = [];
	numbers = [];
	settings;
	constructor(t, n) {
		this.scene = t, this.settings = n, this.mesh.frustumCulled = !1, this.mesh.instanceMatrix.setUsage(h), t.add(this.mesh);
		for (let e = 0; e < 10; e++) {
			let e = new s(this.ringGeometry, new c({
				color: 10021595,
				transparent: !0,
				opacity: 0,
				side: 2,
				depthWrite: !1
			}));
			e.rotation.x = -Math.PI / 2, e.visible = !1, this.rings.push({
				mesh: e,
				life: 0,
				total: 1,
				radius: 1
			}), t.add(e);
		}
		for (let n = 0; n < 12; n++) {
			let n = document.createElement("canvas");
			n.width = 128, n.height = 64;
			let r = n.getContext("2d");
			if (!r) continue;
			let i = new _(n);
			i.colorSpace = C;
			let a = new e(new S({
				map: i,
				transparent: !0,
				depthTest: !1,
				depthWrite: !1
			}));
			a.scale.set(.95, .48, 1), a.visible = !1, t.add(a), this.numbers.push({
				sprite: a,
				context: r,
				texture: i,
				life: 0,
				total: .8
			});
		}
		this.update(0);
	}
	ring(e, t, n) {
		let r = this.rings.find((e) => e.life <= 0) ?? this.rings[0];
		r.mesh.position.set(e.x, e.y + .06, e.z), r.radius = t, r.life = r.total = n, r.mesh.visible = this.settings.effects;
	}
	number(e, t) {
		let n = this.numbers.find((e) => e.life <= 0) ?? this.numbers[0];
		n && (n.context.clearRect(0, 0, 128, 64), n.context.font = "800 44px system-ui, sans-serif", n.context.textAlign = "center", n.context.textBaseline = "middle", n.context.lineWidth = 5, n.context.strokeStyle = "#15202c", n.context.strokeText(String(Math.round(t)), 64, 34), n.context.fillStyle = "#fff0bd", n.context.fillText(String(Math.round(t)), 64, 34), n.texture.needsUpdate = !0, n.sprite.position.set(e.x, e.y + 2, e.z), n.life = n.total, n.sprite.visible = !0);
	}
	emit(e) {
		if (e.type === "hit" && e.damage && this.number(e.position, e.damage), e.type === "well" && this.ring(e.position, e.strength ?? 4, 3), e.type === "awake" && this.ring(e.position, 5, 1.5), (e.type === "hit" || e.type === "block" || e.type === "break") && this.ring(e.position, e.type === "break" ? 2 : 1.1, .35), !this.settings.particles || e.type === "break" && !this.settings.destruction || ![
			"hit",
			"block",
			"break",
			"awake",
			"dash"
		].includes(e.type)) return;
		let t = this.settings.preset === "low" ? 6 : this.settings.preset === "medium" ? 12 : 20;
		for (let n = 0; n < t; n++) {
			let t = this.particles[this.cursor++ % this.particles.length], n = e.type === "break" && this.settings.destruction;
			t.life = t.total = n ? 1.2 : .3 + Math.random() * .25, t.x = e.position.x, t.y = e.position.y + (e.type === "hit" ? 1.2 : .3), t.z = e.position.z, t.vx = (Math.random() - .5) * (n ? 8 : 6), t.vy = Math.random() * (n ? 6 : 4) + 1, t.vz = (Math.random() - .5) * (n ? 8 : 6), t.size = n ? .2 + Math.random() * .25 : .035 + Math.random() * .045;
		}
	}
	update(e) {
		this.mesh.visible = this.settings.particles;
		for (let t = 0; t < this.particles.length; t++) {
			let n = this.particles[t];
			n.life = Math.max(0, n.life - e), n.life > 0 && (n.vy -= e * 15, n.x += n.vx * e, n.y = Math.max(.06, n.y + n.vy * e), n.z += n.vz * e), this.matrix.position.set(n.x, n.y, n.z), this.matrix.rotation.set(n.life * 5, n.life * 3, 0), this.matrix.scale.setScalar(n.life > 0 ? n.size * Math.min(1, n.life * 6) : 0), this.matrix.updateMatrix(), this.mesh.setMatrixAt(t, this.matrix.matrix);
		}
		this.mesh.instanceMatrix.needsUpdate = !0;
		for (let t of this.rings) {
			t.life = Math.max(0, t.life - e), t.mesh.visible = t.life > 0 && this.settings.effects;
			let n = 1 - t.life / t.total;
			t.mesh.scale.setScalar(t.radius * (.25 + n * .75)), t.mesh.material.opacity = t.life / t.total * .65;
		}
		for (let t of this.numbers) t.life = Math.max(0, t.life - e), t.sprite.visible = t.life > 0, t.sprite.position.y += e * .9, t.sprite.material.opacity = Math.min(1, t.life * 3);
	}
	updateSettings(e) {
		this.settings = e, e.particles || this.particles.forEach((e) => {
			e.life = 0;
		});
	}
	dispose() {
		this.mesh.removeFromParent(), this.mesh.dispose(), this.particleGeometry.dispose(), this.particleMaterial.dispose(), this.ringGeometry.dispose(), this.rings.forEach((e) => {
			e.mesh.removeFromParent(), e.mesh.material.dispose();
		}), this.numbers.forEach((e) => {
			e.sprite.removeFromParent(), e.sprite.material.dispose(), e.texture.dispose();
		});
	}
}, ne = class {
	context;
	gain;
	noise;
	disposed = !1;
	volume = .5;
	nodes = /* @__PURE__ */ new Set();
	setVolume(e) {
		this.volume = Math.min(1, Math.max(0, e)), this.context && this.gain && this.gain.gain.setTargetAtTime(this.volume * .22, this.context.currentTime, .02);
	}
	unlock() {
		if (!(this.disposed || this.volume === 0)) try {
			if (!this.context) {
				this.context = new AudioContext(), this.gain = this.context.createGain(), this.gain.gain.value = this.volume * .22, this.gain.connect(this.context.destination), this.noise = this.context.createBuffer(1, Math.floor(this.context.sampleRate * .22), this.context.sampleRate);
				let e = this.noise.getChannelData(0);
				for (let t = 0; t < e.length; t++) e[t] = (Math.random() * 2 - 1) * (1 - t / e.length);
			}
			this.context.state === "suspended" && this.context.resume().catch(() => {});
		} catch {}
	}
	play(e) {
		let t = this.context;
		if (!t || !this.gain || t.state !== "running" || this.volume <= 0 || this.nodes.size > 20 || ![
			"attack",
			"hit",
			"block",
			"dash",
			"awake",
			"break"
		].includes(e.type)) return;
		let n = t.createGain(), r = t.createOscillator(), i = e.type === "hit" || e.type === "break", a = e.type === "awake" ? .6 : i ? .16 : .1, o = t.currentTime;
		r.type = e.type === "awake" ? "sine" : "triangle";
		let s = e.type === "awake" ? 160 : e.type === "block" ? 440 : i ? 120 : 260;
		if (r.frequency.setValueAtTime(s, o), r.frequency.exponentialRampToValueAtTime(e.type === "awake" ? 480 : 40, o + a), n.gain.setValueAtTime(1e-4, o), n.gain.exponentialRampToValueAtTime(i ? 1 : .4, o + .006), n.gain.exponentialRampToValueAtTime(1e-4, o + a), r.connect(n), n.connect(this.gain), this.nodes.add(r), r.onended = () => {
			this.nodes.delete(r), r.disconnect(), n.disconnect();
		}, r.start(o), r.stop(o + a + .02), i && this.noise) {
			let e = t.createBufferSource(), n = t.createGain();
			e.buffer = this.noise, n.gain.setValueAtTime(.5, o), n.gain.exponentialRampToValueAtTime(1e-4, o + .15), e.connect(n), n.connect(this.gain), this.nodes.add(e), e.onended = () => {
				this.nodes.delete(e), e.disconnect(), n.disconnect();
			}, e.start(o);
		}
	}
	dispose() {
		this.disposed = !0, this.nodes.forEach((e) => {
			try {
				e.stop();
			} catch {}
			e.disconnect();
		}), this.nodes.clear(), this.gain?.disconnect(), this.context && this.context.state !== "closed" && this.context.close().catch(() => {}), this.context = void 0;
	}
};
//#endregion
//#region fracture/ui/preferences.ts
function re(e, t, n) {
	return e && t !== "reduce" && !n;
}
//#endregion
//#region fracture/core/runtime.ts
var Q, $ = 1 / 60;
async function ie(e) {
	let n = !1, r = !1, i = 0, a = { ...e.settings }, o = window.matchMedia("(prefers-reduced-motion: reduce)"), s, c, l, u, d, f, p, m = new AbortController(), h = new t(), g = new ee(), _ = new V(), v = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), x = new ne(), S = document.createElement("canvas");
	S.className = "fracture-canvas";
	let w = 0, E = performance.now(), D = -Infinity, O = 60, k = 0, A = [], M = () => {
		n || (n = !0, cancelAnimationFrame(i), e.signal.removeEventListener("abort", M), m.abort(), p?.disconnect(), f?.dispose(), b.forEach((e) => e.dispose()), b.clear(), v.forEach((e) => e.dispose()), v.clear(), d?.dispose(), u?.dispose(), x.dispose(), l?.dispose(), s?.renderLists.dispose(), s?.dispose(), s?.forceContextLoss(), s || c?.getExtension("WEBGL_lose_context")?.loseContext(), S.remove(), h.clear());
	}, N = () => {
		if (e.signal.aborted || n) throw new DOMException("Game launch cancelled", "AbortError");
	}, P = () => {
		n || r || (r = !0, cancelAnimationFrame(i), f?.pause(), A.length = 0, _.setBlock(!1), w = 0);
	}, F = () => {
		r || n || (P(), e.onPause());
	}, I = () => {
		if (!s || n) return;
		let t = e.container.getBoundingClientRect(), i = Math.max(1, t.width), o = Math.max(1, t.height);
		s.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2) * a.resolution), s.setSize(i, o, !1), S.style.width = "100%", S.style.height = "100%", g.resize(i, o), r && s.render(h, g.camera);
	}, L = () => {
		for (let e of [_.player, ..._.dummies]) v.has(e.id) || v.set(e.id, new W(h, e.id !== _.player.id));
	}, R = (e) => {
		let t = b.get(e.id);
		t && (t.dispose(), b.delete(e.id), _.externalPhysics.delete(e.id), e.position.y = Math.max(0, e.position.y), e.velocity.y = 0, e.grounded = !0, e.id === _.player.id && l && (l.playerCollider.setEnabled(!0), l.align(e)));
	}, z = () => {
		if (l) for (let e of [_.player, ..._.dummies]) {
			let t = e.state === "ragdolled" && a.ragdolls;
			if (t && !b.has(e.id)) {
				let t = v.get(e.id);
				if (!t) continue;
				b.set(e.id, new X(l, h, t, e)), _.externalPhysics.add(e.id), e.id === _.player.id && l.playerCollider.setEnabled(!1);
			} else !t && b.has(e.id) && R(e);
		}
	}, B = (t) => {
		if (t - D < 100 || n) return;
		D = t;
		let r = {
			health: _.player.health,
			maxHealth: _.player.maxHealth,
			state: _.player.state,
			awakening: _.player.awakening,
			awakenedSeconds: Math.max(0, _.player.awakenedUntil - _.now),
			cooldowns: Object.fromEntries(Object.entries(_.player.cooldowns).map(([e, t]) => [e, Math.max(0, t - _.now)])),
			abilities: j(_.player.awakenedUntil > _.now).map((e) => e.name),
			stats: { ..._.stats },
			fps: Math.round(O),
			dummyHealth: _.dummies[0]?.health ?? 0
		};
		S.dataset.playerPosition = `${_.player.position.x.toFixed(3)},${_.player.position.y.toFixed(3)},${_.player.position.z.toFixed(3)}`, S.dataset.playerYaw = _.player.yaw.toFixed(3), S.dataset.combatState = _.player.state, S.dataset.combo = String(_.player.combo), S.dataset.ragdolls = String(b.size), S.dataset.physicsBodies = String(l?.world.bodies.len() ?? 0), e.onFrame(r);
	}, H = (t) => {
		if (!n && !r && s && l && f && u && d) try {
			let e = Math.min(.1, Math.max(0, (t - E) / 1e3)), n = re(a.shake, document.documentElement.dataset.motion, o.matches);
			E = t, e > 0 && (O += (1 / e - O) * .06);
			let r = f.frame();
			A.push(...r.actions);
			let c = Math.min(e, k);
			for (k -= c, w += e - c; w >= $;) {
				let e = {
					...r,
					actions: A.splice(0)
				};
				_.tick($, e), L(), z(), u.syncProps();
				let t = b.has(_.player.id);
				t || l.move(_.player, e, $), l.step($, _.player, !t), b.forEach((e, t) => {
					let n = t === _.player.id ? _.player : _.dummies.find((e) => e.id === t);
					n && (e.update(n), t === _.player.id && l?.align(n));
				});
				for (let e of _.takeEvents()) d.emit(e), x.play(e), e.type === "hit" && (k = Math.max(k, .038), n && g.impact(e.strength ?? 4)), e.type === "awake" && n && g.impact(9);
				w -= $;
			}
			for (let t of [_.player, ..._.dummies]) v.get(t.id)?.update(t, e - c, _.now, b.has(t.id));
			d.update(e), h.updateMatrixWorld(!0), g.update(_.player.position, f.yaw, f.pitch, e, u.walls.filter((e) => e.visible), n), s.render(h, g.camera), B(t), i = requestAnimationFrame(H);
		} catch (t) {
			P();
			let n = t instanceof Error ? t.message : String(t);
			e.onError(`The arena stopped safely: ${n}. Leave and launch again.`);
		}
	}, G = () => {
		!n && l && ([_.player, ..._.dummies].forEach(R), _.resetTraining(), l.reset(_.player), f && (f.yaw = Math.PI), u?.syncProps(), D = -Infinity, B(performance.now()));
	}, K = (e) => {
		n || (a = { ...e }, f && (f.sensitivity = a.sensitivity), x.setVolume(a.volume), u?.settings(a), d?.updateSettings(a), s && (s.shadowMap.enabled = a.shadows), a.ragdolls || [_.player, ..._.dummies].forEach(R), I());
	};
	e.signal.addEventListener("abort", M, { once: !0 });
	try {
		if (N(), c = S.getContext("webgl2", {
			antialias: !0,
			alpha: !1,
			powerPreference: "high-performance"
		}) ?? void 0, !c) throw Error("FRACTURE needs WebGL 2. Try an up-to-date Chrome, Edge or Firefox with hardware acceleration enabled. Your browser or school policy may disable 3D graphics.");
		e.onStage("Map"), Q ??= T.init().catch((e) => {
			throw Q = void 0, e;
		}), await Q, N(), s = new y({
			canvas: S,
			context: c,
			antialias: !0
		}), s.outputColorSpace = C, s.toneMapping = 4, s.toneMappingExposure = 1.05, s.shadowMap.type = 2, l = new Y(_.player.position), u = new Z(h, l, _.props), N(), e.onStage("Character"), L(), e.onStage("Animations");
		for (let e of [_.player, ..._.dummies]) v.get(e.id)?.update(e, 0, _.now, !1);
		return h.updateMatrixWorld(!0), N(), e.onStage("Effects"), d = new te(h, a), x.setVolume(a.volume), e.container.append(S), f = new U(S, F, () => x.unlock()), S.addEventListener("webglcontextlost", (t) => {
			t.preventDefault(), F(), e.onError("The browser lost its 3D graphics context. Leave the arena, choose Low graphics and launch again.");
		}, { signal: m.signal }), document.addEventListener("visibilitychange", () => {
			document.hidden && F();
		}, { signal: m.signal }), p = new ResizeObserver(I), p.observe(e.container), K(a), l.world.step(), g.update(_.player.position, Math.PI, .28, $, u.walls, !1), s.render(h, g.camera), N(), B(performance.now()), E = performance.now(), i = requestAnimationFrame(H), S.focus({ preventScroll: !0 }), {
			dispose: M,
			pause: P,
			resume: () => {
				n || (r = !1, E = performance.now(), f?.resume(), cancelAnimationFrame(i), i = requestAnimationFrame(H));
			},
			updateSettings: K,
			resetTraining: G
		};
	} catch (t) {
		if (M(), t instanceof DOMException && t.name === "AbortError") throw t;
		let n = t instanceof Error ? t.message : "The game could not start. Try Low graphics or another modern browser.";
		throw e.onError(n), t;
	}
}
//#endregion
export { ie as launchGame };
