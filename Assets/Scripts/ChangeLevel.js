#pragma strict

public var level : int = 0.0f;

function OnTriggerEnter2D(col:Collider2D) {
	if (col.gameObject.tag == "Player") {
		Application.LoadLevel(Application.loadedLevel+level);
	}
}