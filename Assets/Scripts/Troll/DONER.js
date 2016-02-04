#pragma strict

public var image : Image;

private var activated : boolean;

function Start () {
	activated = false;
}

function Update () {
	if (activated) {
		image.transform.localScale += Vector3(0.1, 0.1, 0);
		transform.Rotate(0,0,-10);
		image.GetComponent(SPINNINGFACE).enabled = false;
	}
}

function OnTriggerEnter2D(col: Collider2D) {
	if (col.gameObject.tag == "Player") activated = true;
}