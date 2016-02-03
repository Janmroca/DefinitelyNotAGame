#pragma strict

public var player : GameObject;

function Update () {
	var playerPos : Vector2 = player.transform.position;
	var camPos : Vector3 = transform.position;
	transform.position = Vector3(playerPos.x, camPos.y, camPos.z);
}