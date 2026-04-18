import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, OrbitControls, RGBELoader } from 'three-stdlib';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-wheelchair',
  templateUrl: './wheelchair.component.html',
  styleUrls: ['./wheelchair.component.scss'],
  standalone: true,
  imports: [MatTooltip],
})
export class WheelchairComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private object!: THREE.Object3D | undefined;
  private clock = new THREE.Clock();

  ngOnInit(): void {
    this.initScene();
    this.animate();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize();
  }

  private initScene(): void {
    //Se obtiene el tamaño del contenedor para que el render sea igual
    let width = this.getContainerWidth();
    let height = this.getContainerHeight();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; // For realistic HDR rendering
    this.renderer.toneMappingExposure = 1;
    //this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    this.camera.position.set(0, 0.2, 1.4);
    this.scene.add(this.camera);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.enableZoom = false;
    this.controls.enabled = true;

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(0.2, 1, 1);
    this.scene.add(light);

    // Environment (HDR)
    const rgbeLoader = new RGBELoader();
    // @ts-ignore
    rgbeLoader.load('assets/3D/hdr/venice_sunset_1k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
    });

    // Load GLB
    this.loadGLBModel();
  }

  private loadGLBModel(): void {
    const loader = new GLTFLoader();
    loader.load(
      'assets/3D/wheelchair.glb',
      (gltf) => {
        this.object = gltf.scene;
        this.object.scale.set(1, 1, 1); // Adjust scale if necessary
        this.scene.add(this.object);

        // Enable object interaction
        this.object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).castShadow = true;
          }
        });

        // Handle object click to enable dragging
        this.renderer.domElement.addEventListener('pointerdown', (event) => {
          //this.onObjectClick(event),
        });
      },
      (progress) => {
        console.log(
          `Model loading: ${(progress.loaded / progress.total) * 100}%`,
        );
      },
      (error) => {
        console.error('Error loading model', error);
      },
    );
  }

  private onObjectClick(event: MouseEvent): void {
    if (!this.object) return;

    // Convert screen click to 3D space
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);
    const intersects = raycaster.intersectObject(this.object, true);

    if (intersects.length > 0) {
      this.controls.enabled = true; // Enable interaction
    } else {
      this.controls.enabled = true;
    }
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());

    // Rotate object if loaded
    if (this.object) {
      this.object.rotation.y += this.clock.getDelta() * 0.5; // Adjust speed
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
  private resize() {
    this.camera.aspect = this.getContainerWidth() / this.getContainerHeight();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.getContainerWidth(), this.getContainerHeight());
  }

  getContainerHeight() {
    if (window.innerWidth > 700 && window.innerWidth < 1200) {
      return window.innerHeight * 0.5;
    } else if (window.innerWidth > 500 && window.innerWidth <= 700) {
      return window.innerHeight * 0.4;
    } else if (window.innerWidth <= 500) {
      return window.innerHeight * 0.3;
    } else {
      return window.innerHeight * 0.6;
    }
  }

  getContainerWidth() {
    return this.getContainer().clientWidth;
  }

  //Definir aqui el id del div que contendra al canvas
  getContainer() {
    return document.querySelector('#rendererContainer');
  }
}
