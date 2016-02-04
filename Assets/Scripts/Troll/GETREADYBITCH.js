#pragma strict

public var wall : GameObject;
public var text : Text;
public var image : Image;

function Start() {
	image.enabled = false;
}

function OnTriggerEnter2D(col: Collider2D) {
	if (col.gameObject.tag == "Player") {
		col.gameObject.GetComponent.<AudioSource>().Play();
		text.text = "                 #CORTESNUNCALLEGÓEN2015";;
		Destroy(wall);
		image.enabled = true;
	}
}