#pragma strict

public var moveSpeed : float = 0.0f;

private var player : GameObject;
private var anim : Animator;
private var time : float;


function Start () {
	player = GameObject.FindWithTag("Player");
	anim = GetComponent.<Animator>();
	time = 0.0f;
	GetComponent.<BoxCollider2D>().offset = Vector2(-0.005915069, 0.006206799);
	GetComponent.<BoxCollider2D>().size = Vector2(0.3020338, 0.04236183);

}

function Update () {
	time += Time.deltaTime;
	if (time > 1) {
		GetComponent.<BoxCollider2D>().offset = Vector2(-0.005915069, 0.2247681);
		GetComponent.<BoxCollider2D>().size = Vector2(0.3020338, 0.4794845);
		var hit : RaycastHit2D;
		var direction : Vector2 = player.transform.position - transform.position;
		if (player.transform.position.x > transform.position.x) {
			transform.Translate(Vector2(1, 0) * moveSpeed * Time.deltaTime);
			anim.SetFloat("direction", 1);
		} else {
			transform.Translate(Vector2(-1,0) * moveSpeed * Time.deltaTime);
			anim.SetFloat("direction", -1);
		}
	}
}

function OnCollisionEnter2D (col : Collision2D) {
	if(col.gameObject.tag == "Player") {
		if (player.transform.position.x > transform.position.x) col.gameObject.transform.position.x += 0.5;
		else col.gameObject.transform.position.x -= 0.5;
	}
}

function OnCollisionExit2D (col: Collision2D) {
	if (col.gameObject.tag == "Player") {
		col.gameObject.SendMessage("decreaseLife", 5);
	}
}

function die() {
	Destroy(gameObject);
}