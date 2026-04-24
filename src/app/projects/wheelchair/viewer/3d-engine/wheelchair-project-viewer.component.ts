import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
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

  // Movement properties
  private velocity = 0;
  private keys = { w: false, a: false, s: false, d: false };

  // Game properties
  private basketballs: THREE.Mesh[] = [];
  private ballVelocities: THREE.Vector3[] = [];
  public timerSeconds = 0;
  public timerFormatted = '00:00.00';

  // Scoreboard 3D
  private scoreboardCanvas!: HTMLCanvasElement;
  private scoreboardContext!: CanvasRenderingContext2D;
  private scoreboardTexture!: THREE.CanvasTexture;

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

  environments = [
    { id: 'venice_sunset_1k', name: 'Venice Sunset' },
    { id: 'apartment', name: 'Apartment' },
    { id: 'factory', name: 'Factory' },
    { id: 'field_sky', name: 'Open Field' },
    { id: 'living_room', name: 'Living Room' },
  ];
  selectedEnv = 'living_room';

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

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.updateKeys(event.key.toLowerCase(), true);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.updateKeys(event.key.toLowerCase(), false);
  }

  updateKeys(key: string, value: boolean) {
    if (['w', 'arrowup'].includes(key)) this.keys.w = value;
    if (['s', 'arrowdown'].includes(key)) this.keys.s = value;
    if (['a', 'arrowleft'].includes(key)) this.keys.a = value;
    if (['d', 'arrowright'].includes(key)) this.keys.d = value;
  }

  private createCourt(): void {
    const group = new THREE.Group();

    // 1. High-Detail Procedural Parquet Floor
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 2048;
    floorCanvas.height = 2048;
    const fctx = floorCanvas.getContext('2d')!;

    // Base Wood Color (Warm Oak)
    fctx.fillStyle = '#8b5a2b';
    fctx.fillRect(0, 0, 2048, 2048);

    const plankW = 64;
    const plankH = 256;

    for (let i = 0; i < 2048; i += plankW) {
      for (let j = 0; j < 2048; j += plankH) {
        const offset = (i / plankW) % 2 === 0 ? plankH / 2 : 0;
        const currentY = (j + offset) % 2048;

        // Varying Plank Color
        const lightShift = (Math.random() - 0.5) * 15;
        const satShift = (Math.random() - 0.5) * 10;
        fctx.fillStyle = `hsl(28, ${50 + satShift}%, ${35 + lightShift}%)`;
        fctx.fillRect(i, currentY, plankW, plankH);

        // Advanced Wood Grain
        fctx.strokeStyle = 'rgba(0,0,0,0.15)';
        fctx.lineWidth = 1;
        for (let k = 0; k < 12; k++) {
          fctx.beginPath();
          const gx = i + Math.random() * plankW;
          fctx.moveTo(gx, currentY);
          // Curved grain lines
          const cpX = gx + (Math.random() - 0.5) * 20;
          fctx.quadraticCurveTo(cpX, currentY + plankH/2, gx + (Math.random() - 0.5) * 5, currentY + plankH);
          fctx.stroke();
        }

        // Add some "knots" to the wood occasionally
        if (Math.random() > 0.95) {
          fctx.fillStyle = 'rgba(0,0,0,0.2)';
          fctx.beginPath();
          fctx.ellipse(i + Math.random() * plankW, currentY + Math.random() * plankH, 2 + Math.random() * 3, 4 + Math.random() * 8, Math.random() * Math.PI, 0, Math.PI * 2);
          fctx.fill();
        }

        // Plank Borders (Grooves)
        fctx.strokeStyle = 'rgba(0,0,0,0.4)';
        fctx.lineWidth = 2;
        fctx.strokeRect(i, currentY, plankW, plankH);

        // Beveled edges for light reflection
        fctx.strokeStyle = 'rgba(255,255,255,0.1)';
        fctx.lineWidth = 1;
        fctx.beginPath();
        fctx.moveTo(i + 1, currentY + plankH - 1);
        fctx.lineTo(i + 1, currentY + 1);
        fctx.lineTo(i + plankW - 1, currentY + 1);
        fctx.stroke();
      }
    }

    // Global Finish (Varnish look)
    const gradient = fctx.createRadialGradient(1024, 1024, 0, 1024, 1024, 1500);
    gradient.addColorStop(0, 'rgba(255,255,255,0.05)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.1)');
    fctx.fillStyle = gradient;
    fctx.fillRect(0, 0, 2048, 2048);

    const floorTexture = new THREE.CanvasTexture(floorCanvas);
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(8, 4);
    floorTexture.anisotropy = 16;
    floorTexture.colorSpace = THREE.SRGBColorSpace;
    floorTexture.needsUpdate = true;

    // Create a roughness map from the same canvas but desaturated and contrasted
    const roughnessCanvas = document.createElement('canvas');
    roughnessCanvas.width = 1024;
    roughnessCanvas.height = 1024;
    const rctx = roughnessCanvas.getContext('2d')!;
    rctx.filter = 'grayscale(1) contrast(1.5)';
    rctx.drawImage(floorCanvas, 0, 0, 1024, 1024);
    const roughnessTexture = new THREE.CanvasTexture(roughnessCanvas);
    roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
    roughnessTexture.repeat.set(8, 4);

    const courtGeo = new THREE.PlaneGeometry(28, 15);
    const courtMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughnessMap: roughnessTexture,
      roughness: 0.2, // More shiny
      metalness: 0.05,
      envMapIntensity: 1.2, // Enhance reflections
    });
    const court = new THREE.Mesh(courtGeo, courtMat);
    court.rotation.x = -Math.PI / 2;
    court.position.y = 0; // Exactly at zero
    court.receiveShadow = true;
    group.add(court);

    // 2. Stadium Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
    const backWallGeo = new THREE.PlaneGeometry(28.2, 10);
    const sideWallGeo = new THREE.PlaneGeometry(15.2, 10);

    // Back wall
    const backWall = new THREE.Mesh(backWallGeo, wallMat);
    backWall.position.set(0, 5, -7.55);
    group.add(backWall);

    // Front wall (Duplicate of back wall)
    const frontWall = new THREE.Mesh(backWallGeo, wallMat);
    frontWall.position.set(0, 5, 7.55);
    frontWall.rotation.y = Math.PI; // Face the court
    group.add(frontWall);

    // Left wall
    const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-14.1, 5, 0);
    group.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(sideWallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(14.1, 5, 0);
    group.add(rightWall);

    // 3. Ceiling and Stadium Lights
    const ceilingGeo = new THREE.PlaneGeometry(28.2, 15.2);
    const ceilingMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 10;
    group.add(ceiling);

    const lightPanelGeo = new THREE.PlaneGeometry(4, 1.5);
    const lightPanelMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 3,
    });

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const lp = new THREE.Mesh(lightPanelGeo, lightPanelMat);
        lp.rotation.x = Math.PI / 2;
        lp.position.set(i * 9, 9.95, j * 5);
        group.add(lp);
      }
    }

    // 4. Advertising/Safety Boards around the court
    const boardGeo = new THREE.BoxGeometry(2, 0.8, 0.15);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    for (let i = -6; i <= 6; i++) {
      const board = new THREE.Mesh(boardGeo, boardMat);
      board.position.set(i * 2.2, 0.4, -7.4);
      group.add(board);
    }

    // 5. Official Lines
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    // Boundary Lines (4 strips instead of one solid box to avoid covering the floor)
    const lineWidth = 0.1;
    const lineThickness = 0.01;
    const lineY = 0.01; // Slightly above the floor (which is at 0)

    // Top & Bottom boundaries
    const horizLineGeo = new THREE.BoxGeometry(28.1, lineThickness, lineWidth);
    const topLine = new THREE.Mesh(horizLineGeo, lineMat);
    topLine.position.set(0, lineY, -7.5);
    group.add(topLine);

    const bottomLine = new THREE.Mesh(horizLineGeo, lineMat);
    bottomLine.position.set(0, lineY, 7.5);
    group.add(bottomLine);

    // Left & Right boundaries
    const vertLineGeo = new THREE.BoxGeometry(lineWidth, lineThickness, 15);
    const leftLine = new THREE.Mesh(vertLineGeo, lineMat);
    leftLine.position.set(-14, lineY, 0);
    group.add(leftLine);

    const rightLine = new THREE.Mesh(vertLineGeo, lineMat);
    rightLine.position.set(14, lineY, 0);
    group.add(rightLine);

    // Center Line
    const centerLineGeo = new THREE.BoxGeometry(lineWidth, lineThickness, 15);
    const centerLine = new THREE.Mesh(centerLineGeo, lineMat);
    centerLine.position.set(0, lineY + 0.001, 0);
    group.add(centerLine);

    // Center Circle
    const circleGeo = new THREE.TorusGeometry(1.8, lineWidth/2, 16, 100);
    const centerCircle = new THREE.Mesh(circleGeo, lineMat);
    centerCircle.rotation.x = Math.PI / 2;
    centerCircle.position.set(0, lineY, 0);
    group.add(centerCircle);

    // 6. Baskets
    const basket1 = this.createBasket(new THREE.Vector3(13.8, 0, 0));
    const basket2 = this.createBasket(new THREE.Vector3(-13.8, 0, 0));
    group.add(basket1, basket2);

    this.scene.add(group);
  }

  private createBasket(position: THREE.Vector3): THREE.Group {
    const group = new THREE.Group();

    // Pole
    const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 3);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 1.5;
    group.add(pole);

    // Backboard
    const boardGeo = new THREE.BoxGeometry(0.1, 1.2, 1.8);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.set(0, 2.8, 0);
    group.add(board);

    // Rim
    const rimGeo = new THREE.TorusGeometry(0.3, 0.03, 16, 100);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xff4500 }); // Orange
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(position.x > 0 ? -0.5 : 0.5, 2.5, 0);
    group.add(rim);

    group.position.copy(position);
    return group;
  }

  private createBasketball(): void {
    const geo = new THREE.SphereGeometry(0.24, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xff4500,
      roughness: 0.8,
      metalness: 0.1,
    });

    const spawnPoints = [
      new THREE.Vector3(2, 0.24, 0),
      new THREE.Vector3(-2, 0.24, 2),
      new THREE.Vector3(5, 0.24, -3),
      new THREE.Vector3(-5, 0.24, -1),
      new THREE.Vector3(0, 0.24, 4),
    ];

    spawnPoints.forEach((pos) => {
      const ball = new THREE.Mesh(geo, mat.clone());
      ball.position.copy(pos);
      ball.castShadow = true;
      this.scene.add(ball);
      this.basketballs.push(ball);
      this.ballVelocities.push(new THREE.Vector3());
    });
  }

  private createScoreboard(): void {
    // Create hidden canvas
    this.scoreboardCanvas = document.createElement('canvas');
    this.scoreboardCanvas.width = 512;
    this.scoreboardCanvas.height = 256;
    this.scoreboardContext = this.scoreboardCanvas.getContext('2d')!;

    // Create texture
    this.scoreboardTexture = new THREE.CanvasTexture(this.scoreboardCanvas);

    // Create 3D Object (Scoreboard Screen)
    const screenGeo = new THREE.PlaneGeometry(3, 1.5);
    const screenMat = new THREE.MeshStandardMaterial({
      map: this.scoreboardTexture,
      emissive: new THREE.Color(0xffffff),
      emissiveMap: this.scoreboardTexture,
      emissiveIntensity: 0.5,
      side: THREE.DoubleSide,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);

    // Position it on the back wall
    screen.position.set(0, 4, -7.39);
    this.scene.add(screen);

    // Position a second screen on the front wall
    const screen2 = screen.clone();
    screen2.position.set(0, 4, 7.39);
    screen2.rotation.y = Math.PI;
    this.scene.add(screen2);

    // Add frames for the scoreboards
    const frameGeo = new THREE.BoxGeometry(3.2, 1.7, 0.2);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    
    const frame1 = new THREE.Mesh(frameGeo, frameMat);
    frame1.position.set(0, 4, -7.5);
    this.scene.add(frame1);

    const frame2 = frame1.clone();
    frame2.position.set(0, 4, 7.5);
    this.scene.add(frame2);
  }

  private drawScoreboard(): void {
    const ctx = this.scoreboardContext;
    const w = this.scoreboardCanvas.width;
    const h = this.scoreboardCanvas.height;
    const mainColor = '#efbc21'; // Project main color

    // Background
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 15;
    ctx.strokeRect(7, 7, w - 14, h - 14);

    // Subtle Grid background
    ctx.strokeStyle = 'rgba(239, 188, 33, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let i = 0; i < h; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }

    // Text "MATCH TIME"
    ctx.fillStyle = mainColor;
    ctx.font = 'bold 35px "IBM Plex Mono", "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MATCH TIME', w / 2, 70);

    // Timer Value
    ctx.font = 'bold 100px "IBM Plex Mono", "Courier New", monospace';
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 15;
    ctx.fillText(this.timerFormatted, w / 2, 185);
    ctx.shadowBlur = 0; // Reset for next draw

    this.scoreboardTexture.needsUpdate = true;
  }

  private updateGameLogic(delta: number): void {
    // Update Timer
    this.timerSeconds += delta;
    const mins = Math.floor(this.timerSeconds / 60);
    const secs = Math.floor(this.timerSeconds % 60);
    const ms = Math.floor((this.timerSeconds % 1) * 100);
    this.timerFormatted = `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;

    // Update 3D Scoreboard
    this.drawScoreboard();

    // Ball Physics for all balls
    this.basketballs.forEach((ball, index) => {
      const ballVel = this.ballVelocities[index];

      if (this.object) {
        const wheelchairPos = this.object.position;
        const ballPos = ball.position;
        const distance = wheelchairPos.distanceTo(ballPos);
        const collisionRadius = 0.8;

        if (distance < collisionRadius) {
          const pushDir = new THREE.Vector3()
            .subVectors(ballPos, wheelchairPos)
            .normalize();
          pushDir.y = 0;
          const speed = Math.abs(this.velocity) + 1.2;
          ballVel.addScaledVector(pushDir, speed * 0.15);
        }
      }

      // Apply friction
      ballVel.multiplyScalar(0.98);

      // Update position
      ball.position.add(ballVel);

      // Boundary check for each ball
      if (Math.abs(ball.position.x) > 13.8) {
        ballVel.x *= -0.5;
        ball.position.x = Math.sign(ball.position.x) * 13.8;
      }
      if (Math.abs(ball.position.z) > 7.3) {
        ballVel.z *= -0.5;
        ball.position.z = Math.sign(ball.position.z) * 7.3;
      }

      // Rotation
      const moveDist = ballVel.length();
      if (moveDist > 0.001) {
        const axis = new THREE.Vector3(ballVel.z, 0, -ballVel.x).normalize();
        ball.rotateOnWorldAxis(axis, moveDist / 0.24);
      }
    });
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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
    this.controls.maxDistance = 15; // Increased for stadium view
    this.controls.maxPolarAngle = Math.PI / 2.1; // Limit to prevent looking under floor
    this.controls.enabled = true;

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 2.5);
    light.position.set(5, 10, 5);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 50;
    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;
    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    this.scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    // Basketball Court (simple representation)
    this.createCourt();

    // Basketball
    this.createBasketball();

    // Scoreboard
    this.createScoreboard();

    // Environment (HDR)
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load('assets/3D/hdr/living_room.hdr', (texture) => {
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
    this.selectedEnv = hdrName;

    rgbeLoader.load(
      path,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.environment = texture;
        // Also set as background if you want to see the environment
        // this.scene.background = texture;
        this.isLoading = false;
      },
      undefined,
      (error) => {
        console.error('Error loading HDR', error);
        this.isLoading = false;
      },
    );
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

        // Adjust position to sit on the floor
        const box = new THREE.Box3().setFromObject(this.object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Offset the model so the bottom is at y=0
        this.object.position.y = -box.min.y;

        this.scene.add(this.object);

        this.object.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            // Hide "Andres' Plane" or any other floor included in the GLB
            const name = mesh.name.toLowerCase();
            if (
              name.includes('floor') ||
              name.includes('ground') ||
              name.includes('plane')
            ) {
              mesh.visible = false;
            }

            mesh.castShadow = true;
            mesh.receiveShadow = true;
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

    if (this.object) {
      // Simple car physics
      const acceleration = 4.0;
      const friction = 2.0;
      const maxSpeed = 5.0;
      const rotationSpeed = 2.0;

      // Acceleration
      if (this.keys.w) this.velocity += acceleration * delta;
      if (this.keys.s) this.velocity -= acceleration * delta;

      // Friction
      if (!this.keys.w && !this.keys.s) {
        if (this.velocity > 0)
          this.velocity = Math.max(0, this.velocity - friction * delta);
        else if (this.velocity < 0)
          this.velocity = Math.min(0, this.velocity + friction * delta);
      }

      // Clamp speed
      this.velocity = THREE.MathUtils.clamp(
        this.velocity,
        -maxSpeed / 2,
        maxSpeed,
      );

      // Rotation (only when moving or very slightly)
      if (Math.abs(this.velocity) > 0.1) {
        const rotationDirection = this.velocity > 0 ? 1 : -1;
        if (this.keys.a)
          this.object.rotation.y += rotationSpeed * delta * rotationDirection;
        if (this.keys.d)
          this.object.rotation.y -= rotationSpeed * delta * rotationDirection;
      }

      // Move along its local Z axis (assuming forward is Z)
      this.object.translateZ(this.velocity * delta);

      // Boundaries for Wheelchair
      const limitX = 13.5;
      const limitZ = 7.0;
      this.object.position.x = THREE.MathUtils.clamp(
        this.object.position.x,
        -limitX,
        limitX,
      );
      this.object.position.z = THREE.MathUtils.clamp(
        this.object.position.z,
        -limitZ,
        limitZ,
      );

      this.updateCameraFollow();
    }

    this.updateGameLogic(delta);

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private updateCameraFollow(): void {
    if (!this.object) return;

    // Offset the target slightly above the wheelchair
    const targetPosition = this.object.position
      .clone()
      .add(new THREE.Vector3(0, 0.4, 0));
    this.controls.target.lerp(targetPosition, 0.1);

    // If no keys are pressed and moving, we can auto-rotate camera behind
    if (Math.abs(this.velocity) > 0.1 && (this.keys.w || this.keys.s)) {
      // Desired position behind the wheelchair
      const relativeCameraOffset = new THREE.Vector3(0, 0.8, -2.5);
      const cameraOffset = relativeCameraOffset.applyMatrix4(
        this.object.matrixWorld,
      );

      // Only auto-follow if user isn't actively orbiting?
      // For now, let's just lerp the position
      this.camera.position.lerp(cameraOffset, 0.05);
    }
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
