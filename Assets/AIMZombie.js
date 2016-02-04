#pragma strict

public var moveSpeed : float = 0.0f;

private var player : GameObject;
private var anim : Animator;


function Start () {
	player = GameObject.FindWithTag("Player");
	anim = GetComponent.<Animator>();
}

function Update () {
	var hit : RaycastHit2D;
	var direction : Vector2 = player.transform.position - transform.position;
	anim.SetFloat("direction", player.transform.position.x - transform.position.x);
	transform.Translate(Vector2(direction.x, 0) * moveSpeed * Time.deltaTime);
	}

function OnCollisionEnter2D (col : Collision2D) {
	if(col.collider.gameObject.tag == "Player") {
		if (player.transform.position.x > transform.position.x) col.gameObject.transform.position.x += 0.5;
		else col.gameObject.transform.position.x -= 0.5;
	}
}

function OnCollisionExit2D (col: Collision2D) {
	if (col.collider.gameObject.tag == "Player") {
		col.gameObject.SendMessage("decreaseLife", 5);
	}
}

function die() {
	Destroy(gameObject);
}