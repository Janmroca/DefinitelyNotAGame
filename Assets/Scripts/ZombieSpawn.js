#pragma strict

public var timeToSpawn : float = 0.0f;
public var zombie : GameObject;

private var triggered : boolean = false;
private var time : float = 0.0f;

function Start() {
	time = 5.0f;
}

function Update () {
	if (time > timeToSpawn) {
		time = 0;
		var xoffset : float = Random.Range(-39, 39);
		Instantiate(zombie, Vector3(xoffset, -4.1, 0), Quaternion());
		Instantiate(zombie, Vector3(-xoffset, -4.1, 0), Quaternion());		
	}

}