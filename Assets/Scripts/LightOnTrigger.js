#pragma strict

public var background : GameObject;

private var triggered : boolean = false;
private var time : float = 0.0f;

function Start() {
	time = 0.0f;
}

function Update() {
	time += Time.deltaTime;
	if (time > 18) {
		triggered = true;
		GetComponent.<ZombieSpawn>().enabled = true;
	}
}

function FixedUpdate() {
	if (triggered) {
		background.GetComponent.<SpriteRenderer>().color += Vector4(0.01,0.01,0.01,0);
	}
}