import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-camera-dialog',
  templateUrl: './camera-dialog.component.html',
  styleUrls: ['./camera-dialog.component.scss']
})
export class CameraDialogComponent implements OnInit {

  @ViewChild('video', { }) videoElement: ElementRef;
  @ViewChild('canvas', { }) canvas: ElementRef;

  constraints = {
    video: {
        facingMode: "environment",
        width: { ideal: 4096 },
        height: { ideal: 2160 }
    }
  };

  videoWidth = 0;
  videoHeight = 0;

  data:any = {
    receiver: null,
    photo: null, 
    ok: true
  };

  isLinear = false;
  firstFormGroup: FormGroup;

  constructor(private renderer: Renderer2,
              public dialogRef: MatDialogRef<CameraDialogComponent>) {
                dialogRef.disableClose = true;
              }

  ngOnInit() {
    this.startCamera();
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
      navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
    } else {
      alert('Sorry, camera not available.');
    }
  }

  handleError(error) {
    console.log('Error: ', error);
  }

  attachVideo(stream) {
    this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
    this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  capture() {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);

    let img = this.canvas.nativeElement.toDataURL();
    this.data.photo = img.split(',')[1];
  }
  close(){
    this.data.ok =false
    this.dialogRef.close(this.data)
  }
}
