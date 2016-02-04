#pragma strict

public var timeToSpawn : float = 0.0f;
public var zombie : GameObject;

private var triggered : boolean = false;
private var time : float = 0.0f;

function Update () {
	time += Time.deltaTime;
	if (triggered && time > timeToSpawn) {
		time = 0;
		var xoffset : float = Random.Range(-39, 39);
		Instantiate(zombie, Vector3(xoffset, -4.1, 0), Quaternion());
	}

}

function OnTriggerEnter2D(col: Collider2D) {
	triggered = true;
	time = 5.0f;
}