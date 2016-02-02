#pragma strict

public var lifeTime : float = 0.0f;

private var tiempo : float;

function Start () {
	tiempo = 0.0f;
}

function Update () {
	tiempo += Time.deltaTime;
	if(tiempo > lifeTime) Destroy(gameObject);
}

function OnCollisionEnter2D (col : Collision2D) {
	Destroy(gameObject);
}