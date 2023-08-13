import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddImagePopUpComponent } from '../add-image-pop-up/add-image-pop-up.component';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data:Array<any> = [];

  constructor(
    private dialogRef: MatDialog,
    public homePageService: HomePageService
    ) { }

  ngOnInit(): void {
    this.getImages();
  }

  openDialog() {
    this.dialogRef.open(AddImagePopUpComponent).afterClosed().subscribe(
      response => this.getImages()
    )
  }

  getImages(label?: string){
    this.homePageService.getImages(label).subscribe(
      (response: any) => this.data = response.data
  )
}

  deleteImage(image: any) {
    this.homePageService.deleteImage(image.id).subscribe(
      (response:any) => {
        if(response.status) {
          this.data.splice(this.data.indexOf(image),1)
          this.homePageService.showSuccess("Image deleted successfully!")
        }
        else {
          this.homePageService.showError()
        }
      }
    )
  }
  
}
