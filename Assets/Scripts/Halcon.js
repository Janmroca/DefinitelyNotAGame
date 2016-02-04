#pragma strict

private var colliding : boolean = false;
private var tiempo : float = 0.0f;

function Update() {
	if(colliding) {
		tiempo += Time.deltaTime;
		transform.position += Vector2(1,1)*Time.deltaTime;
	}
	if(tiempo > 5)
		Application.LoadLevel(Application.loadedLevel);
}

function OnTriggerEnter2D ( col : Collider2D) {
	if(col.GetComponent.<Collider2D>().gameObject.tag == "Player" && !colliding) {
		transform.rotation = Quaternion(0.0,0.0,0.4,0.9);
		colliding = true;
		transform.GetChild(0).gameObject.GetComponent.<ParticleSystem>().Play();
		GameObject.FindWithTag("Player").gameObject.transform.GetChild(1).GetComponent.<SpriteRenderer>().enabled = false;
		GameObject.FindWithTag("Player").gameObject.GetComponent.<MovementPlayer>().enabled = false;
	}
}