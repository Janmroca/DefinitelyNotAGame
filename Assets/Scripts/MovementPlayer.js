#pragma strict

public var initialSpeed : float = 0.0f;
public var incrementSpeed : float = 0.0f;
public var maxSpeed : float = 0.0f;
public var JumpSpeed : float = 0.0f;
public var decreaseJump : float = 0.0f;
public var player : Transform;
private var animator : Animator;

private var rb : Rigidbody2D;
private var CurrentSpeed : float = 0.0f;
private var CurrentJumpSpeed : float = 0.0f;
private var ground : GameObject = null;
private var lookingAt: float = 0.0f;
private var crouching : float = 0.0f;
private var isRolling : boolean;

function Start () {
	rb = GetComponent.<Rigidbody2D>();
	CurrentSpeed = initialSpeed;
	lookingAt = 0;
	crouching = 0;
	isRolling = false;
	animator = GameObject.Find("Samus Graphics").GetComponent.<Animator>();

}

function FixedUpdate () {
	CurrentJumpSpeed -= decreaseJump;
	if(CurrentJumpSpeed > 0.0f) rb.AddForce(Vector2.up * CurrentJumpSpeed);
}

function Update () {

	//No Deslizamiento
	if(Input.GetKeyUp(KeyCode.RightArrow) || Input.GetKeyUp(KeyCode.LeftArrow)) {
	   	CurrentSpeed = 0.0f;
		rb.velocity.x = 0.0f;
	}

	//Mirar arriba
	if (Input.GetKeyDown(KeyCode.UpArrow) && isRolling) {
		isRolling = false;
		crouching = 1;
	} else if (Input.GetKeyDown(KeyCode.UpArrow) && crouching == 1) {
		crouching = 0;
	} else if (Input.GetKey(KeyCode.UpArrow)) {
		if (lookingAt > 0 && lookingAt <= 1) lookingAt = 0.75;
		if (lookingAt > 1 && lookingAt <= 2) lookingAt = 1.75;
	} else if (Input.GetKeyUp(KeyCode.UpArrow)) {
		if (lookingAt == 0.75) lookingAt = 1;
		else if (lookingAt == 1.75) lookingAt = 2;
	}

	//Apuntar diagonal
	if (Input.GetKey(KeyCode.LeftControl)) {
		if (lookingAt > 0 && lookingAt <= 1) {
			if (lookingAt != 0.25 && lookingAt != 0.5) lookingAt = 0.5;
			else if (Input.GetKeyDown(KeyCode.DownArrow)) lookingAt = 0.25;
			else if (Input.GetKeyDown(KeyCode.UpArrow)) lookingAt = 0.5;
		} else if (lookingAt > 1 && lookingAt <= 2) {
			if (lookingAt != 1.25 && lookingAt != 1.5) lookingAt = 1.5;
			else if (Input.GetKey(KeyCode.DownArrow)) lookingAt = 1.25;
			else if (Input.GetKeyDown(KeyCode.UpArrow)) lookingAt = 1.5;
		}
	} else if (Input.GetKeyUp(KeyCode.LeftControl)) {
		if (lookingAt == 0.5 || lookingAt == 0.25) lookingAt = 1;
		else if (lookingAt == 1.5 || lookingAt == 1.25) lookingAt = 2;
	} else if (Input.GetKeyDown(KeyCode.DownArrow) && crouching) {
		isRolling = true;
		crouching = 1;
	} else if (Input.GetKeyDown(KeyCode.DownArrow)) {
		if (lookingAt != 0) crouching = 1;
	}

	//Movimiento DERECHA
	if(Input.GetKey(KeyCode.RightArrow)) {
		if (Input.GetKey(KeyCode.LeftControl)) {
			if (lookingAt == 0.25) lookingAt = 1.25;
			else if (lookingAt == 0.5) lookingAt = 1.5;
		} else if (Input.GetKey(KeyCode.UpArrow)) lookingAt = 1.75;
		else if (crouching == 1) {
			crouching = 0;
			lookingAt = 2;
		} else lookingAt = 2;
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
	else if(Input.GetKey(KeyCode.LeftArrow)) {
		if (Input.GetKey(KeyCode.LeftControl)) {
			if (lookingAt == 1.25) lookingAt = 0.25;
			else if (lookingAt == 1.5) lookingAt = 0.5;
		} else if (Input.GetKey(KeyCode.UpArrow)) lookingAt = 0.75;
		else if (crouching == 1) {
			crouching = 0;
			lookingAt = 1;
		} else lookingAt = 1;
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
		if(IsGrounded()) {
		animator.SetBool("isJumping", true);
		CurrentJumpSpeed = JumpSpeed;
		}
	}
	else if(Input.GetButtonUp("Jump")) {
		CurrentJumpSpeed = 0;
		animator.SetBool("isJumping", false);
		animator.SetBool("isFalling", true);
	}

	animator.SetFloat("Direction", rb.velocity.x*rb.velocity.x);
	animator.SetFloat("lookingAt", lookingAt);
	animator.SetFloat("Crouching", crouching);
	animator.SetBool("isGrounded", IsGrounded());
	animator.SetBool("isRolling", isRolling);

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