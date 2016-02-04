#pragma strict

public var navi : GameObject;
public var text : Text;
public var wall : GameObject;

function OnTriggerEnter2D(col: Collider2D) {
	if (col.gameObject.tag == "Player") {
		navi.GetComponent.<AudioSource>().Play();
		text.text = "                 NECESITAMOS MAS GUINSOO!";
		GetComponent.<Collider2D>().enabled = false;
		Destroy(wall);
	}
}