import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, OrbitControls, RGBELoader } from 'three-stdlib';
import { MatTooltip } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

import { Subscription } from 'rxjs';
import { ThemeService } from '../../../../@shared/services/theme.service';

@Component({
  selector: 'app-wheelchair-project-viewer',
  templateUrl: './wheelchair-project-viewer.component.html',
  styleUrls: ['./wheelchair-project-viewer.component.scss'],
  standalone: true,
  imports: [MatTooltip, CommonModule],
})
export class WheelchairProjectViewerComponent implements OnInit, OnDestroy {
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private object!: THREE.Object3D | undefined;
  private clock = new THREE.Clock();

  isDarkMode: boolean = false;
  private themeSubscription!: Subscription;

  constructor(private themeService: ThemeService) {}

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

    this.themeSubscription = this.themeService.isDarkMode$.subscribe(
      (isDark) => {
        this.isDarkMode = isDark;
      },
    );
  }

  ngOnDestroy() {
    this.renderer.setAnimationLoop(null);
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  centerView(): void {
    if (this.controls) {
      this.controls.reset();
      this.camera.position.set(0, 0.3, 1.5);
      this.controls.update();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resize();
  }

  private initScene(): void {
    let width = this.getContainerWidth();
    let height = this.getContainerHeight();

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    this.camera.position.set(0, 0.3, 1.5);
    this.scene.add(this.camera);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.minDistance = 0.8;
    this.controls.maxDistance = 3.5;
    this.controls.maxPolarAngle = Math.PI / 1.7;
    this.controls.enabled = true;

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(2, 2, 2);
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // Environment (HDR)
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('assets/3D/hdr/venice_sunset_1k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
    });

    // Load initial model
    this.loadGLBModel(this.models[0].path);

    // Modern animation loop
    this.renderer.setAnimationLoop(() => {
      this.animate();
    });
  }

  changeHDR(hdrName: string): void {
    const path = `assets/3D/hdr/${hdrName}.hdr`;
    const rgbeLoader = new RGBELoader();
    this.isLoading = true;
    
    rgbeLoader.load(path, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.environment = texture;
      // Also set as background if you want to see the environment
      // this.scene.background = texture; 
      this.isLoading = false;
    }, undefined, (error) => {
      console.error('Error loading HDR', error);
      this.isLoading = false;
    });
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
    const delta = this.clock.getDelta();
    // Rotate object if loaded
    if (this.object) {
      this.object.rotation.y += delta * 0.3; // Consistent speed (0.3 rad/s)
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private resize() {
    const width = this.getContainerWidth();
    const height = this.getContainerHeight();
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  getContainerHeight() {
    return this.rendererContainer.nativeElement.clientHeight || 500;
  }

  getContainerWidth() {
    return this.rendererContainer.nativeElement.clientWidth || 800;
  }

  //Definir aqui el id del div que contendra al canvas
  getContainer() {
    return document.querySelector('#rendererContainer');
  }
}
