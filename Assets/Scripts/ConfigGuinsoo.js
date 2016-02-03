#pragma strict

public var explosion : Rigidbody2D;

private var activated : boolean = false;

function OnTriggerEnter2D(col : Collider2D) {
	if(col.GetComponent.<Collider2D>().gameObject.tag == "Player") {
		col.GetComponent.<Collider2D>().gameObject.transform.GetChild(0).GetComponent.<ShootPlayer>().projectile = explosion;
		Destroy(gameObject);
	}
}