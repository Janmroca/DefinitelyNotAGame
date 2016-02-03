#pragma strict

private var player : GameObject;
private var animator : Animator;
private var child : GameObject;

function Start () {
	player = GameObject.Find("Samus Physics");
	animator = gameObject.GetComponent.<Animator>();
	child = transform.GetChild(0).gameObject;

}

function Update () {
	if (player.transform.position.x - transform.position.x > 1) {
		transform.position.x += 0.05;
		animator.SetFloat("dir", 1);

	} else if (player.transform.position.x-transform.position.x < -1) {
		transform.position.x -= 0.05;
		animator.SetFloat("dir", -1);
		
	}  else animator.SetFloat("dir", 0);

	if (player.transform.position.y - transform.position.y > 1) {
		transform.position.y += 0.1;

	} else if (player.transform.position.y-transform.position.y < -1) {
		transform.position.y -= 0.1;
	}
}