#pragma strict

public var moveSpeed : float = 0.0f;
public var destroyTime : float = 0.0f;
public var explosion : GameObject;
public var distance : float = 0.0f;
public var life : int = 0;

private var player : GameObject;
private var anim : Animator;
private var tiempo : float = 0.0f;
private var tiempo2 : float = 0.0f;
private var collision : boolean = false;

function Start () {
	player = GameObject.FindWithTag("Player");
	anim = GetComponent.<Animator>();
}

function Update () {
	var hit : RaycastHit2D;
	var direction : Vector2 = player.transform.position - transform.position;
	hit = Physics2D.Raycast(transform.position,direction);
	if(hit.collider != null && hit.collider.gameObject == player && Vector2.Distance(player.transform.position,transform.position) < distance) {
		anim.SetBool("Moving", true);
		var right : boolean = (player.transform.position.x > transform.position.x);
		anim.SetBool("Right", right);
		transform.Translate(direction * moveSpeed * Time.deltaTime);
	}
	else {
		anim.SetBool("Moving", false);
	}
	if(collision) {
		tiempo += Time.deltaTime;
		tiempo2 += Time.deltaTime;
		if(tiempo2 > destroyTime) {
			Instantiate(explosion,transform.position,transform.rotation);
			Destroy(gameObject);
		}
		else if(tiempo < 0.5f)
			GetComponent.<SpriteRenderer>().color = Color.red;
		else if(tiempo > 0.5f)
			GetComponent.<SpriteRenderer>().color = Color.white;
		if(tiempo > 1) tiempo = 0.0f;
	}
}

function OnCollisionEnter2D (col : Collision2D) {
	if(!collision) {
		if(col.collider.gameObject.tag == "Player")
			collision = true;
	}
}

function decreaseLife() {
	life -= 1;
	if(life == 0) Destroy(gameObject);
}