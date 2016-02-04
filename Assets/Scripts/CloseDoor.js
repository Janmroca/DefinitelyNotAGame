#pragma strict

private var time : float = 0.0f;
private var closed : boolean = false;

function Update() {
	time += Time.deltaTime;
	if (closed && time > 0.5) Destroy(gameObject);
}

function close() {
	time = 0;
	closed = true;
	GetComponent.<Animator>().SetBool("Closing", true);
	GetComponent.<Collider2D>().enabled = false;
}