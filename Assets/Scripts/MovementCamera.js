#pragma strict

public var player : GameObject;
public var minX : float;
public var maxX : float;

function Start() {
}

function Update () {
	var playerPos : Vector2 = player.transform.position;
	var camPos : Vector3 = transform.position;
	if (playerPos.x > minX && playerPos.x < maxX) transform.position = Vector3(playerPos.x, camPos.y, camPos.z);
}