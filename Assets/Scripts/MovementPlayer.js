#pragma strict

public var initialSpeed : float = 0.0f;
public var incrementSpeed : float = 0.0f;
public var maxSpeed : float = 0.0f;
public var JumpSpeed : float = 0.0f;
public var decreaseJump : float = 0.0f;

private var rb : Rigidbody2D;
private var CurrentSpeed : float = 0.0f;
private var CurrentJumpSpeed : float = 0.0f;
private var ground : GameObject = null;
private var animator : Animator;

function Start () {
	rb = GetComponent.<Rigidbody2D>();
	CurrentSpeed = initialSpeed;
	animator = GetComponent.<Animator>();
}

function FixedUpdate () {
	CurrentJumpSpeed -= decreaseJump;
	if(CurrentJumpSpeed > 0.0f) rb.AddForce(Vector2.up * CurrentJumpSpeed);
}

function Update () {
	Debug.Log(transform.forward);

	//No Deslizamiento
	if(Input.GetKeyUp(KeyCode.D) || Input.GetKeyUp(KeyCode.RightArrow) ||
	   Input.GetKeyUp(KeyCode.A) || Input.GetKeyUp(KeyCode.LeftArrow)) {
	   	CurrentSpeed = 0.0f;
		rb.velocity.x = 0.0f;
	}
	//Movimiento DERECHA
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
	//Movimiento IZQUIERDA
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
	//No Movimiento
	else {
		CurrentSpeed = 0.0f;
		rb.velocity.x = 0.0f;
	}
	//SALTO
	if(Input.GetButtonDown("Jump")) {
		if(IsGrounded()) CurrentJumpSpeed = JumpSpeed;
	}
	else if(Input.GetButtonUp("Jump")) CurrentJumpSpeed = 0;

	animator.SetFloat("Direction", rb.velocity.x);

}

function OnCollisionEnter2D(col : Collision2D) {
	if(col.gameObject.GetComponent.<Rigidbody2D>().isKinematic) {
		for(var contact : ContactPoint2D in col.contacts) {
			if(contact.normal.y > 0.8) {
				ground = col.gameObject;
				break;
			}
		}
	}
}

function OnCollisionExit2D(col : Collision2D) {
	if(col.gameObject == ground) ground = null;
}

function IsGrounded () {
	return (ground != null);
}