#pragma strict

public var Damage : int = 15;
public var vuelta : boolean = false;

function OnTriggerEnter2D( col : Collider2D) {
	if(col.gameObject.tag == "Player") {
		if(!vuelta)
			col.transform.position = Vector3(55.4,-0.65,0);
		else
			col.transform.position = Vector3(72.2,1.12,0);
		col.SendMessage("decreaseLife",Damage);
	}
}