#pragma strict

public var moveSpeed : float = 0.0f;
public var rightX : float = 0.0f;

private var player : GameObject;
private var initialX: float;

function Start () {
	player = GameObject.FindWithTag("Player");
	GetComponent.<ShootStormtropper>().enabled = false;
	initialX = transform.position.x;
}

function Update () {
	var hit : RaycastHit2D;
	var direction : Vector2 = player.transform.position - transform.position;
	var rotation : Quaternion = Quaternion.LookRotation(player.transform.position - transform.position,
											transform.TransformDirection(Vector3.up));

	hit = Physics2D.Raycast(transform.position,direction);

	if(hit.collider != null && hit.collider.gameObject == player) {
		transform.rotation = Quaternion(0,0,rotation.z, rotation.w);
		GetComponent.<ShootStormtropper>().enabled = true;
	}
	else {
		GetComponent.<ShootStormtropper>().enabled = false;
		transform.parent.gameObject.transform.Translate(Vector3.right * moveSpeed * Time.deltaTime);
	}
}