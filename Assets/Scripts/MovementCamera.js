#pragma strict

public var player : GameObject;

private var freeze : boolean;

function Start() {
	freeze = false;
}

function Update () {
	var playerPos : Vector2 = player.transform.position;
	var camPos : Vector3 = transform.position;
	if (!freeze) transform.position = Vector3(playerPos.x, camPos.y, camPos.z);
}

function OnCollisionEnter(col : Collision) {
	freeze = true;
}

function OnCollisionExit(col : Collision) {
	freeze = false;
}