#pragma strict

public var speed : float = 15;
public var maxRadius : float = 10;
public var Damage : int = 0;

private var collision : boolean = false;

function Update () {
	transform.localScale += Vector3(1,1,1)*speed*Time.deltaTime;
	if(transform.localScale.x >= maxRadius) Destroy(gameObject);
}

function OnTriggerEnter2D(col : Collider2D) {
	if(col.GetComponent.<Collider2D>().gameObject.tag == "Player" && !collision) {
		collision = true;
		col.GetComponent.<Collider2D>().gameObject.SendMessage("decreaseLife",Damage);
	}
}