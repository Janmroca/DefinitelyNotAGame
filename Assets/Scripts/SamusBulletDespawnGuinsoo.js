﻿#pragma strict

public var lifeTime : float = 0.0f;
public var explosion : GameObject;

private var tiempo : float;

function Start () {
	tiempo = 0.0f;
}

function Update () {
	tiempo += Time.deltaTime;
	if(tiempo > lifeTime) {
		Destroy(gameObject);
		Instantiate(explosion, transform.position, transform.rotation);
	}
}

function OnCollisionEnter2D (col : Collision2D) {
	Instantiate(explosion, transform.position, transform.rotation);
	if(col.collider.gameObject.tag == "Stormtropper")
		col.collider.gameObject.transform.GetChild(0).SendMessage("decreaseLife");
	else if(col.collider.gameObject.tag == "Creeper")
		col.collider.gameObject.SendMessage("decreaseLife");
	else if(col.collider.gameObject.tag == "FaceDoor") 
		col.collider.gameObject.SendMessage("close");

	Destroy(gameObject);
}