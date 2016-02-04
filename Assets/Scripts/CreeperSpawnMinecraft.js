#pragma strict

public var creeper : GameObject;

function OnTriggerEnter2D(col: Collider2D) {
	if(col.gameObject.tag == "Player") {
		Instantiate(creeper,Vector3(17,-3.5,0),transform.rotation);
		Instantiate(creeper,Vector3(19,-3.5,0),transform.rotation);
		Destroy(gameObject);
	}
}