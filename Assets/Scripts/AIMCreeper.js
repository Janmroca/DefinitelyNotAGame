#pragma strict

public var moveSpeed : float = 0.0f;

private var player : GameObject;

function Start () {
	player = GameObject.FindWithTag("Player");
}

function Update () {
	var hit : RaycastHit2D;
	var direction : Vector2 = player.transform.position - transform.position;
	hit = Physics2D.Raycast(transform.position,direction);
	if(hit.collider != null && hit.collider.gameObject == player) {
		transform.Translate(direction * moveSpeed * Time.deltaTime);
	}

}