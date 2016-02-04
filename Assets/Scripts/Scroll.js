#pragma strict

public var speed : float = 0.5f;

function Start () {

}

function Update () {
	var offset : Vector2 = Vector2(Time.time * speed, 0);

	GetComponent.<Renderer>().material.mainTextureOffset = offset;
}