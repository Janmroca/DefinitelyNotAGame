#pragma strict

public var initialSpeed : float = 0.0f;
public var incrementSpeed : float = 0.0f;
public var maxSpeed : float = 0.0f;

private var rb : Rigidbody2D;
private var CurrentSpeed : float = 0.0f;

function Start () {
	rb = GetComponent.<Rigidbody2D>();
	CurrentSpeed = initialSpeed;
}

function Update () {

	if(Input.GetKeyUp(KeyCode.D) || Input.GetKeyUp(KeyCode.RightArrow) ||
	   Input.GetKeyUp(KeyCode.A) || Input.GetKeyUp(KeyCode.LeftArrow)) {
	   	CurrentSpeed = 0.0f;
		rb.velocity.x = 0.0f;
	}

	if(Input.GetKey(KeyCode.D) || Input.GetKey(KeyCode.RightArrow)) {
		if(CurrentSpeed + (incrementSpeed * Time.deltaTime) < maxSpeed) {
			CurrentSpeed += incrementSpeed * Time.deltaTime;
			rb.velocity.x = CurrentSpeed;
		}
		else {
			CurrentSpeed = maxSpeed;
			rb.velocity.x = maxSpeed;
		}
	}

	else if(Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.LeftArrow)) {
		if(CurrentSpeed - (incrementSpeed * Time.deltaTime) > -maxSpeed) {
			CurrentSpeed -= incrementSpeed * Time.deltaTime;
			rb.velocity.x = CurrentSpeed;
		}
		else {
			CurrentSpeed = -maxSpeed;
			rb.velocity.x = -maxSpeed;
		}
	}

	else {
		CurrentSpeed = 0.0f;
		rb.velocity.x = 0.0f;
	}
}