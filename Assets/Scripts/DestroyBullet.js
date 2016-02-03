#pragma strict

public var lifeTime : float = 0.0f;
<<<<<<< HEAD
public var Damage : int = 0;
=======
public var explosion : GameObject;
>>>>>>> origin/master

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
<<<<<<< HEAD
	if(col.collider.gameObject.tag == "Player")
		col.collider.gameObject.SendMessage("decreaseLife",Damage);
	else if(col.collider.gameObject.tag == "Stormtropper")
		col.collider.gameObject.transform.GetChild(0).SendMessage("decreaseLife");
	else if(col.collider.gameObject.tag == "Creeper")
		col.collider.gameObject.SendMessage("decreaseLife");
=======
	Instantiate(explosion, transform.position, transform.rotation);
>>>>>>> origin/master
	Destroy(gameObject);
}