#pragma strict

public var Halcon : GameObject;

function OnTriggerEnter2D ( col : Collider2D) {
	if(col.GetComponent.<Collider2D>().gameObject.tag == "Player")  {
		Instantiate(Halcon,GameObject.FindWithTag("Halcon2").gameObject.transform.position,
					Quaternion(0.1,1.0,0,0));
		Destroy(GameObject.FindWithTag("Halcon2").gameObject);
		Destroy(gameObject);
	}
}