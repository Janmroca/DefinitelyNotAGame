#pragma strict

public var background : GameObject;

private var triggered : boolean = false;

function FixedUpdate() {
	if (triggered) {
		background.GetComponent.<SpriteRenderer>().color += Vector4(0.01,0.01,0.01,0);
	}
}

function OnTriggerEnter2D(col: Collider2D) {
	if (col.gameObject.tag == "Player") {
		triggered = true;
		GetComponent.<ZombieSpawn>().enabled = true;
	}
}