import * as THREE from 'three'
import Widget from './Widget'
import * as CANNON from 'cannon'
import Keyboard from './Keyboard'
import Weapon from './Weapon'
import Socket from './Socket'

export default function Context() {
  this.scene = new THREE.Scene()
  this.scene.background = new THREE.Color(0x191970)
  this.scene.fog = new THREE.FogExp2( 0x000000, 0.0025 * 10);

  this.camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    1000
  );  

  this.tilt = -4;
  this.zoom = 2;

  this.camera.position.x = 0;
  this.camera.position.y = this.tilt
  this.camera.position.z = this.zoom
  this.camera.lookAt(0, 0, 0);
  this.camera.up.set(0, 0, 1);
  
  THREE.Object3D.DefaultUp.set(0, 0, 1)
  this.renderer = new THREE.WebGLRenderer()

  this._socket = {}
  this._socket.ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
  this.socket = new Socket()

  this.renderer.setPixelRatio( window.devicePixelRatio );
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(this.renderer.domElement);
  this.terrain = {}
  
  this.data = {}
  this.tiles = []
  this.controls = {}

  this._base = {}
  this._base.store = {}
  this._base.cameraViewProjectionMatrix = new THREE.Matrix4()
  this._base.frustum = new THREE.Frustum()
  this._base.nearby = []

  this._assets = {}

  this.UI = Object.create(Widget.prototype)

  this.cannon = {}
  this.cannon.world = new CANNON.World();
  this.keyboard = new Keyboard()

  this._weapon = {}
  this._weapon.abilities = {}
  this._weapon.abilities.icelance = true;

  this.weapon = new Weapon()
  THREE.Object3D.DefaultUp.set(0, 0, 1)
}
