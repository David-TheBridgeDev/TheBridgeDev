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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wheelchair',
  templateUrl: './wheelchair.component.html',
  styleUrls: ['./wheelchair.component.scss'],
  standalone: true,
  imports: [MatTooltip, CommonModule],
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

  models = [
    {
      id: 'standard',
      name: 'Racing Black',
      path: 'assets/3D/wheelchair_4.glb',
      label: '4',
    },
    {
      id: 'style1',
      name: 'Sport Edition',
      path: 'assets/3D/wheelchair_1.glb',
      label: '1',
    },
    {
      id: 'style2',
      name: 'Ergo Flow',
      path: 'assets/3D/wheelchair_2.glb',
      label: '2',
    },
    {
      id: 'style3',
      name: 'Urban Pro',
      path: 'assets/3D/wheelchair_3.glb',
      label: '3',
    },
  ];
  currentModelId = 'standard';
  isLoading = false;

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
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xffffff); // Transparent background preferred for the new style

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
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(0.2, 1, 1);
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Environment (HDR)
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('assets/3D/hdr/venice_sunset_1k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
    });

    // Load initial model
    this.loadGLBModel(this.models[0].path);
  }

  switchModel(model: any): void {
    if (this.currentModelId === model.id || this.isLoading) return;
    this.currentModelId = model.id;
    this.loadGLBModel(model.path);
  }

  private loadGLBModel(path: string): void {
    this.isLoading = true;

    // Clean up previous object
    if (this.object) {
      this.scene.remove(this.object);
      this.object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).geometry.dispose();
          if (Array.isArray((child as THREE.Mesh).material)) {
            ((child as THREE.Mesh).material as THREE.Material[]).forEach((m) =>
              m.dispose(),
            );
          } else {
            ((child as THREE.Mesh).material as THREE.Material).dispose();
          }
        }
      });
    }

    const loader = new GLTFLoader();
    loader.load(
      path,
      (gltf) => {
        this.object = gltf.scene;
        this.object.scale.set(1, 1, 1);
        this.scene.add(this.object);

        this.object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).castShadow = true;
            (child as THREE.Mesh).receiveShadow = true;
          }
        });
        this.isLoading = false;
      },
      undefined,
      (error) => {
        console.error('Error loading model', error);
        this.isLoading = false;
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
      return window.innerHeight * 0.6; // Increased from 0.5
    } else if (window.innerWidth > 500 && window.innerWidth <= 700) {
      return window.innerHeight * 0.6; // Increased from 0.4
    } else if (window.innerWidth <= 500) {
      return window.innerHeight * 0.55; // Increased from 0.3
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
