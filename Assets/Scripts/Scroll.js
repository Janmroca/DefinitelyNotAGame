#pragma strict

public var speed : float = 0.1f;

private var player : GameObject;
private var time : float;

function Start () {
	time = 0;
	player = GameObject.FindWithTag("Player");
}

function Update () {
	if (player.gameObject.GetComponent.<Rigidbody2D>().velocity.x > 0) time += Time.deltaTime;
	else if (player.gameObject.GetComponent.<Rigidbody2D>().velocity.x < 0) time -= Time.deltaTime;
	var offset : Vector2 = Vector2(time * speed, 0);

	GetComponent.<Renderer>().material.mainTextureOffset = offset;
}