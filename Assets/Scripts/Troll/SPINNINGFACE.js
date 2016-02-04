#pragma strict

private var growing : boolean = false;
function Update () {

	transform.Rotate(0,0,-10);
	if (transform.localScale.x <= 1) growing = true;
	if (transform.localScale.x > 5) growing = false;
	if (growing) transform.localScale += Vector3(0.05, 0.05, 0);
	else transform.localScale -= Vector3(0.05,0.05,0);
}