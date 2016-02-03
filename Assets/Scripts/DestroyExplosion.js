#pragma strict

public var duration : float;

private var time : float;

function Start () {
	time = 0.0f;
}

function Update () {
	time += Time.deltaTime;
	if (time >= duration) Destroy(gameObject);
}