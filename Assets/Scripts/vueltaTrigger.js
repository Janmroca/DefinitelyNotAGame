#pragma strict

function OnTriggerEnter2D( col : Collider2D) {
	if(col.gameObject.tag == "Player") {
		GameObject.Find("lava").gameObject.GetComponent.<Lava>().vuelta = true;
	}
}