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
private var isRolling : float;
private var isSpawning: boolean;
private var time : float;
private var circlecollider : CircleCollider2D;

function Start () {
	circlecollider = GetComponent.<CircleCollider2D>();
	rb = GetComponent.<Rigidbody2D>();
	CurrentSpeed = initialSpeed;
	lookingAt = 0;
	crouching = 0;
	isRolling = 0;
	animator = transform.GetChild(1).gameObject.GetComponent.<Animator>();
	isSpawning = true;
	time = 0;

}

function FixedUpdate () {
	CurrentJumpSpeed -= decreaseJump;
	if(CurrentJumpSpeed > 0.0f) rb.AddForce(Vector2.up * CurrentJumpSpeed);
	else animator.SetBool("isJumping", false);
}



function Update () {

	if (isSpawning) {
		time += Time.deltaTime;
		if(time>=1) Destroy(GameObject.Find("SpawnAnim"));
	}

	//No Deslizamiento
	if(Input.GetKeyUp(KeyCode.RightArrow) || Input.GetKeyUp(KeyCode.LeftArrow)) {
	   	CurrentSpeed = 0.0f;
		rb.velocity.x = 0.0f;
	}

	//Mirar arriba
	if (Input.GetKeyDown(KeyCode.UpArrow) && isRolling == 1) {
		isRolling = 0;
		crouching = 1;
	} else if (Input.GetKeyDown(KeyCode.UpArrow) && crouching == 1) {
		if (lookingAt == 0.5 || lookingAt == 1.5 || lookingAt == 1 || lookingAt == 2) crouching = 0;
		else if (lookingAt == 0.25 || lookingAt == 1.25) lookingAt += 0.25;
	} else if (Input.GetKey(KeyCode.UpArrow)) {
		if (lookingAt > 0 && lookingAt <= 1) lookingAt = 0.75;
		if (lookingAt > 1 && lookingAt <= 2) lookingAt = 1.75;
	} else if (Input.GetKeyUp(KeyCode.UpArrow)) {
		if (lookingAt == 0.75) lookingAt = 1;
		else if (lookingAt == 1.75) lookingAt = 2;
	}

	//Apuntar diagonal
	if (Input.GetKey(KeyCode.LeftShift) || Input.GetKey(KeyCode.LeftControl)) {
		if (lookingAt > 0 && lookingAt <= 1) {
			if (lookingAt != 0.25 && lookingAt != 0.5) lookingAt = 0.5;
			else if (Input.GetKeyDown(KeyCode.DownArrow)) {
				if (lookingAt == 0.25) {
					if (crouching) isRolling = 1;
					else crouching = 1;
				} else lookingAt = 0.25;
			} else if (Input.GetKeyDown(KeyCode.UpArrow)) lookingAt = 0.5;
		} else if (lookingAt > 1 && lookingAt <= 2) {
			if (lookingAt != 1.25 && lookingAt != 1.5) lookingAt = 1.5;
			else if (Input.GetKeyDown(KeyCode.DownArrow)) {
				if (lookingAt == 1.25) {
					if (crouching) isRolling = 1;
					else crouching = 1;
				} else lookingAt = 1.25;
			}else if (Input.GetKeyDown(KeyCode.UpArrow)) lookingAt = 1.5;
		}
	} else if (Input.GetKeyUp(KeyCode.LeftControl)) {
		if (lookingAt == 0.5 || lookingAt == 0.25) lookingAt = 1;
		else if (lookingAt == 1.5 || lookingAt == 1.25) lookingAt = 2;
	} else if (Input.GetKeyDown(KeyCode.DownArrow) && crouching) {
		GetComponent.<BoxCollider2D>().enabled = false;
		isRolling = 1;
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

	if (isRolling) {
		transform.GetChild(0).gameObject.GetComponent.<ShootPlayer>().enabled = false;
		GetComponent.<BoxCollider2D>().enabled = false;
		GetComponent.<CircleCollider2D>().radius = 0.08;
		GetComponent.<CircleCollider2D>().offset.y = -0.22;
	} else if (crouching) {
		transform.GetChild(0).gameObject.GetComponent.<ShootPlayer>().enabled = true;	
		GetComponent.<CircleCollider2D>().radius = 0.12;
		GetComponent.<CircleCollider2D>().offset.y = -0.2;
		GetComponent.<BoxCollider2D>().enabled = false;
	} else {
				GetComponent.<BoxCollider2D>().enabled = true;

	}

	animator.SetFloat("Direction", rb.velocity.x*rb.velocity.x);
	animator.SetFloat("Crouching", crouching);
	animator.SetBool("isGrounded", IsGrounded());
	animator.SetFloat("isRolling", isRolling);
	animator.SetFloat("lookingAt", lookingAt);
	

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

function OnTriggerEnter2D(col: Collider2D) {
	if (col.gameObject.tag == "Stair") {
		ground = col.gameObject;
		if (transform.position.y <= -1) maxSpeed = 3.5;
		else if (transform.position.y > -0.9)  maxSpeed = 2.5;
	}
}

function OnTriggerExit2D(col: Collider2D) {
	if (col.gameObject.tag == "Stair") {
		maxSpeed = 10;
	}

}

function IsGrounded () {
	return (ground != null);
}