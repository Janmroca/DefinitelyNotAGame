#pragma strict

public var moveSpeed : float = 0.0f;
public var maxX: float = 0.0f;
public var minX: float = 0.0f;
public var distance : float = 0.0f; 
public var life : int = 0;

private var player : GameObject;
private var initialX: float;
private var right : boolean = true;
private var currentX : float;
private var anim : Animator;

function Start () {
	player = GameObject.FindWithTag("Player");
	GetComponent.<ShootStormtropper>().enabled = false;
	initialX = transform.position.x;
	anim = transform.parent.gameObject.GetComponent.<Animator>();
}

function Update () {

	var hit : RaycastHit2D;
	var direction : Vector2 = player.transform.position - transform.position;
	var rotation : Quaternion = Quaternion.LookRotation(player.transform.position - transform.position,
											transform.TransformDirection(Vector3.up));

	hit = Physics2D.Raycast(transform.position,direction);

	if(hit.collider != null && hit.collider.gameObject == player && Vector2.Distance(player.transform.position,transform.position) < distance) {
		if(player.transform.position.x > transform.position.x) anim.SetBool("PlayerX", true);
		else anim.SetBool("PlayerX", false);
		anim.SetBool("Shoot", true);
		//transform.rotation = Quaternion(0,0,rotation.z, rotation.w);
		transform.LookAt(player.transform.position);
		transform.Rotate(Vector3(0,-90,0),Space.Self);
		GetComponent.<ShootStormtropper>().enabled = true;
	}
	else {
		anim.SetBool("Shoot", false);
		currentX = transform.position.x;
		GetComponent.<ShootStormtropper>().enabled = false;
		if(right && initialX + maxX > currentX) {
			anim.SetBool("Right", true);
			transform.parent.gameObject.transform.Translate(Vector3.right * moveSpeed * Time.deltaTime);
		}
		else {
			anim.SetBool("Right", false);
			transform.parent.gameObject.transform.Translate(-Vector3.right * moveSpeed * Time.deltaTime);
			right = false;
			if(!right && initialX - minX > currentX) {
				right = true;
			}
		}

	}
}

function decreaseLife() {
	life -= 1;
	if(life == 0) Destroy(gameObject.transform.parent.gameObject);
}